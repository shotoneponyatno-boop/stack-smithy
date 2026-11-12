const strangeMode = (() => {
  'use strict';

  const INFINITE_ENEMY_QUANTITY = 1e15;
  const SEARCH_STEP_DELAY_MS = 40;
  const MIN_UNIT_COUNT = 100;
  const categoryOrder = ['leadership', 'authority', 'dominance'];

  function enemyQuantity(enemy) {
    const quantity = Number(enemy.quantity);
    return enemy.quantity !== null && enemy.quantity !== undefined &&
      Number.isFinite(quantity) && quantity > 0
      ? quantity : INFINITE_ENEMY_QUANTITY;
  }

  function ourUnitTags(row) {
    const tags = new Set();
    const unit = row.unit || {};
    const raceTags = {
      beast: 'beasts',
      dragon: 'dragons',
      giant: 'giants',
      elemental: 'elementals',
      human: 'humans',
      monster: 'monsters'
    };
    const addRace = () => {
      if (unit.race) tags.add(raceTags[unit.race] || unit.race);
      if (unit.isHuman) tags.add('humans');
    };

    if (row.category === 'leadership') {
      if (unit.group) tags.add(unit.group);
      if (unit.category) tags.add(unit.category === 'engineer' ? 'engineers' : unit.category);
      addRace();
    } else if (row.category === 'authority') {
      tags.add('monsters');
      if (unit.category) tags.add(unit.category);
      addRace();
    } else {
      tags.add('mercenaries');
      if (Array.isArray(unit.tags)) {
        unit.tags.forEach((tag) => tags.add(raceTags[tag] || tag));
      }
      if (unit.category) tags.add(unit.category === 'engineer' ? 'engineers' : unit.category);
      addRace();
    }

    return [...tags];
  }

  function enemyBonusAgainst(enemy, tags) {
    const bonuses = enemy.strengthAgainst || {};
    let total = 0;
    tags.forEach((tag) => {
      const value = Number(bonuses[tag]);
      if (Number.isFinite(value)) total += value;
    });
    return total;
  }

  function siegeRequirement(row) {
    const multiplier = Number(row.unit && row.unit.fortificationStrengthMultiplier);
    if (!(multiplier > 1) || !Array.isArray(row.branches)) return null;

    const branches = row.branches.filter((branch) =>
      branch.damage > 0 && Array.isArray(branch.enemy.types) &&
      branch.enemy.types.includes('fortifications'));
    if (!branches.length) return null;

    const target = branches.reduce((best, branch) => {
      if (!best) return branch;
      if (branch.totalHealth !== best.totalHealth) {
        return branch.totalHealth > best.totalHealth ? branch : best;
      }
      return branch.damage > best.damage ? branch : best;
    }, null);
    const health = Math.max(0, Number(target.totalHealth) || 0);
    if (health <= 0) return null;

    return {
      row,
      target,
      min: Math.max(1, Math.ceil(health / target.damage - 1e-9))
    };
  }

  function finalizeRows(rows) {
    return rows.map((row) => {
      const count = Math.max(0, Math.floor(row.count || 0));
      const kills = row.unitsPerKill > 0 && Number.isFinite(row.unitsPerKill)
        ? Math.min(row.maxKills, Math.floor(count / row.unitsPerKill + 1e-9)) : 0;
      return {
        ...row,
        count,
        spent: count * row.cost,
        totalHealth: count * row.healthPerUnit,
        totalDamage: count * row.damagePerUnit,
        kills
      };
    });
  }

  function enemyDisplayName(enemy, index) {
    const name = typeof enemy.name === 'string' ? enemy.name.trim() : '';
    return name || I18N.t('enemy.defaultName', { n: index + 1 });
  }

  function simulate(rows, enemies, ourFirst, collectLog) {
    const enemyState = enemies.map((enemy, index) => {
      const healthPerUnit = Math.max(0, Number(enemy.health) || 0);
      const count = enemyQuantity(enemy);
      return {
        index,
        enemy,
        name: enemyDisplayName(enemy, index),
        healthPerUnit,
        count,
        health: healthPerUnit * count,
        damagePerUnit: Math.max(0, Number(enemy.strength) || 0)
      };
    });
    const ourState = rows
      .filter((row) => row.count > 0 && row.healthPerUnit > 0)
      .map((row, index) => {
        const count = Math.max(0, Math.floor(row.count));
        return {
          index,
          row,
          count,
          initialCount: count,
          healthPerUnit: row.healthPerUnit,
          health: count * row.healthPerUnit,
          initialHealth: count * row.healthPerUnit,
          damageByEnemy: new Map((row.branches || []).map((branch) => [
            branch.enemyIndex, branch.damage
          ])),
          siege: Number(row.unit.fortificationStrengthMultiplier) > 1,
          tags: ourUnitTags(row),
          trainingValue: Math.max(0, Number(
            row.unit.trainingCost && row.unit.trainingCost.silver
          ) || 0)
        };
      });
    const logs = [];

    if (!enemyState.some((enemy) => enemy.health > 0 && enemy.healthPerUnit > 0)) {
      return { victory: ourState.length > 0, losses: 0, rounds: 0, logs };
    }
    if (!ourState.length) return { victory: false, losses: 0, rounds: 0, logs };

    function aliveEnemies() {
      return enemyState.filter((enemy) => enemy.health > 0 && enemy.healthPerUnit > 0);
    }
    function aliveOurs() {
      return ourState.filter((unit) => unit.health > 0);
    }

    const siegeUnits = ourState.filter((unit) => unit.siege && unit.health > 0);
    if (siegeUnits.length) {
      siegeUnits.forEach((unit) => {
        let target = null;
        enemyState.forEach((enemy) => {
          if (enemy.health <= 0 || enemy.healthPerUnit <= 0 ||
              !Array.isArray(enemy.enemy.types) ||
              !enemy.enemy.types.includes('fortifications')) return;
          if (!target || enemy.health > target.health) target = enemy;
        });
        if (!target) return;

        const value = unit.damageByEnemy.get(target.index) || 0;
        if (value <= 0) return;
        const damage = unit.count * value;
        const before = target.count;
        target.health = Math.max(0, target.health - damage);
        target.count = target.health > 0
          ? Math.ceil(target.health / target.healthPerUnit) : 0;
        if (collectLog) {
          logs.push({
            round: 0,
            side: 'catapults',
            attacker: unit.row.name,
            target: target.name,
            damage,
            killed: Math.max(0, before - target.count),
            remaining: target.count
          });
        }
      });
    }

    const enemyOrder = enemyState
      .filter((enemy) => enemy.health > 0 && enemy.healthPerUnit > 0)
      .sort((a, b) => {
        const bonusA = ourState.reduce((max, unit) =>
          Math.max(max, enemyBonusAgainst(a.enemy, unit.tags)), 0);
        const bonusB = ourState.reduce((max, unit) =>
          Math.max(max, enemyBonusAgainst(b.enemy, unit.tags)), 0);
        return (b.count * b.damagePerUnit * (1 + bonusB / 100)) -
          (a.count * a.damagePerUnit * (1 + bonusA / 100));
      });
    const ourOrder = ourState.slice().sort((a, b) => {
      if (a.siege !== b.siege) return a.siege ? 1 : -1;
      return (b.row.damagePerUnit - a.row.damagePerUnit) || (b.health - a.health);
    });
    let enemyPointer = 0;
    let ourPointer = 0;

    function nextAliveEnemy() {
      for (let i = 0; i < enemyOrder.length; i += 1) {
        const enemy = enemyOrder[enemyPointer % enemyOrder.length];
        enemyPointer += 1;
        if (enemy.health > 0 && enemy.healthPerUnit > 0) return enemy;
      }
      return null;
    }

    function nextAliveOur() {
      for (let i = 0; i < ourOrder.length; i += 1) {
        const unit = ourOrder[ourPointer % ourOrder.length];
        ourPointer += 1;
        if (unit.health > 0) return unit;
      }
      return null;
    }

    function ourUnitAttack(unit, turn) {
      if (unit.health <= 0) return;
      let target = null;
      let pool = enemyState;
      if (unit.siege) {
        const fortifications = enemyState.filter((enemy) =>
          enemy.health > 0 && enemy.healthPerUnit > 0 &&
          Array.isArray(enemy.enemy.types) &&
          enemy.enemy.types.includes('fortifications'));
        if (fortifications.length) pool = fortifications;
      }
      pool.forEach((enemy) => {
        if (enemy.health <= 0 || enemy.healthPerUnit <= 0) return;
        const value = unit.damageByEnemy.get(enemy.index) || 0;
        if (!target || enemy.health > target.enemy.health + 1e-9 ||
            (Math.abs(enemy.health - target.enemy.health) <= 1e-9 && value > target.value)) {
          target = { enemy, value };
        }
      });
      if (!target || target.value <= 0) return;

      const damage = unit.count * target.value;
      const before = target.enemy.count;
      target.enemy.health = Math.max(0, target.enemy.health - damage);
      target.enemy.count = target.enemy.health > 0 && target.enemy.healthPerUnit > 0
        ? Math.ceil(target.enemy.health / target.enemy.healthPerUnit) : 0;
      if (collectLog) {
        logs.push({
          round: turn,
          side: 'ours',
          attacker: unit.row.name,
          target: target.enemy.name,
          damage,
          killed: Math.max(0, before - target.enemy.count),
          remaining: target.enemy.count
        });
      }
    }

    function enemyGroupAttack(enemy, turn) {
      if (enemy.health <= 0 || enemy.healthPerUnit <= 0) return;
      let target = null;
      ourState.forEach((unit) => {
        if (unit.health <= 0) return;
        const bonus = enemyBonusAgainst(enemy.enemy, unit.tags);
        const potential = enemy.count * enemy.damagePerUnit *
          Math.max(0, 1 + bonus / 100);
        if (potential <= 0) return;
        if (!target || potential > target.potential + 1e-9 ||
            (Math.abs(potential - target.potential) <= 1e-9 &&
             unit.health > target.unit.health)) {
          target = { unit, potential };
        }
      });
      if (!target) return;

      const before = target.unit.count;
      target.unit.health = Math.max(0, target.unit.health - target.potential);
      target.unit.count = target.unit.health > 0
        ? Math.ceil(target.unit.health / target.unit.healthPerUnit) : 0;
      if (collectLog) {
        logs.push({
          round: turn,
          side: 'enemy',
          attacker: enemy.name,
          target: target.unit.row.name,
          damage: target.potential,
          killed: Math.max(0, before - target.unit.count),
          remaining: target.unit.count
        });
      }
    }

    const enemiesDead = () => aliveEnemies().length === 0;
    const oursDead = () => aliveOurs().length === 0;
    let turn = 0;
    let ourTurn = ourFirst;

    while (turn < 800 && !enemiesDead() && !oursDead()) {
      turn += 1;
      if (ourTurn) {
        const unit = nextAliveOur();
        if (!unit) break;
        ourUnitAttack(unit, turn);
      } else {
        const enemy = nextAliveEnemy();
        if (!enemy) break;
        enemyGroupAttack(enemy, turn);
      }
      ourTurn = !ourTurn;
    }

    const rounds = Math.max(1, Math.ceil(turn / 2));
    const losses = ourState.reduce((sum, unit) =>
      sum + Math.max(0, unit.initialCount - unit.count) * unit.trainingValue, 0);

    return {
      victory: enemiesDead() && !oursDead(),
      losses,
      rounds,
      logs
    };
  }

  function applyHealthCap(rows, counts) {
    const leadership = rows
      .map((row, index) => ({ row, index }))
      .filter((item) => item.row.category === 'leadership');
    const strongestOrdinary = leadership.reduce((max, item) =>
      Math.max(max, counts[item.index] * item.row.healthPerUnit), 0);

    const otherIndices = rows
      .map((row, index) => ({ row, index }))
      .filter((item) => item.row.category !== 'leadership');

    const adjustedHealth = () => otherIndices.reduce((sum, item) =>
      sum + counts[item.index] * item.row.healthPerUnit *
      (1 + Math.max(0, Number(item.row.enemyBonusTotal) || 0) / 100), 0);

    if (adjustedHealth() < strongestOrdinary) return counts;

    const factor = strongestOrdinary > 0
      ? Math.max(0, strongestOrdinary / adjustedHealth() * 0.98) : 0;
    otherIndices.forEach((item) => {
      const next = Math.floor(counts[item.index] * factor);
      counts[item.index] = next >= MIN_UNIT_COUNT ? next : 0;
    });

    if (adjustedHealth() >= strongestOrdinary) {
      otherIndices.forEach((item) => { counts[item.index] = 0; });
    }

    return counts;
  }

  function distributeCounts(rows, budgets, focusIndex, focusCount) {
    const counts = new Array(rows.length).fill(0);
    const categories = ['leadership', 'authority', 'dominance'];

    categories.forEach((category) => {
      const categoryItems = rows
        .map((row, index) => ({ row, index }))
        .filter((item) => item.row.category === category && item.row.cost > 0);
      if (!categoryItems.length) return;

      let remaining = Math.max(0, Number(budgets[category]) || 0);

      if (focusIndex >= 0 && focusIndex < rows.length &&
          rows[focusIndex].category === category) {
        const maxFocus = Math.floor(remaining / rows[focusIndex].cost);
        const value = Math.max(0, Math.min(focusCount, maxFocus));
        counts[focusIndex] = value;
        remaining -= value * rows[focusIndex].cost;
      }

      const others = categoryItems.filter((item) => item.index !== focusIndex);
      const weights = others.map((item) =>
        Math.max(1, item.row.damagePerUnit) / item.row.cost);
      const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);

      others.forEach((item, position) => {
        const share = Math.floor(remaining * weights[position] / totalWeight);
        const add = Math.floor(share / item.row.cost);
        if (add > 0) {
          counts[item.index] += add;
          remaining -= add * item.row.cost;
        }
      });

      const ordered = others.slice().sort((a, b) =>
        (b.row.damagePerUnit / b.row.cost) - (a.row.damagePerUnit / a.row.cost));
      ordered.forEach((item) => {
        if (remaining < item.row.cost) return;
        const add = Math.floor(remaining / item.row.cost);
        if (add > 0) {
          counts[item.index] += add;
          remaining -= add * item.row.cost;
        }
      });

      for (let i = 0; i < categoryItems.length; i += 1) {
        const index = categoryItems[i].index;
        if (counts[index] > 0 && counts[index] < MIN_UNIT_COUNT) {
          remaining += counts[index] * rows[index].cost;
          counts[index] = 0;
        }
      }

      if (remaining > 0) {
        const recipients = categoryItems
          .slice()
          .sort((a, b) =>
            (b.row.damagePerUnit / b.row.cost) - (a.row.damagePerUnit / a.row.cost));
        recipients.forEach((item) => {
          if (remaining < item.row.cost) return;
          const add = Math.floor(remaining / item.row.cost);
          if (add > 0) {
            counts[item.index] += add;
            remaining -= add * item.row.cost;
          }
        });
      }

      categoryItems.forEach((item) => {
        if (counts[item.index] > 0 && counts[item.index] < MIN_UNIT_COUNT) {
          counts[item.index] = 0;
        }
      });
    });

    return applyHealthCap(rows, counts);
  }

  function evaluate(counts, rows, enemies, siegeRow) {
    const trialRows = rows
      .map((row, index) => ({ ...row, count: counts[index] || 0 }))
      .filter((row) => row.count > 0);
    if (siegeRow) trialRows.push({ ...siegeRow });
    const oursFirst = simulate(trialRows, enemies, true);
    const enemyFirst = simulate(trialRows, enemies, false);
    const strongestOrdinary = trialRows
      .filter((row) => row.category === 'leadership')
      .reduce((max, row) => Math.max(max, row.count * row.healthPerUnit), 0);
    const otherHealth = trialRows
      .filter((row) => row.category !== 'leadership')
      .reduce((sum, row) => sum + row.count * row.healthPerUnit *
        (1 + Math.max(0, Number(row.enemyBonusTotal) || 0) / 100), 0);
    const healthOk = otherHealth < strongestOrdinary;
    const feasible = oursFirst.victory && enemyFirst.victory && healthOk;
    const maxLoss = Math.max(oursFirst.losses, enemyFirst.losses);
    const sumLoss = oursFirst.losses + enemyFirst.losses;
    const wins = (oursFirst.victory ? 1 : 0) + (enemyFirst.victory ? 1 : 0);
    return {
      counts: counts.slice(),
      oursFirst,
      enemyFirst,
      feasible,
      healthOk,
      wins,
      maxLoss,
      sumLoss
    };
  }

  function betterCandidate(candidate, best) {
    if (!best) return true;
    if (candidate.feasible !== best.feasible) return candidate.feasible;
    if (candidate.healthOk !== best.healthOk) return candidate.healthOk;
    if (candidate.wins !== best.wins) return candidate.wins > best.wins;
    if (candidate.maxLoss !== best.maxLoss) return candidate.maxLoss < best.maxLoss;
    if (candidate.sumLoss !== best.sumLoss) return candidate.sumLoss < best.sumLoss;
    return false;
  }

  function failPlan(settings, limits, rows, message) {
    const finalRows = finalizeRows(rows).filter((row) => row.count > 0);
    const usage = { leadership: 0, authority: 0, dominance: 0 };
    finalRows.forEach((row) => { usage[row.category] += row.spent; });
    return {
      settings,
      limits,
      usage,
      rows: finalRows,
      totalKills: finalRows.reduce((sum, row) => sum + row.kills, 0),
      totalDamage: finalRows.reduce((sum, row) => sum + row.totalDamage, 0),
      victory: false,
      rounds: 0,
      losses: 0,
      message
    };
  }

  async function buildPlanAsync(settings, enemies, analyzed, limits, onProgress, isCancelled) {
    const budgets = {
      leadership: Number.isSafeInteger(limits.leadership) && limits.leadership > 0
        ? limits.leadership : 0,
      authority: Number.isSafeInteger(limits.authority) && limits.authority > 0
        ? limits.authority : 0,
      dominance: Number.isSafeInteger(limits.dominance) && limits.dominance > 0
        ? limits.dominance : 0
    };

    const requirements = analyzed.map(siegeRequirement)
      .filter(Boolean)
      .sort((a, b) => a.min - b.min || a.row.cost - b.row.cost);
    const fortifications = enemies.filter((enemy) =>
      Array.isArray(enemy.types) && enemy.types.includes('fortifications'));
    let siegeRow = null;
    let siegeCount = 0;
    if (requirements.length) {
      siegeRow = { ...requirements[0].row, count: requirements[0].min };
      siegeCount = requirements[0].min;
    }
    const fortOk = fortifications.length === 0 ||
      Boolean(siegeRow && siegeCount >= requirements[0].min);
    if (fortifications.length && !fortOk) {
      return failPlan(settings, limits, siegeRow ? [siegeRow] : [], 'fortifications');
    }

    const catapultCost = siegeRow ? siegeRow.count * siegeRow.cost : 0;
    budgets.leadership -= catapultCost;
    if (budgets.leadership < 0) {
      return failPlan(settings, limits, siegeRow ? [siegeRow] : [], 'limit');
    }

    const hasFortifications = fortifications.length > 0;
    const searchRows = analyzed
      .filter((row) => (!hasFortifications ||
        !(Number(row.unit.fortificationStrengthMultiplier) > 1)) &&
        row.healthPerUnit > 0)
      .map((row) => ({
        ...row,
        count: 0,
        enemyBonusTotal: enemies.reduce((sum, enemy) =>
          sum + Math.max(0, enemyBonusAgainst(enemy, ourUnitTags(row))), 0)
      }));

    if (!searchRows.length) {
      const rows = siegeRow ? [siegeRow] : [];
      const plan = failPlan(settings, limits, rows, 'troops');
      if (fortOk && siegeRow && enemies.every((enemy) =>
        Array.isArray(enemy.types) && enemy.types.includes('fortifications'))) {
        plan.victory = true;
        plan.rounds = 1;
      }
      return plan;
    }

    const totalBudget = categoryOrder.reduce((sum, category) =>
      sum + Math.max(0, budgets[category] || 0), 0);
    if (totalBudget <= 0) {
      return failPlan(settings, limits, siegeRow ? [siegeRow] : [], 'limit');
    }

    const maxCounts = searchRows.map((row) => Math.max(0,
      Math.floor((budgets[row.category] || 0) / row.cost)));
    let checked = 0;
    let best = null;

    let coarseTotal = 1;
    maxCounts.forEach((max) => { coarseTotal += Math.floor(max / 100) + 1; });

    async function check(counts) {
      checked += 1;
      const candidate = evaluate(counts, searchRows, enemies, siegeRow);
      if (betterCandidate(candidate, best)) best = candidate;
      if (checked % 20 === 0) {
        if (onProgress) {
          onProgress({
            percent: Math.min(79, checked / coarseTotal * 79),
            bestLoss: best && best.feasible ? best.maxLoss : null
          });
        }
        await new Promise((resolve) => setTimeout(resolve, SEARCH_STEP_DELAY_MS));
        if (isCancelled && isCancelled()) return false;
      }
      return true;
    }

    const baseline = distributeCounts(searchRows, budgets, -1, 0);
    if (!(await check(baseline))) return null;

    for (let index = 0; index < searchRows.length; index += 1) {
      const max = maxCounts[index];
      for (let count = 0; count <= max; count += 100) {
        const counts = distributeCounts(searchRows, budgets, index, count);
        if (!(await check(counts))) return null;
      }
    }

    let bestCounts = best ? best.counts.slice() : baseline.slice();
    let refineTotal = 0;
    const refineRanges = searchRows.map((row, index) => {
      const start = Math.max(0, bestCounts[index] - 100);
      const end = Math.min(maxCounts[index], bestCounts[index] + 100);
      const values = [];
      for (let count = start; count <= end; count += 10) {
        if (count === 0 || count >= MIN_UNIT_COUNT) values.push(count);
      }
      refineTotal += values.length;
      return values;
    });

    for (let index = 0; index < searchRows.length; index += 1) {
      for (const count of refineRanges[index]) {
        checked += 1;
        const counts = distributeCounts(searchRows, budgets, index, count);
        const candidate = evaluate(counts, searchRows, enemies, siegeRow);
        if (betterCandidate(candidate, best)) {
          best = candidate;
          bestCounts = best.counts.slice();
        }
        if (checked % 20 === 0) {
          if (onProgress) {
            onProgress({
              percent: Math.min(100, 80 + ((checked - coarseTotal) / refineTotal) * 20),
              bestLoss: best && best.feasible ? best.maxLoss : null
            });
          }
          await new Promise((resolve) => setTimeout(resolve, SEARCH_STEP_DELAY_MS));
          if (isCancelled && isCancelled()) return null;
        }
      }
    }

    if (!best) return failPlan(settings, limits, siegeRow ? [siegeRow] : [], 'search');
    if (onProgress) {
      onProgress({
        percent: 100,
        bestLoss: best.feasible ? best.maxLoss : null
      });
    }
    await new Promise((resolve) => setTimeout(resolve, SEARCH_STEP_DELAY_MS));

    const searchResultRows = searchRows
      .map((row, index) => ({ ...row, count: best.counts[index] || 0 }))
      .filter((row) => row.count > 0);
    const rows = searchResultRows.slice();
    if (siegeRow) rows.push(siegeRow);
    const finalRows = finalizeRows(rows).filter((row) => row.count > 0);
    const usage = { leadership: 0, authority: 0, dominance: 0 };
    finalRows.forEach((row) => { usage[row.category] += row.spent; });

    const oursFirstLog = simulate(rows, enemies, true, true);
    const enemyFirstLog = simulate(rows, enemies, false, true);

    return {
      settings,
      limits,
      usage,
      rows: finalRows,
      totalKills: finalRows.reduce((sum, row) => sum + row.kills, 0),
      totalDamage: finalRows.reduce((sum, row) => sum + row.totalDamage, 0),
      victory: best.feasible && fortOk,
      rounds: Math.max(best.oursFirst.rounds, best.enemyFirst.rounds),
      losses: best.maxLoss,
      lossesOursFirst: best.oursFirst.losses,
      lossesEnemyFirst: best.enemyFirst.losses,
      logs: {
        oursFirst: {
          victory: oursFirstLog.victory,
          losses: oursFirstLog.losses,
          rounds: oursFirstLog.rounds,
          entries: oursFirstLog.logs
        },
        enemyFirst: {
          victory: enemyFirstLog.victory,
          losses: enemyFirstLog.losses,
          rounds: enemyFirstLog.rounds,
          entries: enemyFirstLog.logs
        }
      }
    };
  }

  function renderEnemyOrder(plan, tbody) {
    if (tbody) tbody.innerHTML = '';
  }

  return {
    buildPlanAsync,
    renderEnemyOrder
  };
})();
