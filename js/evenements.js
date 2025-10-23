// Footer: Update copyright year dynamically
const yearElement = document.querySelector('#year');
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

// Load events dynamically from events.json
async function loadEvents() {
  try {
    const response = await fetch('data/events.json');
    if (!response.ok) {
      throw new Error('Failed to load events');
    }
    const events = await response.json();

    const eventsList = document.getElementById('events-list');
    const noEventsMessage = document.getElementById('no-events');

    if (!events || events.length === 0) {
      noEventsMessage.style.display = 'block';
      return;
    }

    events.forEach(event => {
      const listItem = document.createElement('li');
      listItem.className = event.photo ? 'item with-photo' : 'item';

      const dateElement = document.createElement('div');
      dateElement.className = 'date';
      dateElement.textContent = event.date;
      if (event.time) {
        const timeElement = document.createElement('div');
        timeElement.className = 'time';
        timeElement.textContent = event.time;
        dateElement.appendChild(timeElement);
      }
      listItem.appendChild(dateElement);

      if (event.photo) {
        const photoElement = document.createElement('img');
        photoElement.className = 'item-photo';
        photoElement.src = event.photo;
        photoElement.alt = event.title;
        photoElement.loading = 'lazy';
        listItem.appendChild(photoElement);
      }

      const contentContainer = document.createElement('div');
      contentContainer.className = 'content';
      const titleElement = document.createElement('h3');
      titleElement.textContent = event.title;
      const descriptionElement = document.createElement('p');
      descriptionElement.className = 'description';
      descriptionElement.textContent = event.description;

      // Append in exact visual order: title, location, description
      contentContainer.appendChild(titleElement);
      if (event.location) {
        const locationElement = document.createElement(event.locationUrl ? 'a' : 'p');
        locationElement.className = 'location';
        locationElement.textContent = `📍 ${event.location}`;
        if (event.locationUrl) {
          locationElement.href = event.locationUrl;
          locationElement.target = '_blank';
          locationElement.rel = 'noopener noreferrer';
          locationElement.setAttribute('aria-label', `Ouvrir l'emplacement pour ${event.title}`);
        }
        contentContainer.appendChild(locationElement);
      }
      contentContainer.appendChild(descriptionElement);
      listItem.appendChild(contentContainer);
      eventsList.appendChild(listItem);
    });
  } catch (error) {
    console.error('Error loading events:', error);
    const noEvents = document.getElementById('no-events');
    if (noEvents) noEvents.style.display = 'block';
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadEvents);
} else {
  loadEvents();
}

// Mobile hamburger menu
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

// Render language separators without leading pipe based on visible links
function renderLangSeparators() {
  document.querySelectorAll('.lang-switch').forEach((sw) => {
    sw.querySelectorAll('.sep').forEach((s) => s.remove());
    const links = Array.from(sw.querySelectorAll('a')).filter(a => getComputedStyle(a).display !== 'none');
    for (let i = 1; i < links.length; i++) {
      const sep = document.createElement('span');
      sep.className = 'sep';
      sep.textContent = '|';
      links[i].before(sep);
    }
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderLangSeparators);
} else {
  renderLangSeparators();
}

