const battleReport = (() => {
  'use strict';

  const STORAGE_KEY = 'battleReport';
  const card = document.getElementById('battleReportCard');
  const list = document.getElementById('battleReportList');
  const empty = document.getElementById('battleReportEmpty');
  const count = document.getElementById('battleReportCount');
  const toggle = document.getElementById('battleReportToggle');
  const content = document.getElementById('battleReportContent');

  if (!card || !list || !empty || !count || !toggle || !content) return null;

  const groupLabels = {
    guardsmen: 'cat.guardsmen',
    specialist: 'cat.specialists',
    engineers: 'cat.engineers',
    monsters: 'cat.monsters',
    mercenaries: 'merc.popTitle'
  };
  const groupOrder = Object.keys(groupLabels);
  const groupIcons = {
    guardsmen: 'shield',
    specialist: 'dropper_eye',
    engineers: 'settings',
    monsters: 'japanese_curry',
    mercenaries: 'skull'
  };
  const knownKeys = new Set(battleReportData.map((entry) => entry.key));
  const classKeys = new Set(battleReportData.filter((entry) => entry.classKey).map((entry) => entry.key));
  const values = Object.create(null);
  const fields = ['health', 'strength'];

  function validValue(value) {
    if (typeof value !== 'string' && typeof value !== 'number') return false;
    const text = String(value).trim();
    return text === '' || (
      /^[+-]?(?:\d+(?:[.,]\d*)?|[.,]\d+)$/.test(text) &&
      Number.isFinite(Number(text.replace(',', '.')))
    );
  }

  function save() {
    try {
      StorageManager.save(STORAGE_KEY, {
        values,
        expanded: !content.hidden
      });
    } catch (e) { }
    document.dispatchEvent(new Event('battlereportchange'));
  }

  function storedKey(key) {
    if (knownKeys.has(key)) return key;
    if (typeof key !== 'string') return null;
    const parts = key.split(':');
    const currentKey = parts.slice(0, 2).join(':');
    return parts.length === 3 && classKeys.has(currentKey) ? currentKey : null;
  }

  function load() {
    try {
      const state = StorageManager.load(STORAGE_KEY);
      if (!state || typeof state !== 'object') return;
      setExpanded(state.expanded !== false);
      if (!state.values || typeof state.values !== 'object') return;
      Object.entries(state.values)
        .sort(([a], [b]) => Number(knownKeys.has(b)) - Number(knownKeys.has(a)))
        .forEach(([savedKey, bonuses]) => {
          const key = storedKey(savedKey);
          if (!key || !bonuses || typeof bonuses !== 'object') return;
          if (!values[key]) values[key] = {};
          fields.forEach((field) => {
            if (!validValue(bonuses[field])) return;
            const value = String(bonuses[field]);
            if (!(field in values[key]) || (
              !Object.prototype.hasOwnProperty.call(state.values, key) &&
              values[key][field] === '' && value.trim() !== ''
            )) {
              values[key][field] = value;
            }
          });
        });
      battleReportData.forEach((entry) => {
        if (!entry.legacyKey || Object.prototype.hasOwnProperty.call(state.values, entry.key)) return;
        const previous = values[entry.legacyKey];
        if (previous && !values[entry.key]) values[entry.key] = { ...previous };
      });
    } catch (e) { }
  }

  function selectedTypes() {
    const selected = {
      troops: new Set(troopPicker.getSelected()),
      mercenaries: new Set(mercenaryPicker ? mercenaryPicker.getSelected() : [])
    };
    const types = new Map();
    battleReportData.forEach((entry) => {
      if (selected[entry.selection].has(entry.id) && !types.has(entry.key)) {
        types.set(entry.key, entry);
      }
    });
    return [...types.values()].sort((a, b) =>
      groupOrder.indexOf(a.group) - groupOrder.indexOf(b.group)
    );
  }

  function typeLabel(entry) {
    const group = I18N.t(groupLabels[entry.group]);
    const prefix = entry.selection === 'mercenaries' && entry.group !== 'mercenaries'
      ? `${I18N.t('merc.popTitle')} · ${group}` : group;
    if (entry.nameKey) {
      const dict = I18N.STRINGS[I18N.lang] || {};
      return `${prefix} · ${dict[entry.nameKey] || entry.name}`;
    }
    return `${prefix} · ${I18N.t(entry.classKey)}`;
  }

  function fieldHtml(entry, field, label) {
    const value = values[entry.key] && values[entry.key][field] || '';
    const id = `report-${entry.key.replace(/:/g, '-')}-${field}`;
    return `
      <label class="battle-report-field" for="${id}">
        <span>${I18N.escapeHtml(I18N.t('report.' + field))}</span>
        <span class="battle-report-input-wrap">
          <input type="text" inputmode="decimal" autocomplete="off" spellcheck="false"
                 id="${id}" name="${I18N.escapeHtml(entry.key)}:${field}"
                 data-report-key="${I18N.escapeHtml(entry.key)}" data-report-field="${field}"
                 aria-label="${I18N.escapeHtml(I18N.t('report.' + field) + ': ' + label + ' (%)')}"
                 aria-describedby="${id}-error" placeholder="0" value="${I18N.escapeHtml(value)}">
          <span class="battle-report-unit" aria-hidden="true">%</span>
        </span>
        <span class="battle-report-error" id="${id}-error" hidden>${I18N.escapeHtml(I18N.t('report.invalid'))}</span>
      </label>
    `;
  }

  function render() {
    const types = selectedTypes();
    count.textContent = I18N.t('report.count', { n: types.length });
    empty.hidden = types.length > 0;
    list.hidden = types.length === 0;
    list.innerHTML = groupOrder.map((group) => {
      const entries = types.filter((entry) => group === 'mercenaries'
        ? entry.selection === 'mercenaries'
        : entry.selection === 'troops' && entry.group === group);
      if (!entries.length) return '';
      return `
        <div class="battle-report-group" data-report-group="${group}">
          ${entries.map((entry) => {
            const label = typeLabel(entry);
            const mercenaryIcon = entry.selection === 'mercenaries' && entry.group !== 'mercenaries'
              ? '<span class="battle-report-type-icon battle-report-mercenary-icon material-symbols-outlined" aria-hidden="true">skull</span>' : '';
            return `
              <div class="battle-report-type" data-report-key="${I18N.escapeHtml(entry.key)}">
                <div class="battle-report-type-summary">
                  <span class="battle-report-type-icons" aria-hidden="true">
                    <span class="battle-report-type-icon ${entry.group === 'monsters' ? 'battle-report-type-icon-monsters' : ''} material-symbols-outlined">${groupIcons[entry.group]}</span>
                    ${mercenaryIcon}
                  </span>
                  <h3>${I18N.escapeHtml(label)}</h3>
                </div>
                <div class="battle-report-fields">
                  ${fields.map((field) => fieldHtml(entry, field, label)).join('')}
                </div>
              </div>
            `;
          }).join('')}
        </div>
      `;
    }).join('');
  }

  list.addEventListener('input', (event) => {
    const input = event.target;
    const key = input.dataset.reportKey;
    const field = input.dataset.reportField;
    if (!knownKeys.has(key) || !fields.includes(field)) return;
    const valid = validValue(input.value);
    input.setCustomValidity(valid ? '' : I18N.t('report.invalid'));
    input.setAttribute('aria-invalid', String(!valid));
    document.getElementById(input.id + '-error').hidden = valid;
    if (!valid) return;
    if (!values[key]) values[key] = {};
    values[key][field] = input.value.trim();
    save();
  });

  function setExpanded(expanded) {
    content.hidden = !expanded;
    toggle.setAttribute('aria-expanded', String(expanded));
    card.classList.toggle('is-collapsed', !expanded);
  }

  toggle.addEventListener('click', () => {
    setExpanded(content.hidden);
    save();
  });

  const help = document.getElementById('battleReportHelp');
  const helpTrigger = document.getElementById('battleReportHelpTrigger');
  const helpPreview = document.getElementById('battleReportHelpPreview');
  const helpClose = document.getElementById('battleReportHelpClose');
  let refreshHelpPosition = null;

  if (help && helpTrigger && helpPreview && helpClose) {
    const HELP_ANCHOR_MIN_WIDTH = 641;
    let helpPinned = false;
    let helpHovered = false;

    function positionHelpPreview() {
      const rect = helpTrigger.getBoundingClientRect();
      const pad = 12;
      const width = helpPreview.offsetWidth;
      const height = helpPreview.offsetHeight;

      let left = rect.right - width;
      if (left < pad) left = pad;
      if (left + width > window.innerWidth - pad) {
        left = Math.max(pad, window.innerWidth - width - pad);
      }

      let top = rect.bottom;
      if (top + height > window.innerHeight - pad) top = rect.top - height;
      if (top < pad) top = pad;
      if (top + height > window.innerHeight - pad) {
        top = Math.max(pad, window.innerHeight - height - pad);
      }

      helpPreview.style.left = `${left}px`;
      helpPreview.style.top = `${top}px`;
    }

    function updateHelp() {
      const open = helpPinned || helpHovered;
      helpPreview.hidden = !open;
      helpTrigger.setAttribute('aria-expanded', String(open));

      if (!open) {
        helpPreview.classList.remove('is-anchored');
        helpPreview.style.left = '';
        helpPreview.style.top = '';
        return;
      }

      if (window.innerWidth >= HELP_ANCHOR_MIN_WIDTH) {
        helpPreview.classList.add('is-anchored');
        positionHelpPreview();
      } else {
        helpPreview.classList.remove('is-anchored');
        helpPreview.style.left = '';
        helpPreview.style.top = '';
      }
    }

    refreshHelpPosition = () => {
      if (!helpPreview.hidden) updateHelp();
    };

    window.addEventListener('resize', refreshHelpPosition);
    helpPreview.querySelectorAll('img').forEach((image) => {
      image.addEventListener('load', refreshHelpPosition);
    });

    function closeHelp(restoreFocus = false) {
      helpPinned = false;
      helpHovered = false;
      updateHelp();
      if (restoreFocus) helpTrigger.focus();
    }

    help.addEventListener('pointerenter', (event) => {
      if (event.pointerType !== 'mouse') return;
      helpHovered = true;
      updateHelp();
    });

    help.addEventListener('pointerleave', (event) => {
      if (event.pointerType !== 'mouse') return;
      helpHovered = false;
      updateHelp();
    });

    helpTrigger.addEventListener('click', () => {
      if (helpPinned) closeHelp();
      else {
        helpPinned = true;
        updateHelp();
      }
    });

    helpClose.addEventListener('click', () => closeHelp(true));

    document.addEventListener('pointerdown', (event) => {
      if (!helpPreview.hidden && !help.contains(event.target)) closeHelp();
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && !helpPreview.hidden) {
        event.preventDefault();
        closeHelp(true);
      }
    });

    help.addEventListener('focusout', (event) => {
      if (event.relatedTarget && !help.contains(event.relatedTarget)) closeHelp();
    });
  }

  document.addEventListener('armyselectionchange', render);
  document.addEventListener('DOMContentLoaded', render);

  const previousLangChange = window.__onLangChange;
  window.__onLangChange = function () {
    if (typeof previousLangChange === 'function') previousLangChange();
    render();
    if (refreshHelpPosition) refreshHelpPosition();
  };

  load();
  render();

  return {
    getBonuses(id, selection = 'troops') {
      const entry = battleReportData.find((item) => item.id === id && item.selection === selection);
      const bonuses = entry && values[entry.key] || {};
      return Object.fromEntries(fields.map((field) => [
        field, Number(String(bonuses[field] || '').replace(',', '.'))
      ]));
    }
  };
})();
