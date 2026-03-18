import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "AutoPilot CRM — AI Sales Agent",
  description: "AI-powered sales automation agents, secured by Auth0."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
          integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body className="min-h-screen bg-background text-white antialiased">
        <div className="min-h-screen flex flex-col">
          <SiteHeader />
          <main className="flex-1">{children}</main>
        </div>
      </body>
    </html>
  );
}

function SiteHeader() {
  return (
    <header className="border-b border-white/5 bg-slate-950/60 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 gap-3">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-cyan-400/10 border border-cyan-400/40 text-xs font-semibold text-cyan-200">
            <i className="fa-solid fa-robot" aria-hidden="true" />
          </div>
          <div className="flex flex-col leading-tight">
            <Link
              href="/dashboard"
              className="text-sm font-semibold tracking-[0.18em] uppercase text-slate-100"
            >
              AutoPilot CRM
            </Link>
            <span className="text-xs text-slate-400">
              AI Sales Agent · v0.1
            </span>
          </div>
        </div>
        <nav className="hidden md:flex items-center gap-4 text-sm text-slate-300">
          <HeaderLink href="/dashboard" label="Dashboard" />
          <HeaderLink href="/integrations" label="Integrations" />
          <HeaderLink href="/onboarding" label="Onboarding" />
        </nav>
        <div className="flex items-center gap-2">
          <span className="hidden sm:inline-flex items-center rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-medium text-emerald-300 border border-emerald-500/40">
            Agent status: Idle
          </span>
          <button className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 border border-white/10 text-sm font-semibold">
            SR
          </button>
        </div>
      </div>
    </header>
  );
}

function HeaderLink({ href, label }: { href: string; label: string }) {
  const iconClass =
    label === "Dashboard"
      ? "fa-solid fa-gauge"
      : label === "Integrations"
      ? "fa-solid fa-plug"
      : label === "Onboarding"
      ? "fa-solid fa-wand-magic-sparkles"
      : "";

  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 rounded-full px-3 py-1 hover:bg-slate-900/80 hover:text-white transition"
    >
      {iconClass && <i className={iconClass} aria-hidden="true" />}
      {label}
    </Link>
  );
}


