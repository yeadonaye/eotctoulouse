// Smooth scroll for internal links (e.g., back to top)
const links = document.querySelectorAll('a[href^="#"]');
links.forEach(link => {
  link.addEventListener('click', (e) => {
    const targetId = link.getAttribute('href');
    if (targetId && targetId.length > 1) {
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  });
});

// Footer year
const yearSpan = document.querySelector('#year');
if (yearSpan) yearSpan.textContent = new Date().getFullYear();

// Mobile hamburger toggle for church pages
const headerEl = document.querySelector('header.header');
const toggleBtn = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');
if (headerEl && toggleBtn) {
  const setExpanded = (expanded) => toggleBtn.setAttribute('aria-expanded', String(expanded));
  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const willOpen = !headerEl.classList.contains('menu-open');
    headerEl.classList.toggle('menu-open', willOpen);
    setExpanded(willOpen);
  });
  document.addEventListener('click', (e) => {
    if (!headerEl.classList.contains('menu-open')) return;
    if (navMenu && navMenu.contains(e.target)) return;
    if (toggleBtn.contains(e.target)) return;
    headerEl.classList.remove('menu-open');
    setExpanded(false);
  });
  if (navMenu) {
    navMenu.addEventListener('click', (e) => {
      const a = e.target.closest('a');
      if (!a) return;
      headerEl.classList.remove('menu-open');
      setExpanded(false);
    });
  }
}

