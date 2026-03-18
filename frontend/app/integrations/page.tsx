"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const integrations = [
  {
    name: "Gmail",
    description: "Send and track emails directly from your AI Sales Agent.",
    cta: "Connect Gmail"
  },
  {
    name: "HubSpot",
    description: "Sync contacts, deals, and email activity in real time.",
    cta: "Connect HubSpot"
  },
  {
    name: "LinkedIn",
    description: "Enrich leads and personalize outreach using LinkedIn data.",
    cta: "Connect LinkedIn"
  },
  {
    name: "Calendly",
    description: "Let prospects book meetings directly into your calendar.",
    cta: "Connect Calendly"
  }
];

export default function IntegrationsPage() {
  const [connected, setConnected] = useState<Record<string, boolean>>({
    Gmail: false,
    HubSpot: false,
    LinkedIn: false,
    Calendly: false
  });

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-8">
      <section className="glass-surface max-w-4xl w-full rounded-3xl p-8 md:p-10 space-y-8">
        <header className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-300">
            Integrations
          </p>
          <h1 className="text-2xl font-semibold">
            Connect the tools your AI needs
          </h1>
          <p className="text-sm text-slate-300 max-w-2xl">
            Hook up Gmail, HubSpot, LinkedIn, and Calendly so AutoPilot can
            draft outreach, log activity, and book meetings on your behalf
            using secure delegated access via Auth0 Token Vault.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {integrations.map((integration) => {
            const isConnected = connected[integration.name];
            const isPrimary = integration.name === "Gmail";

            const handleClick = () => {
              if (integration.name === "Gmail") {
                window.location.href = "/auth/google";
              } else if (integration.name === "HubSpot") {
                window.location.href = "/auth/hubspot";
              } else if (integration.name === "LinkedIn") {
                window.location.href = "/auth/linkedin";
              } else if (integration.name === "Calendly") {
                window.location.href = "/auth/calendly";
              }
              setConnected((prev) => ({
                ...prev,
                [integration.name]: true
              }));
            };

            const handleDisconnect = () => {
              setConnected((prev) => ({
                ...prev,
                [integration.name]: false
              }));
            };

            return (
              <Card key={integration.name} className="space-y-3">
                <CardHeader className="pb-2 flex items-center justify-between gap-3">
                  <div>
                    <CardTitle className="text-sm">
                      {integration.name}
                    </CardTitle>
                    <p className="text-[11px] text-slate-300">
                      {integration.description}
                    </p>
                  </div>
                  <Badge
                    variant={isConnected ? "default" : "outline"}
                    className={isConnected ? "bg-emerald-500/20" : ""}
                  >
                    {isConnected ? "Connected" : "Not connected"}
                  </Badge>
                </CardHeader>
                <CardContent className="space-y-3 pt-0">
                  {isPrimary && (
                    <p className="text-[11px] text-emerald-300">
                      Primary channel — your agent will default to sending from
                      this inbox first.
                    </p>
                  )}
                  <p className="text-[11px] text-slate-400">
                    Requires delegated OAuth access. Credentials will live in
                    Auth0 Token Vault, not AutoPilot&apos;s database.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button
                      className="w-full sm:w-auto"
                      size="sm"
                      onClick={handleClick}
                    >
                      {isConnected ? "Reconnect" : integration.cta}
                    </Button>
                    {isConnected && (
                      <Button
                        variant="secondary"
                        size="sm"
                        className="w-full sm:w-auto"
                        onClick={handleDisconnect}
                      >
                        Disconnect
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>
    </main>
  );
}

