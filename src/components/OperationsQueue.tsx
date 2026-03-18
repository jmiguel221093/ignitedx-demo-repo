import type { ServiceHealth } from "../types/operations";

const severityStyles: Record<ServiceHealth["severity"], string> = {
  critical: "bg-rose-400/15 text-rose-100 ring-1 ring-rose-400/30",
  high: "bg-amber-300/15 text-amber-50 ring-1 ring-amber-300/30",
  medium: "bg-cyan-300/15 text-cyan-50 ring-1 ring-cyan-300/30",
  low: "bg-emerald-300/15 text-emerald-50 ring-1 ring-emerald-300/30",
};

interface OperationsQueueProps {
  services: ServiceHealth[];
  selectedIndex: number;
  onSelect: (index: number) => void;
}

export function OperationsQueue({
  services,
  selectedIndex,
  onSelect,
}: OperationsQueueProps) {
  return (
    <div className="mt-5 space-y-3">
      {services.map((service, index) => {
        const isActive = selectedIndex === index;

        return (
          <button
            key={service.id}
            type="button"
            onClick={() => onSelect(index)}
            className={`w-full rounded-2xl border px-4 py-4 text-left transition ${
              isActive
                ? "border-cyan-300/60 bg-cyan-300/10"
                : "border-white/10 bg-white/[0.03] hover:bg-white/[0.05]"
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-lg font-medium text-white">
                  {service.service}
                </p>
                <p className="text-sm text-slate-400">{service.team}</p>
              </div>
              <span
                className={`rounded-full px-2.5 py-1 text-xs font-medium capitalize ${severityStyles[service.severity]}`}
              >
                {service.severity}
              </span>
            </div>

            <div className="mt-4 grid gap-3 text-sm text-slate-300 sm:grid-cols-3">
              <div>
                <p className="text-slate-500">Uptime</p>
                <p className="mt-1 font-medium text-white">{service.uptime}%</p>
              </div>
              <div>
                <p className="text-slate-500">Error budget</p>
                <p className="mt-1 font-medium text-white">
                  {service.errorBudget}%
                </p>
              </div>
              <div>
                <p className="text-slate-500">Incidents</p>
                <p className="mt-1 font-medium text-white">
                  {service.pendingIncidents}
                </p>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
