# Generar preguntas tipo test para OpoAcademia

## Contexto
Estás trabajando en el proyecto `~/Desktop/GitHub/oposicion-academia` (Next.js 16.2.4, App Router, TypeScript, output:export).

## Archivo de datos de temario
El archivo `src/data/temario.json` contiene 24 temas con id, titulo, contenido y puntos_clave. También tienen campo `parte` ("general" para temas 1-12, "especial" para temas 13-24).

## Tarea
Generar el archivo `src/data/preguntas.json` con **al menos 180 preguntas tipo test** distribuidas equitativamente entre los 24 temas (aprox 7-8 preguntas por tema).

## Formato exacto (JSON array, cada pregunta es un objeto)

```json
{
  "id": "preg-001",
  "enunciado": "¿Texto de la pregunta?",
  "respuestas": [
    "A) Primera opción",
    "B) Segunda opción",
    "C) Tercera opción",
    "D) Cuarta opción"
  ],
  "respuesta_correcta": "A",
  "tema_id": "tema-1",
  "dificultad": "básico"
}
```

## Reglas estrictas

1. **respuesta_correcta** debe ser una letra: "A", "B", "C" o "D"
2. **tema_id** debe coincidir exactamente con los IDs en temario.json ("tema-1" a "tema-24")
3. **dificultad**: "básico" (fácil, definiciones directas), "medio" (aplicación de conceptos), "avanzado" (detalles específicos, jurisprudencia, casos prácticos)
4. **Distribución**: ~40% básico, ~40% medio, ~20% avanzado
5. **Todas las preguntas deben basarse en el contenido real de temario.json** — usa los campos `contenido` y `puntos_clave` de cada tema para generar preguntas relevantes y correctas
6. **IDs secuenciales**: preg-001, preg-002, preg-003, etc.
7. **Cada respuesta debe tener exactamente 4 opciones** (A, B, C, D)
8. **Solo una respuesta correcta** por pregunta
9. **Las preguntas deben ser realistas para un examen de oposición** — nivel similar a tests de administración pública
10. **El archivo JSON debe ser válido** — se validará con `python3 -c "import json; json.load(open('src/data/preguntas.json'))"`

## Temas disponibles (resumen para referencia rápida)

### Parte General (temas 1-12): legislación y administración
1. Constitución: Título Preliminar y Título I (arts. 1-55)
2. Derechos Fundamentales (arts. 15-29)
3. Organización Territorial del Estado (arts. 137-158)
4. Ley 39/2015: Procedimiento Administrativo Común
5. Ley 40/2015: Régimen Jurídico del Sector Público
6. TREBEP: Estatuto Básico del Empleado Público
7. Ley 53/1984: Incompatibilidades
8. Ley 19/2013: Transparencia y Buen Gobierno
9. Ley 31/1995: Prevención de Riesgos Laborales
10. Ley Orgánica 3/2007: Igualdad
11. Ley Orgánica 3/2018: Protección de Datos
12. TRLHL: Haciendas Locales

### Parte Especial (temas 13-24): audiovisuales
13. Fundamentos Comunicación Audiovisual
14. Equipos Captación de Imagen
15. Equipos Captación y Reproducción de Sonido
16. Iluminación
17. Edición de Video
18. Edición de Audio
19. Grafismo y Postproducción
20. Proyección y Megafonía
21. Producción y Realización de Eventos
22. Formatos y Codecs
23. Streaming y Distribución Digital
24. Legislación Audiovisual

## Instrucciones de ejecución
1. Lee el archivo `src/data/temario.json` para obtener el contenido completo de cada tema
2. Genera las preguntas una por una o en lotes, asegurando la validez del JSON final
3. Escribe el resultado en `src/data/preguntas.json`
4. Verifica que el JSON es válido con Python
