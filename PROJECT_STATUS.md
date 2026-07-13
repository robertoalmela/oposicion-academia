# PROJECT_STATUS.md

> Estado vivo del proyecto. Mantener breve y útil para la próxima IA.

## Resumen

- Estado: operativo y desplegado en VPS como export estático de Next.js.
- Objetivo: academia personal para preparar la oposición de Técnico/Profesor de audiovisuales: temario, quizzes, simulacro y estadísticas.
- Usuario final: Roberto.
- Ruta local: `/home/roberto/Desktop/GitHub/00-active/oposicion-academia`
- Remote GitHub: https://github.com/robertoalmela/oposicion-academia
- URL pública VPS: https://vps.173.249.46.245.sslip.io/oposiciones/audiovisuales/

## Cómo arrancar

```bash
npm install
npm run dev
```

Para build de VPS bajo subruta:

```bash
npm run lint
PAGES_BASE_PATH=/oposiciones/audiovisuales npm run build
```

## Verificación

```bash
npm run lint
PAGES_BASE_PATH=/oposiciones/audiovisuales npm run build
curl -fsS https://vps.173.249.46.245.sslip.io/oposiciones/audiovisuales/ >/dev/null
curl -fsS https://vps.173.249.46.245.sslip.io/oposiciones/audiovisuales/temario/ >/dev/null
curl -fsS https://vps.173.249.46.245.sslip.io/oposiciones/audiovisuales/quiz/ >/dev/null
```

## Último estado conocido

- Fecha: 2026-07-13T12:43:09+02:00
- Qué funciona:
  - Home de academia en `/oposiciones/audiovisuales/`.
  - Temario, quiz, simulacro y estadísticas exportados como HTML estático.
  - Build con `basePath=/oposiciones/audiovisuales` para que assets y rutas funcionen en subdirectorio.
- Qué falta:
  - Seguir ampliando banco de preguntas y supuestos prácticos.
  - Revisar copy exacto si Roberto quiere orientarlo como “profesor” o “técnico auxiliar”.
- Bloqueos: ninguno.

## Próximos pasos

1. Ampliar preguntas por tema.
2. Añadir supuestos prácticos guiados.
3. Mantener despliegue VPS con `PAGES_BASE_PATH=/oposiciones/audiovisuales npm run build` + rsync a `/srv/apps/oposicion-academia/out`.

## Última actualización IA

- Fecha: `2026-07-13T11:06:30+00:00`
- Resumen: Corregida legibilidad de la landing de OpoAcademia: tema oscuro por defecto, variables CSS seguras antes de hidratación y tokens de color en la home
- Verificación: npm run lint; PAGES_BASE_PATH=/oposiciones/audiovisuales npm run build; deploy rsync a VPS; HTTP 200; Playwright dark/light con contrastes AA y consola sin errores

