/**
 * i18n.js
 * Lightweight language switcher.
 *
 * How it works:
 * - Text elements you want translated have: data-i18n="key"
 * - We keep DA/EN dictionaries below.
 * - Button with id="lang-toggle" switches languages and stores the choice.
 * - It also updates the URL to ?lang=<da|en> without reloading.
 */

'use strict';

(function () {
  const LANG_KEY = 'site.lang';
  const langButton = document.getElementById('lang-toggle');

  if (!langButton) return; // page has no language switch

  /** Dictionaries (extend as needed) */
  const T = {
    da: {
      'nav.about': 'Om os',
      'nav.rooms': 'Lokaler',
      'nav.school': 'Skolen (PGU)',
      'nav.contact': 'Kontakt os',
      'nav.book': 'Booking',

      'hero.title': 'Konferencecenter og skole – samme adresse.',
      'hero.subtitle': 'Fleksible konferencelokaler og et dedikeret team.',
      'hero.aboutBtn': 'Om os',
      'hero.bookBtn': 'Booking',

      'about.title': 'Om vores faciliteter',
      'about.subtitle': 'Adgangsforhold, parkering, offentlig transport og support på stedet.',
      'about.a1': 'Ladestandere til elbil',
      'about.a2': 'Forplejning',
      'about.a3': 'Central beliggenhed',

      'rooms.title': 'Lokaler',
      'rooms.subtitle': 'Lokaler for konferencer',
      'rooms.r1': 'Lokale 1 — op til 60 personer',
      'rooms.r2': 'Lokale 2 — op til 24 personer',
      'rooms.r3': 'Lokale 3 — op til 10 personer',

      'school.title': 'Skolen (PGU)',
      'school.subtitle': 'Vi er også en produktionsskole (PGU). Skolens tilbud er for tilmeldte elever og er ikke åbne som offentlige kurser.',
      'school.s1': 'BBA',
      'school.s2': 'IT',
      'school.s3': 'Medie & kultur',
      'school.link': 'Læs om skolen',

      'booking.title': 'Booking / forespørgsler',
      'booking.subtitle': 'Vi kobler dette til en rigtig formular i næste trin.',
      'booking.btn': 'Start en forespørgsel'
    },
    en: {
      'nav.about': 'About',
      'nav.rooms': 'Rooms',
      'nav.school': 'The School (PGU)',
      'nav.contact': 'Contact',
      'nav.book': 'Booking',

      'hero.title': 'Conference center and school — one campus.',
      'hero.subtitle': 'Flexible conference rooms and a dedicated team.',
      'hero.aboutBtn': 'About us',
      'hero.bookBtn': 'Book',

      'about.title': 'About our facilities',
      'about.subtitle': 'Accessibility, parking, public transport, and on-site support.',
      'about.a1': 'EV charging',
      'about.a2': 'Catering',
      'about.a3': 'Central location',

      'rooms.title': 'Rooms',
      'rooms.subtitle': 'Conference rooms',
      'rooms.r1': 'Room 1 — up to 60 people',
      'rooms.r2': 'Room 2 — up to 24 people',
      'rooms.r3': 'Room 3 — up to 10 people',

      'school.title': 'The School (PGU)',
      'school.subtitle': 'We are also a production school (PGU). The school’s offerings are for enrolled students and are not public courses.',
      'school.s1': 'BBA',
      'school.s2': 'IT',
      'school.s3': 'Media & culture',
      'school.link': 'About the school',

      'booking.title': 'Booking / enquiries',
      'booking.subtitle': 'We’ll connect this to a real form in the next step.',
      'booking.btn': 'Start an enquiry'
    }
  };

  /**
   * Apply all translations for a given language code ('da' | 'en').
   * - Updates <html lang="…"> for accessibility/SEO
   * - Replaces textContent of all [data-i18n] nodes
   * - Flips the flag/button label to the *target* language
   */
  function applyLanguage(lang) {
    const dict = T[lang] || T.da;
    document.documentElement.lang = lang;

    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (!key) return;
      const value = dict[key];
      if (value !== undefined) el.textContent = value;
    });

    // Update button to show the *other* language
    const next = lang === 'en' ? 'da' : 'en';
    langButton.textContent = next === 'en' ? '🇬🇧' : '🇩🇰';
    langButton.title = next === 'en' ? 'English' : 'Dansk';
    langButton.setAttribute('aria-label', next === 'en' ? 'Switch to English' : 'Skift til dansk');
    langButton.dataset.next = next;

    localStorage.setItem(LANG_KEY, lang);
  }

  // Initial language: ?lang=..., saved preference, or browser default
  const urlLang = new URLSearchParams(location.search).get('lang');
  const savedLang = localStorage.getItem(LANG_KEY);
  const browserDefault = (navigator.language || '').toLowerCase().startsWith('en') ? 'en' : 'da';
  const initialLang = (urlLang === 'en' || urlLang === 'da') ? urlLang : (savedLang || browserDefault);

  applyLanguage(initialLang);

  // Toggle button behavior
  langButton.addEventListener('click', () => {
    const next = langButton.dataset.next || (document.documentElement.lang === 'da' ? 'en' : 'da');
    applyLanguage(next);

    // Keep URL in sync without reloading
    const sp = new URLSearchParams(location.search);
    sp.set('lang', next);
    history.replaceState(null, '', location.pathname + '?' + sp.toString() + location.hash);
  });
})();
