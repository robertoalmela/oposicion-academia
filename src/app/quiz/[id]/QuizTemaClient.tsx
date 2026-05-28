"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import temario from "@/data/temario.json";
import preguntasData from "@/data/preguntas.json";
import { Tema, PreguntaJSON, QuizResult } from "@/lib/types";
import { saveQuizResult } from "@/lib/storage";
import { respuestaCorrectaToIndex, stripOptionPrefix } from "@/lib/questions";

const temas = temario as Tema[];
const preguntas = preguntasData as PreguntaJSON[];

export default function QuizTemaClient() {
  const params = useParams();
  const temaId = params.id as string;
  const tema = temas.find((t) => t.id === temaId);

  // Get real questions for this tema
  const preguntasTema = tema
    ? preguntas.filter((p) => p.tema_id === temaId)
    : [];

  const [indice, setIndice] = useState(0);
  const [seleccion, setSeleccion] = useState<number | null>(null);
  const [mostrarExplicacion, setMostrarExplicacion] = useState(false);
  const [respondidas, setRespondidas] = useState<
    { pregunta_id: string; correcta: boolean }[]
  >([]);
  const [finalizado, setFinalizado] = useState(false);
  const [questions, setQuestions] = useState(preguntasTema);

  // Shuffle on mount
  useEffect(() => {
    const shuffled = [...preguntasTema].sort(() => Math.random() - 0.5);
    setQuestions(shuffled);
  }, [temaId]);

  if (!tema) {
    return (
      <div style={{ padding: "40px 0", color: "#8a8f98" }}>
        <p>Tema no encontrado.</p>
        <Link href="/quiz" style={{ color: "#5e6ad2", textDecoration: "none" }}>
          ← Volver a Quiz
        </Link>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div style={{ padding: "40px 0", maxWidth: 600, margin: "0 auto" }}>
        <h1 style={{ fontSize: 24, fontWeight: 510, color: "#f7f8f8", marginBottom: 8 }}>
          {tema.titulo}
        </h1>
        <p style={{ fontSize: 15, color: "#8a8f98", marginBottom: 24 }}>
          Quiz - Tema {tema.unidad}
        </p>
        <div
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 8,
            padding: 32,
            textAlign: "center",
          }}
        >
          <p style={{ color: "#8a8f98", marginBottom: 16 }}>
            Este tema aún no tiene preguntas generadas.
          </p>
          <Link
            href="/quiz"
            style={{
              display: "inline-block",
              padding: "12px 24px",
              borderRadius: 6,
              background: "#5e6ad2",
              color: "#f7f8f8",
              fontSize: 14,
              fontWeight: 510,
              textDecoration: "none",
            }}
          >
            ← Volver a Quiz
          </Link>
        </div>
      </div>
    );
  }

  const preguntaActual = questions[indice];
  const total = questions.length;

  function handleRespuesta(idx: number) {
    if (mostrarExplicacion) return; // already answered
    setSeleccion(idx);
    setMostrarExplicacion(true);

    const esCorrecta = idx === respuestaCorrectaToIndex(preguntaActual.respuesta_correcta);
    setRespondidas((prev) => [
      ...prev,
      { pregunta_id: preguntaActual.id, correcta: esCorrecta },
    ]);
  }

  function handleSiguiente() {
    if (indice + 1 >= total) {
      const aciertos = respondidas.filter((r) => r.correcta).length;
      const errores = respondidas.filter((r) => !r.correcta).length;
      const result: QuizResult = {
        tema_id: tema!.id,
        total,
        aciertos,
        errores,
        fecha: Date.now(),
        respuestas: respondidas.map((r) => ({
          pregunta_id: parseInt(r.pregunta_id.replace("preg-", "")),
          correcta: r.correcta,
        })),
      };
      saveQuizResult(result);
      setFinalizado(true);
    } else {
      setIndice(indice + 1);
      setSeleccion(null);
      setMostrarExplicacion(false);
    }
  }

  if (finalizado) {
    const aciertos = respondidas.filter((r) => r.correcta).length;
    const fallos = respondidas.filter((r) => !r.correcta).length;
    const porcentaje = Math.round((aciertos / total) * 100);

    return (
      <div style={{ padding: "40px 0", maxWidth: 600, margin: "0 auto" }}>
        <h1
          style={{
            fontSize: 24,
            fontWeight: 510,
            color: "#f7f8f8",
            marginBottom: 24,
            textAlign: "center",
          }}
        >
          Resultados del Quiz
        </h1>

        <div
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 8,
            padding: 32,
            textAlign: "center",
            marginBottom: 24,
          }}
        >
          <div
            style={{
              fontSize: 48,
              fontWeight: 510,
              color: porcentaje >= 70 ? "#10b981" : "#f59e0b",
              marginBottom: 8,
            }}
          >
            {porcentaje}%
          </div>
          <p style={{ fontSize: 15, color: "#8a8f98", marginBottom: 24 }}>
            {aciertos} aciertos · {fallos} fallos · {total} preguntas
          </p>

          <div style={{ display: "flex", justifyContent: "center", gap: 32 }}>
            <div>
              <p style={{ fontSize: 13, color: "#8a8f98" }}>Aciertos</p>
              <p style={{ fontSize: 28, fontWeight: 510, color: "#10b981" }}>
                {aciertos}
              </p>
            </div>
            <div>
              <p style={{ fontSize: 13, color: "#8a8f98" }}>Fallos</p>
              <p style={{ fontSize: 28, fontWeight: 510, color: "#ef4444" }}>
                {fallos}
              </p>
            </div>
          </div>
        </div>

        <div
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 8,
            padding: 24,
            marginBottom: 24,
          }}
        >
          <p style={{ fontSize: 13, color: "#8a8f98", marginBottom: 12, fontWeight: 510 }}>
            REPASO DE PREGUNTAS
          </p>
          {questions.map((p, i) => {
            const res = respondidas[i];
            if (!res) return null;
            const isCorrect = res.correcta;
            return (
              <div
                key={p.id}
                style={{
                  padding: "12px 0",
                  borderBottom: i < questions.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
                }}
              >
                <p style={{ fontSize: 14, color: "#f7f8f8", marginBottom: 4 }}>
                  {i + 1}. {p.enunciado.substring(0, 100)}
                </p>
                <p style={{ fontSize: 13, color: isCorrect ? "#10b981" : "#ef4444" }}>
                  {isCorrect ? "✅" : "❌"} {p.respuesta_correcta})
                </p>
              </div>
            );
          })}
        </div>

        <div style={{ display: "flex", justifyContent: "center", gap: 12 }}>
          <Link
            href={`/quiz/${temaId}`}
            style={{
              display: "inline-block",
              padding: "12px 24px",
              borderRadius: 6,
              background: "#5e6ad2",
              color: "#f7f8f8",
              fontSize: 14,
              fontWeight: 510,
              textDecoration: "none",
            }}
          >
            Repetir Quiz
          </Link>
          <Link
            href="/quiz"
            style={{
              display: "inline-block",
              padding: "12px 24px",
              borderRadius: 6,
              border: "1px solid rgba(255,255,255,0.15)",
              color: "#8a8f98",
              fontSize: 14,
              textDecoration: "none",
            }}
          >
            ← Todos los quizzes
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: "40px 0", maxWidth: 600, margin: "0 auto" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          marginBottom: 8,
        }}
      >
        <h1 style={{ fontSize: 24, fontWeight: 510, color: "#f7f8f8", margin: 0 }}>
          {tema.titulo}
        </h1>
        <Link
          href="/quiz"
          style={{ color: "#8a8f98", fontSize: 13, textDecoration: "none" }}
        >
          ← Volver
        </Link>
      </div>
      <p style={{ fontSize: 14, color: "#8a8f98", marginBottom: 24 }}>
        Quiz · Tema {tema.unidad} ·{" "}
        {preguntaActual.dificultad === "basico"
          ? "Básico"
          : preguntaActual.dificultad === "intermedio"
          ? "Intermedio"
          : "Avanzado"}{" "}
        · {indice + 1}/{total}
      </p>

      <div
        style={{
          background: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 8,
          padding: 32,
          marginBottom: 24,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 16,
          }}
        >
          <span
            style={{
              fontSize: 11,
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              padding: "2px 8px",
              borderRadius: 4,
              background:
                preguntaActual.tipo === "memoristica"
                  ? "rgba(99,102,241,0.15)"
                  : preguntaActual.tipo === "comprension"
                  ? "rgba(16,185,129,0.15)"
                  : preguntaActual.tipo === "aplicacion"
                  ? "rgba(245,158,11,0.15)"
                  : preguntaActual.tipo === "vf"
                  ? "rgba(239,68,68,0.15)"
                  : "rgba(139,92,246,0.15)",
              color:
                preguntaActual.tipo === "memoristica"
                  ? "#818cf8"
                  : preguntaActual.tipo === "comprension"
                  ? "#10b981"
                  : preguntaActual.tipo === "aplicacion"
                  ? "#f59e0b"
                  : preguntaActual.tipo === "vf"
                  ? "#ef4444"
                  : "#a78bfa",
            }}
          >
            {preguntaActual.tipo === "memoristica"
              ? "Memorística"
              : preguntaActual.tipo === "comprension"
              ? "Comprensión"
              : preguntaActual.tipo === "aplicacion"
              ? "Aplicación"
              : preguntaActual.tipo === "vf"
              ? "V/F"
              : "Caso Práctico"}
          </span>
          <span style={{ fontSize: 13, color: "#62666d" }}>
            {indice + 1}/{total}
          </span>
        </div>

        <p style={{ fontSize: 16, color: "#f7f8f8", lineHeight: 1.6, marginBottom: 24 }}>
          {preguntaActual.enunciado}
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {preguntaActual.respuestas.map((opcion, idx) => {
            const letra = String.fromCharCode(65 + idx); // A, B, C, D
            const isSelected = seleccion === idx;
            const isCorrect = idx === respuestaCorrectaToIndex(preguntaActual.respuesta_correcta);

            let bg = "rgba(255,255,255,0.03)";
            let border = "1px solid rgba(255,255,255,0.1)";
            let color = "#c4c8cf";

            if (mostrarExplicacion) {
              if (isCorrect) {
                bg = "rgba(16,185,129,0.1)";
                border = "1px solid rgba(16,185,129,0.3)";
                color = "#10b981";
              } else if (isSelected) {
                bg = "rgba(239,68,68,0.1)";
                border = "1px solid rgba(239,68,68,0.3)";
                color = "#ef4444";
              } else {
                bg = "rgba(255,255,255,0.02)";
                border = "1px solid rgba(255,255,255,0.05)";
                color = "#62666d";
              }
            } else if (isSelected) {
              bg = "rgba(94,106,210,0.15)";
              border = "1px solid rgba(94,106,210,0.3)";
              color = "#5e6ad2";
            }

            return (
              <button
                key={idx}
                onClick={() => handleRespuesta(idx)}
                disabled={mostrarExplicacion}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "14px 18px",
                  borderRadius: 6,
                  background: bg,
                  border: border,
                  color: color,
                  fontSize: 14,
                  cursor: mostrarExplicacion ? "default" : "pointer",
                  textAlign: "left" as const,
                  width: "100%",
                  fontFamily: "inherit",
                  transition: "all 0.15s ease",
                }}
              >
                <span
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 13,
                    fontWeight: 510,
                    background: mostrarExplicacion && isCorrect
                      ? "rgba(16,185,129,0.2)"
                      : mostrarExplicacion && isSelected && !isCorrect
                      ? "rgba(239,68,68,0.2)"
                      : "rgba(255,255,255,0.06)",
                    flexShrink: 0,
                  }}
                >
                  {mostrarExplicacion && isCorrect
                    ? "✓"
                    : mostrarExplicacion && isSelected && !isCorrect
                    ? "✗"
                    : letra}
                </span>
                <span>{stripOptionPrefix(opcion)}</span>
              </button>
            );
          })}
        </div>
      </div>

      {mostrarExplicacion && (
        <div
          style={{
            background: "rgba(94,106,210,0.08)",
            border: "1px solid rgba(94,106,210,0.2)",
            borderRadius: 8,
            padding: 20,
            marginBottom: 24,
          }}
        >
          <p style={{ fontSize: 13, color: "#818cf8", fontWeight: 510, marginBottom: 8 }}>
            EXPLICACIÓN
          </p>
          <p style={{ fontSize: 14, color: "#c4c8cf", lineHeight: 1.6 }}>
            {preguntaActual.explicacion}
          </p>
        </div>
      )}

      <div style={{ textAlign: "center" }}>
        {mostrarExplicacion ? (
          <button
            onClick={handleSiguiente}
            style={{
              display: "inline-block",
              padding: "12px 32px",
              borderRadius: 6,
              background: "#5e6ad2",
              color: "#f7f8f8",
              fontSize: 14,
              fontWeight: 510,
              border: "none",
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            {indice + 1 >= total ? "Ver resultados" : "Siguiente pregunta →"}
          </button>
        ) : (
          <p style={{ fontSize: 13, color: "#62666d" }}>
            Selecciona una respuesta para ver la explicación
          </p>
        )}
      </div>
    </div>
  );
}
