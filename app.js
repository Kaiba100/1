const places = [
  { name: 'The quieter Riviera', location: 'CINQUE TERRE, ITALY', type: 'coast', tag: 'COASTAL RESET', image: 'photo-1498307833015-e7b400441eb8', alt: 'Colorful Italian coastal village above the Mediterranean', description: 'Sea-salted days. Nowhere to rush.', detail: 'Follow the coastal trails between colorful villages, stop for fresh focaccia, and leave an afternoon open for a swim. Go in May or September for softer light and quieter paths.', plan: 'Day 1: Wander through the villages. Day 2: Walk a coastal trail and swim. Day 3: A slow breakfast by the harbor.' },
  { name: 'A cabin kind of quiet', location: 'THE DOLOMITES, ITALY', type: 'nature', tag: 'OFF THE GRID', image: 'photo-1464822759023-fed622ff2c3b', alt: 'Sunlight falling across dramatic mountain peaks', description: 'Big mountains. Small, beautiful moments.', detail: 'Trade notifications for mountain views. Base yourself in a small alpine village, take a gentle hike, and find a terrace for a long lunch. June through September is ideal for walking.', plan: 'Day 1: Settle into an alpine village. Day 2: Take a scenic hike suited to your ability. Day 3: Coffee, fresh air, and one last view.' },
  { name: 'The art of getting lost', location: 'LISBON, PORTUGAL', type: 'city', tag: 'SLOW CITY DAYS', image: 'photo-1555881400-74d7acaacd8b', alt: 'Lisbon streets and colorful historic buildings', description: 'Sunlit streets. One more pastel de nata.', detail: 'Discover tiled facades, neighborhood bakeries, and tiny bookshops. Walk the hills at your own pace and catch sunset from a miradouro. Spring and autumn are lovely times to explore.', plan: 'Day 1: Explore Alfama on foot. Day 2: Bakeries, bookshops, and a museum. Day 3: Enjoy a waterfront walk before heading home.' }
];
const cards = document.querySelector('#cards');
const dialog = document.querySelector('#destination-dialog');
function showPlace(place, duration) {
 document.querySelector('#dialog-content').innerHTML = `<p class="eyebrow green">${place.location}</p><h2>${place.name}</h2><p>${place.detail}</p><p><strong>${duration ? `Your inspiration for: ${duration.toLowerCase()}` : 'A long weekend, imagined'}</strong></p><p>${place.plan}</p><p>Travel inspiration only. Check current transport, opening times, weather, and trail conditions before you go.</p><a class="button" href="https://www.openstreetmap.org/search?query=${encodeURIComponent(place.location)}" target="_blank" rel="noopener noreferrer">Explore the area ↗</a>`;
 dialog.showModal();
}
function render(filter = 'all') {
 const shown = places.filter(place => filter === 'all' || place.type === filter);
 cards.replaceChildren();
 shown.forEach(place => {
  const card = document.createElement('button');
  card.className = 'card';
  card.setAttribute('aria-label', `Explore ${place.name}, ${place.location}`);
  card.innerHTML = `<div class="card-image"><img src="https://images.unsplash.com/${place.image}?auto=format&fit=crop&w=900&q=80" alt="${place.alt}" loading="lazy"><span class="tag">${place.tag}</span></div><p class="card-meta">${place.location}</p><div class="card-title"><h3>${place.name}</h3><span aria-hidden="true">↗</span></div><p class="card-description">${place.description}</p>`;
  card.addEventListener('click', () => showPlace(place));
  cards.append(card);
 });
 document.querySelector('#filter-status').textContent = `${shown.length} ${shown.length === 1 ? 'destination' : 'destinations'} shown`;
}
document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
 document.querySelectorAll('[data-filter]').forEach(item => { item.classList.toggle('active', item === button); item.setAttribute('aria-pressed', String(item === button)); });
 render(button.dataset.filter);
}));
document.querySelector('.close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) { const bounds = dialog.getBoundingClientRect(); if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close(); } });
document.querySelector('#trip-form').addEventListener('submit', event => {
 event.preventDefault();
 const place = places.find(item => item.type === document.querySelector('#mood').value);
 const duration = document.querySelector('#duration').value;
 document.querySelector('#recommendation').textContent = `Your match: ${place.name}. A little inspiration for ${duration.toLowerCase()}.`;
 showPlace(place, duration);
});
document.querySelector('#year').textContent = new Date().getFullYear();
render();
