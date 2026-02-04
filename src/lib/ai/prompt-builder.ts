import type { WochenKontext } from '../domain/schemas/week-context.schema';

export function buildPedagogicalPrompt(
  text: string,
  context: WochenKontext,
  studentName: string
): string {
  const darfKorrigieren = context.korrektur.darf_korrigieren.join(', ');
  const darfNichtKorrigieren = context.korrektur.darf_nicht_korrigieren.join(', ');
  const themen = context.gesehen.wortschatz.themen.join(', ');
  
  return `
Actúa como profesor de alemán para ${studentName}.
Nivel: ${context.kurs}, Woche: ${context.woche}

EN CLASE SE HA VISTO:
- Temas: ${themen}
- Gramática: ${context.gesehen.grammatik.kasus.join(', ')}
- Pragmática: ${context.gesehen.soziopragmatik.join(', ')}

NO SE HA VISTO:
- ${context.nicht_gesehen.grammatik.join(', ')}

LA IA PUEDE CORREGIR:
- ${darfKorrigieren}

LA IA NO DEBE CORREGIR:
- ${darfNichtKorrigieren}

REGLAS:
- Máximo ${context.korrektur.max_fehler} grupos de errores
- Evitar sobre-corrección: ${context.korrektur.ueberkorrektur_vermeiden}
- Tono formativo, no evaluativo
- Feedback en español con ejemplos en alemán
- HTML simple (<p>, <ul>, <li>, <strong>)

TEXTO DEL ESTUDIANTE:
${text}
`;
}
