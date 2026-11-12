const troopPicker = (() => {
  const popover = document.getElementById('troopPopover');
  const backdrop = document.getElementById('popoverBackdrop');
  const categoryTiles = document.querySelectorAll('.category-tile[data-category]');
  const selectedCountEl = document.getElementById('selectedCount');
  const STORAGE_KEY = 'troopSelection';

  const selected = new Set();
  let currentPopoverCategory = null;
  let currentTile = null;

  const categoryMap = {
    guardsmen: troopData.filter((t) => t.group === 'guardsmen'),
    specialist: troopData.filter((t) => t.group === 'specialist'),
    engineers: troopData.filter((t) => t.group === 'engineers'),
    monsters: monstersData
  };

  const categoryLabels = {
    guardsmen: 'cat.guardsmen',
    specialist: 'cat.specialists',
    engineers: 'cat.engineers',
    monsters: 'cat.monsters'
  };

  const categoryPrefix = {
    guardsmen: 'G',
    specialist: 'S',
    engineers: 'E',
    monsters: 'M'
  };

  const categoryIcons = {
    guardsmen: { icon: 'shield' },
    specialist: { icon: 'dropper_eye', extraClass: 'popover-header-icon-specialist' },
    engineers: { icon: 'settings' },
    monsters: { icon: 'japanese_curry', extraClass: 'popover-header-icon-monsters' }
  };

  function displayName(name) {
    return String(name).replace(/\s+\d+$/, '');
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

  function nameNumeral(name) {
    const match = String(name).match(/(\d+)\s*$/);
    return match ? toRoman(match[1]) : '';
  }

  function troopLabel(name) {
    const base = displayName(name);
    const key = 'troop.' + base.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    const label = I18N.t(key);
    const translated = label === key ? base : label;
    const numeral = nameNumeral(name);
    return numeral ? `${translated} ${numeral}` : translated;
  }

  function saveSelection() {
    const selection = [...selected];
    StorageManager.save(STORAGE_KEY, selection);
    document.dispatchEvent(new Event('armyselectionchange'));
  }

  function loadSelection() {
    const selection = StorageManager.load(STORAGE_KEY);
    if (selection && Array.isArray(selection)) {
      selection.forEach(id => selected.add(id));
    }
  }

  function isSelected(id) {
    return selected.has(id);
  }

  function toggleTroop(id, checked) {
    if (checked) selected.add(id);
    else selected.delete(id);
    updateCounts();
    saveSelection();
  }

  function updateCounts() {
    categoryTiles.forEach((tile) => {
      const cat = tile.dataset.category;
      const count = [...selected].filter((id) => categoryMap[cat].some((x) => x.id === id)).length;
      const span = tile.querySelector('.tile-selected');
      if (count > 0) {
        span.hidden = false;
        span.textContent = count;
        tile.classList.add('has-selection');
      } else {
        span.hidden = true;
        tile.classList.remove('has-selection');
      }
    });
    selectedCountEl.textContent = I18N.t('ui.count', { n: selected.size });
  }

  function buildHtml(category) {
    const troops = categoryMap[category];
    const icon = categoryIcons[category] || { icon: 'stacks' };
    const iconClass = icon.extraClass ? ` ${icon.extraClass}` : '';
    const resetTip = I18N.t('pop.resetTip');
    const resetAria = I18N.t('pop.resetAria', { cat: I18N.t(categoryLabels[category]) });
    const closeTip = I18N.t('pop.closeTip');
    const closeAria = I18N.t('pop.closeAria');
    let html = `
      <div class="popover-header">
        <div class="popover-header-title">
          <span class="popover-header-icon material-symbols-outlined${iconClass}">${icon.icon}</span>
          <h3>${I18N.t(categoryLabels[category])}</h3>
        </div>
        <div class="popover-actions">
          <button class="popover-reset popover-reset-btn" aria-label="${I18N.escapeHtml(resetAria)}" title="${I18N.escapeHtml(resetTip)}"><span class="material-symbols-outlined popover-reset-icon">refresh</span></button>
          <button class="popover-close" aria-label="${I18N.escapeHtml(closeAria)}" title="${I18N.escapeHtml(closeTip)}">&#215;</button>
        </div>
      </div>
    `;

    // Group troops by tier
    const troopsByTier = {};
    troops.forEach(t => {
      if (!troopsByTier[t.tier]) troopsByTier[t.tier] = [];
      troopsByTier[t.tier].push(t);
    });

    const prefix = categoryPrefix[category] || 'T';
    const sortedTiers = Object.keys(troopsByTier).sort((a, b) => a - b);

    sortedTiers.forEach((tier, index) => {
      const tierTroops = troopsByTier[tier];
      html += `<div class="tier-block" data-tier="${tier}">`;
      html += `<div class="tier-label">${prefix}${tier}</div>`;
      html += `<div class="checkbox-group">`;
      tierTroops.forEach((t) => {
        const selectedNow = isSelected(t.id);
        html += `
          <label class="custom-checkbox${selectedNow ? ' is-selected' : ''}">
            <input type="checkbox" data-troop-id="${t.id}" ${selectedNow ? 'checked' : ''}
                   value="${t.id}">
            <span class="checkbox-name">${troopLabel(t.name)}</span>
            <span class="checkbox-state material-symbols-outlined">${selectedNow ? 'check' : 'add'}</span>
          </label>
        `;
      });
      html += `</div></div>`;
    });
    return html;
  }

  // Desktop placement: keep popover inside the viewport
  function positionPopover(btn) {
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const pad = 12;
    const popW = popover.offsetWidth;
    const popH = popover.offsetHeight;

    let left = rect.left;
    if (left + popW > window.innerWidth - pad) {
      left = Math.max(pad, window.innerWidth - popW - pad);
    }

    let top = rect.bottom + 8;
    if (top + popH > window.innerHeight - pad) {
      top = rect.top - popH - 8;
    }
    if (top < pad) top = pad;
    if (top + popH > window.innerHeight - pad) {
      top = Math.max(pad, window.innerHeight - popH - pad);
    }

    popover.style.left = `${left}px`;
    popover.style.top = `${top}px`;
    popover.style.transform = 'none';
    popover.style.opacity = '1';
    popover.style.pointerEvents = 'auto';
  }

  function openPopover(btn) {
    const category = btn.dataset.category;
    popover.innerHTML = buildHtml(category);
    popover.classList.add('is-open');
    popover.hidden = false;
    backdrop.classList.add('is-open');
    backdrop.hidden = false;

    currentPopoverCategory = category;
    currentTile = btn;
    positionPopover(btn);
    wirePopover();
  }

  function syncCheckbox(cb) {
    const label = cb.closest('.custom-checkbox');
    if (!label) return;
    label.classList.toggle('is-selected', cb.checked);
    const state = label.querySelector('.checkbox-state');
    if (state) state.textContent = cb.checked ? 'check' : 'add';
  }

  function wirePopover() {
    popover.querySelectorAll('input[type=checkbox]').forEach((cb) => {
      cb.addEventListener('change', (e) => {
        toggleTroop(e.target.dataset.troopId, e.target.checked);
        syncCheckbox(e.target);
      });
    });
    popover.querySelector('.popover-close').addEventListener('click', closePopover);
    popover.querySelector('.popover-reset').addEventListener('click', resetSelection);
  }

  function resetSelection() {
    if (!currentPopoverCategory) return;
    const catIds = new Set(categoryMap[currentPopoverCategory].map((t) => t.id));
    for (const id of [...selected]) {
      if (catIds.has(id)) selected.delete(id);
    }
    popover.querySelectorAll('input[type=checkbox]').forEach((cb) => {
      cb.checked = false;
      syncCheckbox(cb);
    });
    updateCounts();
    saveSelection();
  }

  function closePopover() {
    popover.classList.remove('is-open');
    popover.hidden = true;
    backdrop.classList.remove('is-open');
    backdrop.hidden = true;
    categoryTiles.forEach((t) => t.setAttribute('aria-expanded', 'false'));
    currentTile = null;
  }

  // Load saved selection on init
  loadSelection();
  updateCounts();

  window.__onLangChange = () => {
    updateCounts();
    if (currentPopoverCategory && !popover.hidden) {
      popover.innerHTML = buildHtml(currentPopoverCategory);
      wirePopover();
      positionPopover(currentTile);
    }
  };

  categoryTiles.forEach((tile) => {
    tile.addEventListener('click', () => {
      const expanding = tile.getAttribute('aria-expanded') === 'true';
      if (!expanding) {
        categoryTiles.forEach((t) => t.setAttribute('aria-expanded', 'false'));
        tile.setAttribute('aria-expanded', 'true');
        openPopover(tile);
      } else {
        closePopover();
      }
    });
  });

  backdrop.addEventListener('click', closePopover);

  window.addEventListener('resize', () => {
    if (!popover.hidden) positionPopover(currentTile);
  });

  return { toggleTroop, isSelected, getSelected: () => [...selected] };
})();