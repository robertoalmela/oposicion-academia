import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import ThemeToggleButton from "./theme-toggle";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "OpoAcademia | Técnico Audiovisual",
  description:
    "Plataforma de estudio para la oposición de Técnico Auxiliar de Audiovisuales de la Diputación de Valencia. Temario completo, quiz por temas, simulacros de examen y seguimiento de progreso.",
};

const navLinks = [
  { href: "/temario", label: "Temario" },
  { href: "/quiz", label: "Quiz" },
  { href: "/simulacro", label: "Simulacro" },
  { href: "/estadisticas", label: "Estadísticas" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={inter.variable}>
      <body className={`${inter.className} antialiased`}>
        <header
          style={{
            position: "sticky",
            top: 0,
            zIndex: 50,
            background: "var(--bg-header)",
            borderBottom: "1px solid var(--border)",
            padding: "0 24px",
            height: 56,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Link
            href="/"
            style={{
              color: "var(--text-primary)",
              fontWeight: 510,
              fontSize: 16,
              textDecoration: "none",
              fontFamily: "Inter, system-ui, sans-serif",
            }}
          >
            OpoAcademia
          </Link>
          <nav style={{ display: "flex", gap: 24, alignItems: "center" }}>
            {navLinks.map((link) => (
              <NavLink key={link.href} href={link.href} label={link.label} />
            ))}
            <ThemeToggleButton />
          </nav>
        </header>
        <main
          style={{
            padding: 24,
            maxWidth: 1200,
            margin: "0 auto",
            minHeight: "calc(100vh - 56px)",
          }}
        >
          {children}
        </main>
      </body>
    </html>
  );
}

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      style={{
        color: "var(--text-secondary)",
        fontSize: 13,
        fontWeight: 510,
        textDecoration: "none",
        fontFamily: "Inter, system-ui, sans-serif",
        transition: "color 0.15s ease",
      }}
    >
      {label}
    </Link>
  );
}
