// src/lib/roadmap.ts
/**
 * CONFIGURACIÓN MAESTRA DE CURSOS
 * Fuente de verdad para navegación y activación de semanas
 * ⚠️ NO contiene lógica pedagógica - solo metadata de disponibilidad
 * La lógica pedagógica vive en: src/lib/domain/weeks/
 */

export interface WeekConfig {
  id: string;      // Ej: 'a1-w01' (para Supabase)
  slug: string;    // Ej: 'w01' (para rutas)
  title: string;   // Título humano visible
  active: boolean; // ¿Visible para estudiantes?
}

export interface CourseConfig {
  title: string;
  path: 'aleman1' | 'aleman2'; // Ruta canónica
  weeks: WeekConfig[];
}

export const COURSE_CONFIG: Record<'aleman1' | 'aleman2', CourseConfig> = {
  aleman1: {
    title: 'Alemán 1: Fundamentos',
    path: 'aleman1',
    weeks: [
      { id: 'a1-w01', slug: 'w01', title: 'Woche 1: Begrüßungen', active: true },
      { id: 'a1-w02', slug: 'w02', title: 'Woche 2: Zahlen & Uhrzeit', active: false },
      { id: 'a1-w03', slug: 'w03', title: 'Woche 3: Essen & Trinken', active: false },
      { id: 'a1-w04', slug: 'w04', title: 'Woche 4: Freizeit', active: false },
      { id: 'a1-w05', slug: 'w05', title: 'Woche 5: Familie', active: false },
      { id: 'a1-w06', slug: 'w06', title: 'Woche 6: Wohnen', active: false },
      { id: 'a1-w07', slug: 'w07', title: 'Woche 7: Körper', active: false },
      { id: 'a1-w08', slug: 'w08', title: 'Woche 8: Termine', active: false },
      { id: 'a1-w09', slug: 'w09', title: 'Woche 9: Kleidung', active: false },
      { id: 'a1-w10', slug: 'w10', title: 'Woche 10: Abschluss', active: false }
    ]
  },
  aleman2: {
    title: 'Alemán 2: Intermedio',
    path: 'aleman2',
    weeks: [
      { id: 'a2-w01', slug: 'w01', title: 'Woche 1: Konrads Geschichte', active: true },
      { id: 'a2-w02', slug: 'w02', title: 'Woche 2: Reisen & Urlaub', active: false },
      { id: 'a2-w03', slug: 'w03', title: 'Woche 3: Arbeitswelt', active: false },
      { id: 'a2-w04', slug: 'w04', title: 'Woche 4: Gesundheit', active: false },
      { id: 'a2-w05', slug: 'w05', title: 'Woche 5: Medien & Tech', active: false },
      { id: 'a2-w06', slug: 'w06', title: 'Woche 6: Umwelt', active: false },
      { id: 'a2-w07', slug: 'w07', title: 'Woche 7: Politik', active: false },
      { id: 'a2-w08', slug: 'w08', title: 'Woche 8: Geschichte', active: false },
      { id: 'a2-w09', slug: 'w09', title: 'Woche 9: Zukunft', active: false },
      { id: 'a2-w10', slug: 'w10', title: 'Woche 10: Finale', active: false }
    ]
  }
};

// ⚠️ FUNCIÓN ELIMINADA (Legacy)
// La función renderRoadmap() fue removida porque:
// - Era código cliente mezclado con configuración
// - CourseList.astro ya renderiza directamente desde COURSE_CONFIG
// - Violaba separación de responsabilidades (UI vs Datos)
// - Generaba deuda técnica al mezclar DOM manipulation con routing
