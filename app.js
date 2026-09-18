(() => {
  'use strict';

  const root = document.documentElement;
  const copyButton = document.getElementById('copyEmail');
  const toast = document.getElementById('toast');
  const themeMeta = document.querySelector('meta[name="theme-color"]');
  const footerLinkedIn = document.querySelector('.social-button[aria-label="LinkedIn"]');
  const footerLinkedInIcon = footerLinkedIn?.querySelector('svg');
  let toastTimer;

  // The portfolio is intentionally light-only. Remove any preference stored by
  // earlier versions and force the light token set before the first paint cycle.
  root.dataset.theme = 'light';
  localStorage.removeItem('ajay-links-theme');
  themeMeta?.setAttribute('content', '#eaf8f1');

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

  loadStylesheet('portfolio-enhancements', '/portfolio-enhancements.css?v=20260918-8');
  loadStylesheet('desktop-responsive', '/desktop-responsive.css?v=20260918-2');

  const canonicalUrl = 'https://www.ajaysonidev.site/';
  const profileImage = `${canonicalUrl}assets/profile.jpg`;
  const title = 'Ajay Soni | Applied AI/ML & Computer Vision Systems Builder';
  const description = 'Ajay Soni is an Applied AI/ML & Computer Vision Systems Builder focused on practical ML systems, computer vision, AI systems, and product engineering. SAS Certified Associate.';

  document.title = title;
  ensureMeta('description', `${description} Explore projects, GitHub, LinkedIn, DevArise, resume, and professional contact links.`);
  ensureMeta('author', 'Ajay Soni');
  ensureMeta('robots', 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1');
  ensureMeta('googlebot', 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1');
  ensureMeta('bingbot', 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1');
  ensureMeta('keywords', 'Ajay Soni, AI System Builder, Applied AI, Machine Learning, Computer Vision, AI ML, SAS Certified Associate, Python, AI Systems, DevArise, AjaySoniDev, ajaysonidev');
  ensureMeta('application-name', 'Ajay Soni');
  ensureMeta('creator', 'Ajay Soni');

  ensureLink('canonical', canonicalUrl);
  const icon = ensureLink('icon', '/favicon.png?v=20260918-domain-1', { type: 'image/png', sizes: '96x96' });
  icon.setAttribute('fetchpriority', 'high');
  ensureLink('apple-touch-icon', '/assets/profile.jpg?v=20260918-domain-1', { sizes: '320x320' });
  ensureLink('manifest', '/site.webmanifest?v=20260918-domain-1');

  ensurePropertyMeta('og:type', 'profile');
  ensurePropertyMeta('og:site_name', 'Ajay Soni');
  ensurePropertyMeta('og:locale', 'en_IN');
  ensurePropertyMeta('og:title', title);
  ensurePropertyMeta('og:description', 'Applied AI/ML and computer vision systems builder. Explore Ajay Soni’s projects, professional profiles, resume, and contact links.');
  ensurePropertyMeta('og:url', canonicalUrl);
  ensurePropertyMeta('og:image', profileImage);
  ensurePropertyMeta('og:image:secure_url', profileImage);
  ensurePropertyMeta('og:image:type', 'image/jpeg');
  ensurePropertyMeta('og:image:alt', 'Ajay Soni — Applied AI/ML & Computer Vision Systems Builder');
  ensurePropertyMeta('profile:first_name', 'Ajay');
  ensurePropertyMeta('profile:last_name', 'Soni');

  ensureMeta('twitter:card', 'summary_large_image');
  ensureMeta('twitter:title', title);
  ensureMeta('twitter:description', 'Applied AI/ML and computer vision systems builder. Explore projects, resume, and professional links.');
  ensureMeta('twitter:image', profileImage);
  ensureMeta('twitter:image:alt', 'Ajay Soni — Applied AI/ML & Computer Vision Systems Builder');

  if (footerLinkedIn) {
    footerLinkedIn.style.color = 'var(--muted)';
  }
  if (footerLinkedInIcon) {
    footerLinkedInIcon.style.width = '20px';
    footerLinkedInIcon.style.height = '20px';
    footerLinkedInIcon.style.display = 'block';
    footerLinkedInIcon.style.overflow = 'visible';
    footerLinkedInIcon.style.fill = 'currentColor';
    footerLinkedInIcon.style.stroke = 'none';
  }

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


  const imageViewerTrigger = document.getElementById('imageViewerTrigger');
  const imageViewer = document.getElementById('imageViewer');
  const imageViewerImage = document.getElementById('imageViewerImage');
  const imageViewerClose = document.getElementById('imageViewerClose');
  const imageViewerBackdrop = imageViewer?.querySelector('[data-image-viewer-close]');
  let imageViewerReturnFocus = null;
  let imageViewerHideTimer = null;

  const syncImageViewerAspect = () => {
    if (!imageViewer || !imageViewerImage || !imageViewerImage.naturalWidth || !imageViewerImage.naturalHeight) return;
    const ratio = imageViewerImage.naturalWidth / imageViewerImage.naturalHeight;
    imageViewer.style.setProperty('--viewer-ratio', String(ratio));
    imageViewer.style.setProperty('--viewer-aspect', `${imageViewerImage.naturalWidth} / ${imageViewerImage.naturalHeight}`);
  };

  const openImageViewer = () => {
    if (!imageViewer || !imageViewerTrigger || !imageViewerImage) return;
    clearTimeout(imageViewerHideTimer);
    imageViewerReturnFocus = document.activeElement;

    if (!imageViewerImage.getAttribute('src')) {
      imageViewerImage.setAttribute('src', imageViewerImage.dataset.src || '/assets/image.jpg');
    }

    if (imageViewerImage.complete) {
      syncImageViewerAspect();
    } else {
      imageViewerImage.addEventListener('load', syncImageViewerAspect, { once: true });
    }

    imageViewer.hidden = false;
    imageViewerTrigger.setAttribute('aria-expanded', 'true');
    document.body.classList.add('image-viewer-open');

    requestAnimationFrame(() => {
      imageViewer.classList.add('is-open');
      imageViewerClose?.focus({ preventScroll: true });
    });
  };

  const closeImageViewer = () => {
    if (!imageViewer || imageViewer.hidden) return;
    imageViewer.classList.remove('is-open');
    imageViewerTrigger?.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('image-viewer-open');

    imageViewerHideTimer = window.setTimeout(() => {
      imageViewer.hidden = true;
      const focusTarget = imageViewerReturnFocus instanceof HTMLElement
        ? imageViewerReturnFocus
        : imageViewerTrigger;
      focusTarget?.focus({ preventScroll: true });
    }, 190);
  };

  imageViewerTrigger?.addEventListener('click', openImageViewer);
  imageViewerClose?.addEventListener('click', closeImageViewer);
  imageViewerBackdrop?.addEventListener('click', closeImageViewer);
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && imageViewer && !imageViewer.hidden) {
      closeImageViewer();
    }
  });

  requestAnimationFrame(() => document.body.classList.add('is-ready'));
})();
