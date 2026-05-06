"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import temario from "@/data/temario.json";
import { Tema } from "@/lib/types";
import { getTemaProgreso } from "@/lib/storage";

const temas = temario as Tema[];

type FiltroParte = "todos" | "general" | "especial";

export default function TemarioPage() {
  const [filtro, setFiltro] = useState<FiltroParte>("todos");

  const temasFiltrados = useMemo(() => {
    if (filtro === "todos") return temas;
    return temas.filter((t) => t.parte === filtro);
  }, [filtro]);

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
          Temario Completo
        </h1>
        <p style={{ fontSize: 15, color: "#8a8f98", marginBottom: 20 }}>
          24 unidades de estudio · Parte General y Especial
        </p>

        {/* Filtros */}
        <div style={{ display: "flex", gap: 8 }}>
          {(["todos", "general", "especial"] as FiltroParte[]).map((p) => (
            <button
              key={p}
              onClick={() => setFiltro(p)}
              style={{
                padding: "6px 14px",
                borderRadius: 6,
                border: "1px solid rgba(255,255,255,0.08)",
                background: filtro === p ? "#5e6ad2" : "transparent",
                color: filtro === p ? "#f7f8f8" : "#d0d6e0",
                fontSize: 13,
                fontWeight: 510,
                cursor: "pointer",
                transition: "all 0.15s ease",
                textTransform: "capitalize",
              }}
            >
              {p === "todos" ? "Todos" : p === "general" ? "General" : "Especial"}
            </button>
          ))}
        </div>
      </div>

      {/* Grid de temas */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(420px, 1fr))",
          gap: 16,
        }}
      >
        {temasFiltrados.map((tema) => (
          <TemaCard key={tema.id} tema={tema} />
        ))}
      </div>
    </div>
  );
}

function TemaCard({ tema }: { tema: Tema }) {
  const progreso = getTemaProgreso(tema.id, tema.puntos_clave.length);
  const puntosResumidos = tema.puntos_clave.slice(0, 3);

  return (
    <Link
      href={`/temario/${tema.id}`}
      style={{
        display: "block",
        background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 8,
        padding: 20,
        textDecoration: "none",
        color: "inherit",
        transition: "border-color 0.15s ease, background 0.15s ease",
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
        <span
          style={{
            fontSize: 13,
            fontWeight: 510,
            color: "#5e6ad2",
          }}
        >
          Unidad {tema.unidad}
        </span>
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
      </div>

      <h3
        style={{
          fontSize: 15,
          fontWeight: 510,
          color: "#f7f8f8",
          marginBottom: 10,
          lineHeight: 1.4,
        }}
      >
        {tema.titulo}
      </h3>

      {/* Barra de progreso */}
      <div
        style={{
          height: 3,
          background: "rgba(255,255,255,0.05)",
          borderRadius: 2,
          overflow: "hidden",
          marginBottom: 12,
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${progreso}%`,
            background: "#5e6ad2",
            borderRadius: 2,
            transition: "width 0.4s ease",
          }}
        />
      </div>

      {/* Puntos clave */}
      <ul
        style={{
          margin: 0,
          paddingLeft: 16,
          color: "#8a8f98",
          fontSize: 13,
          lineHeight: 1.6,
        }}
      >
        {puntosResumidos.map((punto, i) => (
          <li key={i}>{punto}</li>
        ))}
        {tema.puntos_clave.length > 3 && (
          <li style={{ color: "#62666d" }}>
            +{tema.puntos_clave.length - 3} más…
          </li>
        )}
      </ul>
    </Link>
  );
}
