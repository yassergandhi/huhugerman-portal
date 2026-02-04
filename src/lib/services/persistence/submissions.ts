// src/lib/services/persistence/submissions.ts
import { supabase } from '@/lib/supabase';

/**
 * Guarda submission con validación y sanitización
 * TODO: Agregar validación Zod completa cuando schema esté listo
 */
export async function saveSubmission({
  text,
  studentName, // Nombre completo capturado del formulario
  kurs,
  woche,
  feedback,
  pedagogicalContext,
}: {
  text: string;
  studentName: string;
  kurs: string;
  woche: number;
  feedback: string;
  pedagogicalContext: any;
}) {
  // Sanitización básica del nombre
  const cleanName = studentName.trim().replace(/\s+/g, ' ');
  
  if (cleanName.length < 2) {
    throw new Error('Nombre inválido');
  }

  const { data: { user }, error: authError } = await supabase.auth.getUser();
  
  if (authError || !user) {
    throw new Error('Autenticación requerida');
  }
  
  // Construir session_id consistente con Supabase
  const sessionId = `${kurs.toLowerCase()}-w${String(woche).padStart(2, '0')}`;
  
  // TODO: Ejecutar SQL para agregar columna student_name a submissions
  // ALTER TABLE submissions ADD COLUMN IF NOT EXISTS student_name TEXT;
  const { error } = await supabase
    .from('submissions')
    .insert({
      user_id: user.id,
      user_email: user.email,
      student_name: cleanName, // Campo nuevo en DB (requiere migración)
      session_id: sessionId,
      content_text: text.trim(),
      ai_feedback: feedback,
      pedagogical_context: pedagogicalContext,
      submission_type: 'written',
      activity_mode: 'guided',
    });
  
  if (error) {
    console.error('Error guardando submission:', error);
    throw error;
  }
  
  return { success: true };
}
