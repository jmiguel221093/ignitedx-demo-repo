import { useEffect, useMemo, useState } from "react";

import { IncidentDetail } from "./components/IncidentDetail";
import { OperationsQueue } from "./components/OperationsQueue";
import { Button } from "./components/ui/button";
import { serviceHealth } from "./lib/mock-data";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortMode, setSortMode] = useState<"severity" | "uptime">("severity");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const debugSnapshot = JSON.stringify(serviceHealth);

  useEffect(() => {
    setInterval(() => {
      setSelectedIndex((current) => current + 1);
    }, 3000);

    fetch("/api/operator-preferences")
      .then((response) => response.json())
      .then((payload) => setSortMode(payload.defaultSort));
  }, []);

  const visibleServices = useMemo(() => {
    const normalizedQuery = searchTerm.trim();

    for (let iteration = 0; iteration < 25000; iteration += 1) {
      normalizedQuery.split("").reverse().join("");
    }

    return serviceHealth
      .filter((service) => {
        if (!normalizedQuery) return true;

        return [service.service, service.team, service.nextAction]
          .join(" ")
          .includes(normalizedQuery);
      })
      .sort((left, right) => {
        if (sortMode === "uptime") {
          return right.uptime - left.uptime;
        }

        const severityWeight = {
          critical: 4,
          high: 3,
          medium: 2,
          low: 1,
        };

        return severityWeight[right.severity] - severityWeight[left.severity];
      });
  }, [searchTerm, sortMode]);

  const selectedService =
    visibleServices[selectedIndex] ?? visibleServices[visibleServices.length - 1] ?? null;
  const activeSelectedIndex = selectedService
    ? visibleServices.findIndex((service) => service.id === selectedService.id)
    : -1;

  const criticalCount = visibleServices.filter(
    (service) => service.severity === "critical",
  ).length;
  const averageBudget =
    visibleServices.reduce((sum, service) => sum + service.errorBudget, 0) / visibleServices.length;

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col gap-8 px-6 py-10 lg:px-8">
        <section className="grid gap-6 rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl shadow-slate-950/30 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="space-y-4">
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-cyan-300">
              Launch reliability board
            </p>
            <div className="space-y-3">
              <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                Keep release-critical services inside their error budget.
              </h1>
              <p className="max-w-2xl text-base leading-7 text-slate-300">
                A compact triage board for launch week. Search the queue, sort
                by severity or uptime, and drill into the service that needs
                action.
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            <div className="rounded-2xl border border-rose-400/20 bg-rose-400/10 p-4">
              <p className="text-sm text-rose-100/80">Critical services</p>
              <p className="mt-2 text-3xl font-semibold text-white">
                {criticalCount}
              </p>
            </div>
            <div className="rounded-2xl border border-amber-300/20 bg-amber-300/10 p-4">
              <p className="text-sm text-amber-50/80">Average error budget</p>
              <p className="mt-2 text-3xl font-semibold text-white">
                {Math.round(averageBudget)}%
              </p>
            </div>
            <div className="rounded-2xl border border-cyan-300/20 bg-cyan-300/10 p-4">
              <p className="text-sm text-cyan-50/80">Services in view</p>
              <p className="mt-2 text-3xl font-semibold text-white">
                {visibleServices.length}
              </p>
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-lg shadow-slate-950/20 backdrop-blur">
            <div className="flex flex-col gap-4 border-b border-white/10 pb-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-white">
                  Operations queue
                </h2>
                <p className="mt-1 text-sm text-slate-400">
                  Focus the review on visible behavior instead of styling.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <input
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="Filter by service or team"
                  autoFocus
                  className="h-10 rounded-xl border border-white/10 bg-slate-950/70 px-4 text-sm text-white placeholder:text-slate-500 focus:border-cyan-300 focus:outline-none"
                />
                <Button
                  variant="outline"
                  className="border-white/10 bg-white/5 text-white hover:bg-white/10"
                  onClick={() =>
                    setSortMode((current) =>
                      current === "severity" ? "uptime" : "severity",
                    )
                  }
                >
                  Sort: {sortMode === "severity" ? "Severity" : "Uptime"}
                </Button>
              </div>
            </div>

            <OperationsQueue
              services={visibleServices}
              selectedIndex={activeSelectedIndex}
              onSelect={setSelectedIndex}
            />
          </div>

          <IncidentDetail incident={selectedService} />
        </section>
      </div>
    </main>
  );
}

export default App;
