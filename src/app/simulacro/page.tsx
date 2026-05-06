"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { SimulacroResult } from "@/lib/types";
import { getProgreso, saveSimulacroResult } from "@/lib/storage";

const PREGUNTAS_SIMULACRO = 30;
const TIEMPO_MINUTOS = 45;

// Preguntas placeholder para simulacro
const PREGUNTAS_SIMULACRO_PLACEHOLDER = Array.from({ length: PREGUNTAS_SIMULACRO }, (_, i) => ({
  id: i + 1,
  pregunta: `Pregunta ${i + 1} del simulacro de examen. Selecciona la respuesta correcta.`,
  opciones: [
    "Opción A - Respuesta correcta",
    "Opción B - Respuesta incorrecta",
    "Opción C - Respuesta incorrecta",
    "Opción D - Respuesta incorrecta",
  ],
  correcta: 0,
}));

export default function SimulacroPage() {
  const [mounted, setMounted] = useState(false);
  const [simulacros, setSimulacros] = useState<SimulacroResult[]>([]);
  const [enCurso, setEnCurso] = useState(false);
  const [indice, setIndice] = useState(0);
  const [seleccion, setSeleccion] = useState<number | null>(null);
  const [respondidas, setRespondidas] = useState<
    { pregunta_id: number; respuesta: number | null; correcta: boolean }[]
  >([]);
  const [tiempoRestante, setTiempoRestante] = useState(TIEMPO_MINUTOS * 60);
  const [finalizado, setFinalizado] = useState(false);

  useEffect(() => {
    setMounted(true);
    setSimulacros(getProgreso().simulacro_results);
  }, []);

  useEffect(() => {
    if (!enCurso || finalizado) return;
    const interval = setInterval(() => {
      setTiempoRestante((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          finalizarSimulacro(respondidas);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [enCurso, finalizado, respondidas]);

  function iniciarSimulacro() {
    setEnCurso(true);
    setIndice(0);
    setSeleccion(null);
    setRespondidas([]);
    setTiempoRestante(TIEMPO_MINUTOS * 60);
    setFinalizado(false);
  }

  function finalizarSimulacro(respuestasFinal: typeof respondidas) {
    const aciertos = respuestasFinal.filter((r) => r.correcta).length;
    const errores = respuestasFinal.filter((r) => !r.correcta && r.respuesta !== null).length;
    const sinResponder = PREGUNTAS_SIMULACRO - respuestasFinal.length;
    const puntuacion = Math.max(0, aciertos - errores * 0.33);
    const result: SimulacroResult = {
      total: PREGUNTAS_SIMULACRO,
      aciertos,
      errores,
      sin_responder: sinResponder,
      puntuacion: Math.round(puntuacion * 100) / 100,
      tiempo_segundos: TIEMPO_MINUTOS * 60 - tiempoRestante,
      fecha: Date.now(),
      respuestas: respuestasFinal,
    };
    saveSimulacroResult(result);
    setSimulacros(getProgreso().simulacro_results);
    setFinalizado(true);
    setEnCurso(false);
  }

  function handleResponder() {
    if (seleccion === null) return;
    const pregunta = PREGUNTAS_SIMULACRO_PLACEHOLDER[indice];
    const esCorrecta = seleccion === pregunta.correcta;
    const nueva = {
      pregunta_id: pregunta.id,
      respuesta: seleccion,
      correcta: esCorrecta,
    };
    const nuevas = [...respondidas, nueva];
    setRespondidas(nuevas);

    if (indice + 1 >= PREGUNTAS_SIMULACRO) {
      finalizarSimulacro(nuevas);
    } else {
      setIndice(indice + 1);
      setSeleccion(null);
    }
  }

  function formatearTiempo(segundos: number): string {
    const m = Math.floor(segundos / 60);
    const s = segundos % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  }

  function formatearFecha(ts: number): string {
    return new Date(ts).toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  if (!mounted) {
    return (
      <div style={{ padding: "32px 0" }}>
        <h1 style={{ fontSize: 28, fontWeight: 510, color: "#f7f8f8", marginBottom: 8 }}>
          Simulacro de Examen
        </h1>
        <p style={{ color: "#62666d" }}>Cargando…</p>
      </div>
    );
  }

  if (finalizado) {
    const aciertos = respondidas.filter((r) => r.correcta).length;
    const fallos = respondidas.filter((r) => !r.correcta && r.respuesta !== null).length;
    const sinResponder = PREGUNTAS_SIMULACRO - respondidas.length;
    const puntuacion = Math.max(0, aciertos - fallos * 0.33);
    const porcentaje = Math.round((aciertos / PREGUNTAS_SIMULACRO) * 100);

    return (
      <div style={{ padding: "40px 0", maxWidth: 600, margin: "0 auto" }}>
        <h1 style={{ fontSize: 24, fontWeight: 510, color: "#f7f8f8", marginBottom: 24, textAlign: "center" }}>
          Resultados del Simulacro
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
          <div style={{ fontSize: 48, fontWeight: 510, color: porcentaje >= 70 ? "#10b981" : "#f59e0b", marginBottom: 8 }}>
            {porcentaje}%
          </div>
          <p style={{ fontSize: 15, color: "#8a8f98", marginBottom: 24 }}>
            {aciertos} aciertos · {fallos} fallos · {sinResponder} sin responder
          </p>

          <div style={{ display: "flex", justifyContent: "center", gap: 32 }}>
            <div>
              <p style={{ fontSize: 13, color: "#8a8f98" }}>Aciertos</p>
              <p style={{ fontSize: 28, fontWeight: 510, color: "#10b981" }}>{aciertos}</p>
            </div>
            <div>
              <p style={{ fontSize: 13, color: "#8a8f98" }}>Fallos</p>
              <p style={{ fontSize: 28, fontWeight: 510, color: "#ef4444" }}>{fallos}</p>
            </div>
            <div>
              <p style={{ fontSize: 13, color: "#8a8f98" }}>Puntuación</p>
              <p style={{ fontSize: 28, fontWeight: 510, color: "#f7f8f8" }}>{Math.round(puntuacion * 100) / 100}</p>
            </div>
          </div>
        </div>

        <div style={{ textAlign: "center" }}>
          <button
            onClick={() => {
              setFinalizado(false);
              setRespondidas([]);
            }}
            style={{
              display: "inline-block",
              padding: "12px 24px",
              borderRadius: 6,
              background: "#5e6ad2",
              color: "#f7f8f8",
              fontSize: 14,
              fontWeight: 510,
              border: "none",
              cursor: "pointer",
              transition: "background 0.15s ease",
            }}
          >
            Nuevo simulacro
          </button>
        </div>
      </div>
    );
  }

  if (enCurso) {
    const pregunta = PREGUNTAS_SIMULACRO_PLACEHOLDER[indice];
    return (
      <div style={{ padding: "32px 0", maxWidth: 720, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
          <div>
            <p style={{ fontSize: 13, color: "#8a8f98", marginBottom: 4 }}>Simulacro de Examen</p>
            <h1 style={{ fontSize: 20, fontWeight: 510, color: "#f7f8f8" }}>
              Pregunta {indice + 1} de {PREGUNTAS_SIMULACRO}
            </h1>
          </div>
          <div
            style={{
              fontSize: 16,
              fontWeight: 510,
              color: tiempoRestante < 300 ? "#ef4444" : "#f7f8f8",
              fontFamily: "JetBrains Mono, ui-monospace, monospace",
              padding: "8px 14px",
              borderRadius: 6,
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            ⏱ {formatearTiempo(tiempoRestante)}
          </div>
        </div>

        <div
          style={{
            height: 4,
            background: "rgba(255,255,255,0.05)",
            borderRadius: 2,
            overflow: "hidden",
            marginBottom: 28,
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${((indice + 1) / PREGUNTAS_SIMULACRO) * 100}%`,
              background: "#5e6ad2",
              borderRadius: 2,
              transition: "width 0.3s ease",
            }}
          />
        </div>

        <div
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 8,
            padding: 24,
            marginBottom: 20,
          }}
        >
          <p style={{ fontSize: 16, fontWeight: 510, color: "#f7f8f8", lineHeight: 1.5, marginBottom: 20 }}>
            {pregunta.pregunta}
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {pregunta.opciones.map((opcion, i) => {
              const letras = ["A", "B", "C", "D"];
              const isSelected = seleccion === i;
              return (
                <button
                  key={i}
                  onClick={() => setSeleccion(i)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    width: "100%",
                    padding: "14px 16px",
                    borderRadius: 6,
                    border: isSelected ? "1px solid #5e6ad2" : "1px solid rgba(255,255,255,0.08)",
                    background: isSelected ? "rgba(94,106,210,0.08)" : "rgba(255,255,255,0.02)",
                    color: isSelected ? "#f7f8f8" : "#d0d6e0",
                    fontSize: 14,
                    textAlign: "left",
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                  }}
                >
                  <span
                    style={{
                      flexShrink: 0,
                      width: 28,
                      height: 28,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 6,
                      background: isSelected ? "#5e6ad2" : "rgba(255,255,255,0.05)",
                      color: isSelected ? "#f7f8f8" : "#8a8f98",
                      fontSize: 13,
                      fontWeight: 510,
                    }}
                  >
                    {letras[i]}
                  </span>
                  <span>{opcion}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button
            onClick={handleResponder}
            disabled={seleccion === null}
            style={{
              padding: "12px 24px",
              borderRadius: 6,
              border: "none",
              background: seleccion !== null ? "#5e6ad2" : "rgba(255,255,255,0.05)",
              color: seleccion !== null ? "#f7f8f8" : "#62666d",
              fontSize: 14,
              fontWeight: 510,
              cursor: seleccion !== null ? "pointer" : "not-allowed",
              transition: "all 0.15s ease",
            }}
          >
            {indice + 1 >= PREGUNTAS_SIMULACRO ? "Finalizar" : "Siguiente"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: "32px 0" }}>
      {/* Hero */}
      <div style={{ marginBottom: 32, textAlign: "center", maxWidth: 600, margin: "0 auto 32px" }}>
        <h1 style={{ fontSize: 28, fontWeight: 510, color: "#f7f8f8", marginBottom: 12 }}>
          Simulacro de Examen
        </h1>
        <p style={{ fontSize: 15, color: "#8a8f98", marginBottom: 24, lineHeight: 1.6 }}>
          Simulacro de {PREGUNTAS_SIMULACRO} preguntas aleatorias con tiempo limitado ({TIEMPO_MINUTOS} minutos)
        </p>
        <button
          onClick={iniciarSimulacro}
          style={{
            padding: "16px 40px",
            borderRadius: 8,
            border: "none",
            background: "#5e6ad2",
            color: "#f7f8f8",
            fontSize: 16,
            fontWeight: 510,
            cursor: "pointer",
            transition: "background 0.15s ease",
          }}
        >
          Iniciar Simulacro
        </button>
      </div>

      {/* Simulacros anteriores */}
      {simulacros.length > 0 && (
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <h2 style={{ fontSize: 16, fontWeight: 510, color: "#f7f8f8", marginBottom: 16 }}>
            Simulacros anteriores
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {simulacros
              .slice()
              .reverse()
              .map((s, i) => (
                <div
                  key={i}
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: 8,
                    padding: 16,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 16,
                  }}
                >
                  <div>
                    <p style={{ fontSize: 13, color: "#8a8f98", marginBottom: 4 }}>
                      {formatearFecha(s.fecha)}
                    </p>
                    <p style={{ fontSize: 14, fontWeight: 510, color: "#f7f8f8" }}>
                      {s.aciertos} aciertos · {s.errores} fallos · {s.sin_responder} sin responder
                    </p>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <p style={{ fontSize: 13, color: "#8a8f98", marginBottom: 2 }}>Puntuación</p>
                    <p style={{ fontSize: 20, fontWeight: 510, color: "#5e6ad2" }}>{s.puntuacion}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
