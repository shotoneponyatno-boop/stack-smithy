const mercenaryPicker = (() => {
  'use strict';

  const STORAGE_KEY = 'mercenarySelection';
  const ALL_FILTER = 'all';

  const popover = document.getElementById('mercPopover');
  const backdrop = document.getElementById('popoverBackdrop');
  const addButton = document.getElementById('mercAddBtn');
  const resetAllButton = document.getElementById('mercResetBtn');
  const countEl = document.getElementById('mercCount');
  const emptyEl = document.getElementById('mercEmpty');
  const emptyTextEl = document.getElementById('mercEmptyText');
  const chipsEl = document.getElementById('mercChips');

  if (!popover || !addButton || !countEl || !emptyEl || !emptyTextEl || !chipsEl) {
    return null;
  }

  const filters = [
    { id: ALL_FILTER, icon: 'apps', labelKey: 'merc.filterAll' },
    { id: 'guardsmen', icon: 'shield', labelKey: 'cat.guardsmen' },
    {
      id: 'specialist',
      icon: 'dropper_eye',
      labelKey: 'cat.specialists',
      iconClass: 'merc-filter-icon-specialist'
    },
    { id: 'engineers', icon: 'settings', labelKey: 'cat.engineers' },
    {
      id: 'monster',
      icon: 'japanese_curry',
      labelKey: 'cat.monsters',
      iconClass: 'merc-filter-icon-monsters'
    }
  ];

  const mercById = new Map(mercenariesData.map((merc) => [merc.id, merc]));
  const selected = new Set();
  let activeFilter = ALL_FILTER;
  let searchQuery = '';
  let open = false;

  function escapeHtml(value) {
    return I18N.escapeHtml(value == null ? '' : value);
  }

  function displayName(name) {
    return String(name).replace(/\s+\d+$/, '');
  }

  function dictionaryFor(lang, fallbackLang) {
    return (I18N.STRINGS && I18N.STRINGS[lang]) ||
      (fallbackLang && I18N.STRINGS && I18N.STRINGS[I18N.DEFAULT_LANG]) ||
      null;
  }

  function localizationKey(merc) {
    return `merc.item.${String(merc.id).replace(/-\d+$/, '')}`;
  }

  function localizedName(merc) {
    const key = localizationKey(merc);
    const dict = dictionaryFor(I18N.lang, true);
    return (dict && dict[key]) || displayName(merc.name);
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

  function displayLabel(merc) {
    const tier = toRoman(merc.tier);
    const name = localizedName(merc);
    return tier ? `${name} ${tier}` : name;
  }

  function normalize(value) {
    return String(value == null ? '' : value)
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLocaleLowerCase()
      .replace(/[^\p{L}\p{N}]+/gu, ' ')
      .trim();
  }

  function searchText(merc) {
    const values = [merc.name, displayName(merc.name), merc.pillLabel];
    const key = localizationKey(merc);

    Object.keys(I18N.STRINGS || {}).forEach((lang) => {
      const dict = I18N.STRINGS[lang];
      if (dict && dict[key]) values.push(dict[key]);
    });

    return normalize(values.filter(Boolean).join(' '));
  }

  function matchesSearch(merc, terms) {
    if (!terms.length) return true;
    const haystack = searchText(merc);
    return terms.every((term) => haystack.includes(term));
  }

  function matchesFilter(merc) {
    return activeFilter === ALL_FILTER || merc.tags.includes(activeFilter);
  }

  function filteredMercs() {
    const terms = normalize(searchQuery).split(' ').filter(Boolean);
    return mercenariesData.filter(
      (merc) => matchesFilter(merc) && matchesSearch(merc, terms)
    );
  }

  function groupByTier(mercs) {
    const groups = new Map();

    mercs.forEach((merc) => {
      if (!groups.has(merc.tier)) groups.set(merc.tier, []);
      groups.get(merc.tier).push(merc);
    });

    return [...groups.keys()]
      .sort((a, b) => a - b)
      .map((tier) => ({
        tier,
        mercs: groups.get(tier).sort((a, b) =>
          localizedName(a).localeCompare(localizedName(b), I18N.lang)
        )
      }));
  }

  function saveSelection() {
    const value = [...selected];
    try {
      if (window.StorageManager) StorageManager.save(STORAGE_KEY, value);
      else localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
    } catch (e) { }
    document.dispatchEvent(new Event('armyselectionchange'));
  }

  function loadSelection() {
    let value = null;

    try {
      if (window.StorageManager) value = StorageManager.load(STORAGE_KEY);
      else {
        const raw = localStorage.getItem(STORAGE_KEY);
        value = raw ? JSON.parse(raw) : null;
      }
    } catch (e) {
      value = null;
    }

    if (!Array.isArray(value)) return;

    value.forEach((id) => {
      if (mercById.has(id)) selected.add(id);
    });
  }

  function updateCount() {
    countEl.textContent = I18N.t('merc.count', { n: selected.size });
  }

  function renderSelected() {
    const mercs = [...selected]
      .map((id) => mercById.get(id))
      .filter(Boolean);

    emptyTextEl.hidden = mercs.length > 0;
    chipsEl.hidden = mercs.length === 0;
    emptyEl.classList.toggle('has-items', mercs.length > 0);

    chipsEl.innerHTML = mercs.map((merc) => {
      const name = displayLabel(merc);
      return `
        <li class="merc-chip" data-merc-id="${escapeHtml(merc.id)}">
          <span class="merc-chip-name">${escapeHtml(name)}</span>
          <button type="button" class="merc-chip-delete"
                  data-merc-remove="${escapeHtml(merc.id)}"
                  title="${escapeHtml(I18N.t('merc.removeAria', { name }))}"
                  aria-label="${escapeHtml(I18N.t('merc.removeAria', { name }))}">
            <span class="material-symbols-outlined">delete</span>
          </button>
        </li>
      `;
    }).join('');

    chipsEl.querySelectorAll('[data-merc-remove]').forEach((button) => {
      button.addEventListener('click', () => removeMercenary(button.dataset.mercRemove));
    });

    updateCount();
  }

  function addMercenary(id) {
    if (!mercById.has(id) || selected.has(id)) return;
    selected.add(id);
    saveSelection();
    renderSelected();
    if (open) renderResults();
  }

  function removeMercenary(id) {
    if (!selected.delete(id)) return;
    saveSelection();
    renderSelected();
    if (open) renderResults();
  }

  function resetMercenaries() {
    if (!selected.size) return;
    selected.clear();
    saveSelection();
    renderSelected();
    if (open) renderResults();
  }

  function filterButtonHtml(filter) {
    const active = filter.id === activeFilter;
    const label = I18N.t(filter.labelKey);
    const title = I18N.t('merc.filterAria', { cls: label });
    const iconClass = filter.iconClass ? ` ${filter.iconClass}` : '';

    return `
      <button type="button" class="merc-filter${active ? ' is-active' : ''}"
              data-merc-filter="${filter.id}" aria-pressed="${active}"
              title="${escapeHtml(title)}">
        <span class="merc-filter-icon material-symbols-outlined${iconClass}">${filter.icon}</span>
        <span class="merc-filter-label">${escapeHtml(label)}</span>
      </button>
    `;
  }

  function buildPopover() {
    const searchLabel = I18N.t('merc.search');
    const clearLabel = I18N.t('merc.searchClear');
    const resetLabel = I18N.t('merc.resetTip');
    const closeLabel = I18N.t('pop.closeAria');

    return `
      <div class="merc-popover-head">
        <div class="merc-popover-title">
          <span class="merc-popover-title-icon material-symbols-outlined">skull</span>
          <h3>${escapeHtml(I18N.t('merc.popTitle'))}</h3>
        </div>
        <div class="merc-popover-actions">
          <button type="button" class="popover-reset merc-reset" title="${escapeHtml(resetLabel)}"
                  aria-label="${escapeHtml(resetLabel)}">
            <span class="material-symbols-outlined">refresh</span>
          </button>
          <button type="button" class="popover-close merc-close" title="${escapeHtml(closeLabel)}"
                  aria-label="${escapeHtml(closeLabel)}">&#215;</button>
        </div>
      </div>

      <div class="merc-search-wrap">
        <span class="merc-search-icon material-symbols-outlined">search</span>
        <input type="text" class="merc-search-input" id="mercSearchInput"
               role="searchbox" autocomplete="off" spellcheck="false"
               placeholder="${escapeHtml(searchLabel)}" aria-label="${escapeHtml(searchLabel)}"
               value="${escapeHtml(searchQuery)}">
        <button type="button" class="merc-search-clear" id="mercSearchClear"
                title="${escapeHtml(clearLabel)}" aria-label="${escapeHtml(clearLabel)}"
                ${searchQuery ? '' : 'hidden'}>
          <span class="material-symbols-outlined">close</span>
        </button>
      </div>

      <div class="merc-filters" role="group">
        ${filters.map(filterButtonHtml).join('')}
      </div>

      <div class="merc-results" id="mercResults"></div>
    `;
  }

  function renderResults() {
    const resultsEl = popover.querySelector('#mercResults');
    if (!resultsEl) return;

    const mercs = filteredMercs();

    if (!mercs.length) {
      resultsEl.innerHTML = `<p class="merc-not-found">${escapeHtml(I18N.t('merc.notFound'))}</p>`;
      return;
    }

    resultsEl.innerHTML = groupByTier(mercs).map((group) => {
      const items = group.mercs.map((merc) => {
        const isSelected = selected.has(merc.id);
        const name = displayLabel(merc);
        return `
          <button type="button" class="merc-item${isSelected ? ' is-selected' : ''}"
                  data-merc-id="${escapeHtml(merc.id)}" aria-pressed="${isSelected}">
            <span class="merc-item-name">${escapeHtml(name)}</span>
            <span class="merc-item-state material-symbols-outlined">${isSelected ? 'check' : 'add'}</span>
          </button>
        `;
      }).join('');

      return `
        <section class="merc-tier-block" data-tier="${group.tier}">
          <h4 class="merc-tier-label">${escapeHtml(I18N.t('merc.tier', { n: toRoman(group.tier) }))}</h4>
          <div class="merc-tier-items">${items}</div>
        </section>
      `;
    }).join('');

    resultsEl.querySelectorAll('[data-merc-id]').forEach((button) => {
      button.addEventListener('click', () => addMercenary(button.dataset.mercId));
    });
  }

  function syncFilterButtons() {
    popover.querySelectorAll('[data-merc-filter]').forEach((button) => {
      const active = button.dataset.mercFilter === activeFilter;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', String(active));
    });
  }

  function wirePopover() {
    const input = popover.querySelector('#mercSearchInput');
    const clearButton = popover.querySelector('#mercSearchClear');
    const closeButton = popover.querySelector('.merc-close');
    const resetButton = popover.querySelector('.merc-reset');

    input.addEventListener('input', () => {
      searchQuery = input.value;
      clearButton.hidden = !searchQuery;
      renderResults();
    });

    clearButton.addEventListener('click', () => {
      searchQuery = '';
      input.value = '';
      clearButton.hidden = true;
      renderResults();
      input.focus();
    });

    popover.querySelectorAll('[data-merc-filter]').forEach((button) => {
      button.addEventListener('click', () => {
        activeFilter = button.dataset.mercFilter;
        syncFilterButtons();
        renderResults();
      });
    });

    closeButton.addEventListener('click', closePopover);
    resetButton.addEventListener('click', resetMercenaries);

    renderResults();
  }

  function positionPopover() {
    const rect = addButton.getBoundingClientRect();
    const pad = 12;
    const popWidth = popover.offsetWidth;
    const popHeight = popover.offsetHeight;

    let left = rect.right - popWidth;
    if (left < pad) left = pad;
    if (left + popWidth > window.innerWidth - pad) {
      left = Math.max(pad, window.innerWidth - popWidth - pad);
    }

    let top = rect.bottom + 8;
    if (top + popHeight > window.innerHeight - pad) {
      top = rect.top - popHeight - 8;
    }
    if (top < pad) top = pad;
    if (top + popHeight > window.innerHeight - pad) {
      top = Math.max(pad, window.innerHeight - popHeight - pad);
    }

    popover.style.left = `${Math.round(left)}px`;
    popover.style.top = `${Math.round(top)}px`;
  }

  function openPopover() {
    searchQuery = '';
    activeFilter = ALL_FILTER;
    popover.innerHTML = buildPopover();
    popover.hidden = false;
    popover.classList.add('is-open');
    if (backdrop) {
      backdrop.classList.add('is-open');
      backdrop.hidden = false;
    }
    addButton.setAttribute('aria-expanded', 'true');
    open = true;

    wirePopover();
    positionPopover();
  }

  function closePopover() {
    open = false;
    popover.classList.remove('is-open');
    popover.hidden = true;
    if (backdrop) {
      backdrop.classList.remove('is-open');
      backdrop.hidden = true;
    }
    addButton.setAttribute('aria-expanded', 'false');
  }

  addButton.addEventListener('click', () => {
    if (open) closePopover();
    else openPopover();
  });

  if (resetAllButton) resetAllButton.addEventListener('click', resetMercenaries);

  if (backdrop) backdrop.addEventListener('click', closePopover);

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && open) closePopover();
  });

  window.addEventListener('resize', () => {
    if (open) positionPopover();
  });

  const previousLangChange = window.__onLangChange;

  window.__onLangChange = function () {
    if (typeof previousLangChange === 'function') previousLangChange();
    renderSelected();

    if (open) {
      const savedQuery = searchQuery;
      popover.innerHTML = buildPopover();
      searchQuery = savedQuery;
      wirePopover();
      positionPopover();
    }
  };

  loadSelection();
  renderSelected();

  return {
    add: addMercenary,
    remove: removeMercenary,
    reset: resetMercenaries,
    getSelected: () => [...selected]
  };
})();
