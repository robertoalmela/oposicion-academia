"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import temario from "@/data/temario.json";
import { Tema, QuizResult } from "@/lib/types";
import { saveQuizResult } from "@/lib/storage";

const temas = temario as Tema[];

// Preguntas placeholder generadas a partir del contenido del temario
function generarPreguntasPlaceholder(tema: Tema) {
  const preguntas = [
    {
      id: 1,
      pregunta: `¿Cuál es el tema principal de "${tema.titulo}"?`,
      opciones: [
        tema.titulo,
        "Un tema no relacionado con el temario",
        "Otra materia de la oposición",
        "Ninguna de las anteriores",
      ],
      correcta: 0,
      explicacion: `El tema principal es precisamente: ${tema.titulo}.`,
    },
    {
      id: 2,
      pregunta: `¿A qué parte del temario pertenece la Unidad ${tema.unidad}?`,
      opciones: [
        tema.parte === "general" ? "Parte Especial" : "Parte General",
        tema.parte === "general" ? "Parte General" : "Parte Especial",
        "Ambas partes",
        "Ninguna parte",
      ],
      correcta: 1,
      explicacion: `La Unidad ${tema.unidad} pertenece a la ${tema.parte === "general" ? "Parte General" : "Parte Especial"}.`,
    },
    {
      id: 3,
      pregunta: `Según los puntos clave de la Unidad ${tema.unidad}, ¿cuál de estos conceptos es relevante?`,
      opciones: [
        tema.puntos_clave[0] || "Concepto principal",
        "Concepto inventado A",
        "Concepto inventado B",
        "Concepto inventado C",
      ],
      correcta: 0,
      explicacion: `El primer punto clave del tema es: ${tema.puntos_clave[0] || "Concepto principal"}.`,
    },
    {
      id: 4,
      pregunta: `¿Cuántos puntos clave tiene la Unidad ${tema.unidad}?`,
      opciones: [
        `${tema.puntos_clave.length - 1}`,
        `${tema.puntos_clave.length}`,
        `${tema.puntos_clave.length + 1}`,
        "No tiene puntos clave",
      ],
      correcta: 1,
      explicacion: `La Unidad ${tema.unidad} tiene ${tema.puntos_clave.length} puntos clave.`,
    },
    {
      id: 5,
      pregunta: `¿Qué tipo de contenido incluye la Unidad ${tema.unidad}?`,
      opciones: [
        "Solo definiciones",
        "Solo casos prácticos",
        "Contenido teórico con puntos clave",
        "Solo ejercicios",
      ],
      correcta: 2,
      explicacion: `La unidad incluye contenido teórico detallado y una lista de puntos clave para el estudio.`,
    },
    {
      id: 6,
      pregunta: `¿Cuál es el identificador único de esta unidad en el temario?`,
      opciones: [
        `tema-${tema.unidad + 1}`,
        tema.id,
        `unidad-${tema.unidad - 1}`,
        "sin-id",
      ],
      correcta: 1,
      explicacion: `El identificador de esta unidad es ${tema.id}.`,
    },
    {
      id: 7,
      pregunta: `Según el temario, ¿qué se estudia en la Unidad ${tema.unidad}?`,
      opciones: [
        "Materias de otra oposición",
        tema.titulo,
        "Temas de la Parte General exclusivamente",
        "Temas de la Parte Especial exclusivamente",
      ],
      correcta: 1,
      explicacion: `La Unidad ${tema.unidad} trata sobre: ${tema.titulo}.`,
    },
    {
      id: 8,
      pregunta: `¿Cuál de estos puntos clave aparece en la Unidad ${tema.unidad}?`,
      opciones: [
        tema.puntos_clave[1] || tema.puntos_clave[0] || "Punto clave",
        "Punto clave inventado 1",
        "Punto clave inventado 2",
        "Punto clave inventado 3",
      ],
      correcta: 0,
      explicacion: `Este punto clave aparece en la lista de la unidad.`,
    },
    {
      id: 9,
      pregunta: `La Unidad ${tema.unidad} forma parte de la oposición de:`,
      opciones: [
        "Técnico de Sonido",
        "Técnico Auxiliar de Audiovisuales",
        "Técnico de Iluminación",
        "Técnico de Realización",
      ],
      correcta: 1,
      explicacion: `Esta unidad forma parte del temario de Técnico Auxiliar de Audiovisuales de la Diputación de Valencia.`,
    },
    {
      id: 10,
      pregunta: `¿Qué formato tiene el contenido de la Unidad ${tema.unidad}?`,
      opciones: [
        "Solo imágenes",
        "Solo vídeos",
        "Texto con formato markdown",
        "Solo audio",
      ],
      correcta: 2,
      explicacion: `El contenido está en formato markdown con secciones, listas y negritas.`,
    },
  ];
  return preguntas;
}

