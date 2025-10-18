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

