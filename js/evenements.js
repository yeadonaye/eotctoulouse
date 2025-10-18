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
      const titleElement = document.createElement('h3');
      titleElement.textContent = event.title;
      const descriptionElement = document.createElement('p');
      descriptionElement.textContent = event.description;

      contentContainer.appendChild(titleElement);
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

