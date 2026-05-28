# Plan de Mejora — OpoAcademia

## Diagnóstico (6 mayo 2026)

| Aspecto | Actual | Objetivo |
|---------|--------|----------|
| Temario | Plano, tipo Wikipedia, sin estructura | Bloques A/B/C con citas legales y casos prácticos |
| Preguntas totales | 220 | 600+ (25-30 por tema) |
| Tipología preguntas | 100% memorística | Pirámide: 30% memorística, 30% comprensión, 25% aplicación, 10% V/F, 5% casos |
| Distribución por tema | Muy desigual (tema 21: 23, tema 17: 4) | Balanceada: 20-35 por tema |
| Proporción general/especial | ~50/50 | 50/50 manteniendo |

## Formato de cada tema (objetivo)

Cada tema debe seguir esta estructura:

```
TEMA X: Título
├── BLOQUE A — MARCO NORMATIVO Y CONCEPTUAL
│   ├── 1.1 Definición y ámbito
│   ├── 1.2 Marco legal (citas textuales de artículos)
│   └── 1.3 Conceptos clave (glosario)
├── BLOQUE B — DESARROLLO TÉCNICO / ESPECIALIDAD
│   ├── 2.1 Fundamentos
│   ├── 2.2 Clasificaciones, tipologías
│   ├── 2.3 Equipos, herramientas, software
│   └── 2.4 Ejemplo práctico Diputación Valencia
└── BLOQUE C — ESQUEMA-RESUMEN
    ├── 3.1 Esquema jerárquico
    ├── 3.2 Datos clave (artículos, fechas, cifras)
    └── 3.3 5 preguntas rápidas de autoevaluación
```

## Pirámide de preguntas

Cada tema debe tener **25 preguntas** con esta distribución:
- 8 memorísticas directas (¿Qué artículo? ¿Cuántos días?)
- 8 de comprensión (¿Cuál NO es correcto? ¿Qué implica?)
- 5 de aplicación técnica (Si tenemos X, ¿qué hacemos?)
- 3 verdadero/falso razonado
- 1 caso práctico corto

## Formato JSON de preguntas

```json
{
  "id": "preg-XXX",
  "enunciado": "...",
  "respuestas": ["A) ...", "B) ...", "C) ...", "D) ..."],
  "respuesta_correcta": "A",
  "tema_id": "tema-X",
  "dificultad": "basico|intermedio|avanzado",
  "tipo": "memoristica|comprension|aplicacion|vf|caso",
  "explicacion": "Explicación de por qué es correcta y por qué no lo son las demás"
}
```

## Batches de generación

### Batch 1 — Temas 1-6 (Parte General I)
Contenido: CE Título Preliminar, Derechos Fundamentales, Organización Territorial, Ley 39/2015, Ley 40/2015, TREBEP

### Batch 2 — Temas 7-12 (Parte General II)
Contenido: Incompatibilidades, Transparencia, Prevención Riesgos, Igualdad, Protección Datos, Haciendas Locales

### Batch 3 — Temas 13-18 (Parte Especial I)
Contenido: Comunicación Audiovisual, Cámaras, Micrófonos, Iluminación, Edición Video, Edición Audio

### Batch 4 — Temas 19-24 (Parte Especial II)
Contenido: Grafismo, Proyección, Eventos, Codecs, Streaming, Legislación Audiovisual

## Prioridad
1. ✅ Ampliar batería de preguntas a 600+
2. ✅ Diversificar tipologías (incluir V/F, aplicación, casos)
3. Mejorar contenido del temario con estructura A/B/C
4. Añadir recursos complementarios (fichas, anexos)
