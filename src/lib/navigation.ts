// src/lib/navigation.js

export function getBackLink(lesson) {
  return {
    href: `/${lesson.level}`,
    label: 'Volver al mapa'
  };
}
