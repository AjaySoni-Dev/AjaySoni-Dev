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

  const applySeoMetadata = () => {
    const canonicalUrl = 'https://ajaysonidev.vercel.app/';
    const profileImage = `${canonicalUrl}assets/profile.jpg`;
    const title = 'Ajay Soni | AI System Builder & SAS Certified Associate';
    const description = 'Ajay Soni is an AI System Builder and SAS Certified Associate focused on applied AI/ML, computer vision, practical ML systems, and product engineering.';

    document.title = title;
    ensureMeta('description', `${description} Explore GitHub, LinkedIn, projects, and professional contact links.`);
    ensureMeta('author', 'Ajay Soni');
    ensureMeta('robots', 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1');
    ensureMeta('googlebot', 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1');
    ensureMeta('bingbot', 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1');
    ensureMeta('keywords', 'Ajay Soni, AI System Builder, Applied AI, Machine Learning, Computer Vision, AI ML, SAS Certified Associate, Python, AI Systems, AjaySoni-Dev, ajaysoni-dev');
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
    ensurePropertyMeta('og:description', 'Applied AI/ML and computer vision systems builder. Explore Ajay Soni’s professional profiles, projects, and contact links.');
    ensurePropertyMeta('og:url', canonicalUrl);
    ensurePropertyMeta('og:image', profileImage);
    ensurePropertyMeta('og:image:secure_url', profileImage);
    ensurePropertyMeta('og:image:type', 'image/jpeg');
    ensurePropertyMeta('og:image:alt', 'Ajay Soni — AI System Builder and SAS Certified Associate');
    ensurePropertyMeta('profile:first_name', 'Ajay');
    ensurePropertyMeta('profile:last_name', 'Soni');

    ensureMeta('twitter:card', 'summary_large_image');
    ensureMeta('twitter:title', title);
    ensureMeta('twitter:description', 'Applied AI/ML and computer vision systems builder. Explore projects and professional links.');
    ensureMeta('twitter:image', profileImage);
    ensureMeta('twitter:image:alt', 'Ajay Soni — AI System Builder and SAS Certified Associate');

    if (!document.getElementById('ajay-structured-data')) {
      const structuredData = document.createElement('script');
      structuredData.id = 'ajay-structured-data';
      structuredData.type = 'application/ld+json';
      structuredData.textContent = JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Person',
            '@id': `${canonicalUrl}#person`,
            name: 'Ajay Soni',
            alternateName: ['AjaySoni-Dev', 'ajaysoni-dev'],
            url: canonicalUrl,
            image: {
              '@type': 'ImageObject',
              url: profileImage,
              contentUrl: profileImage,
              caption: 'Ajay Soni'
            },
            email: 'mailto:officialprofessionalmail@gmail.com',
            jobTitle: 'AI System Builder',
            description,
            sameAs: [
              'https://github.com/AjaySoni-Dev',
              'https://www.linkedin.com/in/ajaysoni-dev/',
              'https://www.instagram.com/im_ajay.soni/'
            ],
            knowsAbout: [
              'Artificial Intelligence',
              'Machine Learning',
              'Computer Vision',
              'Applied AI/ML',
              'AI Systems',
              'Python',
              'SAS Visual Statistics',
              'Product Engineering'
            ],
            hasCredential: {
              '@type': 'EducationalOccupationalCredential',
              name: 'SAS Certified Associate: Modeling Using SAS Visual Statistics',
              credentialCategory: 'Professional Certification'
            }
          },
          {
            '@type': 'WebSite',
            '@id': `${canonicalUrl}#website`,
            url: canonicalUrl,
            name: 'Ajay Soni',
            alternateName: 'Ajay Soni Professional Profile',
            description: 'Official professional links and portfolio gateway for Ajay Soni.',
            inLanguage: 'en',
            publisher: { '@id': `${canonicalUrl}#person` }
          },
          {
            '@type': 'ProfilePage',
            '@id': `${canonicalUrl}#profilepage`,
            url: canonicalUrl,
            name: 'Ajay Soni | AI System Builder',
            description: 'Official profile and professional links for Ajay Soni.',
            mainEntity: { '@id': `${canonicalUrl}#person` },
            isPartOf: { '@id': `${canonicalUrl}#website` },
            primaryImageOfPage: {
              '@type': 'ImageObject',
              url: profileImage
            },
            inLanguage: 'en'
          }
        ]
      });
      document.head.appendChild(structuredData);
    }
  };

  const preferredTheme = () => {
    const stored = localStorage.getItem(storageKey);
    if (stored === 'light' || stored === 'dark') return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
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
