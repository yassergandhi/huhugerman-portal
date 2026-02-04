// src/pages/api/submit.ts
import type { APIRoute } from 'astro';
import { WochenKontextSchema } from '@/lib/domain/schemas/week-context.schema';
import { buildPedagogicalPrompt } from '@/lib/ai/prompt-builder';
// TODO: Reemplazar mock con proveedor real cuando esté listo
// Por ahora: mock para garantizar flujo funcional sin dependencia de IA
// async function callAIClient(prompt: string): Promise<string> { ... }

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { text, studentName, kurs, woche } = body;
    
    if (!text?.trim()) {
      return new Response(JSON.stringify({ error: 'Texto vacío' }), { status: 400 });
    }
    
    if (!studentName?.trim()) {
      return new Response(JSON.stringify({ error: 'Nombre requerido' }), { status: 400 });
    }
    
    // Cargar contexto pedagógico (hardcoded por ahora)
    const context = await getWeekContext(kurs, woche);
    
    // Validar contexto con Zod
    const validatedContext = WochenKontextSchema.parse(context);
    
    // Generar prompt con contexto validado
    const prompt = buildPedagogicalPrompt(text, validatedContext, studentName);
    
    // TODO: Reemplazar mock con llamada real a proveedor IA
    // const feedback = await callAIClient(prompt);
    const feedback = `
      <p><strong>Feedback simulado (Semana ${woche} - ${kurs})</strong></p>
      <p>Tu texto muestra comprensión básica de los saludos y presentaciones.</p>
      <ul>
        <li>✅ Uso correcto de "Ich heiße..."</li>
        <li>⚠️ Revisa la posición del verbo en frases largas</li>
      </ul>
      <p>¡Sigue practicando! Este feedback será generado por IA en producción.</p>
    `;
    
    // Guardar submission con nombre validado
    await saveSubmission({
      text,
      studentName: studentName.trim(), // Sanitización básica
      kurs,
      woche,
      feedback,
      pedagogicalContext: validatedContext,
    });
    
    return new Response(JSON.stringify({ success: true, feedback }), { status: 200 });
    
  } catch (error) {
    console.error('Submit error:', error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Error interno' 
    }), { status: 500 });
  }
};

// ✅ Corregido: función async con import dinámico
async function getWeekContext(kurs: string, woche: number) {
  // TODO: Mapear dinámicamente según roadmap cuando esté listo
  if (kurs === 'A1' && woche === 1) {
    const module = await import('@/lib/domain/weeks/a1-woche-01');
    return module.A1_WOCHE_01;
  }
  throw new Error(`Contexto no encontrado para ${kurs} semana ${woche}`);
}

// TODO: Mover a lib/services/persistence/submissions.ts cuando esté listo
async function saveSubmission(data: any) {
  // Implementación temporal para pruebas
  console.log('Submission guardada (mock):', data);
}
