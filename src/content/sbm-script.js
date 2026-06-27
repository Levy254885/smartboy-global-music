
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
