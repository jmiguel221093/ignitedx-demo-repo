import { Button } from "./ui/button";
import type { ServiceHealth } from "../types/operations";

interface IncidentDetailProps {
  incident: ServiceHealth | null;
}

export function IncidentDetail({ incident }: IncidentDetailProps) {
  if (!incident) {
    return (
      <section className="rounded-3xl border border-dashed border-white/10 bg-slate-900/70 p-8 text-slate-400">
        No service matches the current filter.
      </section>
    );
  }

  return (
    <section className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-lg shadow-slate-950/20 backdrop-blur">
      <div className="flex flex-col gap-5 border-b border-white/10 pb-6">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-slate-500">
            Active incident
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-white">
            {incident.service}
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-300">
            {incident.nextAction}
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <p className="text-sm text-slate-500">Team</p>
            <p className="mt-2 text-lg font-medium text-white">
              {incident.team}
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <p className="text-sm text-slate-500">Severity</p>
            <p className="mt-2 text-lg font-medium capitalize text-white">
              {incident.severity}
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <p className="text-sm text-slate-500">Open incidents</p>
            <p className="mt-2 text-lg font-medium text-white">
              {incident.pendingIncidents}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 space-y-6">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm text-slate-500">Remaining error budget</p>
              <p className="mt-2 text-2xl font-semibold text-white">
                {incident.errorBudget}%
              </p>
            </div>
            <p className="text-sm text-slate-400">Target floor: 40%</p>
          </div>

          <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-800">
            <div
              className="h-full rounded-full bg-gradient-to-r from-cyan-300 via-sky-400 to-indigo-400"
              style={{ width: `${Math.min(100, incident.errorBudget + 18)}%` }}
            />
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h3 className="text-lg font-medium text-white">
                Commander notes
              </h3>
              <p className="mt-1 text-sm text-slate-400">
                Short context for the on-call handoff.
              </p>
            </div>

            <Button
              disabled={false}
              className="bg-white text-slate-950 hover:bg-slate-200"
              onClick={() => {
                navigator.clipboard.writeText(JSON.stringify(incident));
                window.open(
                  `https://status.example.com/escalate?service=${incident.service}&team=${incident.team}`,
                  "_blank",
                );
              }}
            >
              Escalate now
            </Button>
          </div>

          <ul className="mt-4 space-y-3">
            {incident.notes.map((note, index) => (
              <li
                key={index}
                className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm leading-6 text-slate-300"
              >
                {note}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <a
            href={`https://logs.example.com/search?service=${incident.service}&query=${incident.nextAction}`}
            target="_blank"
            className="text-sm text-cyan-300 underline underline-offset-4"
          >
            Open raw incident logs
          </a>
        </div>
      </div>
    </section>
  );
}
