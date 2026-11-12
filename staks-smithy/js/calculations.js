const finalCalculations = (() => {
  'use strict';

  const section = document.querySelector('.final-calculations');
  const modeEl = document.getElementById('finalCalculationsMode');
  const rowsEl = document.getElementById('finalCalculationRows');
  const emptyEl = document.getElementById('finalCalculationEmpty');
  const tableWrap = document.getElementById('finalCalculationTableWrap');
  const summaryEl = document.getElementById('finalCalculationSummary');
  const inlineEl = document.getElementById('finalCalculationInline');
  const inlineWrap = document.getElementById('finalCalculationInlineWrap');
  const inlineLayoutToggle = document.getElementById('finalInlineLayoutToggle');
  const minimalToggle = document.getElementById('finalResultMinimal');
  const enemyOrderEl = document.getElementById('finalEnemyOrder');
  const enemyOrderRowsEl = document.getElementById('finalEnemyOrderRows');
  const searchProgressEl = document.getElementById('finalSearchProgress');
  const searchBarEl = document.getElementById('finalSearchBar');
  const searchPercentEl = document.getElementById('finalSearchPercent');
  const searchBestEl = document.getElementById('finalSearchBest');
  const battleLogEl = document.getElementById('finalBattleLog');
  const battleOursRows = document.getElementById('finalBattleOursRows');
  const battleEnemyRows = document.getElementById('finalBattleEnemyRows');
  const battleOursMeta = document.getElementById('finalBattleOursMeta');
  const battleEnemyMeta = document.getElementById('finalBattleEnemyMeta');

  if (!section || !modeEl || !rowsEl || !emptyEl || !tableWrap || !summaryEl ||
      !inlineEl || !inlineWrap || !inlineLayoutToggle || !minimalToggle ||
      !enemyOrderEl || !enemyOrderRowsEl || !searchProgressEl || !searchBarEl ||
      !searchPercentEl || !searchBestEl || !battleLogEl || !battleOursRows ||
      !battleEnemyRows || !battleOursMeta || !battleEnemyMeta) return null;

  const RESULT_VIEW_KEY = 'finalResultView';
  const INFINITE_ENEMY_QUANTITY = 1e15;
  let hasResult = false;
  let hasEnemyOrder = false;
  let inlineColumn = false;
  let renderToken = 0;

  const cards = {
    leadership: section.querySelector('[data-capacity="leadership"]'),
    authority: section.querySelector('[data-capacity="authority"]'),
    dominance: section.querySelector('[data-capacity="dominance"]')
  };
  const categoryOrder = ['leadership', 'authority', 'dominance'];
  const modeLabels = {
    maxDamage: 'settings.maxDamage',
    doctorStrange: 'settings.doctorStrange',
    damagePerSilver: 'settings.damagePerSilver'
  };
  const enemyTypeLabels = {
    melee: 'report.class.melee',
    ranged: 'report.class.ranged',
    mounted: 'report.class.mounted',
    flying: 'report.class.flying',
    engineers: 'cat.engineers',
    guardsmen: 'cat.guardsmen',
    specialist: 'cat.specialists',
    monsters: 'cat.monsters',
    mercenaries: 'merc.popTitle',
    humans: 'enemy.humans',
    beasts: 'type.beast',
    dragons: 'type.dragon',
    giants: 'type.giant',
    elementals: 'type.elemental',
    fortifications: 'enemy.fortifications',
    epicMonsters: 'enemy.epicMonsters'
  };
  const escape = I18N.escapeHtml;

  function getSettings() {
    if (typeof calculationSettings === 'undefined' || !calculationSettings) return null;
    return calculationSettings.getSettings();
  }

  function getSelected(picker) {
    try {
      return picker && typeof picker.getSelected === 'function' ? picker.getSelected() : [];
    } catch (e) {
      return [];
    }
  }

  function getEnemies() {
    if (typeof enemyManager === 'undefined' || !enemyManager) return [];
    try {
      return enemyManager.getEnemies();
    } catch (e) {
      return [];
    }
  }

  function formatInt(value) {
    const number = Number(value);
    if (!Number.isFinite(number)) return '0';
    try {
      return new Intl.NumberFormat(I18N.lang || undefined, { maximumFractionDigits: 0 })
        .format(Math.round(number));
    } catch (e) {
      return String(Math.round(number));
    }
  }

  function formatDecimal(value) {
    const number = Number(value);
    if (!Number.isFinite(number)) return '0';
    try {
      return new Intl.NumberFormat(I18N.lang || undefined, { maximumFractionDigits: 1 })
        .format(number);
    } catch (e) {
      return String(number);
    }
  }

  function formatPercent(value) {
    return `${formatDecimal(value)}%`;
  }

  function applyResultView(minimal) {
    minimalToggle.checked = minimal;
    tableWrap.hidden = !hasResult || minimal;
    inlineWrap.hidden = !hasResult || !minimal;
    enemyOrderEl.hidden = !hasEnemyOrder;
  }

  function applyInlineLayout(column) {
    inlineColumn = column;
    inlineEl.classList.toggle('is-column', column);
    const key = column ? 'calc.inlineLayout' : 'calc.columnLayout';
    inlineLayoutToggle.title = I18N.t(key);
    inlineLayoutToggle.setAttribute('aria-label', I18N.t(key));
    inlineLayoutToggle.querySelector('.material-symbols-outlined').textContent =
      column ? 'wrap_text' : 'view_list';
  }

  function saveResultView() {
    try {
      StorageManager.save(RESULT_VIEW_KEY, {
        minimal: minimalToggle.checked,
        inlineColumn
      });
    } catch (e) { }
  }

  function loadResultView() {
    try {
      const state = StorageManager.load(RESULT_VIEW_KEY);
      applyInlineLayout(Boolean(state && state.inlineColumn));
      applyResultView(!state || state.minimal !== false);
    } catch (e) {
      applyInlineLayout(false);
      applyResultView(true);
    }
  }

  function setSearchVisible(visible) {
    searchProgressEl.hidden = !visible;
    if (!visible) return;
    searchBarEl.style.width = '0%';
    searchPercentEl.textContent = '0%';
    searchBestEl.textContent = '';
  }

  function updateSearchProgress(progress) {
    const percent = Math.max(0, Math.min(100, Number(progress && progress.percent) || 0));
    searchBarEl.style.width = `${percent}%`;
    searchPercentEl.textContent = `${Math.round(percent)}%`;
    searchBestEl.textContent = progress && Number.isFinite(progress.bestLoss)
      ? I18N.t('calc.searchBest', { value: formatInt(progress.bestLoss) })
      : '';
  }

  function toRoman(value) {
    let n = Number(value);
    if (!Number.isFinite(n) || n <= 0) return '';
    const map = [[10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']];
    let out = '';
    map.forEach(([amount, symbol]) => {
      while (n >= amount) {
        out += symbol;
        n -= amount;
      }
    });
    return out;
  }

  function baseName(unit) {
    return String(unit.name).replace(/\s+\d+$/, '');
  }

  function troopKey(name) {
    return String(name).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  }

  function dictionary() {
    return I18N.STRINGS && I18N.STRINGS[I18N.lang] || {};
  }

  function unitName(entry) {
    const dict = dictionary();
    let name = baseName(entry.unit);
    let key;

    if (entry.selection === 'mercenaries') {
      key = `merc.item.${String(entry.unit.id).replace(/-\d+$/, '')}`;
    } else {
      key = `troop.${troopKey(name)}`;
    }
    name = dict[key] || name;

    if (entry.category !== 'authority') {
      const numeral = toRoman(entry.unit.tier);
      if (numeral) name = `${name} ${numeral}`;
    }

    return name;
  }

  function classLabel(value) {
    return I18N.t(value === 'engineer' || value === 'engineers'
      ? 'report.class.engineer' : `report.class.${value}`);
  }

  function unitMeta(entry) {
    if (entry.category === 'leadership') {
      const groupKey = entry.unit.group === 'specialist'
        ? 'cat.specialists' : entry.unit.group === 'engineers'
          ? 'cat.engineers' : 'cat.guardsmen';
      return `${I18N.t(groupKey)} · ${classLabel(entry.unit.category)}`;
    }
    if (entry.category === 'authority') {
      return `${I18N.t('cat.monsters')} · ${classLabel(entry.unit.category)}`;
    }
    const tag = ['melee', 'ranged', 'mounted', 'flying', 'engineers']
      .find((value) => Array.isArray(entry.unit.tags) && entry.unit.tags.includes(value));
    return tag ? `${I18N.t('merc.popTitle')} · ${classLabel(tag)}` : I18N.t('merc.popTitle');
  }

  function enemyName(enemy, index) {
    const name = typeof enemy.name === 'string' ? enemy.name.trim() : '';
    return name || I18N.t('enemy.defaultName', { n: index + 1 });
  }

  function enemyTypeLabel(type) {
    return I18N.t(enemyTypeLabels[type] || type);
  }

  function unitCost(value) {
    const cost = Number(value);
    return Number.isFinite(cost) && cost > 0 ? cost : 1;
  }

  function makeEntry(unit, selection, category, cost) {
    return { unit, selection, category, cost: unitCost(cost) };
  }

  function selectedEntries() {
    const troops = new Set(getSelected(typeof troopPicker === 'undefined' ? null : troopPicker));
    const mercenaries = new Set(getSelected(typeof mercenaryPicker === 'undefined' ? null : mercenaryPicker));
    const entries = [];

    troopData.forEach((unit) => {
      if (troops.has(unit.id)) {
        entries.push(makeEntry(unit, 'troops', 'leadership', unit.leadershipCost));
      }
    });
    monstersData.forEach((unit) => {
      if (troops.has(unit.id)) {
        entries.push(makeEntry(unit, 'troops', 'authority', unit.dominanceCost));
      }
    });
    mercenariesData.forEach((unit) => {
      if (mercenaries.has(unit.id)) {
        entries.push(makeEntry(unit, 'mercenaries', 'dominance', unit.authorityCost));
      }
    });

    return entries;
  }

  function reportBonuses(unit, selection) {
    if (typeof battleReport === 'undefined' || !battleReport ||
        typeof battleReport.getBonuses !== 'function') {
      return { strength: 0, health: 0 };
    }
    const bonuses = battleReport.getBonuses(unit.id, selection);
    const strength = Number(bonuses && bonuses.strength);
    const health = Number(bonuses && bonuses.health);
    return {
      strength: Number.isFinite(strength) ? strength : 0,
      health: Number.isFinite(health) ? health : 0
    };
  }

  function enemyQuantity(enemy) {
    const quantity = Number(enemy.quantity);
    return enemy.quantity !== null && enemy.quantity !== undefined &&
      Number.isFinite(quantity) && quantity > 0
      ? quantity : INFINITE_ENEMY_QUANTITY;
  }

  function analyzeEntry(entry, enemies) {
    const bonuses = reportBonuses(entry.unit, entry.selection);
    const baseStrength = Math.max(0, Number(entry.unit.strength) || 0);
    const baseHealth = Math.max(0, Number(entry.unit.health) || 0);
    const battleMultiplier = Math.max(0, Number(entry.unit.playerBattleStrengthMultiplier) || 1);

    const branches = enemies.map((enemy, index) => {
      let matching = 0;
      (enemy.types || []).forEach((type) => {
        const value = Number(entry.unit.strengthAgainst && entry.unit.strengthAgainst[type]);
        if (Number.isFinite(value)) matching += value;
      });
      const percent = bonuses.strength + matching;
      const fortificationMultiplier = Number(
        entry.unit.fortificationStrengthMultiplier
      );
      const siegeBonus = Number.isFinite(fortificationMultiplier) &&
        fortificationMultiplier > 1 &&
        Array.isArray(enemy.types) && enemy.types.includes('fortifications')
        ? fortificationMultiplier : 1;
      const damage = baseStrength * battleMultiplier *
        Math.max(0, 1 + percent / 100) * siegeBonus;
      const enemyHealth = Math.max(0, Number(enemy.health) || 0);
      const effectiveQuantity = enemyQuantity(enemy);
      return {
        enemy,
        enemyIndex: index,
        enemyName: enemyName(enemy, index),
        percent,
        damage,
        totalHealth: enemyHealth * effectiveQuantity,
        maxKills: effectiveQuantity,
        unitsPerKill: damage > 0 ? enemyHealth / damage : Infinity
      };
    });

    const fortificationTargets = Number(entry.unit.fortificationStrengthMultiplier) > 1
      ? branches.filter((branch) => Array.isArray(branch.enemy.types) &&
        branch.enemy.types.includes('fortifications'))
      : [];
    const targetPool = fortificationTargets.length ? fortificationTargets : branches;
    const target = targetPool.reduce((best, branch) => {
      if (!best) return branch;
      if (branch.totalHealth !== best.totalHealth) {
        return branch.totalHealth > best.totalHealth ? branch : best;
      }
      const damageDiff = branch.damage - best.damage;
      if (Math.abs(damageDiff) > 1e-9) return damageDiff > 0 ? branch : best;
      return best;
    }, null);
    const seenTypes = new Map();
    enemies.forEach((enemy) => {
      (enemy.types || []).forEach((type) => {
        if (seenTypes.has(type)) return;
        const value = Number(entry.unit.strengthAgainst && entry.unit.strengthAgainst[type]);
        seenTypes.set(type, bonuses.strength + (Number.isFinite(value) ? value : 0));
      });
    });

    return {
      ...entry,
      name: unitName(entry),
      meta: unitMeta(entry),
      branches,
      typeBranches: [...seenTypes.entries()].map(([type, percent]) => ({ type, percent })),
      target,
      percent: target ? target.percent : 0,
      damagePerUnit: target ? target.damage : 0,
      unitsPerKill: target ? target.unitsPerKill : Infinity,
      maxKills: target ? target.maxKills : Infinity,
      healthPerUnit: baseHealth * Math.max(0, 1 + bonuses.health / 100)
    };
  }

  function compareDamage(a, b) {
    const totalA = Math.max(0, a.count || 0) * Math.max(0, a.damagePerUnit || 0);
    const totalB = Math.max(0, b.count || 0) * Math.max(0, b.damagePerUnit || 0);
    if (totalA !== totalB) return totalA - totalB;
    if (a.damagePerUnit !== b.damagePerUnit) return a.damagePerUnit - b.damagePerUnit;
    if (a.unit.tier !== b.unit.tier) return a.unit.tier - b.unit.tier;
    return a.name.localeCompare(b.name, I18N.lang);
  }

  function baseDamage(row) {
    return Math.max(0, Number(row.unit.strength) || 0);
  }

  function compareDisplay(a, b) {
    const order = { dominance: 0, authority: 1, leadership: 2 };
    if (order[a.category] !== order[b.category]) return order[a.category] - order[b.category];
    if (baseDamage(a) !== baseDamage(b)) return baseDamage(b) - baseDamage(a);
    if (a.unit.tier !== b.unit.tier) return a.unit.tier - b.unit.tier;
    return a.name.localeCompare(b.name, I18N.lang);
  }

  function finalizeUnits(units) {
    return units.map((entry) => refreshRow(entry));
  }

  function refreshRow(entry) {
    const count = Math.max(0, Math.floor(entry.count || 0));
    const kills = entry.unitsPerKill > 0 && Number.isFinite(entry.unitsPerKill)
      ? Math.min(entry.maxKills, Math.floor(count / entry.unitsPerKill + 1e-9)) : 0;
    entry.count = count;
    entry.spent = count * entry.cost;
    entry.totalHealth = count * entry.healthPerUnit;
    entry.totalDamage = count * entry.damagePerUnit;
    entry.kills = kills;
    return entry;
  }

  function balanceHealth(rows, limits) {
    let ceiling = Infinity;

    rows.forEach((row) => {
      if (row.count <= 0 || row.totalHealth <= 0) return;
      if (row.totalHealth > ceiling) {
        const maxCount = row.healthPerUnit > 0
          ? Math.floor(ceiling / row.healthPerUnit + 1e-9) : 0;
        row.count = Math.min(row.count, Math.max(0, maxCount));
        refreshRow(row);
      }
      if (row.count > 0 && row.totalHealth > 0) ceiling = row.totalHealth;
    });

    const usage = { leadership: 0, authority: 0, dominance: 0 };
    rows.forEach((row) => { usage[row.category] += row.spent; });
    const free = { leadership: 0, authority: 0, dominance: 0 };
    categoryOrder.forEach((category) => {
      const limit = limits[category];
      free[category] = Number.isSafeInteger(limit) && limit > 0
        ? Math.max(0, limit - usage[category]) : 0;
    });

    let guard = 0;
    while (guard++ < 100000) {
      let candidate = null;

      rows.forEach((row, index) => {
        if (row.count <= 0 || row.totalHealth <= 0 || row.healthPerUnit <= 0) return;
        if (free[row.category] < row.cost) return;

        let previousHealth = Infinity;
        for (let i = index - 1; i >= 0; i -= 1) {
          if (rows[i].count > 0 && rows[i].totalHealth > 0) {
            previousHealth = rows[i].totalHealth;
            break;
          }
        }

        if (row.totalHealth + row.healthPerUnit > previousHealth + 1e-9) return;
        if (!candidate || row.totalHealth < candidate.totalHealth - 1e-9) candidate = row;
      });

      if (!candidate) break;
      candidate.count += 1;
      free[candidate.category] -= candidate.cost;
      refreshRow(candidate);
    }

    return rows;
  }

  function allocate(entries, limit) {
    const units = entries.map((entry) => ({ ...entry, count: 0 }));
    const budget = Number.isSafeInteger(limit) && limit > 0 ? limit : 0;

    if (!units.length || !budget) return finalizeUnits(units);

    const active = units.filter((entry) => entry.healthPerUnit > 0);
    if (!active.length) return finalizeUnits(units);

    const costForHealth = (health) => active.reduce((sum, entry) => {
      const count = health > 0 ? Math.ceil(health / entry.healthPerUnit) : 0;
      return sum + count * entry.cost;
    }, 0);

    let high = 1;
    let guard = 0;
    while (costForHealth(high) <= budget && high < 1e15 && guard++ < 80) high *= 2;
    let low = 0;
    while (low + 1 < high) {
      const middle = Math.floor((low + high) / 2);
      if (costForHealth(middle) <= budget) low = middle;
      else high = middle;
    }

    if (low > 0) {
      active.forEach((entry) => {
        entry.count = Math.ceil(low / entry.healthPerUnit);
      });
    } else {
      let remaining = budget;
      const order = active.slice().sort((a, b) =>
        a.cost - b.cost || a.healthPerUnit - b.healthPerUnit);
      order.forEach((entry) => {
        if (entry.cost <= remaining) {
          entry.count += 1;
          remaining -= entry.cost;
        }
      });
      if (remaining > 0) {
        const cheapest = order[0];
        const add = Math.floor(remaining / cheapest.cost);
        if (add > 0) {
          cheapest.count += add;
          remaining -= add * cheapest.cost;
        }
      }
    }

    return finalizeUnits(units);
  }

  function buildStandardRows(analyzed, limits) {
    const byCategory = { leadership: [], authority: [], dominance: [] };
    analyzed.forEach((entry) => byCategory[entry.category].push(entry));
    const rows = [];
    categoryOrder.forEach((category) => {
      const allocated = allocate(byCategory[category], limits[category]);
      rows.push(...allocated.slice().sort(compareDamage));
    });
    balanceHealth(rows, limits);
    return rows;
  }

  async function buildPlan(token) {
    const settings = getSettings() || {};
    const enemies = getEnemies();
    const entries = selectedEntries();
    const limits = {
      leadership: Number.isSafeInteger(settings.leadership) ? settings.leadership : null,
      authority: Number.isSafeInteger(settings.authority) ? settings.authority : null,
      dominance: Number.isSafeInteger(settings.dominance) ? settings.dominance : null
    };
    const usage = { leadership: 0, authority: 0, dominance: 0 };

    if (!enemies.length || !entries.length) {
      return { settings, limits, usage, rows: [], totalKills: 0, totalDamage: 0 };
    }

    const analyzed = entries.map((entry) => analyzeEntry(entry, enemies));
    if (settings.mode === 'doctorStrange' &&
        typeof strangeMode !== 'undefined' && strangeMode &&
        typeof strangeMode.buildPlanAsync === 'function') {
      return strangeMode.buildPlanAsync(
        settings,
        enemies,
        analyzed,
        limits,
        (progress) => {
          if (token === renderToken) updateSearchProgress(progress);
        },
        () => token !== renderToken
      );
    }

    const rows = buildStandardRows(analyzed, limits);
    rows.forEach((row) => { usage[row.category] += row.spent; });

    return {
      settings,
      limits,
      usage,
      rows,
      totalKills: rows.reduce((sum, row) => sum + row.kills, 0),
      totalDamage: rows.reduce((sum, row) => sum + row.totalDamage, 0)
    };
  }

  function setMode(mode) {
    const key = modeLabels[mode];
    if (!key) {
      delete modeEl.dataset.i18n;
      modeEl.textContent = '—';
      return;
    }
    modeEl.dataset.i18n = key;
    modeEl.textContent = I18N.t(key);
  }

  function setCapacity(name, used, total) {
    const card = cards[name];
    if (!card) return;
    const amount = card.querySelector('.capacity-amount');
    const usedEl = card.querySelector('[data-capacity-used]');
    const totalEl = card.querySelector('[data-capacity-total]');
    const bar = card.querySelector('[data-capacity-bar]');
    const validTotal = Number.isSafeInteger(total) && total >= 0;
    const over = validTotal && used > total;

    usedEl.textContent = formatInt(used);
    totalEl.textContent = validTotal ? formatInt(total) : '—';
    amount.setAttribute('aria-label', I18N.t('calc.capacityOf', {
      used: formatInt(used),
      total: validTotal ? formatInt(total) : '—'
    }));
    card.classList.toggle('is-over', over);
    bar.style.width = validTotal
      ? `${total > 0 ? Math.min(100, used / total * 100) : (used > 0 ? 100 : 0)}%`
      : '0%';
  }

  function rowHtml(row) {
    const icon = row.category === 'leadership' ? 'shield'
      : row.category === 'authority' ? 'japanese_curry' : 'skull';
    const iconClass = row.category === 'authority' ? ' final-result-icon-monsters' : '';
    const target = row.target;
    const targetTypes = target
      ? target.enemy.types.map(enemyTypeLabel).join(' · ') : '';
    const siegeMultiplier = target && Array.isArray(target.enemy.types) &&
      target.enemy.types.includes('fortifications') &&
      Number(row.unit.fortificationStrengthMultiplier) > 1
      ? Number(row.unit.fortificationStrengthMultiplier) : 1;
    const branchTitle = row.branches
      .map((branch) => `${branch.enemyName}: ${formatPercent(branch.percent)}`)
      .join(' · ');
    const typeBranchText = row.typeBranches.length > 1
      ? row.typeBranches
        .map((branch) => `${enemyTypeLabel(branch.type)} ${formatPercent(branch.percent)}`)
        .join(' · ')
      : '';

    return `
      <tr class="final-result-row${row.count > 0 ? '' : ' is-empty'}">
        <td>
          <div class="final-result-unit">
            <span class="final-result-icon${iconClass} material-symbols-outlined" aria-hidden="true">${icon}</span>
            <span class="final-result-unit-text">
              <strong>${escape(row.name)}</strong>
              <small>${escape(row.meta)}</small>
            </span>
          </div>
        </td>
        <td class="final-result-col-target" title="${escape(branchTitle)}">
          <strong>${escape(target ? target.enemyName : '—')}</strong>
          <small>${escape(targetTypes)}</small>
        </td>
        <td class="final-result-col-bonus">
          <strong>${escape(formatPercent(row.percent))}</strong>
          <small>${escape(formatDecimal(row.damagePerUnit))}${siegeMultiplier > 1
            ? ` ×${escape(formatDecimal(siegeMultiplier))}` : ''}</small>
          ${typeBranchText ? `<span class="final-result-branch-list">${escape(typeBranchText)}</span>` : ''}
        </td>
        <td class="final-result-number final-result-col-strike">${escape(formatInt(row.totalDamage))}</td>
        <td class="final-result-number final-result-col-units">${escape(formatInt(row.count))}</td>
        <td class="final-result-number final-result-col-health">${escape(formatInt(row.totalHealth))}</td>
        <td class="final-result-number final-result-col-kills">${escape(formatInt(row.kills))}</td>
        <td class="final-result-number final-result-col-capacity">${escape(formatInt(row.spent))}</td>
      </tr>
    `;
  }

  function inlineItemHtml(row) {
    const icon = row.category === 'leadership' ? 'shield'
      : row.category === 'authority' ? 'japanese_curry' : 'skull';
    const iconClass = row.category === 'authority' ? ' final-result-inline-icon-monsters' : '';
    return `
      <span class="final-result-inline-item">
        <span class="final-result-inline-icon${iconClass} material-symbols-outlined" aria-hidden="true">${icon}</span>
        <strong>${escape(row.name)}</strong>
        <span class="final-result-inline-count">${escape(formatInt(row.count))}</span>
      </span>
    `;
  }

  function renderBattleLog(plan) {
    if (!plan.logs) {
      battleLogEl.hidden = true;
      battleOursRows.innerHTML = '';
      battleEnemyRows.innerHTML = '';
      battleOursMeta.textContent = '';
      battleEnemyMeta.textContent = '';
      return;
    }

    const renderScenario = (scenario, tbody, meta) => {
      tbody.innerHTML = (scenario.entries || []).map((entry) => `
        <tr>
          <td>${escape(formatInt(entry.round))}</td>
          <td><strong>${escape(entry.attacker)}</strong> → ${escape(entry.target)}</td>
          <td>${escape(formatInt(entry.damage))}</td>
          <td>${escape(formatInt(entry.killed))}</td>
          <td>${escape(formatInt(entry.remaining))}</td>
        </tr>
      `).join('');
      meta.textContent = scenario.victory
        ? I18N.t('calc.victorySummary', {
          rounds: formatInt(scenario.rounds),
          value: formatInt(scenario.losses)
        })
        : I18N.t('calc.noVictorySummary');
    };

    battleLogEl.hidden = false;
    renderScenario(plan.logs.oursFirst, battleOursRows, battleOursMeta);
    renderScenario(plan.logs.enemyFirst, battleEnemyRows, battleEnemyMeta);
  }

  function renderResult(plan) {
    const visibleRows = plan.rows.filter((row) => row.count > 0);
    hasResult = visibleRows.length > 0;
    emptyEl.hidden = hasResult;
    summaryEl.hidden = !hasResult;

    if (!hasResult) {
      hasEnemyOrder = false;
      rowsEl.innerHTML = '';
      inlineEl.innerHTML = '';
      enemyOrderRowsEl.innerHTML = '';
      summaryEl.textContent = '';
      tableWrap.hidden = true;
      inlineWrap.hidden = true;
      enemyOrderEl.hidden = true;
      battleLogEl.hidden = true;
      battleOursRows.innerHTML = '';
      battleEnemyRows.innerHTML = '';
      battleOursMeta.textContent = '';
      battleEnemyMeta.textContent = '';
      return;
    }

    const rowOrder = new Map(visibleRows.map((row, index) => [row, index]));
    const fullRows = visibleRows.slice().sort((a, b) =>
      b.totalHealth - a.totalHealth || rowOrder.get(a) - rowOrder.get(b));
    const minimalRows = visibleRows.slice().sort(compareDisplay);
    const victoryMode = plan.settings && plan.settings.mode === 'doctorStrange';
    hasEnemyOrder = Boolean(victoryMode && plan.enemyOrder && plan.enemyOrder.length);

    if (victoryMode) {
      summaryEl.textContent = plan.victory
        ? I18N.t('calc.victorySummary', {
          rounds: formatInt(plan.rounds),
          value: formatInt(plan.losses)
        })
        : I18N.t('calc.noVictorySummary');
      summaryEl.classList.toggle('is-warning', !plan.victory);
    } else {
      summaryEl.textContent = I18N.t('calc.resultSummary', {
        kills: formatInt(plan.totalKills),
        damage: formatInt(plan.totalDamage)
      });
      summaryEl.classList.remove('is-warning');
    }
    rowsEl.innerHTML = fullRows.map(rowHtml).join('');
    inlineEl.innerHTML = minimalRows.map(inlineItemHtml).join('');
    if (hasEnemyOrder && typeof strangeMode !== 'undefined' && strangeMode) {
      strangeMode.renderEnemyOrder(plan, enemyOrderRowsEl);
    } else {
      enemyOrderRowsEl.innerHTML = '';
    }
    renderBattleLog(plan);
    applyInlineLayout(inlineColumn);
    applyResultView(minimalToggle.checked);
  }

  async function render() {
    const token = ++renderToken;
    const settings = getSettings() || {};
    const victoryMode = settings.mode === 'doctorStrange';
    setSearchVisible(victoryMode);

    let plan;
    try {
      plan = await buildPlan(token);
    } catch (e) {
      if (token === renderToken) setSearchVisible(false);
      return;
    }
    if (!plan || token !== renderToken) return;

    setSearchVisible(false);
    setMode(plan.settings.mode);
    setCapacity('leadership', plan.usage.leadership, plan.limits.leadership);
    setCapacity('authority', plan.usage.authority, plan.limits.authority);
    setCapacity('dominance', plan.usage.dominance, plan.limits.dominance);
    renderResult(plan);
  }

  document.addEventListener('armyselectionchange', render);
  document.addEventListener('calculationsettingschange', render);
  document.addEventListener('battlereportchange', render);
  document.addEventListener('enemychange', render);

  minimalToggle.addEventListener('change', () => {
    applyResultView(minimalToggle.checked);
    saveResultView();
  });
  inlineLayoutToggle.addEventListener('click', () => {
    applyInlineLayout(!inlineColumn);
    saveResultView();
  });
  loadResultView();

  const previousLangChange = window.__onLangChange;
  window.__onLangChange = function () {
    if (typeof previousLangChange === 'function') previousLangChange();
    render();
  };

  render();

  return {
    refresh: render,
    getPlan: () => buildPlan(renderToken)
  };
})();
