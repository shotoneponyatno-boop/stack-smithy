document.addEventListener('DOMContentLoaded', function () {
    'use strict';

    var I18N = window.I18N;
    if (!I18N) return;

    var grid = document.getElementById('langGrid');
    var leadEl = document.getElementById('langLead');
    var hintEl = document.getElementById('langHint');
    if (!grid) return;

    var initialLang = I18N.lang || I18N.DEFAULT_LANG;
    I18N.setLang(initialLang);

    if (leadEl) leadEl.textContent = I18N.t('lang.lead');
    if (hintEl) hintEl.textContent = I18N.t('lang.hint');

    function renderGrid() {
        grid.innerHTML = '';
        I18N.LANGS.forEach(function (l) {
            var li = document.createElement('li');

            var a = document.createElement('a');
            a.className = 'lang-card';
            if (l.code === I18N.lang) {
                a.classList.add('is-current');
                a.setAttribute('aria-current', 'true');
            }
            a.href = '#';
            a.setAttribute('lang', l.code);
            a.setAttribute('hreflang', l.code);
            a.setAttribute('data-lang', l.code);

            a.innerHTML =
                '<span class="lang-card-code">' + l.code.toUpperCase() + '</span>' +
                '<span class="lang-card-name">' + I18N.escapeHtml(l.name) + '</span>' +
                '<span class="lang-card-en">' + I18N.escapeHtml(l.en) + '</span>';

            a.addEventListener('click', function (e) {
                e.preventDefault();
                I18N.remember(l.code);
                I18N.setLang(l.code);
                if (leadEl) leadEl.textContent = I18N.t('lang.lead');
                if (hintEl) hintEl.textContent = I18N.t('lang.hint');
                renderGrid();
            });

            li.appendChild(a);
            grid.appendChild(li);
        });
    }

    renderGrid();

    document.title = I18N.t('meta.title');
});
