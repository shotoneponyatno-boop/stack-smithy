const monsterPicker = (() => {
  'use strict';

  const MONSTERS_URL = 'data/monsters.json';
  const TROOPS_URL = 'data/monster-troops.json';
  const lockedCategory = 'heroic';
  const categoryKeys = {
    event: 'monster.event',
    rare: 'monster.rare',
    common: 'monster.common',
    citadel: 'monster.citadel',
    runic: 'monster.runic',
    heroic: 'monster.heroic'
  };
  const categoryIcons = {
    event: 'auto_awesome',
    rare: 'diamond',
    common: 'groups',
    citadel: 'castle',
    runic: 'auto_fix_high',
    heroic: 'workspace_premium'
  };
  const typeAliases = {
    beast: 'beasts',
    elemental: 'elementals',
    dragon: 'dragons',
    giant: 'giants',
    elf: 'elves',
    human: 'humans',
    monster: 'monsters',
    engineer: 'engineers'
  };

  const categoriesEl = document.getElementById('monsterCategories');
  const categoriesErrorEl = document.getElementById('monsterCategoriesError');
  const backdrop = document.getElementById('monsterPickerBackdrop');
  const modal = document.getElementById('monsterPicker');
  const titleEl = document.getElementById('monsterPickerTitle');
  const searchEl = document.getElementById('monsterPickerSearch');
  const listEl = document.getElementById('monsterPickerList');
  const emptyEl = document.getElementById('monsterPickerEmpty');
  const errorEl = document.getElementById('monsterPickerError');
  const closeBtn = document.getElementById('monsterPickerClose');

  if (!categoriesEl || !backdrop || !modal || !titleEl || !searchEl ||
      !listEl || !emptyEl || !errorEl || !closeBtn) return null;

  const escape = I18N.escapeHtml;
  let monsters = {};
  let troops = {};
  let loadPromise = null;
  let loadFailed = false;
  let loadErrorMessage = '';
  let activeCategory = null;
  let lastCategory = null;
  let lastTrigger = null;

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

  function normalizeTypeId(id) {
    return typeAliases[id] || id;
  }

  function isFileProtocol() {
    return Boolean(window.location) && window.location.protocol === 'file:';
  }

  function normalizeTags(tags) {
    return [...new Set((Array.isArray(tags) ? tags : []).map(normalizeTypeId))];
  }

  function normalizeStrengthAgainst(value) {
    const result = {};
    Object.entries(value && typeof value === 'object' ? value : {}).forEach(([key, bonus]) => {
      const normalized = normalizeTypeId(key);
      const number = Number(bonus);
      if (Number.isFinite(number)) result[normalized] = number;
    });
    return result;
  }

  function normalizeTroops(data) {
    const result = {};
    const add = (name, value) => {
      if (!value || typeof value !== 'object') return;
      const troopName = typeof value.name === 'string' && value.name.trim()
        ? value.name.trim() : name;
      if (!troopName) return;
      result[troopName] = { ...value, name: troopName };
    };

    if (Array.isArray(data)) {
      data.forEach((item) => {
        if (item && typeof item === 'object') add(item.name, item);
      });
    } else {
      Object.entries(data && typeof data === 'object' ? data : {}).forEach(([name, value]) => {
        add(name, value);
      });
    }
    return result;
  }

  function fetchJson(url) {
    return fetch(url, { cache: 'no-store' }).then((response) => {
      if (!response.ok) throw new Error(`Failed to load ${url}`);
      return response.json();
    });
  }

  function embeddedData() {
    const categories = window.MONSTER_CATEGORIES_DATA;
    const monsterTroops = window.MONSTER_TROOPS_DATA;
    if (!categories || !monsterTroops) return null;
    return { categories, monsterTroops };
  }

  async function ensureLoaded() {
    if (!loadPromise) {
      loadPromise = (async () => {
        try {
          const embedded = embeddedData();
          let monsterData;
          let troopData;
          if (embedded) {
            monsterData = embedded.categories;
            troopData = embedded.monsterTroops;
          } else {
            const fetched = await Promise.all([
              fetchJson(MONSTERS_URL),
              fetchJson(TROOPS_URL)
            ]);
            monsterData = fetched[0];
            troopData = fetched[1];
          }
          monsters = monsterData && typeof monsterData === 'object' ? monsterData : {};
          troops = normalizeTroops(troopData);
          loadFailed = false;
        } catch (e) {
          monsters = {};
          troops = {};
          loadFailed = true;
          loadErrorMessage = e && e.message ? String(e.message) : '';
          if (window.console && typeof console.warn === 'function') {
            console.warn('Failed to load monster data:', e);
          }
        }
      })();
    }
    await loadPromise;
    const errorKey = loadFailed && isFileProtocol()
      ? 'monster.loadErrorFile'
      : 'monster.loadError';
    errorEl.dataset.i18n = errorKey;
    errorEl.textContent = I18N.t(errorKey);
    errorEl.hidden = !loadFailed;
    if (categoriesErrorEl) {
      categoriesErrorEl.dataset.i18n = errorKey;
      categoriesErrorEl.textContent = I18N.t(errorKey);
      categoriesErrorEl.title = loadFailed ? loadErrorMessage : '';
      categoriesErrorEl.hidden = !loadFailed;
    }
    renderCategories();
  }

  function isCompleteTroop(troop) {
    return Boolean(troop &&
      Number.isFinite(Number(troop.health)) && Number(troop.health) > 0 &&
      Number.isFinite(Number(troop.strength)) &&
      Number.isFinite(Number(troop.tier)) &&
      Array.isArray(troop.tags) && troop.tags.length > 0);
  }

  function monsterTroopComplete(item) {
    if (!item) return false;
    const troop = troops[item.troop];
    if (!isCompleteTroop(troop)) return false;
    const level = Number(item.level);
    const tier = Number(troop.tier);
    if (!Number.isFinite(level) || !Number.isFinite(tier)) return true;
    return level === tier;
  }

  function completeMonsters(category) {
    return (Array.isArray(monsters[category]) ? monsters[category] : [])
      .filter((monster) => Array.isArray(monster.troops) && monster.troops.length > 0 &&
        monster.troops.every(monsterTroopComplete));
  }

  function levelText(monster) {
    const level = Number(monster && monster.level);
    return Number.isFinite(level) ? I18N.t('monster.level', { level: formatInt(level) }) : '';
  }

  function quantityText(quantity) {
    const value = Number(quantity);
    return Number.isFinite(value) && value < 0 ? '∞' : formatInt(value);
  }

  function compositionText(monster) {
    return (monster.troops || []).map((item) => {
      const troop = troops[item.troop];
      return troop ? `${troop.name} × ${quantityText(item.quantity)}` : '';
    }).filter(Boolean).join(' · ');
  }

  function searchText(monster) {
    const troopNames = (monster.troops || []).map((item) => {
      const troop = troops[item.troop];
      return troop && troop.name ? troop.name : '';
    });
    return [monster.name || '', levelText(monster), ...troopNames]
      .join(' ').toLowerCase();
  }

  function categoryTitle(category) {
    const key = categoryKeys[category];
    if (key) {
      titleEl.dataset.i18n = key;
      titleEl.textContent = I18N.t(key);
    } else {
      delete titleEl.dataset.i18n;
      titleEl.textContent = category;
    }
  }

  function ensureCategoryButton(category) {
    const exists = [...categoriesEl.querySelectorAll('[data-monster-category]')]
      .some((button) => button.dataset.monsterCategory === category);
    if (exists) return;
    const labelKey = categoryKeys[category];
    const icon = categoryIcons[category] || 'pets';
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'monster-category';
    button.dataset.monsterCategory = category;
    button.setAttribute('aria-haspopup', 'dialog');
    button.setAttribute('aria-controls', 'monsterPicker');
    button.innerHTML = `
      <span class="monster-category-icon material-symbols-outlined" aria-hidden="true">${icon}</span>
      <span${labelKey ? ` data-i18n="${labelKey}"` : ''}>${escape(labelKey ? I18N.t(labelKey) : category)}</span>
    `;
    categoriesEl.appendChild(button);
  }

  function renderCategories() {
    Object.keys(monsters).forEach(ensureCategoryButton);
    categoriesEl.querySelectorAll('[data-monster-category]').forEach((button) => {
      const category = button.dataset.monsterCategory;
      const locked = loadFailed || category === lockedCategory ||
        !completeMonsters(category).length;
      button.classList.toggle('is-locked', locked);
      if (locked) {
        button.setAttribute('aria-disabled', 'true');
        button.title = I18N.t(loadFailed ? 'monster.loadError' : 'monster.locked');
        if (!button.querySelector('.monster-category-lock')) {
          const lock = document.createElement('span');
          lock.className = 'monster-category-lock material-symbols-outlined';
          lock.setAttribute('aria-hidden', 'true');
          lock.textContent = 'lock';
          button.appendChild(lock);
        }
      } else {
        button.removeAttribute('aria-disabled');
        button.removeAttribute('title');
        const lock = button.querySelector('.monster-category-lock');
        if (lock) lock.remove();
      }
    });
  }

  function renderList() {
    if (!activeCategory) return;
    const all = completeMonsters(activeCategory);
    const query = searchEl.value.trim().toLowerCase();
    const filtered = query
      ? all.filter((monster) => searchText(monster).includes(query))
      : all;

    listEl.innerHTML = filtered.map((monster, index) => {
      const composition = compositionText(monster);
      const level = levelText(monster);
      return `
        <button type="button" class="monster-option" data-monster-index="${index}" role="listitem">
          <strong>${escape(monster.name || '')}${level ? ` <span class="monster-option-level">${escape(level)}</span>` : ''}</strong>
          ${composition ? `<small>${escape(composition)}</small>` : ''}
        </button>
      `;
    }).join('');
    emptyEl.hidden = filtered.length > 0 || !errorEl.hidden;
    listEl._monsters = filtered;
  }

  async function openCategory(category, trigger) {
    if (category === lockedCategory) return;
    await ensureLoaded();
    if (!completeMonsters(category).length) return;
    activeCategory = category;
    lastCategory = category;
    lastTrigger = trigger || null;
    categoryTitle(category);
    searchEl.value = '';
    listEl.innerHTML = '';
    emptyEl.hidden = false;
    modal.hidden = false;
    backdrop.hidden = false;
    renderList();
    searchEl.focus();
  }

  function closePicker() {
    modal.hidden = true;
    backdrop.hidden = true;
    const trigger = lastTrigger && lastTrigger.isConnected
      ? lastTrigger
      : [...categoriesEl.querySelectorAll('[data-monster-category]')]
        .find((button) => button.dataset.monsterCategory === lastCategory);
    activeCategory = null;
    lastCategory = null;
    lastTrigger = null;
    if (trigger) trigger.focus();
  }

  categoriesEl.addEventListener('click', (event) => {
    const button = event.target.closest('[data-monster-category]');
    if (!button || !categoriesEl.contains(button)) return;
    if (button.classList.contains('is-locked') || button.getAttribute('aria-disabled') === 'true') return;
    openCategory(button.dataset.monsterCategory, button);
  });

  searchEl.addEventListener('input', renderList);
  closeBtn.addEventListener('click', closePicker);
  backdrop.addEventListener('click', closePicker);
  modal.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      closePicker();
    }
  });

  listEl.addEventListener('click', (event) => {
    const button = event.target.closest('[data-monster-index]');
    if (!button || !listEl.contains(button)) return;
    const monster = (listEl._monsters || [])[Number(button.dataset.monsterIndex)];
    if (!monster) return;
    const items = (monster.troops || []).map((item) => {
      const troop = troops[item.troop];
      if (!troop) return null;
      return {
        name: (monster.troops || []).length === 1
          ? monster.name
          : `${monster.name} · ${troop.name}`,
        health: troop.health,
        quantity: item.quantity,
        strength: troop.strength,
        types: normalizeTags(troop.tags),
        strengthAgainst: normalizeStrengthAgainst(troop.strengthAgainst)
      };
    }).filter(Boolean);
    if (items.length && enemyManager) {
      if (typeof enemyManager.clearEnemies === 'function') enemyManager.clearEnemies();
      if (typeof enemyManager.addEnemies === 'function') enemyManager.addEnemies(items);
    }
    closePicker();
  });

  const previousLangChange = window.__onLangChange;
  window.__onLangChange = function () {
    if (typeof previousLangChange === 'function') previousLangChange();
    renderCategories();
    if (activeCategory && !modal.hidden) {
      categoryTitle(activeCategory);
      renderList();
    }
  };

  ensureLoaded();

  return {
    open: openCategory,
    close: closePicker
  };
})();
