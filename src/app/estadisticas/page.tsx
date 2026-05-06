"use client";

import { useEffect, useState } from "react";
import temario from "@/data/temario.json";
import { Tema, Progreso, SimulacroResult } from "@/lib/types";
import { getProgreso, resetProgreso } from "@/lib/storage";

const temas = temario as Tema[];

export default function EstadisticasPage() {
  const [mounted, setMounted] = useState(false);
  const [progreso, setProgreso] = useState<Progreso | null>(null);
  const [confirmarReset, setConfirmarReset] = useState(false);

  useEffect(() => {
    setMounted(true);
    setProgreso(getProgreso());
  }, []);

  function handleReset() {
    if (!confirmarReset) {
      setConfirmarReset(true);
      return;
    }
    resetProgreso();
    setProgreso(getProgreso());
    setConfirmarReset(false);
  }

  if (!mounted || !progreso) {
    return (
      <div style={{ padding: "32px 0" }}>
        <h1 style={{ fontSize: 28, fontWeight: 510, color: "#f7f8f8", marginBottom: 8 }}>
          Estadísticas de Progreso
        </h1>
        <p style={{ color: "#62666d" }}>Cargando…</p>
      </div>
    );
  }

  const totalPreguntas =
    progreso.preguntas_acertadas.length + progreso.preguntas_falladas.length;
  const aciertos = progreso.preguntas_acertadas.length;
  const fallos = progreso.preguntas_falladas.length;
  const porcentajeGlobal =
    totalPreguntas > 0 ? Math.round((aciertos / totalPreguntas) * 100) : 0;

  return (
    <div style={{ padding: "32px 0" }}>
      {/* Hero */}
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 28, fontWeight: 510, color: "#f7f8f8", marginBottom: 8 }}>
          Estadísticas de Progreso
        </h1>
        <p style={{ fontSize: 15, color: "#8a8f98" }}>
          Seguimiento detallado de tu preparación para la oposición
        </p>
      </div>

      {/* 1. Global */}
      <Section title="Resumen global">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: 16,
          }}
        >
          <StatBox label="Total preguntas" value={totalPreguntas} color="#f7f8f8" />
          <StatBox label="Aciertos" value={aciertos} color="#10b981" />
          <StatBox label="Fallos" value={fallos} color="#ef4444" />
          <StatBox label="Porcentaje" value={`${porcentajeGlobal}%`} color="#5e6ad2" />
        </div>
      </Section>

      {/* 2. Por tema */}
      <Section title="Progreso por tema">
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {temas.map((tema) => {
            const quizDelTema = progreso.quiz_results.filter(
              (r) => r.tema_id === tema.id
            );
            const aciertosTema = quizDelTema.reduce((sum, r) => sum + r.aciertos, 0);
            const fallosTema = quizDelTema.reduce((sum, r) => sum + r.errores, 0);
            const totalTema = aciertosTema + fallosTema;
            const pctTema = totalTema > 0 ? Math.round((aciertosTema / totalTema) * 100) : 0;
            const estudiado = progreso.temas_estudiados.includes(tema.id);

            return (
              <div
                key={tema.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "12px 14px",
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 6,
                }}
              >
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 510,
                    color: "#5e6ad2",
                    minWidth: 36,
                  }}
                >
                  U{tema.unidad}
                </span>
                <span
                  style={{
                    flex: 1,
                    fontSize: 14,
                    color: "#d0d6e0",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {tema.titulo}
                </span>
                <span
                  style={{
                    fontSize: 11,
                    padding: "2px 6px",
                    borderRadius: 3,
                    background: estudiado
                      ? "rgba(16,185,129,0.12)"
                      : "rgba(255,255,255,0.05)",
                    color: estudiado ? "#10b981" : "#62666d",
                    whiteSpace: "nowrap",
                  }}
                >
                  {estudiado ? "Estudiado" : "Pendiente"}
                </span>
                <span
                  style={{
                    fontSize: 13,
                    color: "#8a8f98",
                    minWidth: 80,
                    textAlign: "right",
                    whiteSpace: "nowrap",
                  }}
                >
                  {aciertosTema}/{totalTema}
                </span>
                <div
                  style={{
                    width: 60,
                    height: 4,
                    background: "rgba(255,255,255,0.05)",
                    borderRadius: 2,
                    overflow: "hidden",
                    flexShrink: 0,
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: `${pctTema}%`,
                      background: pctTema >= 70 ? "#10b981" : "#5e6ad2",
                      borderRadius: 2,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      {/* 3. Simulacros */}
      <Section title="Simulacros">
        {progreso.simulacro_results.length === 0 ? (
          <p style={{ color: "#62666d", fontSize: 14 }}>
            Aún no has realizado ningún simulacro.
          </p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {progreso.simulacro_results
              .slice()
              .reverse()
              .map((s, i) => (
                <SimulacroRow key={i} simulacro={s} index={progreso.simulacro_results.length - i} />
              ))}
          </div>
        )}
      </Section>

      {/* Reiniciar progreso */}
      <div style={{ marginTop: 32 }}>
        <button
          onClick={handleReset}
          style={{
            padding: "10px 18px",
            borderRadius: 6,
            border: "1px solid rgba(239,68,68,0.3)",
            background: confirmarReset ? "rgba(239,68,68,0.15)" : "transparent",
            color: "#ef4444",
            fontSize: 14,
            fontWeight: 510,
            cursor: "pointer",
            transition: "all 0.15s ease",
          }}
        >
          {confirmarReset ? "¿Confirmar reinicio? Haz clic de nuevo" : "Reiniciar progreso"}
        </button>
        {confirmarReset && (
          <button
            onClick={() => setConfirmarReset(false)}
            style={{
              marginLeft: 10,
              padding: "10px 18px",
              borderRadius: 6,
              border: "1px solid rgba(255,255,255,0.08)",
              background: "transparent",
              color: "#8a8f98",
              fontSize: 14,
              cursor: "pointer",
            }}
          >
            Cancelar
          </button>
        )}
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 32 }}>
      <h2
        style={{
          fontSize: 16,
          fontWeight: 510,
          color: "#f7f8f8",
          marginBottom: 16,
        }}
      >
        {title}
      </h2>
      {children}
    </div>
  );
}

function StatBox({
  label,
  value,
  color,
}: {
  label: string;
  value: string | number;
  color: string;
}) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 8,
        padding: 18,
        textAlign: "center",
      }}
    >
      <p style={{ fontSize: 13, color: "#8a8f98", marginBottom: 6 }}>{label}</p>
      <p style={{ fontSize: 28, fontWeight: 510, color }}>{value}</p>
    </div>
  );
}

