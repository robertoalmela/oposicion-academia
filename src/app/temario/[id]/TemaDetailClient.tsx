"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import temario from "@/data/temario.json";
import { Tema } from "@/lib/types";
import { markTemaEstudiado, getProgreso } from "@/lib/storage";

const temas = temario as Tema[];

function parseMarkdownSimple(text: string): string {
  return text
    .replace(/^### (.*$)/gim, "<h3 style='font-size:16px;font-weight:510;color:#f7f8f8;margin:16px 0 8px'>$1</h3>")
    .replace(/^## (.*$)/gim, "<h2 style='font-size:18px;font-weight:510;color:#f7f8f8;margin:20px 0 10px'>$1</h2>")
    .replace(/^# (.*$)/gim, "<h1 style='font-size:22px;font-weight:510;color:#f7f8f8;margin:24px 0 12px'>$1</h1>")
    .replace(/\*\*(.*?)\*\*/g, "<strong style='color:#f7f8f8'>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(/^- (.*$)/gim, "<li style='margin-bottom:4px'>$1</li>")
    .replace(/\n/gim, "<br />");
}

export default function TemaDetailClient() {
  const params = useParams();
  const temaId = params.id as string;
  const tema = temas.find((t) => t.id === temaId);

  if (!tema) {
    return (
      <div style={{ padding: "40px 0", color: "#8a8f98" }}>
        <p>Tema no encontrado.</p>
        <Link
          href="/temario"
          style={{ color: "#5e6ad2", textDecoration: "none" }}
        >
          ← Volver al temario
        </Link>
      </div>
    );
  }

  const progreso = getProgreso();
  const acertadas = progreso.preguntas_acertadas.length;
  const falladas = progreso.preguntas_falladas.length;

  return (
    <div style={{ padding: "32px 0", maxWidth: 800 }}>
      {/* Breadcrumb */}
      <div style={{ marginBottom: 24, fontSize: 13, color: "#8a8f98" }}>
        <Link
          href="/temario"
          style={{ color: "#5e6ad2", textDecoration: "none" }}
        >
          Temario
        </Link>
        <span style={{ margin: "0 8px" }}>›</span>
        <span style={{ color: "#f7f8f8" }}>{tema.titulo}</span>
      </div>

      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
          <span
            style={{
              fontSize: 11,
              fontWeight: 510,
              textTransform: "uppercase",
              letterSpacing: "0.04em",
              padding: "3px 8px",
              borderRadius: 4,
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
          <span
            style={{
              fontSize: 11,
              fontWeight: 510,
              padding: "3px 8px",
              borderRadius: 4,
              background: "rgba(255,255,255,0.05)",
              color: "#8a8f98",
            }}
          >
            Unidad {tema.unidad}
          </span>
        </div>
        <h1
          style={{
            fontSize: 24,
            fontWeight: 510,
            color: "#f7f8f8",
            lineHeight: 1.3,
          }}
        >
          {tema.titulo}
        </h1>
      </div>

      {/* Botones de acción */}
      <div style={{ display: "flex", gap: 10, marginBottom: 28, flexWrap: "wrap" }}>
        <button
          onClick={() => markTemaEstudiado(tema.id)}
          style={{
            padding: "10px 18px",
            borderRadius: 6,
            border: "none",
            background: "#5e6ad2",
            color: "#f7f8f8",
            fontSize: 14,
            fontWeight: 510,
            cursor: "pointer",
          }}
        >
          Marcar como estudiado
        </button>
        <Link
          href={`/quiz/${tema.id}`}
          style={{
            padding: "10px 18px",
            borderRadius: 6,
            border: "1px solid rgba(255,255,255,0.08)",
            background: "transparent",
            color: "#d0d6e0",
            fontSize: 14,
            fontWeight: 510,
            textDecoration: "none",
            cursor: "pointer",
          }}
        >
          Hacer quiz de este tema
        </Link>
      </div>

      {/* Contenido */}
      <div
        style={{
          background: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 8,
          padding: 24,
          marginBottom: 28,
          fontSize: 14,
          lineHeight: 1.7,
          color: "#d0d6e0",
        }}
        dangerouslySetInnerHTML={{ __html: parseMarkdownSimple(tema.contenido) }}
      />

      {/* Puntos clave */}
      <div
        style={{
          background: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 8,
          padding: 24,
          marginBottom: 28,
        }}
      >
        <h2
          style={{
            fontSize: 16,
            fontWeight: 510,
            color: "#f7f8f8",
            marginBottom: 14,
          }}
        >
          Puntos clave
        </h2>
        <ul
          style={{
            margin: 0,
            paddingLeft: 18,
            color: "#d0d6e0",
            fontSize: 14,
            lineHeight: 1.8,
          }}
        >
          {tema.puntos_clave.map((punto, i) => (
            <li key={i}>{punto}</li>
          ))}
        </ul>
      </div>

      {/* Estadísticas del tema */}
      <div
        style={{
          background: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 8,
          padding: 20,
        }}
      >
        <h2
          style={{
            fontSize: 16,
            fontWeight: 510,
            color: "#f7f8f8",
            marginBottom: 12,
          }}
        >
          Estadísticas del tema
        </h2>
        <div style={{ display: "flex", gap: 24 }}>
          <div>
            <p style={{ fontSize: 13, color: "#8a8f98", marginBottom: 4 }}>
              Preguntas acertadas
            </p>
            <p style={{ fontSize: 20, fontWeight: 510, color: "#10b981" }}>
              {acertadas}
            </p>
          </div>
          <div>
            <p style={{ fontSize: 13, color: "#8a8f98", marginBottom: 4 }}>
              Preguntas falladas
            </p>
            <p style={{ fontSize: 20, fontWeight: 510, color: "#ef4444" }}>
              {falladas}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
