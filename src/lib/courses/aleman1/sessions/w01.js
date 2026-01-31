export default {
  id: 'a1-w01',
  level: 'aleman1',
  slug: 'w01',
  title: 'Woche 1: Begrüßungen',

  instructions: {
    intro:
      'Antes de comenzar, recuerda repasar tus apuntes de las sesiones presenciales y los refuerzos de los miércoles. Esta actividad está diseñada para consolidar lo visto en clase.',
    grammarReminder: [
      'Ich: Ich heiße... / Ich wohne in...',
      'Er / Sie: Er heißt... / Sie wohnt in...'
    ]
  },

  source: {
    type: 'youtube',
    embedUrl: 'https://www.youtube.com/embed/_mS0EV3laEk'
  },

  activity: {
    title: 'Tu Tarea (Hausaufgabe)',
    parts: [
      {
        id: 'part1',
        label: '1. Tu presentación personal:',
        help: 'Incluye saludo, nombre, dónde vives y despedida.',
        placeholder: 'Ej: Hallo! Ich heiße... Ich wohne in... Tschüss!',
        rows: 3
      },
      {
        id: 'part2',
        label: '2. Presenta a un personaje famoso germanoparlante.',
        help: 'Usa: Das ist... Er/Sie heißt... Er/Sie wohnt in...',
        placeholder: 'Describe al personaje...',
        rows: 3
      },
      {
        id: 'part3',
        label: '3. ¿Cómo fue tu experiencia con el video a nivel auditivo y cultural?',
        help: '¿Qué saludo o despedida utilizarás más y por qué?',
        placeholder: 'Escribe aquí tus impresiones sobre el video...',
        rows: 4
      }
    ]
  }
};
