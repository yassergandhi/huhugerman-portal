// src/lib/roadmap.js

export const COURSE_CONFIG = {
  aleman1: {
    title: 'Alemán 1: Fundamentos',
    path: 'aleman1',
    weeks: [
      { id: 'a1-w01', slug: 'w01', title: 'Woche 1: Begrüßungen', active: true },
      { id: 'a1-w02', slug: 'w02', title: 'Woche 2: Zahlen & Uhrzeit', active: false },
      { id: 'a1-w03', slug: 'w03', title: 'Woche 3: Essen & Trinken', active: false },
      { id: 'a1-w04', slug: 'w04', title: 'Woche 4: Freizeit', active: false }
    ]
  },

  aleman2: {
    title: 'Alemán 2: Intermedio',
    path: 'aleman2',
    weeks: [
      { id: 'a2-w01', slug: 'w01', title: 'Woche 1: Konrads Geschichte', active: true },
      { id: 'a2-w02', slug: 'w02', title: 'Woche 2: Reisen & Urlaub', active: false }
    ]
  }
};

export function renderRoadmap(containerId, level) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const config = COURSE_CONFIG[level];
  if (!config) return;

  let html = `<div class="card">
    <h2>🚀 ${config.title}</h2>
    <div class="flex flex-col gap-3">`;

  config.weeks.forEach(week => {
    const link = `/learn/${config.path}/${week.slug}`;

    html += week.active
      ? `<a href="${link}" class="card hover">
          🟢 ${week.title}
        </a>`
      : `<div class="card muted">🔒 ${week.title}</div>`;
  });

  html += '</div></div>';
  container.innerHTML = html;
}
