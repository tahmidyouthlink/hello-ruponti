document.documentElement.classList.add('js');

document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.header-group');
  const action = document.querySelector('.action-group');
  const footer = document.querySelector('.footer-group');
  if (header) setTimeout(() => header.classList.add('show'), 200);
  if (action) setTimeout(() => action.classList.add('show'), 400);
  if (footer) setTimeout(() => footer.classList.add('show'), 600);

  const en = document.querySelector('.ruponti-en');
  const bn = document.querySelector('.ruponti-bn');
  if (!en || !bn) return;

  // Ensure initial state is EN visible, BN hidden
  en.classList.add('show');
  bn.classList.remove('show');

  let showingEn = true;
  const swap = () => {
    if (showingEn) {
      en.classList.remove('show');
      bn.classList.add('show');
    } else {
      bn.classList.remove('show');
      en.classList.add('show');
    }
    showingEn = !showingEn;
  };

  // Start with a gentle delay, then crossfade regularly
  setTimeout(() => {
    swap();
    setInterval(swap, 3000);
  }, 2000);
});

// --- Modal logic ---
(() => {
  const openBtn = document.querySelector('.cta-open');
  const overlay = document.getElementById('earlyModal');
  const card = overlay?.querySelector('.modal-card');
  const closeBtn = overlay?.querySelector('.modal-close');
  const cancelBtn = overlay?.querySelector('.modal-cancel');
  const firstField = overlay?.querySelector('input[type="email"]');

  const open = () => {
    if (!overlay) return;
    overlay.classList.add('show');
    overlay.setAttribute('aria-hidden', 'false');
    setTimeout(() => firstField?.focus(), 50);
  };

  const close = () => {
    if (!overlay) return;
    overlay.classList.remove('show');
    overlay.setAttribute('aria-hidden', 'true');
    openBtn?.focus();
  };

  openBtn?.addEventListener('click', open);
  closeBtn?.addEventListener('click', close);
  cancelBtn?.addEventListener('click', close);
  overlay?.addEventListener('click', (e) => {
    if (e.target === overlay) close();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay?.classList.contains('show')) close();
  });
})();

// --- Minimal modal logic with mailto compose ---
(() => {
  const openBtn = document.querySelector('.cta-open');
  const overlay = document.getElementById('earlyModal');
  const closeBtn = overlay?.querySelector('.modal-close');
  const cancelBtn = overlay?.querySelector('.modal-cancel');
  const form = overlay?.querySelector('#earlyForm');
  const textarea = overlay?.querySelector('.modal-textarea');
  const reveal = overlay?.querySelector('.reveal-email');
  const emailInput = overlay?.querySelector('.modal-email');

  const open = () => {
    if (!overlay) return;
    overlay.classList.add('show');
    overlay.setAttribute('aria-hidden', 'false');
    setTimeout(() => textarea?.focus(), 60);
  };

  const close = () => {
    if (!overlay) return;
    overlay.classList.remove('show');
    overlay.setAttribute('aria-hidden', 'true');
    openBtn?.focus();
  };

  openBtn?.addEventListener('click', open);
  closeBtn?.addEventListener('click', close);
  cancelBtn?.addEventListener('click', close);
  overlay?.addEventListener('click', (e) => {
    if (e.target === overlay) close();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay?.classList.contains('show')) close();
  });

  /* Reveal optional email field
  reveal?.addEventListener('click', () => {
    const isHidden = emailInput?.hasAttribute('hidden');
    if (isHidden) {
      emailInput?.removeAttribute('hidden');
      reveal.setAttribute('aria-expanded', 'true');
      emailInput?.focus();
    } else {
      emailInput?.setAttribute('hidden', '');
      reveal.setAttribute('aria-expanded', 'false');
    }
  }); */

  // Compose mailto on submit
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const thoughts = (textarea?.value || '').trim();
    const email = (emailInput?.value || '').trim();
    const subject = encodeURIComponent('Ruponti early note');
    let body = thoughts ? thoughts : '';
    if (email) body += `\n\nReply to: ${email}`;
    const href = `mailto:hello@helloruponti.com?subject=${subject}&body=${encodeURIComponent(body)}`;
    window.location.href = href;
    close();
  });
})();
