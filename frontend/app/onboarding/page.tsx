"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";

const steps = ["Role", "Goals", "Tools", "Preferences"] as const;

export default function OnboardingPage() {
  const [step, setStep] = useState(0);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-8">
      <Card className="glass-surface max-w-3xl w-full rounded-3xl p-8 md:p-10 space-y-8">
        <header className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">
            Quick setup
          </p>
          <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-1">
            <h1 className="text-3xl font-semibold">
              Tune your AI Sales Agent in 4 steps
            </h1>
            <span className="text-sm text-slate-300">
              Step {step + 1} of {steps.length}
            </span>
          </div>
          <p className="text-sm text-slate-300 max-w-xl">
            We&apos;ll use this to personalize copy, pick smart defaults, and
            keep your pipeline views focused on what matters.
          </p>
          <div className="flex gap-2 pt-1">
            {steps.map((label, idx) => (
              <div
                key={label}
                className={`h-1.5 flex-1 rounded-full ${
                  idx < step
                    ? "bg-cyan-400"
                    : idx === step
                    ? "bg-cyan-300"
                    : "bg-slate-700"
                }`}
              />
            ))}
          </div>
        </header>

        {step === 0 && <StepRole />}
        {step === 1 && <StepGoals />}
        {step === 2 && <StepTools />}
        {step === 3 && <StepPreferences />}

        <footer className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3 pt-4 border-t border-white/5">
          <Button
            variant="ghost"
            className="w-full sm:w-auto justify-center text-xs text-slate-300 hover:text-white"
            disabled={step === 0}
            onClick={() => setStep((s) => Math.max(0, s - 1))}
          >
            Back
          </Button>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 w-full sm:w-auto">
            <Link
              href="/"
              className="text-center text-xs text-slate-400 hover:text-slate-100"
            >
              Exit setup
            </Link>
            <Button
              className="w-full sm:w-auto"
              onClick={() =>
                step === steps.length - 1
                  ? (window.location.href = "/integrations")
                  : setStep((s) => Math.min(steps.length - 1, s + 1))
              }
            >
              {step === steps.length - 1 ? "Finish and review tools" : "Continue"}
            </Button>
          </div>
        </footer>
      </Card>
    </main>
  );
}

function StepRole() {
  const roles = ["Sales Rep", "SDR", "Sales Manager", "Founder", "Other"];
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="space-y-5">
      <h2 className="text-xl font-medium">What best describes your role?</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {roles.map((role) => (
          <button
            key={role}
            onClick={() => setSelected(role)}
            className={`rounded-2xl border px-4 py-3 text-sm text-left transition ${
              selected === role
                ? "border-cyan-300 bg-cyan-300/10"
                : "border-white/10 hover:border-cyan-300/80"
            }`}
          >
            {role}
          </button>
        ))}
      </div>
      <p className="text-sm text-slate-400">
        We&apos;ll use this to suggest the right views, cadences, and alerts.
      </p>
    </div>
  );
}

function StepGoals() {
  const goals = [
    "Book more meetings",
    "Respond to inbound faster",
    "Personalize outbound at scale",
    "Keep CRM clean & up to date",
    "Other"
  ];
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (goal: string) =>
    setSelected((prev) =>
      prev.includes(goal) ? prev.filter((g) => g !== goal) : [...prev, goal]
    );

  return (
    <div className="space-y-5">
      <h2 className="text-xl font-medium">What are your main goals for the next 90 days?</h2>
      <div className="flex flex-wrap gap-2">
        {goals.map((goal) => (
          <button
            key={goal}
            onClick={() => toggle(goal)}
            className={`rounded-full border px-4 py-2 text-sm transition ${
              selected.includes(goal)
                ? "border-cyan-300 bg-cyan-300/10"
                : "border-white/10 hover:border-cyan-300/80"
            }`}
          >
            {goal}
          </button>
        ))}
      </div>
      <Textarea
        className="mt-2"
        rows={3}
        placeholder="Anything else we should know about your motion, ACV, or team structure?"
      />
    </div>
  );
}

function StepTools() {
  const tools = [
    { name: "Gmail", status: "Not connected" },
    { name: "HubSpot", status: "Not connected" },
    { name: "LinkedIn", status: "Not connected" },
    { name: "Calendly", status: "Not connected" }
  ];

  return (
    <div className="space-y-5">
      <h2 className="text-xl font-medium">Connect your tools</h2>
      <p className="text-sm text-slate-300">
        We&apos;ll use these to draft emails, sync activity, and keep your CRM
        up to date.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {tools.map((tool) => (
          <div
            key={tool.name}
            className="rounded-2xl border border-white/10 bg-slate-900/40 p-4 space-y-3"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">{tool.name}</p>
              <span className="rounded-full bg-slate-800 px-2 py-0.5 text-[10px] uppercase tracking-wide text-slate-300">
                {tool.status}
              </span>
            </div>
            <p className="text-sm text-slate-400">
              Connect to let your agent act on your behalf via Auth0 Token Vault.
            </p>
            <Button
              className="w-full"
              size="sm"
              onClick={() => {
                if (tool.name === "Gmail" || tool.name === "Microsoft") {
                  window.location.href = "/auth/" + tool.name.toLowerCase();
                } else {
                  window.location.href = "/integrations";
                }
              }}
            >
              Connect
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

function StepPreferences() {
  return (
    <div className="space-y-5">
      <h2 className="text-xl font-medium">How should your AI sound?</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <p className="text-sm font-medium text-slate-300">Tone</p>
          <Select className="w-full">
            <option>Neutral</option>
            <option>Formal</option>
            <option>Casual</option>
          </Select>
        </div>
        <div className="space-y-2">
          <p className="text-sm font-medium text-slate-300">Email length</p>
          <Select className="w-full">
            <option>Medium</option>
            <option>Short</option>
            <option>Detailed</option>
          </Select>
        </div>
      </div>
      <div className="space-y-2">
        <p className="text-sm font-medium text-slate-300">
          ICP & product notes
        </p>
        <Textarea
          className="w-full"
          rows={3}
          placeholder="Describe your ICP, common objections, and how you like to position your product."
        />
      </div>
    </div>
  );
}

