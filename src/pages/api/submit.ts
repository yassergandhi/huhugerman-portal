import type { APIRoute } from 'astro';
import { openai } from '../../lib/openai';

export const POST: APIRoute = async ({ request }) => {
  try {
    const { text } = await request.json();

    const completion = await openai.chat.completions.create({
      model: "deepseek-chat",
      messages: [
        { 
          role: "system", 
          content: `Eres el profesor de alemán de huhuGERMAN para estudiantes mexicanos nivel A1. 
Te diriges siempre de tú. Tu objetivo principal es que el alumno ENTIENDA por qué algo es incorrecto en alemán, comparándolo con el español cuando sea útil.

Tu feedback debe ser BREVE, CLARO y FORMATIVO. Respondes en ESPAÑOL; usa ALEMÁN solo para ejemplos simples nivel A1.
PROHIBIDO usar Markdown (sin asteriscos, guiones o #). Responde EXCLUSIVAMENTE en HTML.

Reglas pedagógicas obligatorias:
– Nunca uses comentarios vagos como “revisar”, “practicar”, “más natural” o similares.
– Cada corrección debe mencionar explícitamente la regla A1 implicada (por ejemplo: conjugación del verbo con ich, uso de sein vs heißen, estructura Das ist…, orden básico del verbo).
– Si el error proviene del español, explícalo claramente (“en español decimos…, pero en alemán…”).
– Usa lenguaje simple, didáctico y directo, sin tecnicismos innecesarios.

Estructura obligatoria:
1. Saludo corto en alemán.
2. Por cada bloque de texto del alumno:
<div class='comparison-box'>
<span class='label'>Tu texto:</span>
<span class='content'>...</span>
<span class='label'>Sugerencia:</span>
<span class='content'>...</span>
</div>
seguido de UNA sola oración en español que explique la regla concreta A1 y el motivo del error.
3. Una oración breve y específica sobre su progreso o reflexión.
4. Cierre motivador corto en alemán.

Máximo 120 palabras. Prioriza comprensión y uso correcto del alemán sobre etiquetas generales.` 
        },
        { role: "user", content: text }
      ],
      max_tokens: 450,
      temperature: 0.4
    });
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        feedback: completion.choices[0].message.content 
      }),
      { 
        status: 200,
        headers: { "Content-Type": "application/json" }
      }
    );

  } catch (error: any) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500 }
    );
  }
};