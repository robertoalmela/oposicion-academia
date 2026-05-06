export interface Tema {
  id: string;
  titulo: string;
  parte: "general" | "especial";
  unidad: number;
  contenido: string;
  puntos_clave: string[];
}

export interface Pregunta {
  id: number;
  tema_id: string;
  pregunta: string;
  opciones: [string, string, string, string];
  correcta: number;
  explicacion: string;
  dificultad: "facil" | "media" | "dificil";
  fuente: string;
  anio: number;
}

export interface QuizResult {
  tema_id: string;
  total: number;
  aciertos: number;
  errores: number;
  fecha: number;
  respuestas: { pregunta_id: number; correcta: boolean }[];
}

export interface SimulacroResult {
  total: number;
  aciertos: number;
  errores: number;
  sin_responder: number;
  puntuacion: number;
  tiempo_segundos: number;
  fecha: number;
  respuestas: { pregunta_id: number; respuesta: number | null; correcta: boolean }[];
}

export interface Progreso {
  temas_estudiados: string[];
  preguntas_acertadas: number[];
  preguntas_falladas: number[];
  quiz_results: QuizResult[];
  simulacro_results: SimulacroResult[];
  ultima_sesion: number;
}