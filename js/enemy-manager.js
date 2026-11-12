const enemyManager = (() => {
  'use strict';

  const STORAGE_KEY = 'enemies';
  const typeLabels = {
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
  const typeIds = Object.keys(typeLabels);
  const form = document.getElementById('enemyForm');
  const typesEl = document.getElementById('enemyTypes');
  const typeFieldset = document.getElementById('enemyTypesFieldset');
  const bonusFields = document.getElementById('enemyBonusFields');
  const bonusDetails = document.getElementById('enemyBonuses');
  const nameInput = document.getElementById('enemyName');
  const healthInput = document.getElementById('enemyHealth');
  const quantityInput = document.getElementById('enemyQuantity');
  const strengthInput = document.getElementById('enemyStrength');
  const errorEl = document.getElementById('enemyError');
  const submit = document.getElementById('enemySubmit');
  const cancel = document.getElementById('enemyCancel');
  const list = document.getElementById('enemyList');
  const empty = document.getElementById('enemyEmpty');
  const count = document.getElementById('enemyCount');

  if (!form || !typesEl || !typeFieldset || !bonusFields || !bonusDetails || !nameInput ||
      !healthInput || !quantityInput || !strengthInput || !errorEl || !submit || !cancel ||
      !list || !empty || !count) return null;

  const escape = I18N.escapeHtml;
  const selected = new Set();
  let enemies = [];
  let nextId = 1;
  let editingId = null;
  let errorKey = null;

  function decimal(value, allowNegative) {
    const text = String(value).trim();
    if (!text) return null;
    const pattern = allowNegative
      ? /^[+-]?(?:\d+(?:[.,]\d*)?|[.,]\d+)(?:e[+-]?\d+)?$/i
      : /^\+?(?:\d+(?:[.,]\d*)?|[.,]\d+)(?:e[+-]?\d+)?$/i;
    if (!pattern.test(text)) return NaN;
    const number = Number(text.replace(',', '.'));
    return Number.isFinite(number) ? number : NaN;
  }

  function quantity(value) {
    const text = String(value).trim();
    if (!text) return null;
    if (!/^\d+$/.test(text)) return NaN;
    const number = Number(text);
    return Number.isSafeInteger(number) && number > 0 ? number : NaN;
  }

  function label(id) {
    return I18N.t(typeLabels[id]);
  }

  function displayName(enemy, index) {
    return enemy.name || I18N.t('enemy.defaultName', { n: index + 1 });
  }

  function save() {
    try {
      StorageManager.save(STORAGE_KEY, { nextId, enemies });
    } catch (e) { }
    document.dispatchEvent(new Event('enemychange'));
  }

  function load() {
    try {
      const state = StorageManager.load(STORAGE_KEY);
      if (!state || !Array.isArray(state.enemies)) return;
      const used = new Set();
      state.enemies.forEach((item) => {
        if (!item || !Number.isSafeInteger(item.id) || item.id < 1 || used.has(item.id) ||
            typeof item.health !== 'number' || !Number.isFinite(item.health) || item.health <= 0 ||
            !Array.isArray(item.types)) return;
        const types = [...new Set(item.types.filter((id) => typeIds.includes(id)))];
        if (!types.length) return;
        const strengthAgainst = {};
        typeIds.forEach((id) => {
          if (item.strengthAgainst && typeof item.strengthAgainst[id] === 'number' &&
              Number.isFinite(item.strengthAgainst[id])) {
            strengthAgainst[id] = item.strengthAgainst[id];
          }
        });
        enemies.push({
          id: item.id,
          name: typeof item.name === 'string' ? item.name.slice(0, 120) : '',
          health: item.health,
          quantity: Number.isSafeInteger(item.quantity) && item.quantity > 0 ? item.quantity : null,
          strength: typeof item.strength === 'number' && Number.isFinite(item.strength) && item.strength >= 0
            ? item.strength : null,
          types,
          strengthAgainst
        });
        used.add(item.id);
      });
      const highestId = enemies.reduce((highest, enemy) => Math.max(highest, enemy.id), 0);
      nextId = Math.max(highestId + 1, Number.isSafeInteger(state.nextId) ? state.nextId : 1);
    } catch (e) { }
  }

  function buildFields() {
    typesEl.innerHTML = typeIds.map((id) => `
      <button type="button" class="enemy-type" data-enemy-type="${id}" aria-pressed="false">
        <span data-i18n="${typeLabels[id]}">${escape(label(id))}</span>
      </button>
    `).join('');
    bonusFields.innerHTML = typeIds.map((id) => `
      <label class="enemy-field" for="enemy-bonus-${id}">
        <span data-i18n="${typeLabels[id]}">${escape(label(id))}</span>
        <span class="enemy-bonus-input">
          <input id="enemy-bonus-${id}" data-enemy-bonus="${id}" type="text" inputmode="decimal" autocomplete="off" placeholder="0">
          <span aria-hidden="true">%</span>
        </span>
      </label>
    `).join('');
  }

  function updateTypes() {
    typesEl.querySelectorAll('[data-enemy-type]').forEach((button) => {
      button.setAttribute('aria-pressed', String(selected.has(button.dataset.enemyType)));
    });
  }

  function clearError() {
    errorKey = null;
    errorEl.hidden = true;
    errorEl.textContent = '';
    form.querySelectorAll('[aria-invalid]').forEach((element) => element.removeAttribute('aria-invalid'));
  }

  function invalid(key, element) {
    errorKey = key;
    errorEl.textContent = I18N.t(key);
    errorEl.hidden = false;
    element.setAttribute('aria-invalid', 'true');
    if (bonusFields.contains(element)) bonusDetails.open = true;
    element.focus();
  }

  function resetForm() {
    form.reset();
    selected.clear();
    updateTypes();
    editingId = null;
    bonusDetails.open = false;
    submit.dataset.i18n = 'enemy.add';
    submit.textContent = I18N.t('enemy.add');
    cancel.hidden = true;
    clearError();
  }

  function renderList() {
    count.textContent = I18N.t('enemy.count', { n: enemies.length });
    empty.hidden = enemies.length > 0;
    list.innerHTML = enemies.map((enemy, index) => {
      const name = displayName(enemy, index);
      const bonuses = typeIds.filter((id) => Object.prototype.hasOwnProperty.call(enemy.strengthAgainst, id))
        .map((id) => `${escape(label(id))}: ${escape(enemy.strengthAgainst[id])}%`).join(', ');
      const quantityText = enemy.quantity === null
        ? `<span aria-label="${escape(I18N.t('enemy.unlimited'))}">∞</span>`
        : escape(enemy.quantity);
      return `
        <li class="enemy-item">
          <div class="enemy-item-header">
            <h4>${escape(name)}</h4>
            <div class="enemy-item-actions">
              <button type="button" class="enemy-button" data-enemy-edit="${enemy.id}" aria-label="${escape(I18N.t('enemy.editAria', { name }))}">${escape(I18N.t('enemy.edit'))}</button>
              <button type="button" class="enemy-button" data-enemy-delete="${enemy.id}" aria-label="${escape(I18N.t('enemy.deleteAria', { name }))}">${escape(I18N.t('enemy.delete'))}</button>
            </div>
          </div>
          <div class="enemy-item-stats">
            <span>${escape(I18N.t('enemy.quantityLabel'))}: <strong>${quantityText}</strong></span>
            ${enemy.strength === null ? '' : `<span>${escape(I18N.t('report.strength'))}: <strong>${escape(enemy.strength)}</strong></span>`}
            <span>${escape(I18N.t('report.health'))}: <strong>${escape(enemy.health)}</strong></span>
          </div>
          <div class="enemy-item-types">${enemy.types.map((id) => `<span>${escape(label(id))}</span>`).join('')}</div>
          ${bonuses ? `<p class="enemy-item-bonuses">${escape(I18N.t('enemy.bonusLabel'))}: ${bonuses}</p>` : ''}
        </li>
      `;
    }).join('');
  }

  function edit(enemy) {
    resetForm();
    editingId = enemy.id;
    nameInput.value = enemy.name;
    healthInput.value = String(enemy.health);
    quantityInput.value = enemy.quantity === null ? '' : String(enemy.quantity);
    strengthInput.value = enemy.strength === null ? '' : String(enemy.strength);
    enemy.types.forEach((id) => selected.add(id));
    updateTypes();
    Object.entries(enemy.strengthAgainst).forEach(([id, value]) => {
      const input = document.getElementById('enemy-bonus-' + id);
      if (input) input.value = String(value);
    });
    bonusDetails.open = Object.keys(enemy.strengthAgainst).length > 0;
    submit.dataset.i18n = 'enemy.save';
    submit.textContent = I18N.t('enemy.save');
    cancel.hidden = false;
    nameInput.focus();
  }

  typesEl.addEventListener('click', (event) => {
    const button = event.target.closest('[data-enemy-type]');
    if (!button || !typesEl.contains(button)) return;
    const id = button.dataset.enemyType;
    if (selected.has(id)) selected.delete(id);
    else selected.add(id);
    updateTypes();
    clearError();
  });

  form.addEventListener('input', clearError);
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    clearError();
    const health = decimal(healthInput.value, false);
    if (health === null || !Number.isFinite(health) || health <= 0) {
      invalid('enemy.invalidHealth', healthInput);
      return;
    }
    const amount = quantity(quantityInput.value);
    if (amount !== null && !Number.isFinite(amount)) {
      invalid('enemy.invalidQuantity', quantityInput);
      return;
    }
    const strength = decimal(strengthInput.value, false);
    if (strength !== null && (!Number.isFinite(strength) || strength < 0)) {
      invalid('enemy.invalidStrength', strengthInput);
      return;
    }
    if (!selected.size) {
      invalid('enemy.invalidTypes', typesEl.querySelector('button'));
      typeFieldset.setAttribute('aria-invalid', 'true');
      return;
    }
    const strengthAgainst = {};
    for (const input of bonusFields.querySelectorAll('[data-enemy-bonus]')) {
      const value = decimal(input.value, true);
      if (value !== null && !Number.isFinite(value)) {
        invalid('enemy.invalidBonus', input);
        return;
      }
      if (value !== null) strengthAgainst[input.dataset.enemyBonus] = value;
    }
    const enemy = {
      id: editingId === null ? nextId++ : editingId,
      name: nameInput.value.trim(),
      health,
      quantity: amount,
      strength,
      types: typeIds.filter((id) => selected.has(id)),
      strengthAgainst
    };
    if (editingId === null) enemies.push(enemy);
    else {
      const index = enemies.findIndex((item) => item.id === editingId);
      if (index < 0) return;
      enemies[index] = enemy;
    }
    save();
    resetForm();
    renderList();
  });

  cancel.addEventListener('click', resetForm);
  list.addEventListener('click', (event) => {
    const editButton = event.target.closest('[data-enemy-edit]');
    const deleteButton = event.target.closest('[data-enemy-delete]');
    if (editButton && list.contains(editButton)) {
      const enemy = enemies.find((item) => item.id === Number(editButton.dataset.enemyEdit));
      if (enemy) edit(enemy);
    } else if (deleteButton && list.contains(deleteButton)) {
      const id = Number(deleteButton.dataset.enemyDelete);
      enemies = enemies.filter((item) => item.id !== id);
      if (editingId === id) resetForm();
      save();
      renderList();
    }
  });

  const previousLangChange = window.__onLangChange;
  window.__onLangChange = function () {
    if (typeof previousLangChange === 'function') previousLangChange();
    if (errorKey) errorEl.textContent = I18N.t(errorKey);
    renderList();
  };

  buildFields();
  load();
  renderList();
  document.addEventListener('DOMContentLoaded', renderList);

  return {
    getEnemies() {
      return enemies.map((enemy) => ({
        ...enemy,
        types: [...enemy.types],
        strengthAgainst: { ...enemy.strengthAgainst }
      }));
    }
  };
})();
