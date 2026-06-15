// ── LANGUAGE SYSTEM ──
// Each page defines window.TRANSLATIONS = { es: {...}, en: {...} }
// Keys match data-i18n attributes in HTML

let currentLang = localStorage.getItem('vv-lang') || 'es';

function applyLang(lang) {
  currentLang = lang;
  localStorage.setItem('vv-lang', lang);

  const t = window.TRANSLATIONS?.[lang];
  if (!t) return;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key] !== undefined) {
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = t[key];
      } else {
        el.innerHTML = t[key];
      }
    }
  });

  document.querySelectorAll('[data-i18n-href]').forEach(el => {
    const key = el.getAttribute('data-i18n-href');
    if (t[key]) el.href = t[key];
  });

  document.querySelectorAll('[data-i18n-attr]').forEach(el => {
    const raw = el.getAttribute('data-i18n-attr');
    const [attr, key] = raw.split(':');
    if (t[key]) el.setAttribute(attr, t[key]);
  });

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
  });

  document.documentElement.lang = lang;
}

function initNav() {
  // Language buttons
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => applyLang(btn.getAttribute('data-lang')));
  });

  // Mark active nav link
  const path = window.location.pathname;
  document.querySelectorAll('.nav-links a').forEach(a => {
    if (path.includes(a.getAttribute('href')?.replace('../', ''))) {
      a.classList.add('active');
    }
  });

  // Apply saved language on load
  applyLang(currentLang);
}

document.addEventListener('DOMContentLoaded', initNav);