function SimulacroRow({
  simulacro,
  index,
}: {
  simulacro: SimulacroResult;
  index: number;
}) {
  const porcentaje = Math.round((simulacro.aciertos / simulacro.total) * 100);

  return (
    <div
      style={{
        background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 8,
        padding: 16,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 10,
        }}
      >
        <span style={{ fontSize: 14, fontWeight: 510, color: "#f7f8f8" }}>
          Simulacro #{index}
        </span>
        <span style={{ fontSize: 13, color: "#8a8f98" }}>
          {new Date(simulacro.fecha).toLocaleDateString("es-ES", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })}
        </span>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 20,
        }}
      >
        <div style={{ flex: 1 }}>
          <div
            style={{
              height: 6,
              background: "rgba(255,255,255,0.05)",
              borderRadius: 3,
              overflow: "hidden",
              marginBottom: 6,
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${porcentaje}%`,
                background: porcentaje >= 70 ? "#10b981" : "#5e6ad2",
                borderRadius: 3,
                transition: "width 0.4s ease",
              }}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 12,
              color: "#8a8f98",
            }}
          >
            <span>
              {simulacro.aciertos} aciertos · {simulacro.errores} fallos
              {simulacro.sin_responder > 0 && ` · ${simulacro.sin_responder} sin responder`}
            </span>
            <span style={{ color: "#f7f8f8", fontWeight: 510 }}>
              {simulacro.puntuacion} pts
            </span>
          </div>
        </div>
        <span
          style={{
            fontSize: 20,
            fontWeight: 510,
            color: porcentaje >= 70 ? "#10b981" : "#f59e0b",
            minWidth: 50,
            textAlign: "right",
          }}
        >
          {porcentaje}%
        </span>
      </div>
    </div>
  );
}
