// Optimize background image loading with blur effect
const header = document.querySelector('header');
const img = new Image();

img.onload = function() {
  // Remove loading class and add loaded class for smooth transition
  header.classList.remove('loading');
  header.classList.add('loaded');
};

img.onerror = function() {
  // If image fails to load, still remove loading state
  header.classList.remove('loading');
  console.error('Failed to load background image');
};

// Start loading the image
img.src = '/img/egliseinterior.jpg';

// For the hamburger menu (when on mobile device)
const menuToggle = document.querySelector('.menu-toggle');
const navList = document.querySelector('nav ul');

if (menuToggle && navList) {
  menuToggle.addEventListener('click', () => {
    const isActive = navList.classList.toggle('active');
    // Toggle expanded state and header background expansion
    menuToggle.setAttribute('aria-expanded', String(isActive));
    if (header) header.classList.toggle('menu-open', isActive);
  });

  // Close the menu when clicking outside (mobile)
  document.addEventListener('click', (event) => {
    if (!navList.contains(event.target) && !menuToggle.contains(event.target)) {
      navList.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
      if (header) header.classList.remove('menu-open');
    }
  });
}
