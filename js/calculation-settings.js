const calculationSettings = (() => {
  'use strict';

  const STORAGE_KEY = 'calculationSettings';
  const section = document.querySelector('.calculation-settings');
  const mode = document.getElementById('calculationMode');
  const modeValue = document.getElementById('calculationModeValue');
  if (!section || !mode || !modeValue) return null;

  const fields = [...section.querySelectorAll('[data-setting]')];
  const options = [...mode.querySelectorAll('input[name="calculationMode"]')];
  const trigger = mode.querySelector('summary');
  const modeLabels = {
    maxDamage: 'settings.maxDamage',
    doctorStrange: 'settings.doctorStrange',
    damagePerSilver: 'settings.damagePerSilver'
  };

  function parseValue(value) {
    if (!/^\d+$/.test(value)) return null;
    const number = Number(value);
    return Number.isSafeInteger(number) ? number : null;
  }

  function updateValidity(input) {
    const valid = parseValue(input.value) !== null;
    const error = document.getElementById(input.getAttribute('aria-describedby'));
    input.setAttribute('aria-invalid', String(!valid));
    if (error) error.hidden = valid;
  }

  function selectedMode() {
    const selected = options.find((option) => option.checked && !option.disabled);
    return selected && modeLabels[selected.value] ? selected.value : null;
  }

  function updateModeLabel() {
    const key = modeLabels[selectedMode()];
    if (!key) {
      delete modeValue.dataset.i18n;
      modeValue.textContent = '—';
      return;
    }
    modeValue.dataset.i18n = key;
    modeValue.textContent = I18N.t(key);
  }

  function syncLocks() {
    const previous = selectedMode();
    options.forEach((option) => {
      option.disabled = option.closest('.calculation-mode-option').classList.contains('is-locked');
    });
    if (!selectedMode()) {
      const available = options.find((option) => !option.disabled);
      if (available) available.checked = true;
      else options.forEach((option) => { option.checked = false; });
    }
    updateModeLabel();
    return previous !== selectedMode();
  }

  function getSettings() {
    const settings = {};
    fields.forEach((input) => { settings[input.dataset.setting] = parseValue(input.value); });
    settings.mode = selectedMode();
    return settings;
  }

  function save() {
    const values = {};
    fields.forEach((input) => { values[input.dataset.setting] = input.value; });
    try {
      StorageManager.save(STORAGE_KEY, { values, mode: selectedMode() });
    } catch (e) { }
    document.dispatchEvent(new CustomEvent('calculationsettingschange', { detail: getSettings() }));
  }

  function load() {
    try {
      const state = StorageManager.load(STORAGE_KEY);
      if (!state || typeof state !== 'object') return;
      if (state.values && typeof state.values === 'object') {
        fields.forEach((input) => {
          const saved = state.values[input.dataset.setting];
          if (typeof saved === 'string' || typeof saved === 'number') input.value = String(saved);
        });
      }
      const savedMode = state.mode === 'guaranteedVictory' ? 'doctorStrange' : state.mode;
      const selected = options.find((option) => option.value === savedMode && !option.disabled);
      if (selected) selected.checked = true;
    } catch (e) { }
  }

  fields.forEach((input) => {
    input.addEventListener('input', () => {
      updateValidity(input);
      save();
    });
  });

  mode.addEventListener('click', (event) => {
    if (options.includes(event.target) && modeValue.dataset.i18n === modeLabels[event.target.value]) {
      mode.open = false;
      trigger.focus();
    }
  });

  mode.addEventListener('change', (event) => {
    if (!options.includes(event.target)) return;
    if (event.target.disabled || event.target.closest('.calculation-mode-option').classList.contains('is-locked')) {
      if (syncLocks()) save();
      return;
    }
    updateModeLabel();
    mode.open = false;
    trigger.focus();
    save();
  });

  document.addEventListener('pointerdown', (event) => {
    if (mode.open && !mode.contains(event.target)) mode.open = false;
  });

  mode.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && mode.open) {
      event.preventDefault();
      mode.open = false;
      trigger.focus();
    }
  });

  mode.addEventListener('focusout', (event) => {
    if (mode.open && event.relatedTarget && !mode.contains(event.relatedTarget)) mode.open = false;
  });

  syncLocks();
  load();
  fields.forEach(updateValidity);
  updateModeLabel();

  const lockObserver = new MutationObserver(() => {
    if (syncLocks()) save();
  });
  options.forEach((option) => {
    lockObserver.observe(option.closest('.calculation-mode-option'), {
      attributes: true,
      attributeFilter: ['class']
    });
  });

  return { getSettings };
})();
