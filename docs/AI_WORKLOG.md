# AI_WORKLOG.md

Bitácora de trabajo de agentes IA. Añadir entradas arriba, bajo "Últimas entradas".

## Últimas entradas

<!-- AI_WORKLOG:START -->
### 2026-07-13T10:49:00+00:00 — IA

- Resumen: Desplegada academia audiovisual en VPS bajo /oposiciones/audiovisuales con basePath y trailingSlash
- Verificación: npm run lint; PAGES_BASE_PATH=/oposiciones/audiovisuales npm run build; URLs públicas home/temario/quiz/simulacro/estadísticas 200; Playwright sin warnings
- Siguiente paso: no indicado
- Cambios detectados:
  - `M PROJECT_STATUS.md`
  - ` M docs/AI_WORKLOG.md`
  - ` M next.config.ts`

<!-- AI_WORKLOG:END -->

## 2026-07-13T12:43:09+02:00 — IA

- Agente/modelo: Hermes / gpt-5.5
- Resumen: build estático con basePath `/oposiciones/audiovisuales`, despliegue al VPS y enlace desde la landing central.
- Archivos tocados: `PROJECT_STATUS.md`, `docs/AI_WORKLOG.md`.
- Verificación: `npm run lint`; `PAGES_BASE_PATH=/oposiciones/audiovisuales npm run build`; HTTP público 200 en home/temario/quiz.
- Siguiente paso: ampliar preguntas y supuestos prácticos.
