
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  reveals.forEach(el => observer.observe(el));

  document.querySelector('.form-submit').addEventListener('click', function() {
    this.textContent = 'Message Sent ✓';
    this.style.background = '#990000';
    setTimeout(() => {
      this.textContent = 'Send Message';
      this.style.background = '';
    }, 3000);
  });

  // ── Mobile hamburger drawer ──
  (function(){
    const burger = document.getElementById('navBurger');
    const drawer = document.getElementById('mobileDrawer');
    const scrim  = document.getElementById('mobileScrim');
    if (!burger || !drawer || !scrim) return;

    const open = () => {
      burger.classList.add('is-open');
      burger.setAttribute('aria-expanded','true');
      drawer.classList.add('is-open');
      drawer.setAttribute('aria-hidden','false');
      scrim.classList.add('is-open');
      document.body.classList.add('drawer-open');
    };
    const close = () => {
      burger.classList.remove('is-open');
      burger.setAttribute('aria-expanded','false');
      drawer.classList.remove('is-open');
      drawer.setAttribute('aria-hidden','true');
      scrim.classList.remove('is-open');
      document.body.classList.remove('drawer-open');
    };
    const toggle = () => burger.classList.contains('is-open') ? close() : open();

    burger.addEventListener('click', toggle);
    scrim.addEventListener('click', close);
    drawer.querySelectorAll('[data-close]').forEach(a => a.addEventListener('click', close));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
    window.addEventListener('resize', () => { if (window.innerWidth > 900) close(); });
  })();
