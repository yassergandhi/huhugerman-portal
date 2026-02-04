// src/lib/domain/weeks/a1-woche-01.ts
import type { WochenKontext } from '../schemas/week-context.schema';

export const A1_WOCHE_01: WochenKontext = {
  kurs: "A1",
  woche: 1,
  
  gesehen: {
    grammatik: {
      verbzweistellung: true,
      kasus: ["Nominativ"],
    },
    wortschatz: {
      themen: ["Begrüßungen", "Abschied", "Vorstellung", "Wohnen"],
    },
    soziopragmatik: ["du/Sie", "formelle Situation", "informelle Situation"],
  },
  
  nicht_gesehen: {
    grammatik: ["Akkusativ", "Dativ", "Genitiv", "Großschreibung"],
    soziopragmatik: ["nonverbale Kommunikation", "Umgangssprache"],
  },
  
  korrektur: {
    darf_korrigieren: ["Begrüßung", "Abschied", "Verbformen", "Wortstellung"],
    darf_nicht_korrigieren: ["Großschreibung", "Nebensätze", "Perfekt", "Artikeldeklination"],
    max_fehler: 3,
    ueberkorrektur_vermeiden: true,
  },
};
