"use client";

import { useEffect, useState } from "react";

export default function ThemeToggleButton() {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    setMounted(true);
    const t = document.documentElement.classList.contains("light") ? false : true;
    setIsDark(t);
  }, []);

  function toggle() {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.remove(isDark ? "dark" : "light");
    document.documentElement.classList.add(next ? "dark" : "light");
    try { localStorage.setItem("theme", next ? "dark" : "light"); } catch {}
  }

  if (!mounted) return <span style={{ width: 34, height: 34 }} />;

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
      {isDark ? "☀️" : "🌙"}
    </button>
  );
}
