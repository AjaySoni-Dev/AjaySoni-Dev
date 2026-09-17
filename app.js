(() => {
  'use strict';

  const root = document.documentElement;
  const themeToggle = document.getElementById('themeToggle');
  const copyButton = document.getElementById('copyEmail');
  const toast = document.getElementById('toast');
  const themeMeta = document.querySelector('meta[name="theme-color"]');
  const footerLinkedIn = document.querySelector('.social-button[aria-label="LinkedIn"]');
  const footerLinkedInIcon = footerLinkedIn?.querySelector('svg');
  const storageKey = 'ajay-links-theme';
  let toastTimer;

  const preferredTheme = () => {
    const stored = localStorage.getItem(storageKey);
    if (stored === 'light' || stored === 'dark') return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  const applyTheme = (theme, persist = false) => {
    root.dataset.theme = theme;
    if (persist) localStorage.setItem(storageKey, theme);

    const dark = theme === 'dark';
    themeToggle.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
    themeMeta?.setAttribute('content', dark ? '#0c1713' : '#eaf8f1');

    // Keep the LinkedIn footer mark crisp and recognisable in both themes.
    // The inline SVG uses currentColor for its blue tile and white internal glyphs.
    if (footerLinkedIn) {
      footerLinkedIn.style.color = dark ? '#63aee8' : '#0a66c2';
      footerLinkedIn.style.background = dark ? 'rgba(255,255,255,.12)' : 'rgba(255,255,255,.94)';
      footerLinkedIn.style.borderColor = dark ? 'rgba(99,174,232,.20)' : 'rgba(10,102,194,.12)';
    }

    if (footerLinkedInIcon) {
      footerLinkedInIcon.style.width = '20px';
      footerLinkedInIcon.style.height = '20px';
      footerLinkedInIcon.style.display = 'block';
      footerLinkedInIcon.style.overflow = 'visible';
    }
  };

  const showToast = (message) => {
    toast.textContent = message;
    toast.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove('is-visible'), 1800);
  };

  const copyText = async (text) => {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return;
    }

    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    textarea.style.pointerEvents = 'none';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
  };

  applyTheme(preferredTheme());

  themeToggle.addEventListener('click', () => {
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    applyTheme(next, true);
  });

  copyButton.addEventListener('click', async () => {
    const email = copyButton.dataset.email;
    try {
      await copyText(email);
      copyButton.classList.add('is-copied');
      showToast('Email copied');
      window.setTimeout(() => copyButton.classList.remove('is-copied'), 1600);
    } catch {
      showToast('Copy failed — tap the email instead');
    }
  });

  const colorPreference = window.matchMedia('(prefers-color-scheme: dark)');
  const onSystemThemeChange = (event) => {
    if (!localStorage.getItem(storageKey)) {
      applyTheme(event.matches ? 'dark' : 'light');
    }
  };

  if (typeof colorPreference.addEventListener === 'function') {
    colorPreference.addEventListener('change', onSystemThemeChange);
  } else if (typeof colorPreference.addListener === 'function') {
    colorPreference.addListener(onSystemThemeChange);
  }

  requestAnimationFrame(() => document.body.classList.add('is-ready'));
})();
