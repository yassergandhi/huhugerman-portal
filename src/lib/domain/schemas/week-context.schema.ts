// src/lib/domain/schemas/week-context.schema.ts
import { z } from "zod";

/**
 * Wochenkontext Schema
 * Absolute Quelle der Wahrheit für den Unterricht
 */
export const WochenKontextSchema = z.object({
  kurs: z.enum(["A1", "A2"]),
  woche: z.number().int().positive(),
  
  gesehen: z.object({
    grammatik: z.object({
      verbzweistellung: z.boolean(),
      kasus: z.array(
        z.enum(["Nominativ", "Akkusativ", "Dativ", "Genitiv"])
      ),
    }),
    wortschatz: z.object({
      themen: z.array(z.string()),
    }),
    soziopragmatik: z.array(
      z.enum([
        "du/Sie",
        "formelle Situation",
        "informelle Situation",
        "nonverbale Kommunikation",
        "Umgangssprache",
      ])
    ),
  }),
  
  nicht_gesehen: z.object({
    grammatik: z.array(z.string()),
    soziopragmatik: z.array(z.string()),
  }),
  
  korrektur: z.object({
    darf_korrigieren: z.array(
      z.enum([
        "Begrüßung",
        "Abschied",
        "Verbformen",
        "Wortstellung",
      ])
    ),
    darf_nicht_korrigieren: z.array(
      z.enum([
        "Großschreibung",
        "Nebensätze",
        "Perfekt",
        "Artikeldeklination",
      ])
    ),
    max_fehler: z.number().int().min(1).max(3),
    ueberkorrektur_vermeiden: z.boolean(),
  }),
});

export type WochenKontext = z.infer<typeof WochenKontextSchema>;
