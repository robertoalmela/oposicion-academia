"use client";

import { useSyncExternalStore } from "react";
import { Progreso } from "./types";
import { subscribeProgreso, getProgresoSnapshot } from "./storage";

const getServerSnapshot = (): Progreso | null => null;

// Devuelve el progreso guardado en localStorage, o null durante el
// prerender/hidratación (las páginas muestran "Cargando…" en ese caso).
export function useProgreso(): Progreso | null {
  return useSyncExternalStore(subscribeProgreso, getProgresoSnapshot, getServerSnapshot);
}
