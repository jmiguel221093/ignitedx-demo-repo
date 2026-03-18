import type { ServiceHealth } from "../types/operations";

export const serviceHealth: ServiceHealth[] = [
  {
    id: "svc-auth",
    service: "Auth Gateway",
    team: "Identity",
    severity: "critical",
    uptime: 97.8,
    errorBudget: 91,
    pendingIncidents: 4,
    nextAction: "Escalate token refresh failures before launch freeze.",
    notes: [
      "Refresh endpoint latency doubled after the last cache rollout.",
      "Fallback path is active for enterprise SSO tenants.",
      "The incident commander asked for a mitigation ETA before 18:00 UTC.",
    ],
  },
  {
    id: "svc-billing",
    service: "Billing Sync",
    team: "Revenue Systems",
    severity: "high",
    uptime: 99.1,
    errorBudget: 72,
    pendingIncidents: 2,
    nextAction: "Verify retry backlog drains after the Stripe webhook replay.",
    notes: [
      "Replay jobs are clearing successfully in staging.",
      "Support tickets are limited to delayed invoice visibility.",
    ],
  },
  {
    id: "svc-search",
    service: "Search Indexer",
    team: "Discovery",
    severity: "medium",
    uptime: 99.4,
    errorBudget: 58,
    pendingIncidents: 3,
    nextAction:
      "Pause the next shard rebalance until write throughput stabilizes.",
    notes: [
      "Index freshness is lagging by 11 minutes in eu-west-1.",
      "Read traffic remains healthy across all storefronts.",
    ],
  },
  {
    id: "svc-notify",
    service: "Notification Fanout",
    team: "Lifecycle",
    severity: "low",
    uptime: 99.95,
    errorBudget: 26,
    pendingIncidents: 1,
    nextAction: "Monitor queue depth after tonight’s campaign send.",
    notes: [
      "The last regression was isolated to one provider region.",
      "Fallback delivery rules are already enabled.",
    ],
  },
];
