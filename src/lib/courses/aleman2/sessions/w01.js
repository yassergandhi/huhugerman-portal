export default {
  id: 'a2-w01',
  level: 'aleman2',
  slug: 'w01',
  title: 'Woche 1: Ein neuer Anfang',

  instructions: {
    intro:
      'Willkommen en Deutsch 2.\n\n' +
      'En este video escucharás alemán real, hablado por una persona real.\n\n' +
      'Importante:\n' +
      'No necesitas entender todo.\n' +
      'Concéntrate en las ideas principales y en los datos que reconozcas.\n\n' +
      'Objetivo:\n' +
      '– Comprender quién es Konrad\n' +
      '– Escribir oraciones simples con Subjekt (Wer?) y Objekt (Wen/Was?)\n\n' +
      'Indicaciones:\n' +
      '– Escribe frases cortas. Una idea por frase.\n' +
      '– No uses diccionario. Confía en lo que ya sabes.',

    grammarReminder: [
      'Nominativ → Wer? (Das ist Konrad. Er ist Trainer.)',
      'Akkusativ → Wen oder was? (Er trainiert die Mannschaft.)',
      'Solo masculino cambia: der → den / einen'
    ]
  },

  source: {
    type: 'youtube',
    embedUrl: 'https://www.youtube.com/embed/B1oyDgM_uFY'
  },

  activity: {
    title: 'Deine Aufgaben',
    parts: [
      {
        id: 'part1',
        label: '1. Wer ist Konrad? (Nominativ)',
        help: '3–4 Sätze. Fokus: Name, Beruf, Alter, Nationalität.',
        placeholder:
          'Das ist Konrad. Er ist Trainer. Er ist sehr motiviert.',
        rows: 3
      },
      {
        id: 'part2',
        label: '2. Was macht er heute? (Akkusativ)',
        help: '3 kurze Sätze. Fokus: Was macht er (gern / nicht gern)?',
        placeholder:
          'Er trainiert die Mannschaft. Er benutzt einen Rollstuhl.',
        rows: 3
      },
      {
        id: 'part3',
        label: '3. Reflexión personal',
        help:
          'Puedes escribir en alemán o español. Aquí no se evalúa la gramática.',
        placeholder:
          'Ich finde seine Geschichte inspirierend... / Pienso que...',
        rows: 4
      }
    ]
  }
};
