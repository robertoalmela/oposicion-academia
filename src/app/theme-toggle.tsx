"use client";

import { useEffect, useSyncExternalStore } from "react";

// Store mínimo sobre la clase del <html>: el snapshot se lee del DOM y
// toggle() notifica a los suscriptores tras mutarlo.
const listeners = new Set<() => void>();

function applyTheme(theme: "dark" | "light") {
  document.documentElement.classList.remove("dark", "light");
  document.documentElement.classList.add(theme);
}

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

  useEffect(() => {
    try {
      const stored = localStorage.getItem("theme");
      applyTheme(stored === "light" ? "light" : "dark");
    } catch {
      applyTheme("dark");
    }
    listeners.forEach((l) => l());
  }, []);

  function toggle() {
    const next = theme === "dark" ? "light" : "dark";
    applyTheme(next);
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
