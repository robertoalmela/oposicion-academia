"use client";

import { useSyncExternalStore } from "react";

// Store mínimo sobre la clase del <html>: el snapshot se lee del DOM y
// toggle() notifica a los suscriptores tras mutarlo.
const listeners = new Set<() => void>();

function subscribeTheme(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function getThemeSnapshot(): "dark" | "light" {
  return document.documentElement.classList.contains("light") ? "light" : "dark";
}

function getServerTheme(): null {
  return null;
}

export default function ThemeToggleButton() {
  const theme = useSyncExternalStore(subscribeTheme, getThemeSnapshot, getServerTheme);

  function toggle() {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.classList.remove("dark", "light");
    document.documentElement.classList.add(next);
    try { localStorage.setItem("theme", next); } catch {}
    listeners.forEach((l) => l());
  }

  if (theme === null) return <span style={{ width: 34, height: 34 }} />;

  return (
    <button
      onClick={toggle}
      style={{
        background: "none",
        border: "1px solid var(--border)",
        borderRadius: 6,
        width: 34,
        height: 34,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        fontSize: 16,
        transition: "all 0.15s ease",
      }}
      aria-label="Cambiar modo"
    >
      {theme === "dark" ? "☀️" : "🌙"}
    </button>
  );
}