export default function QuizTemaClient() {
  const params = useParams();
  const temaId = params.id as string;
  const tema = temas.find((t) => t.id === temaId);

  const [preguntas] = useState(() =>
    tema ? generarPreguntasPlaceholder(tema) : []
  );
  const [indice, setIndice] = useState(0);
  const [seleccion, setSeleccion] = useState<number | null>(null);
  const [respondidas, setRespondidas] = useState<
    { pregunta_id: number; correcta: boolean }[]
  >([]);
  const [finalizado, setFinalizado] = useState(false);

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

  const preguntaActual = preguntas[indice];
  const total = preguntas.length;

  function handleResponder() {
    if (seleccion === null) return;
    const esCorrecta = seleccion === preguntaActual.correcta;
    const nuevaRespuesta = {
      pregunta_id: preguntaActual.id,
      correcta: esCorrecta,
    };
    const nuevasRespondidas = [...respondidas, nuevaRespuesta];
    setRespondidas(nuevasRespondidas);

    if (indice + 1 >= total) {
      const aciertos = nuevasRespondidas.filter((r) => r.correcta).length;
      const errores = nuevasRespondidas.filter((r) => !r.correcta).length;
      const result: QuizResult = {
        tema_id: tema!.id,
        total,
        aciertos,
        errores,
        fecha: Date.now(),
        respuestas: nuevasRespondidas,
      };
      saveQuizResult(result);
      setFinalizado(true);
    } else {
      setIndice(indice + 1);
      setSeleccion(null);
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

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 32,
            }}
          >
            <div>
              <p style={{ fontSize: 13, color: "#8a8f98" }}>Aciertos</p>
              <p
                style={{ fontSize: 28, fontWeight: 510, color: "#10b981" }}
              >
                {aciertos}
              </p>
            </div>
            <div>
              <p style={{ fontSize: 13, color: "#8a8f98" }}>Fallos</p>
              <p
                style={{ fontSize: 28, fontWeight: 510, color: "#ef4444" }}
              >
                {fallos}
              </p>
            </div>
          </div>
        </div>

        <div style={{ textAlign: "center" }}>
          <Link
            href="/temario"
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
            Volver al temario
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: "32px 0", maxWidth: 720, margin: "0 auto" }}>
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 24,
        }}
      >
        <div>
          <p style={{ fontSize: 13, color: "#8a8f98", marginBottom: 4 }}>
            Quiz · {tema.titulo}
          </p>
          <h1
            style={{
              fontSize: 20,
              fontWeight: 510,
              color: "#f7f8f8",
            }}
          >
            Pregunta {indice + 1} de {total}
          </h1>
        </div>
        <div
          style={{
            fontSize: 13,
            color: "#8a8f98",
          }}
        >
          {Math.round(((indice + 1) / total) * 100)}%
        </div>
      </div>

      {/* Barra de progreso */}
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
            width: `${((indice + 1) / total) * 100}%`,
            background: "#5e6ad2",
            borderRadius: 2,
            transition: "width 0.3s ease",
          }}
        />
      </div>

      {/* Pregunta */}
      <div
        style={{
          background: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 8,
          padding: 24,
          marginBottom: 20,
        }}
      >
        <p
          style={{
            fontSize: 16,
            fontWeight: 510,
            color: "#f7f8f8",
            lineHeight: 1.5,
            marginBottom: 20,
          }}
        >
          {preguntaActual.pregunta}
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {preguntaActual.opciones.map((opcion, i) => {
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
                  border: isSelected
                    ? "1px solid #5e6ad2"
                    : "1px solid rgba(255,255,255,0.08)",
                  background: isSelected
                    ? "rgba(94,106,210,0.08)"
                    : "rgba(255,255,255,0.02)",
                  color: isSelected ? "#f7f8f8" : "#d0d6e0",
                  fontSize: 14,
                  textAlign: "left",
                  cursor: "pointer",
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
          }}
        >
          {indice + 1 >= total ? "Finalizar" : "Siguiente"}
        </button>
      </div>
    </div>
  );
}
