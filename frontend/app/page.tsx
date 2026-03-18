"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function HomePage() {
  const handleContinueWithGoogle = () => {
    window.location.href = "/dashboard";
  };

  const handleContinueWithMicrosoft = () => {
    window.location.href = "/dashboard";
  };

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-16 md:py-24">
      <Card className="glass-surface max-w-3xl w-full rounded-3xl p-8 md:p-10">
        <CardHeader className="space-y-6 pb-4">
          <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/40 bg-slate-900/80 px-3 py-1 text-xs font-medium tracking-[0.22em] uppercase text-cyan-300">
            <i className="fa-solid fa-bolt" aria-hidden="true" />
            AutoPilot CRM · AI Sales Agent
          </span>
          <CardTitle className="text-4xl md:text-5xl font-semibold">
            Let AI run your{" "}
            <span className="text-cyan-300">outbound pipeline</span>.
          </CardTitle>
          <p className="text-lg text-slate-200 max-w-2xl">
            Your agent researches, writes, and sends on your behalf using your{" "}
            real Gmail, LinkedIn, and CRM accounts — secured end to end by Auth0
            Token Vault.
          </p>
          <div className="grid gap-4 text-sm text-slate-300 md:grid-cols-3">
            <div>
              <p className="font-semibold text-slate-100 flex items-center gap-2">
                <i className="fa-solid fa-user-tie" aria-hidden="true" />
                Acts as you
              </p>
              <p>Emails come from your real inbox, not a generic bot domain.</p>
            </div>
            <div>
              <p className="font-semibold text-slate-100 flex items-center gap-2">
                <i className="fa-solid fa-shield-halved" aria-hidden="true" />
                You stay in control
              </p>
              <p>High‑stakes steps pause for approval in a single tap.</p>
            </div>
            <div>
              <p className="font-semibold text-slate-100 flex items-center gap-2">
                <i className="fa-solid fa-lock" aria-hidden="true" />
                Enterprise safe
              </p>
              <p>Auth0 manages every token — nothing sensitive lives here.</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-8 pt-0 pb-2">
          <div className="space-y-3">
            <Button
              onClick={handleContinueWithGoogle}
              className="w-full h-10 text-sm bg-white text-slate-900 hover:bg-slate-100 gap-2"
            >
              <i className="fa-brands fa-google" aria-hidden="true" />
              Continue with Google
            </Button>
            <Button
              onClick={handleContinueWithMicrosoft}
              className="w-full h-10 text-sm bg-slate-900/60 text-white border border-white/10 hover:bg-slate-900 gap-2"
            >
              <i className="fa-brands fa-microsoft" aria-hidden="true" />
              Continue with Microsoft
            </Button>
            <p className="text-sm text-center text-slate-400">
              Or sign in using your company SSO provider via Auth0.
            </p>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between text-sm text-slate-400">
            <span className="flex items-center gap-2">
              <i className="fa-solid fa-circle" aria-hidden="true" />
              v0.1 · 20‑day sprint
            </span>
            <Link
              href="/onboarding"
              className="text-cyan-300 hover:text-cyan-200 underline-offset-4 hover:underline"
            >
              Configure your agent first
            </Link>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}

