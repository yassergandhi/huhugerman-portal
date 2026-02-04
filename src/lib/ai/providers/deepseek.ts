// src/lib/ai-service.ts

export async function generatePedagogicalFeedback(
  text: string,
  level: string,
  context: string
): Promise<string> {

  // ⚠️ Stub temporal (IA fake controlada)
  // Esto nos permite estabilizar TODO el flujo
  // Antes de conectar DeepSeek / OpenAI

  return `
  <p><strong>Feedback (${level})</strong></p>

  <p><em>Contexto:</em> ${context}</p>

  <p>He leído tu texto y aquí va un primer comentario general:</p>

  <ul>
    <li>Tu producción escrita es comprensible.</li>
    <li>Se nota el esfuerzo por aplicar vocabulario básico.</li>
    <li>Hay errores normales para el nivel ${level}, lo cual es esperado.</li>
  </ul>

  <p><strong>Sugerencia general:</strong><br/>
  Revisa mayúsculas en sustantivos y la posición del verbo.</p>

  <p>👉 En la siguiente versión recibirás correcciones detalladas frase por frase.</p>
  `;
}
