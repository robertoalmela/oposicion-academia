import { Progreso, QuizResult, SimulacroResult } from "./types";

const STORAGE_KEY = "oposicion_academia";

export function getProgreso(): Progreso {
  if (typeof window === "undefined") {
    return {
      temas_estudiados: [],
      preguntas_acertadas: [],
      preguntas_falladas: [],
      quiz_results: [],
      simulacro_results: [],
      ultima_sesion: Date.now(),
    };
  }
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    return {
      temas_estudiados: [],
      preguntas_acertadas: [],
      preguntas_falladas: [],
      quiz_results: [],
      simulacro_results: [],
      ultima_sesion: Date.now(),
    };
  }
  return JSON.parse(stored) as Progreso;
}

export function saveProgreso(p: Progreso): void {
  if (typeof window === "undefined") return;
  p.ultima_sesion = Date.now();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
}

export function markTemaEstudiado(temaId: string): Progreso {
  const p = getProgreso();
  if (!p.temas_estudiados.includes(temaId)) {
    p.temas_estudiados.push(temaId);
  }
  saveProgreso(p);
  return p;
}

export function saveQuizResult(result: QuizResult): Progreso {
  const p = getProgreso();
  p.quiz_results.push(result);
  result.respuestas.forEach((r) => {
    if (r.correcta) {
      if (!p.preguntas_acertadas.includes(r.pregunta_id)) p.preguntas_acertadas.push(r.pregunta_id);
      p.preguntas_falladas = p.preguntas_falladas.filter((id) => id !== r.pregunta_id);
    } else {
      if (!p.preguntas_falladas.includes(r.pregunta_id)) p.preguntas_falladas.push(r.pregunta_id);
    }
  });
  saveProgreso(p);
  return p;
}

export function saveSimulacroResult(result: SimulacroResult): Progreso {
  const p = getProgreso();
  p.simulacro_results.push(result);
  result.respuestas.forEach((r) => {
    if (r.correcta) {
      if (!p.preguntas_acertadas.includes(r.pregunta_id)) p.preguntas_acertadas.push(r.pregunta_id);
    } else {
      if (!p.preguntas_falladas.includes(r.pregunta_id)) p.preguntas_falladas.push(r.pregunta_id);
    }
  });
  saveProgreso(p);
  return p;
}

export function resetProgreso(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}

export function getTemaProgreso(temaId: string, totalPreguntas: number): number {
  const p = getProgreso();
  const acertadas = p.preguntas_acertadas.length;
  const falladas = p.preguntas_falladas.length;
  const respondidas = acertadas + falladas;
  if (respondidas === 0) return 0;
  return Math.min(100, Math.round((respondidas / totalPreguntas) * 100));
}

export function getTemaAciertos(temaId: string, preguntasIds: number[]): number {
  const p = getProgreso();
  return preguntasIds.filter((id) => p.preguntas_acertadas.includes(id)).length;
}