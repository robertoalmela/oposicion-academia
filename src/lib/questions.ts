export function respuestaCorrectaToIndex(respuesta: string): number {
  const normalized = respuesta.trim().toLowerCase();

  const map: Record<string, number> = {
    a: 0,
    b: 1,
    c: 2,
    d: 3,
    v: 0,
    verdadero: 0,
    true: 0,
    f: 1,
    falso: 1,
    false: 1,
  };

  return map[normalized] ?? 0;
}

export function stripOptionPrefix(text: string): string {
  return text.replace(/^[A-DVFa-dvf][).]\s*/, "").trim();
}
