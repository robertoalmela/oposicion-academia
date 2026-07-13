"use client";

import Link from "next/link";
import { useProgreso } from "@/lib/useProgreso";
import temario from "@/data/temario.json";
import { Tema } from "@/lib/types";

const temas = temario as Tema[];
const TOTAL_TEMAS = 24;

export default function HomePage() {
  const progreso = useProgreso();

  if (!progreso) {
    return (
      <div style={{ padding: "40px 0" }}>
        <h1
          style={{
            fontSize: 32,
            fontWeight: 510,
            color: "var(--text-primary)",
            marginBottom: 8,
          }}
        >
          OpoAcademia
        </h1>
        <p style={{ fontSize: 15, color: "var(--fg-muted)", marginBottom: 40 }}>
          Técnico Auxiliar de Audiovisuales - Diputación de Valencia
        </p>
        <div style={{ color: "var(--fg-tertiary)" }}>Cargando progreso…</div>
      </div>
    );
  }

  const temasCompletados = progreso.temas_estudiados.length;
  const totalPreguntasRespondidas =
    progreso.preguntas_acertadas.length + progreso.preguntas_falladas.length;
  const aciertos = progreso.preguntas_acertadas.length;
  const mediaAciertos =
    totalPreguntasRespondidas > 0
      ? Math.round((aciertos / totalPreguntasRespondidas) * 100)
      : 0;
  const simulacrosRealizados = progreso.simulacro_results.length;

  const ultimosTemas = temas
    .filter((t) => progreso.temas_estudiados.includes(t.id))
    .slice(-3)
    .reverse();

  return (
    <div style={{ padding: "40px 0" }}>
      {/* Header */}
      <div style={{ marginBottom: 40 }}>
        <h1
          style={{
            fontSize: 32,
            fontWeight: 510,
            color: "var(--text-primary)",
            marginBottom: 8,
          }}
        >
          OpoAcademia
        </h1>
        <p style={{ fontSize: 15, color: "var(--fg-muted)" }}>
          Técnico Auxiliar de Audiovisuales - Diputación de Valencia
        </p>
      </div>

      {/* Grid de resumen */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: 16,
          marginBottom: 40,
        }}
      >
        <SummaryCard
          title="Temas completados"
          value={`${temasCompletados}/${TOTAL_TEMAS}`}
          progress={Math.round((temasCompletados / TOTAL_TEMAS) * 100)}
        />
        <SummaryCard
          title="Preguntas respondidas"
          value={`${totalPreguntasRespondidas}`}
        />
        <SummaryCard
          title="Media aciertos"
          value={`${mediaAciertos}%`}
        />
        <SummaryCard
          title="Simulacros"
          value={`${simulacrosRealizados} realizados`}
        />
      </div>

      {/* Dos secciones */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: 24,
          marginBottom: 40,
        }}
      >
        {/* Continuar estudiando */}
        <div
          style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
            borderRadius: 8,
            padding: 20,
          }}
        >
          <h2
            style={{
              fontSize: 15,
              fontWeight: 510,
              color: "var(--text-primary)",
              marginBottom: 16,
            }}
          >
            Continuar estudiando
          </h2>
          {ultimosTemas.length === 0 ? (
            <p style={{ color: "var(--fg-tertiary)", fontSize: 14 }}>
              Aún no has estudiado ningún tema. ¡Empieza por el temario!
            </p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {ultimosTemas.map((tema) => (
                <Link
                  key={tema.id}
                  href={`/temario/${tema.id}`}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "12px 14px",
                    background: "var(--bg-card-strong)",
                    borderRadius: 6,
                    textDecoration: "none",
                    color: "var(--text-secondary)",
                    fontSize: 14,
                    transition: "background 0.15s ease",
                  }}
                >
                  <span>
                    Unidad {tema.unidad} · {tema.titulo}
                  </span>
                  <span style={{ color: "var(--accent)", fontSize: 13 }}>→</span>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Acceso rápido */}
        <div
          style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
            borderRadius: 8,
            padding: 20,
          }}
        >
          <h2
            style={{
              fontSize: 15,
              fontWeight: 510,
              color: "var(--text-primary)",
              marginBottom: 16,
            }}
          >
            Acceso rápido
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <QuickButton href="/temario" label="Temario" />
            <QuickButton href="/quiz" label="Quiz rápido" />
            <QuickButton href="/simulacro" label="Simulacro" />
            <QuickButton href="/estadisticas" label="Estadísticas" />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer
        style={{
          borderTop: "1px solid var(--border)",
          paddingTop: 20,
          color: "var(--fg-tertiary)",
          fontSize: 13,
          textAlign: "center",
        }}
      >
        © 2026 OpoAcademia - Datos almacenados localmente
      </footer>
    </div>
  );
}

function SummaryCard({
  title,
  value,
  progress,
}: {
  title: string;
  value: string;
  progress?: number;
}) {
  return (
    <div
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
        borderRadius: 8,
        padding: "20px",
      }}
    >
      <p style={{ fontSize: 13, color: "var(--fg-muted)", marginBottom: 8 }}>{title}</p>
      <p
        style={{
          fontSize: 24,
          fontWeight: 510,
          color: "var(--text-primary)",
          marginBottom: progress !== undefined ? 10 : 0,
        }}
      >
        {value}
      </p>
      {progress !== undefined && (
        <div
          style={{
            height: 4,
            background: "var(--border)",
            borderRadius: 2,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${progress}%`,
              background: "var(--accent)",
              borderRadius: 2,
              transition: "width 0.4s ease",
            }}
          />
        </div>
      )}
    </div>
  );
}

function QuickButton({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "14px 0",
        background: "var(--bg-card-strong)",
        border: "1px solid var(--border)",
        borderRadius: 6,
        color: "var(--text-secondary)",
        fontSize: 14,
        fontWeight: 510,
        textDecoration: "none",
        transition: "all 0.15s ease",
      }}
    >
      {label}
    </Link>
  );
}
