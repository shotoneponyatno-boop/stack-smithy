const strangeMode = (() => {
  'use strict';

  const INFINITE_ENEMY_QUANTITY = 1e15;
  const SEARCH_STEP_DELAY_MS = 0;
  const RESULT_PREVIEW_DELAY_MS = 100;
  const DEBUG_STACKS = true;
  const categoryOrder = ['leadership', 'authority', 'dominance'];

  function unitReplacementValue(unit) {
    const revival = (unit && unit.revivalCost) || {};
    return Math.max(0, Number(revival.gold) || 0);
  }

  function damagePerGold(damage, losses) {
    if (!(losses > 0)) return damage > 0 ? Infinity : 0;
    return damage / losses;
  }

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
          replacementValue: unitReplacementValue(row.unit),
          healthLost: 0,
          damageDealt: 0,
          attacks: 0,
          maxShortfall: 0
        };
      });
    const logs = [];

    if (!enemyState.some((enemy) => enemy.health > 0 && enemy.healthPerUnit > 0)) {
      return {
        victory: ourState.length > 0, losses: 0, damageDealt: 0, rounds: 0, logs, units: []
      };
    }
    if (!ourState.length) {
      return {
        victory: false, losses: 0, damageDealt: 0, rounds: 0, logs, units: []
      };
    }

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
        const damage = Math.min(unit.count * value, target.health);
        unit.damageDealt += damage;
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
      unit.attacks += 1;
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
        if (value <= 0) return;
        const raw = unit.count * value;
        const effective = Math.min(raw, enemy.health);
        if (!target || effective > target.effective + 1e-9 ||
            (Math.abs(effective - target.effective) <= 1e-9 &&
             raw > target.raw + 1e-9)) {
          target = { enemy, value, raw, effective };
        }
      });
      if (!target || target.value <= 0) return;

      const needed = Math.max(1, Math.ceil(target.enemy.health / target.value));
      const shortfall = Math.max(0, needed - unit.count);
      if (shortfall > unit.maxShortfall) unit.maxShortfall = shortfall;

      const damage = target.effective;
      unit.damageDealt += damage;
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
        const raw = enemy.count * enemy.damagePerUnit *
          Math.max(0, 1 + bonus / 100);
        if (raw <= 0) return;
        const effective = Math.min(raw, unit.health);
        if (!target || effective > target.effective + 1e-9 ||
            (Math.abs(effective - target.effective) <= 1e-9 &&
             (raw > target.raw + 1e-9 ||
              (Math.abs(raw - target.raw) <= 1e-9 &&
               unit.health > target.unit.health)))) {
          target = { unit, raw, effective };
        }
      });
      if (!target) return;

      const before = target.unit.count;
      const beforeHealth = target.unit.health;
      const damage = Math.min(target.raw, beforeHealth);
      target.unit.health = Math.max(0, beforeHealth - damage);
      target.unit.healthLost += damage;
      target.unit.count = target.unit.health > 0
        ? Math.ceil(target.unit.health / target.unit.healthPerUnit) : 0;
      if (collectLog) {
        logs.push({
          round: turn,
          side: 'enemy',
          attacker: enemy.name,
          target: target.unit.row.name,
          damage,
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
      sum + Math.max(0, unit.initialCount - unit.count) * unit.replacementValue, 0);
    const damageDealt = ourState.reduce((sum, unit) => sum + unit.damageDealt, 0);
    const units = ourState.map((unit) => ({
      id: unit.row.unit && unit.row.unit.id,
      name: unit.row.name,
      initialCount: unit.initialCount,
      remaining: unit.count,
      attacks: unit.attacks,
      shortfall: unit.maxShortfall
    }));

    return {
      victory: enemiesDead() && !oursDead(),
      losses,
      damageDealt,
      rounds,
      logs,
      units
    };
  }

  function attackedNames(...results) {
    const names = new Set();
    results.forEach((result) => {
      (result && Array.isArray(result.logs) ? result.logs : []).forEach((entry) => {
        if (entry && entry.side === 'enemy' && entry.target) {
          names.add(entry.target);
        }
      });
    });
    return names;
  }

  function distributeCounts(rows, budgets, focusIndex, focusCount) {
    const counts = new Array(rows.length).fill(0);
    const categories = ['leadership', 'authority', 'dominance'];

    categories.forEach((category) => {
      const categoryItems = rows
        .map((row, index) => ({ row, index }))
        .filter((item) => item.row.category === category && item.row.cost > 0);
      if (!categoryItems.length) return;

      const focusInCategory = focusIndex >= 0 && focusIndex < rows.length &&
        rows[focusIndex].category === category;

      let remaining = Math.max(0, Number(budgets[category]) || 0);

      if (focusInCategory) {
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
    });

    return counts;
  }

  function maxRowCount(rows, counts, budgets, index) {
    const row = rows[index];
    const othersSpent = rows.reduce((sum, other, otherIndex) => {
      if (otherIndex === index || other.category !== row.category) return sum;
      return sum + Math.max(0, counts[otherIndex] || 0) * other.cost;
    }, 0);
    const available = Math.max(0, (budgets[row.category] || 0) - othersSpent);
    return Math.max(0, Math.floor(available / row.cost));
  }

  function evaluate(counts, rows, enemies, siegeRow) {
    const trialRows = rows
      .map((row, index) => ({ ...row, count: counts[index] || 0 }))
      .filter((row) => row.count > 0);
    if (siegeRow) trialRows.push({ ...siegeRow });
    const enemyFirst = simulate(trialRows, enemies, false);
    const feasible = enemyFirst.victory;
    const totalUnits = counts.reduce((sum, count) =>
      sum + Math.max(0, Number(count) || 0), 0);
    return {
      counts: counts.slice(),
      enemyFirst,
      feasible,
      losses: enemyFirst.losses,
      damageDealt: enemyFirst.damageDealt,
      efficiency: damagePerGold(enemyFirst.damageDealt, enemyFirst.losses),
      rounds: enemyFirst.rounds,
      totalUnits
    };
  }

  function betterCandidate(candidate, best) {
    if (!best) return true;
    if (candidate.feasible !== best.feasible) return candidate.feasible;
    if (Math.abs(candidate.losses - best.losses) > 1e-9) {
      return candidate.losses < best.losses;
    }
    return candidate.totalUnits < best.totalUnits;
  }

  function trimLeadershipCounts(rows, counts, enemies, siegeRow, maxLosses) {
    const trimmed = counts.slice();
    const feasible = (trial) => {
      const result = evaluate(trial, rows, enemies, siegeRow);
      return result.feasible && result.losses <= maxLosses + 1e-9;
    };

    for (let pass = 0; pass < 3; pass += 1) {
      let changed = false;
      rows.forEach((row, index) => {
        if (row.category !== 'leadership') return;
        const original = trimmed[index];
        if (!(original > 0)) return;

        let low = 0;
        let high = original;
        while (low < high) {
          const mid = Math.floor((low + high) / 2);
          const trial = trimmed.slice();
          trial[index] = mid;
          if (feasible(trial)) high = mid;
          else low = mid + 1;
        }

        if (low < original) {
          const trial = trimmed.slice();
          trial[index] = low;
          if (feasible(trial)) {
            trimmed[index] = low;
            changed = true;
          }
        }
      });
      if (!changed) break;
    }

    return trimmed;
  }

  function reserveKillCounts(rows, trimmed, original, enemies, siegeRow) {
    const counts = trimmed.slice();
    const indexById = new Map();
    rows.forEach((row, index) => {
      if (row.unit && row.unit.id) indexById.set(row.unit.id, index);
    });

    for (let pass = 0; pass < 4; pass += 1) {
      const trialRows = rows
        .map((row, index) => ({ ...row, count: counts[index] || 0 }))
        .filter((row) => row.count > 0);
      if (siegeRow) trialRows.push({ ...siegeRow });
      const result = simulate(trialRows, enemies, false, false);
      if (!Array.isArray(result.units)) break;

      let changed = false;
      result.units.forEach((unit) => {
        if (!unit || !unit.id || !(unit.shortfall > 0)) return;
        const index = indexById.get(unit.id);
        if (index === undefined) return;
        const cap = Number.isFinite(original[index]) ? original[index] : counts[index];
        const next = Math.min(cap, counts[index] + Math.ceil(unit.shortfall));
        if (next > counts[index]) {
          counts[index] = next;
          changed = true;
        }
      });
      if (!changed) break;
    }

    return counts;
  }

  function addLeadershipBuffer(rows, counts, budgets) {
    const buffered = counts.slice();
    const leadership = rows
      .map((row, index) => ({ row, index }))
      .filter((item) => item.row.category === 'leadership' && item.row.cost > 0);
    const spent = leadership.reduce((sum, item) =>
      sum + Math.max(0, counts[item.index] || 0) * item.row.cost, 0);
    let slack = Math.max(0, Number(budgets.leadership) || 0) - spent;
    if (slack <= 0) return buffered;

    leadership.forEach((item) => {
      const count = Math.max(0, counts[item.index] || 0);
      if (count <= 0) return;
      const extra = Math.ceil(count * 0.05);
      if (extra <= 0) return;
      const allowed = Math.min(extra, Math.floor(slack / item.row.cost));
      if (allowed <= 0) return;
      buffered[item.index] = count + allowed;
      slack -= allowed * item.row.cost;
    });

    return buffered;
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

  async function buildPlanAsync(
    settings, enemies, analyzed, limits, onProgress, isCancelled, onPreview
  ) {
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
      .map((row) => ({ ...row, count: 0 }))
      .sort((a, b) => {
        const categoryRank = { dominance: 0, authority: 1, leadership: 2 };
        const rankA = categoryRank[a.category] ?? 3;
        const rankB = categoryRank[b.category] ?? 3;
        if (rankA !== rankB) return rankA - rankB;
        return (Number(b.unit && b.unit.tier) || 0) -
          (Number(a.unit && a.unit.tier) || 0);
      });

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

    let checked = 0;
    let best = null;

    function progressStacks(counts) {
      const stacks = [];
      if (siegeRow) stacks.push({ name: siegeRow.name, count: siegeRow.count || 0 });
      searchRows.forEach((row, index) => {
        stacks.push({ name: row.name, count: Math.max(0, counts[index] || 0) });
      });
      return stacks;
    }

    let lastPreviewAt = 0;

    function buildPreview(counts) {
      const previewRows = searchRows
        .map((row, index) => ({ ...row, count: counts[index] || 0 }))
        .filter((row) => row.count > 0);
      if (siegeRow) previewRows.push(siegeRow);
      const finalRows = finalizeRows(previewRows).filter((row) => row.count > 0);
      const usage = { leadership: 0, authority: 0, dominance: 0 };
      finalRows.forEach((row) => { usage[row.category] += row.spent; });
      const oursFirstLog = simulate(previewRows, enemies, true, true);
      const enemyFirstLog = simulate(previewRows, enemies, false, true);
      return {
        settings,
        limits,
        usage,
        rows: finalRows,
        totalKills: finalRows.reduce((sum, row) => sum + row.kills, 0),
        totalDamage: finalRows.reduce((sum, row) => sum + row.totalDamage, 0),
        victory: fortOk && enemyFirstLog.victory,
        rounds: enemyFirstLog.rounds,
        losses: enemyFirstLog.losses,
        lossesOursFirst: oursFirstLog.losses,
        lossesEnemyFirst: enemyFirstLog.losses,
        damageDealt: enemyFirstLog.damageDealt,
        damagePerGold: damagePerGold(enemyFirstLog.damageDealt, enemyFirstLog.losses),
        logs: {
          oursFirst: {
            victory: oursFirstLog.victory,
            losses: oursFirstLog.losses,
            damageDealt: oursFirstLog.damageDealt,
            rounds: oursFirstLog.rounds,
            entries: oursFirstLog.logs
          },
          enemyFirst: {
            victory: enemyFirstLog.victory,
            losses: enemyFirstLog.losses,
            damageDealt: enemyFirstLog.damageDealt,
            rounds: enemyFirstLog.rounds,
            entries: enemyFirstLog.logs
          }
        }
      };
    }

    function maybePreview() {
      if (!onPreview || !best) return;
      if (!best.counts.some((count) => (Number(count) || 0) > 0)) return;
      const now = Date.now();
      if (now - lastPreviewAt < RESULT_PREVIEW_DELAY_MS) return;
      lastPreviewAt = now;
      onPreview(buildPreview(best.counts));
    }

    const baselineCounts = distributeCounts(searchRows, budgets, -1, 0);

    const searchRowCount = searchRows.length;
    const totalSubsetWeight = Math.max(1,
      5 * searchRowCount * Math.pow(2, Math.max(0, searchRowCount - 1)) +
      (Math.pow(2, searchRowCount) - 1));
    let completedSubsetWeight = 0;

    async function test(trial) {
      if (isCancelled && isCancelled()) return null;
      checked += 1;
      const candidate = evaluate(trial, searchRows, enemies, siegeRow);
      const improved = betterCandidate(candidate, best);
      if (improved) {
        best = candidate;
        maybePreview();
      }
      if (DEBUG_STACKS && window.console && typeof console.log === 'function') {
        const stacks = [];
        if (siegeRow) stacks.push({ name: siegeRow.name, count: siegeRow.count || 0 });
        searchRows.forEach((row, index) => {
          stacks.push({ name: row.name, count: Math.max(0, trial[index] || 0) });
        });
        const bestStacks = [];
        if (best) {
          if (siegeRow) bestStacks.push({ name: siegeRow.name, count: siegeRow.count || 0 });
          searchRows.forEach((row, index) => {
            bestStacks.push({ name: row.name, count: Math.max(0, best.counts[index] || 0) });
          });
        }
        console.log('[DoctorStrange] stack check', {
          check: checked,
          counts: trial.slice(),
          stacks,
          losses: candidate.losses,
          victory: candidate.enemyFirst.victory,
          feasible: candidate.feasible,
          damageDealt: candidate.damageDealt,
          rounds: candidate.rounds,
          improved,
          bestLosses: best ? best.losses : null,
          bestStacks
        });
      }
      if (checked % 20 === 0) {
        if (onProgress) {
          onProgress({
            percent: Math.min(99,
              completedSubsetWeight / totalSubsetWeight * 99),
            bestLoss: best && best.feasible ? best.losses : null,
            stacks: progressStacks(trial)
          });
        }
        maybePreview();
        await new Promise((resolve) => setTimeout(resolve, SEARCH_STEP_DELAY_MS));
        if (isCancelled && isCancelled()) return null;
      }
      return candidate;
    }

    async function searchSubset(selected) {
      const counts = new Array(searchRows.length).fill(0);
      const spent = { leadership: 0, authority: 0, dominance: 0 };

      for (const index of selected) {
        const row = searchRows[index];
        const cost = Number(row.cost);
        if (!(cost > 0)) continue;
        const max = maxRowCount(searchRows, counts, budgets, index);
        counts[index] = max;
        spent[row.category] += max * cost;
      }

      const initial = await test(counts);
      if (!initial) return false;

      for (const index of selected) {
        const row = searchRows[index];
        const cost = Number(row.cost);
        if (!(cost > 0)) continue;

        const current = counts[index] || 0;
        const highMax = maxRowCount(searchRows, counts, budgets, index);
        let high = Math.max(current, highMax);
        let low = 0;
        let localBest = evaluate(counts, searchRows, enemies, siegeRow);

        if (high > current) {
          const trial = counts.slice();
          trial[index] = high;
          const candidate = await test(trial);
          if (!candidate) return false;
          if (betterCandidate(candidate, localBest)) {
            localBest = candidate;
            counts[index] = high;
          }
        }

        while (high - low > 1) {
          const mid = Math.floor((low + high) / 2);
          if (mid === low || mid === high) break;

          const trial = counts.slice();
          trial[index] = mid;
          const candidate = await test(trial);
          if (!candidate) return false;

          if (betterCandidate(candidate, localBest)) {
            localBest = candidate;
            counts[index] = mid;
            high = mid;
          } else {
            low = mid;
          }
        }
      }
      return true;
    }

    async function enumerateSubsets(start, remaining, selected) {
      if (remaining === 0) {
        const weight = selected.length * 5 + 1;
        const ok = await searchSubset(selected);
        completedSubsetWeight += weight;
        return ok;
      }

      for (let index = start; index <= searchRows.length - remaining; index += 1) {
        selected.push(index);
        const ok = await enumerateSubsets(index + 1, remaining - 1, selected);
        selected.pop();
        if (!ok) return false;
      }
      return true;
    }

    for (let size = 1; size <= searchRows.length; size += 1) {
      if (!(await enumerateSubsets(0, size, []))) return null;
    }

    const baselineCandidate = await test(baselineCounts);
    if (!baselineCandidate) return null;

    if (!best) return failPlan(settings, limits, siegeRow ? [siegeRow] : [], 'search');

    if (best.feasible) {
      const originalCounts = best.counts.slice();
      const minimalCounts = trimLeadershipCounts(
        searchRows, best.counts, enemies, siegeRow, best.losses
      );
      const reservedCounts = reserveKillCounts(
        searchRows, minimalCounts, originalCounts, enemies, siegeRow
      );
      const bufferedCounts = addLeadershipBuffer(searchRows, reservedCounts, budgets);
      let chosen = evaluate(bufferedCounts, searchRows, enemies, siegeRow);
      if (chosen.feasible) {
        best.counts = bufferedCounts;
      } else {
        chosen = evaluate(reservedCounts, searchRows, enemies, siegeRow);
        best.counts = reservedCounts;
        if (!chosen.feasible) {
          chosen = evaluate(minimalCounts, searchRows, enemies, siegeRow);
          best.counts = minimalCounts;
        }
      }
      best.feasible = chosen.feasible;
      best.losses = chosen.losses;
      best.damageDealt = chosen.damageDealt;
      best.efficiency = chosen.efficiency;
      best.rounds = chosen.rounds;
    }

    if (onProgress) {
      onProgress({
        percent: 100,
        bestLoss: best.feasible ? best.losses : null,
        stacks: progressStacks(best.counts)
      });
    }
    await new Promise((resolve) => setTimeout(resolve, SEARCH_STEP_DELAY_MS));

    const searchResultRows = searchRows
      .map((row, index) => ({ ...row, count: best.counts[index] || 0 }))
      .filter((row) => row.count > 0);
    let rows = searchResultRows.slice();
    if (siegeRow) rows.push(siegeRow);

    let oursFirstLog = simulate(rows, enemies, true, true);
    let enemyFirstLog = simulate(rows, enemies, false, true);

    for (let pass = 0; pass < 5; pass += 1) {
      const attacked = attackedNames(oursFirstLog, enemyFirstLog);
      const cleanedRows = rows.filter((row) =>
        row === siegeRow || attacked.has(row.name));
      if (!cleanedRows.length || cleanedRows.length >= rows.length) break;

      const cleanedOursFirst = simulate(cleanedRows, enemies, true, true);
      const cleanedEnemyFirst = simulate(cleanedRows, enemies, false, true);
      if (!cleanedEnemyFirst.victory) break;

      rows = cleanedRows;
      oursFirstLog = cleanedOursFirst;
      enemyFirstLog = cleanedEnemyFirst;
    }

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
      victory: fortOk && enemyFirstLog.victory,
      rounds: enemyFirstLog.rounds,
      losses: enemyFirstLog.losses,
      lossesOursFirst: oursFirstLog.losses,
      lossesEnemyFirst: enemyFirstLog.losses,
      damageDealt: enemyFirstLog.damageDealt,
      damagePerGold: damagePerGold(enemyFirstLog.damageDealt, enemyFirstLog.losses),
      logs: {
        oursFirst: {
          victory: oursFirstLog.victory,
          losses: oursFirstLog.losses,
          damageDealt: oursFirstLog.damageDealt,
          rounds: oursFirstLog.rounds,
          entries: oursFirstLog.logs
        },
        enemyFirst: {
          victory: enemyFirstLog.victory,
          losses: enemyFirstLog.losses,
          damageDealt: enemyFirstLog.damageDealt,
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
