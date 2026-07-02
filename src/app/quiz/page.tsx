"use client";

import Link from "next/link";
import temario from "@/data/temario.json";
import { Tema, QuizResult } from "@/lib/types";
import { useProgreso } from "@/lib/useProgreso";

const temas = temario as Tema[];
const PREGUNTAS_POR_TEMA = 15;

export default function QuizPage() {
  const progreso = useProgreso();
  const quizResults: QuizResult[] | null = progreso ? progreso.quiz_results : null;

  function getMejorPuntuacion(temaId: string): number | null {
    const results = (quizResults ?? []).filter((r) => r.tema_id === temaId);
    if (results.length === 0) return null;
    const mejor = Math.max(...results.map((r) => r.aciertos));
    return Math.round((mejor / PREGUNTAS_POR_TEMA) * 100);
  }

  if (quizResults === null) {
    return (
      <div style={{ padding: "32px 0" }}>
        <h1
          style={{
            fontSize: 28,
            fontWeight: 510,
            color: "#f7f8f8",
            marginBottom: 8,
          }}
        >
          Quiz por Temas
        </h1>
        <p style={{ color: "#62666d" }}>Cargando…</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "32px 0" }}>
      {/* Hero */}
      <div style={{ marginBottom: 32 }}>
        <h1
          style={{
            fontSize: 28,
            fontWeight: 510,
            color: "#f7f8f8",
            marginBottom: 8,
          }}
        >
          Quiz por Temas
        </h1>
        <p style={{ fontSize: 15, color: "#8a8f98" }}>
          Selecciona un tema para practicar con preguntas específicas
        </p>
      </div>

      {/* Lista de temas */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))",
          gap: 12,
        }}
      >
        {temas.map((tema) => {
          const mejor = getMejorPuntuacion(tema.id);
          return (
            <div
              key={tema.id}
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 8,
                padding: 18,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 12,
              }}
            >
              <div style={{ minWidth: 0 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    marginBottom: 6,
                  }}
                >
                  <span
                    style={{
                      fontSize: 12,
                      fontWeight: 510,
                      color: "#5e6ad2",
                    }}
                  >
                    U{tema.unidad}
                  </span>
                  <span
                    style={{
                      fontSize: 11,
                      textTransform: "uppercase",
                      padding: "2px 6px",
                      borderRadius: 3,
                      background:
                        tema.parte === "general"
                          ? "rgba(94,106,210,0.12)"
                          : "rgba(16,185,129,0.12)",
                      color:
                        tema.parte === "general" ? "#828fff" : "#10b981",
                    }}
                  >
                    {tema.parte}
                  </span>
                </div>
                <p
                  style={{
                    fontSize: 14,
                    fontWeight: 510,
                    color: "#f7f8f8",
                    marginBottom: 4,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {tema.titulo}
                </p>
                <p style={{ fontSize: 12, color: "#8a8f98" }}>
                  {PREGUNTAS_POR_TEMA} preguntas
                  {mejor !== null && (
                    <span style={{ marginLeft: 8, color: "#10b981" }}>
                      Mejor: {mejor}%
                    </span>
                  )}
                </p>
              </div>
              <Link
                href={`/quiz/${tema.id}`}
                style={{
                  flexShrink: 0,
                  padding: "8px 16px",
                  borderRadius: 6,
                  border: "none",
                  background: "#5e6ad2",
                  color: "#f7f8f8",
                  fontSize: 13,
                  fontWeight: 510,
                  textDecoration: "none",
                  cursor: "pointer",
                  transition: "background 0.15s ease",
                  whiteSpace: "nowrap",
                }}
              >
                Comenzar quiz
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
