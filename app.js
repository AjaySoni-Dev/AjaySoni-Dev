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

  const ensureMeta = (name, content) => {
    let meta = document.querySelector(`meta[name="${name}"]`);
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', name);
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', content);
  };

  const ensurePropertyMeta = (property, content) => {
    let meta = document.querySelector(`meta[property="${property}"]`);
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('property', property);
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', content);
  };

  const ensureLink = (rel, href, extra = {}) => {
    let link = document.querySelector(`link[rel="${rel}"]`);
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', rel);
      document.head.appendChild(link);
    }
    link.setAttribute('href', href);
    Object.entries(extra).forEach(([key, value]) => link.setAttribute(key, value));
    return link;
  };

  const loadStylesheet = (id, href) => {
    if (document.getElementById(id)) return;
    const link = document.createElement('link');
    link.id = id;
    link.rel = 'stylesheet';
    link.href = href;
    document.head.appendChild(link);
  };

  const loadPortfolioEnhancements = () => {
    loadStylesheet('portfolio-enhancements', '/portfolio-enhancements.css?v=20260918-2');
    loadStylesheet('desktop-responsive', '/desktop-responsive.css?v=20260918-1');
  };

  const setupPortfolioActions = () => {
    const linkList = document.querySelector('.link-list');
    const resourcesCard = document.getElementById('resourcesCard');
    if (!linkList || !resourcesCard || document.querySelector('.resume-card')) return;

    const resumeCard = document.createElement('a');
    resumeCard.className = 'link-card resume-card reveal';
    resumeCard.style.setProperty('--delay', '430ms');
    resumeCard.href = '/Resume.pdf';
    resumeCard.download = 'Ajay_Soni_Resume.pdf';
    resumeCard.setAttribute('aria-label', 'Download Ajay Soni resume PDF');
    resumeCard.innerHTML = `
      <span class="icon-box icon-box--resume" aria-hidden="true">
        <svg viewBox="0 0 24 24">
          <path d="M7 3.5h7l3 3v7"/>
          <path d="M14 3.5v3h3"/>
          <path d="M7 3.5h7M7 3.5v17h7"/>
          <path d="M17 14v6M14.5 17.5 17 20l2.5-2.5"/>
        </svg>
      </span>
      <span class="link-copy">
        <span class="link-title">Download Resume</span>
        <span class="link-subtitle">Ajay Soni · PDF</span>
      </span>
      <span class="link-arrow" aria-hidden="true">
        <svg viewBox="0 0 24 24"><path d="M5 12h13M14 7l5 5-5 5"/></svg>
      </span>`;

    const devAriseCard = document.createElement('a');
    devAriseCard.className = 'link-card devarise-card reveal';
    devAriseCard.style.setProperty('--delay', '470ms');
    devAriseCard.href = 'https://devarise.in/';
    devAriseCard.target = '_blank';
    devAriseCard.rel = 'noopener noreferrer';
    devAriseCard.setAttribute('aria-label', 'Open Dev Arise Platform');
    devAriseCard.innerHTML = `
      <span class="icon-box icon-box--devarise" aria-hidden="true">
        <img class="devarise-wordmark" src="/assets/devarise-wordmark.svg" alt="" width="970" height="213" decoding="async" />
      </span>
      <span class="link-copy">
        <span class="link-title">Dev Arise Platform</span>
        <span class="link-subtitle">devarise.in</span>
      </span>
      <span class="link-arrow" aria-hidden="true">
        <svg viewBox="0 0 24 24"><path d="M5 12h13M14 7l5 5-5 5"/></svg>
      </span>`;

    linkList.insertBefore(resumeCard, resourcesCard);
    resourcesCard.replaceWith(devAriseCard);
  };

  const applySeoMetadata = () => {
    const canonicalUrl = 'https://ajaysonidev.vercel.app/';
    const profileImage = `${canonicalUrl}assets/profile.jpg`;
    const title = 'Ajay Soni | AI System Builder & SAS Certified Associate';
    const description = 'Ajay Soni is an AI System Builder and SAS Certified Associate focused on applied AI/ML, computer vision, practical ML systems, and product engineering.';

    document.title = title;
    ensureMeta('description', `${description} Explore GitHub, LinkedIn, Dev Arise, resume, projects, and professional contact links.`);
    ensureMeta('author', 'Ajay Soni');
    ensureMeta('robots', 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1');
    ensureMeta('googlebot', 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1');
    ensureMeta('bingbot', 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1');
    ensureMeta('keywords', 'Ajay Soni, AI System Builder, Applied AI, Machine Learning, Computer Vision, AI ML, SAS Certified Associate, Python, AI Systems, DevArise, AjaySoni-Dev, ajaysoni-dev');
    ensureMeta('application-name', 'Ajay Soni');
    ensureMeta('creator', 'Ajay Soni');

    ensureLink('canonical', canonicalUrl);
    const icon = ensureLink('icon', '/assets/profile.jpg?v=20260917-photo-1', { type: 'image/jpeg', sizes: 'any' });
    icon.setAttribute('fetchpriority', 'high');
    ensureLink('apple-touch-icon', '/assets/profile.jpg?v=20260917-photo-1', { sizes: '180x180' });
    ensureLink('manifest', '/site.webmanifest?v=20260917-photo-1');

    ensurePropertyMeta('og:type', 'profile');
    ensurePropertyMeta('og:site_name', 'Ajay Soni');
    ensurePropertyMeta('og:locale', 'en_IN');
    ensurePropertyMeta('og:title', title);
    ensurePropertyMeta('og:description', 'Applied AI/ML and computer vision systems builder. Explore Ajay Soni’s professional profiles, resume, projects, and contact links.');
    ensurePropertyMeta('og:url', canonicalUrl);
    ensurePropertyMeta('og:image', profileImage);
    ensurePropertyMeta('og:image:secure_url', profileImage);
    ensurePropertyMeta('og:image:type', 'image/jpeg');
    ensurePropertyMeta('og:image:alt', 'Ajay Soni — AI System Builder and SAS Certified Associate');
    ensurePropertyMeta('profile:first_name', 'Ajay');
    ensurePropertyMeta('profile:last_name', 'Soni');

    ensureMeta('twitter:card', 'summary_large_image');
    ensureMeta('twitter:title', title);
    ensureMeta('twitter:description', 'Applied AI/ML and computer vision systems builder. Explore projects, resume, and professional links.');
    ensureMeta('twitter:image', profileImage);
    ensureMeta('twitter:image:alt', 'Ajay Soni — AI System Builder and SAS Certified Associate');
  };

  const preferredTheme = () => {
    const stored = localStorage.getItem(storageKey);
    if (stored === 'light' || stored === 'dark') return stored;
    return 'light';
  };

  const applyTheme = (theme, persist = false) => {
    root.dataset.theme = theme;
    if (persist) localStorage.setItem(storageKey, theme);

    const dark = theme === 'dark';
    themeToggle?.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
    themeMeta?.setAttribute('content', dark ? '#0c1713' : '#eaf8f1');

    if (footerLinkedIn) {
      footerLinkedIn.style.color = 'var(--muted)';
      footerLinkedIn.style.removeProperty('background');
      footerLinkedIn.style.removeProperty('border-color');
    }

    if (footerLinkedInIcon) {
      footerLinkedInIcon.style.width = '20px';
      footerLinkedInIcon.style.height = '20px';
      footerLinkedInIcon.style.display = 'block';
      footerLinkedInIcon.style.overflow = 'visible';
      footerLinkedInIcon.style.fill = 'currentColor';
      footerLinkedInIcon.style.stroke = 'none';
    }
  };

  const showToast = (message) => {
    if (!toast) return;
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

  loadPortfolioEnhancements();
  setupPortfolioActions();
  applySeoMetadata();
  applyTheme(preferredTheme());

  themeToggle?.addEventListener('click', () => {
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    applyTheme(next, true);
  });

  copyButton?.addEventListener('click', async () => {
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

  requestAnimationFrame(() => document.body.classList.add('is-ready'));
})();
