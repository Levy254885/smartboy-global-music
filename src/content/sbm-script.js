
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

  // ── Inquiry form → email via FormSubmit (free AJAX endpoint) ──
  (function(){
    const form = document.getElementById('inquiryForm');
    if (!form || form.dataset.bound === '1') return; // guard against double-binding
    form.dataset.bound = '1';

    const ENDPOINT = 'https://formsubmit.co/ajax/info@smartboymanagement.co.ke';
    const btn = form.querySelector('.form-submit');
    const status = document.getElementById('inquiryStatus');
    const idleLabel = btn.textContent;
    let sending = false;
    let resetTimer = null;

    const showStatus = (msg, type) => {
      status.textContent = msg;
      status.className = 'form-status' + (type ? ' is-' + type : '');
    };
    const clearInvalid = () => form.querySelectorAll('[aria-invalid]').forEach(el => el.removeAttribute('aria-invalid'));

    function validate(data) {
      const missing = [];
      if (!data.name.trim()) missing.push(['name', 'your full name']);
      if (!data.email.trim()) missing.push(['email', 'your email address']);
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email.trim())) return [['email', 'a valid email address']];
      if (!data.inquiry_type) missing.push(['inquiry_type', 'an inquiry type']);
      if (!data.message.trim()) missing.push(['message', 'a message']);
      if (data.phone.trim() && !/^[+()\d\s.-]{7,20}$/.test(data.phone.trim())) return [['phone', 'a valid phone number (or leave it blank)']];
      return missing;
    }

    form.addEventListener('submit', async function(e) {
      e.preventDefault();
      if (sending) return; // prevent duplicate submissions
      clearInvalid();

      const fd = new FormData(form);
      const data = {
        name: String(fd.get('name') || ''),
        email: String(fd.get('email') || ''),
        phone: String(fd.get('phone') || ''),
        inquiry_type: String(fd.get('inquiry_type') || ''),
        message: String(fd.get('message') || ''),
      };

      const problems = validate(data);
      if (problems.length) {
        problems.forEach(([n]) => form.elements[n].setAttribute('aria-invalid', 'true'));
        form.elements[problems[0][0]].focus();
        showStatus('Please enter ' + problems.map(p => p[1]).join(', ') + '.', 'error');
        return;
      }

      // Bots fill the hidden honeypot: pretend success, send nothing.
      if (String(fd.get('_honey') || '')) {
        form.reset();
        showStatus('Thank you! Your message has been sent.', 'success');
        return;
      }

      sending = true;
      clearTimeout(resetTimer);
      btn.disabled = true;
      btn.textContent = 'Sending…';
      form.setAttribute('aria-busy', 'true');
      showStatus('Sending your message…', 'info');

      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 20000);

      try {
        const res = await fetch(ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify({
            ...data,
            _subject: 'New ' + data.inquiry_type + ' inquiry – Smartboy Global Music',
            _template: 'table',
            _captcha: 'false',
            _honey: '',
          }),
          signal: controller.signal,
        });
        let result = null;
        try { result = await res.json(); } catch (_) { /* non-JSON response */ }
        const ok = res.ok && result && (result.success === true || result.success === 'true');
        if (!ok) throw new Error((result && result.message) || 'Request failed (' + res.status + ')');

        form.reset();
        showStatus('Thank you! Your message has been sent. We will get back to you shortly.', 'success');
        btn.textContent = 'Message Sent ✓';
        resetTimer = setTimeout(() => { btn.textContent = idleLabel; }, 4000);
      } catch (err) {
        console.error('Inquiry submission failed', err);
        const offline = typeof navigator !== 'undefined' && navigator.onLine === false;
        showStatus(
          offline
            ? 'You appear to be offline. Please check your connection and try again.'
            : 'Sorry, your message could not be sent. Please try again, or email us at info@smartboymanagement.co.ke.',
          'error'
        );
        btn.textContent = idleLabel;
      } finally {
        clearTimeout(timeout);
        sending = false;
        btn.disabled = false;
        form.removeAttribute('aria-busy');
      }
    });
  })();

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
