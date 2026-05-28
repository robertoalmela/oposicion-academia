"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import preguntasData from "@/data/preguntas.json";
import temarioData from "@/data/temario.json";
import { PreguntaJSON, SimulacroResult, Tema } from "@/lib/types";
import { getProgreso, saveSimulacroResult } from "@/lib/storage";
import { respuestaCorrectaToIndex, stripOptionPrefix } from "@/lib/questions";

const PREGUNTAS_SIMULACRO = 30;
const PREGUNTAS_POR_BLOQUE = 15;
const TIEMPO_MINUTOS = 45;
const PENALIZACION_ERROR = 0.33;

const preguntas = preguntasData as PreguntaJSON[];
const temas = temarioData as Tema[];
const partePorTema = new Map(temas.map((tema) => [tema.id, tema.parte]));

type RespuestaSimulacro = {
  pregunta_id: number;
  respuesta: number | null;
  correcta: boolean;
};

function preguntaIdNumerico(id: string): number {
  const match = id.match(/\d+/);
  return match ? Number(match[0]) : 0;
}

function shuffle<T>(items: T[]): T[] {
  return [...items].sort(() => Math.random() - 0.5);
}

function crearSimulacro(): PreguntaJSON[] {
  const generales = preguntas.filter((p) => partePorTema.get(p.tema_id) === "general");
  const especiales = preguntas.filter((p) => partePorTema.get(p.tema_id) === "especial");

  const elegidas = [
    ...shuffle(generales).slice(0, PREGUNTAS_POR_BLOQUE),
    ...shuffle(especiales).slice(0, PREGUNTAS_POR_BLOQUE),
  ];

  if (elegidas.length < PREGUNTAS_SIMULACRO) {
    const ids = new Set(elegidas.map((p) => p.id));
    const restantes = preguntas.filter((p) => !ids.has(p.id));
    elegidas.push(...shuffle(restantes).slice(0, PREGUNTAS_SIMULACRO - elegidas.length));
  }

  return shuffle(elegidas).slice(0, PREGUNTAS_SIMULACRO);
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

export default function SimulacroPage() {
  const [mounted, setMounted] = useState(false);
  const [simulacros, setSimulacros] = useState<SimulacroResult[]>([]);
  const [preguntasSimulacro, setPreguntasSimulacro] = useState<PreguntaJSON[]>([]);
  const [enCurso, setEnCurso] = useState(false);
  const [indice, setIndice] = useState(0);
  const [seleccion, setSeleccion] = useState<number | null>(null);
  const [respondidas, setRespondidas] = useState<RespuestaSimulacro[]>([]);
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

  const resumen = useMemo(() => {
    const aciertos = respondidas.filter((r) => r.correcta).length;
    const fallos = respondidas.filter((r) => !r.correcta && r.respuesta !== null).length;
    const sinResponder = Math.max(0, preguntasSimulacro.length - respondidas.length);
    const puntuacion = Math.max(0, aciertos - fallos * PENALIZACION_ERROR);
    return { aciertos, fallos, sinResponder, puntuacion: Math.round(puntuacion * 100) / 100 };
  }, [preguntasSimulacro.length, respondidas]);

  function iniciarSimulacro() {
    setPreguntasSimulacro(crearSimulacro());
    setEnCurso(true);
    setIndice(0);
    setSeleccion(null);
    setRespondidas([]);
    setTiempoRestante(TIEMPO_MINUTOS * 60);
    setFinalizado(false);
  }

  function finalizarSimulacro(respuestasFinal: RespuestaSimulacro[]) {
    const aciertos = respuestasFinal.filter((r) => r.correcta).length;
    const errores = respuestasFinal.filter((r) => !r.correcta && r.respuesta !== null).length;
    const sinResponder = Math.max(0, preguntasSimulacro.length - respuestasFinal.length);
    const puntuacion = Math.max(0, aciertos - errores * PENALIZACION_ERROR);
    const result: SimulacroResult = {
      total: preguntasSimulacro.length || PREGUNTAS_SIMULACRO,
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
    const pregunta = preguntasSimulacro[indice];
    const correcta = respuestaCorrectaToIndex(pregunta.respuesta_correcta);
    const nueva: RespuestaSimulacro = {
      pregunta_id: preguntaIdNumerico(pregunta.id),
      respuesta: seleccion,
      correcta: seleccion === correcta,
    };
    const nuevas = [...respondidas, nueva];
    setRespondidas(nuevas);

    if (indice + 1 >= preguntasSimulacro.length) {
      finalizarSimulacro(nuevas);
    } else {
      setIndice(indice + 1);
      setSeleccion(null);
    }
  }

  if (!mounted) {
    return <div style={{ padding: "32px 0", color: "#8a8f98" }}>Cargando…</div>;
  }

  if (finalizado) {
    const porcentaje = Math.round((resumen.aciertos / Math.max(1, preguntasSimulacro.length)) * 100);

    return (
      <div style={{ padding: "40px 0", maxWidth: 860, margin: "0 auto" }}>
        <h1 style={{ fontSize: 24, fontWeight: 510, color: "#f7f8f8", marginBottom: 24, textAlign: "center" }}>
          Resultados del Simulacro
        </h1>

        <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: 32, textAlign: "center", marginBottom: 24 }}>
          <div style={{ fontSize: 48, fontWeight: 510, color: porcentaje >= 70 ? "#10b981" : "#f59e0b", marginBottom: 8 }}>
            {porcentaje}%
          </div>
          <p style={{ fontSize: 15, color: "#8a8f98", marginBottom: 24 }}>
            {resumen.aciertos} aciertos · {resumen.fallos} fallos · {resumen.sinResponder} sin responder
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
            {[
              ["Aciertos", resumen.aciertos, "#10b981"],
              ["Fallos", resumen.fallos, "#ef4444"],
              ["Sin responder", resumen.sinResponder, "#8a8f98"],
              ["Puntuación", resumen.puntuacion, "#f7f8f8"],
            ].map(([label, value, color]) => (
              <div key={label as string}>
                <p style={{ fontSize: 13, color: "#8a8f98" }}>{label}</p>
                <p style={{ fontSize: 28, fontWeight: 510, color: color as string }}>{value}</p>
              </div>
            ))}
          </div>
        </div>

        <section style={{ display: "grid", gap: 12, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 510, color: "#f7f8f8" }}>Revisión</h2>
          {preguntasSimulacro.map((pregunta, i) => {
            const respuesta = respondidas.find((r) => r.pregunta_id === preguntaIdNumerico(pregunta.id));
            const correctaIdx = respuestaCorrectaToIndex(pregunta.respuesta_correcta);
            const marcada = respuesta?.respuesta ?? null;
            return (
              <article key={pregunta.id} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: 18 }}>
                <p style={{ fontSize: 13, color: "#8a8f98", marginBottom: 6 }}>Pregunta {i + 1}</p>
                <h3 style={{ fontSize: 15, fontWeight: 510, color: "#f7f8f8", marginBottom: 12 }}>{pregunta.enunciado}</h3>
                <p style={{ fontSize: 14, color: marcada === correctaIdx ? "#10b981" : "#ef4444", marginBottom: 4 }}>
                  Marcada: {marcada === null ? "Sin responder" : stripOptionPrefix(pregunta.respuestas[marcada])}
                </p>
                <p style={{ fontSize: 14, color: "#10b981", marginBottom: pregunta.explicacion ? 10 : 0 }}>
                  Correcta: {stripOptionPrefix(pregunta.respuestas[correctaIdx])}
                </p>
                {pregunta.explicacion ? <p style={{ fontSize: 14, color: "#8a8f98", lineHeight: 1.6 }}>{pregunta.explicacion}</p> : null}
              </article>
            );
          })}
        </section>

        <div style={{ display: "flex", justifyContent: "center", gap: 12 }}>
          <button onClick={iniciarSimulacro} style={{ padding: "12px 24px", borderRadius: 6, background: "#5e6ad2", color: "#f7f8f8", fontSize: 14, fontWeight: 510, border: "none", cursor: "pointer" }}>
            Nuevo simulacro
          </button>
          <Link href="/" style={{ padding: "12px 24px", borderRadius: 6, color: "#8a8f98", textDecoration: "none", border: "1px solid rgba(255,255,255,0.08)" }}>
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  if (enCurso) {
    const pregunta = preguntasSimulacro[indice];
    return (
      <div style={{ padding: "32px 0", maxWidth: 720, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
          <div>
            <p style={{ fontSize: 13, color: "#8a8f98", marginBottom: 4 }}>Simulacro real · {partePorTema.get(pregunta.tema_id) === "general" ? "Parte general" : "Parte especial"}</p>
            <h1 style={{ fontSize: 20, fontWeight: 510, color: "#f7f8f8" }}>
              Pregunta {indice + 1} de {preguntasSimulacro.length}
            </h1>
          </div>
          <div style={{ fontSize: 16, fontWeight: 510, color: tiempoRestante < 300 ? "#ef4444" : "#f7f8f8", fontFamily: "JetBrains Mono, ui-monospace, monospace", padding: "8px 14px", borderRadius: 6, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
            {formatearTiempo(tiempoRestante)}
          </div>
        </div>

        <div style={{ height: 4, background: "rgba(255,255,255,0.05)", borderRadius: 2, overflow: "hidden", marginBottom: 28 }}>
          <div style={{ height: "100%", width: `${((indice + 1) / preguntasSimulacro.length) * 100}%`, background: "#5e6ad2", transition: "width 0.2s ease" }} />
        </div>

        <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: 28, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 510, color: "#f7f8f8", lineHeight: 1.5, marginBottom: 24 }}>{pregunta.enunciado}</h2>
          <div style={{ display: "grid", gap: 12 }}>
            {pregunta.respuestas.map((opcion, idx) => (
              <button key={idx} onClick={() => setSeleccion(idx)} style={{ textAlign: "left", padding: "14px 16px", borderRadius: 6, border: seleccion === idx ? "1px solid #5e6ad2" : "1px solid rgba(255,255,255,0.08)", background: seleccion === idx ? "rgba(94,106,210,0.12)" : "rgba(255,255,255,0.02)", color: "#f7f8f8", cursor: "pointer", fontSize: 15 }}>
                {stripOptionPrefix(opcion)}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <button onClick={() => finalizarSimulacro(respondidas)} style={{ padding: "10px 16px", borderRadius: 6, background: "transparent", color: "#8a8f98", border: "1px solid rgba(255,255,255,0.08)", cursor: "pointer" }}>
            Finalizar
          </button>
          <button onClick={handleResponder} disabled={seleccion === null} style={{ padding: "12px 24px", borderRadius: 6, background: seleccion === null ? "rgba(255,255,255,0.06)" : "#5e6ad2", color: seleccion === null ? "#62666d" : "#f7f8f8", border: "none", cursor: seleccion === null ? "not-allowed" : "pointer", fontWeight: 510 }}>
            {indice + 1 >= preguntasSimulacro.length ? "Finalizar simulacro" : "Siguiente"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: "40px 0", maxWidth: 720, margin: "0 auto" }}>
      <Link href="/" style={{ color: "#62666d", textDecoration: "none", fontSize: 14, marginBottom: 24, display: "inline-block" }}>← Volver</Link>
      <h1 style={{ fontSize: 32, fontWeight: 510, color: "#f7f8f8", marginBottom: 12 }}>Simulacro de Examen</h1>
      <p style={{ fontSize: 16, color: "#8a8f98", lineHeight: 1.6, marginBottom: 32 }}>
        30 preguntas reales seleccionadas del banco: 15 de parte general y 15 de parte especial. Penalización: -{PENALIZACION_ERROR} por fallo.
      </p>

      <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: 28, marginBottom: 24 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 28 }}>
          <div><p style={{ color: "#8a8f98", fontSize: 13 }}>Preguntas</p><p style={{ color: "#f7f8f8", fontSize: 24, fontWeight: 510 }}>{PREGUNTAS_SIMULACRO}</p></div>
          <div><p style={{ color: "#8a8f98", fontSize: 13 }}>Tiempo</p><p style={{ color: "#f7f8f8", fontSize: 24, fontWeight: 510 }}>{TIEMPO_MINUTOS} min</p></div>
          <div><p style={{ color: "#8a8f98", fontSize: 13 }}>Banco</p><p style={{ color: "#f7f8f8", fontSize: 24, fontWeight: 510 }}>{preguntas.length}</p></div>
        </div>
        <button onClick={iniciarSimulacro} style={{ width: "100%", padding: "14px 24px", borderRadius: 6, background: "#5e6ad2", color: "#f7f8f8", fontSize: 15, fontWeight: 510, border: "none", cursor: "pointer" }}>
          Iniciar simulacro
        </button>
      </div>

      {simulacros.length > 0 ? (
        <section>
          <h2 style={{ fontSize: 18, fontWeight: 510, color: "#f7f8f8", marginBottom: 12 }}>Últimos intentos</h2>
          <div style={{ display: "grid", gap: 8 }}>
            {simulacros.slice(-5).reverse().map((s, i) => (
              <div key={`${s.fecha}-${i}`} style={{ display: "flex", justifyContent: "space-between", padding: 14, borderRadius: 6, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)", color: "#8a8f98" }}>
                <span>{formatearFecha(s.fecha)}</span>
                <span>{s.aciertos}/{s.total} · {s.puntuacion} pts</span>
              </div>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
