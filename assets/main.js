/**
 * main.js
 * - Mobile navigation toggle (hamburger)
 * - Footer year
 * Safe to include on all pages (checks for elements before using).
 */
'use strict';

document.addEventListener('DOMContentLoaded', () => {
  // Footer year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile nav toggle
  const hamburger = document.querySelector('.hamburger');
  const nav = document.getElementById('primary-nav');

  if (hamburger && nav) {
    hamburger.addEventListener('click', () => {
      const open = nav.getAttribute('data-open') === 'true';
      nav.setAttribute('data-open', String(!open));
      hamburger.setAttribute('aria-expanded', String(!open));
    });
  }
});