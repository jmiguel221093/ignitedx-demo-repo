import type { DashboardData } from '../types/dashboard'

export const dashboardData: DashboardData = {
  release: {
    version: 'Release 24.6',
    branch: 'release/march-17-cutover',
    windowLabel: 'Mar 17, 10:00 PM to 12:30 AM UTC',
    owner: 'IgniteDX launch command',
    summary:
      'A synthetic release command center built to generate a realistic large PR for review pipeline testing.',
  },
  signals: [
    { id: 'signal-1', label: 'Services green', value: '11 / 12', tone: 'warning' },
    { id: 'signal-2', label: 'Review coverage', value: '93%', tone: 'positive' },
    { id: 'signal-3', label: 'Migration risk', value: '2 high-risk', tone: 'warning' },
    { id: 'signal-4', label: 'Rollback ready', value: '14 min', tone: 'neutral' },
  ],
  metrics: [
    {
      id: 'metric-1',
      label: 'Queued changes',
      value: '46',
      detail: 'across platform, API, and docs',
      trend: '+8 since 4 PM',
    },
    {
      id: 'metric-2',
      label: 'Blocking findings',
      value: '3',
      detail: 'remaining before freeze lifts',
      trend: '-5 today',
    },
    {
      id: 'metric-3',
      label: 'Cutover confidence',
      value: '72%',
      detail: 'weighted from infra and review health',
      trend: '+11 points',
    },
    {
      id: 'metric-4',
      label: 'Canary readiness',
      value: '8 / 9',
      detail: 'regions signed off',
      trend: 'EU-West pending',
    },
  ],
  risks: [
    {
      id: 'risk-1',
      title: 'Schema drift in analytics backfill',
      level: 'critical',
      squad: 'Data Systems',
      detail:
        'The event rollup backfill still depends on a staging-only column alias and has not been replayed against production snapshots.',
      mitigation:
        'Run the replay script against the prod-shadow dataset and pin the migration order before the deploy train starts.',
    },
    {
      id: 'risk-2',
      title: 'Region failover runbook is stale',
      level: 'elevated',
      squad: 'Platform Core',
      detail:
        'The current rollback notes reference old queue names and omit the new edge cache warmup step.',
      mitigation:
        'Patch the runbook and attach the corrected sequence to the release checkpoint ticket.',
    },
    {
      id: 'risk-3',
      title: 'Support macros missing new entitlement language',
      level: 'stable',
      squad: 'Launch Ops',
      detail:
        'Customer-facing templates are functionally correct but still use pre-launch naming for the self-serve upgrade path.',
      mitigation:
        'Publish the revised support pack before the communications hold lifts.',
    },
  ],
  timeline: [
    {
      id: 'timeline-1',
      time: '18:30',
      title: 'Final freeze check',
      summary: 'Repository owners verify branch freshness and release labels.',
      state: 'done',
    },
    {
      id: 'timeline-2',
      time: '19:15',
      title: 'AI review reconciliation',
      summary: 'Resolve open blockers and confirm chunked review coverage on the last two large PRs.',
      state: 'in_progress',
    },
    {
      id: 'timeline-3',
      time: '20:00',
      title: 'Canary enablement',
      summary: 'Enable the first region pair and validate telemetry parity.',
      state: 'up_next',
    },
    {
      id: 'timeline-4',
      time: '21:10',
      title: 'Traffic ramp',
      summary: 'Increase traffic from 5% to 35% if alert budgets remain clear.',
      state: 'up_next',
    },
  ],
  repositories: [
    {
      id: 'repo-1',
      name: 'ignitedx-app',
      owner: 'Platform',
      status: 'watch',
      branch: 'release/march-17-cutover',
      openPrs: 7,
      blockers: 1,
      reviewCoverage: '96%',
      deployWindow: '22:00 UTC',
      lastCommit: '9 minutes ago',
      notes: [
        'One chunked review retried successfully after prompt reduction.',
        'Manual rerun pending after env config sync.',
      ],
      actionItems: [
        'Confirm the incremental diff path after the final squash merge.',
        'Attach the cutover owner to the emergency rollback issue.',
        'Validate that stale reviews were dismissed on the superseded commit.',
      ],
    },
    {
      id: 'repo-2',
      name: 'ignitedx-website',
      owner: 'Growth',
      status: 'healthy',
      branch: 'release/launch-copy-sweep',
      openPrs: 4,
      blockers: 0,
      reviewCoverage: '100%',
      deployWindow: '21:40 UTC',
      lastCommit: '23 minutes ago',
      notes: [
        'No blocking findings remain after image asset cleanup.',
        'Form analytics verified in the canary environment.',
      ],
      actionItems: [
        'Warm the homepage and pricing page caches after the release tag is cut.',
        'Re-check the support and privacy page redirects.',
      ],
    },
    {
      id: 'repo-3',
      name: 'ignitedx-api',
      owner: 'Backend',
      status: 'at-risk',
      branch: 'release/contract-lock',
      openPrs: 9,
      blockers: 2,
      reviewCoverage: '88%',
      deployWindow: '22:20 UTC',
      lastCommit: '3 minutes ago',
      notes: [
        'The replication worker patch still needs a final pair review.',
        'One data migration is waiting on a production dry run.',
      ],
      actionItems: [
        'Replay the schema backfill against the latest warehouse snapshot.',
        'Double-check rate limit defaults for the new webhook burst guard.',
        'Create a temporary dashboard for payment callback latency.',
      ],
    },
    {
      id: 'repo-4',
      name: 'ignitedx-docs',
      owner: 'Enablement',
      status: 'healthy',
      branch: 'release/launch-playbooks',
      openPrs: 3,
      blockers: 0,
      reviewCoverage: '91%',
      deployWindow: '21:00 UTC',
      lastCommit: '44 minutes ago',
      notes: [
        'Runbooks updated with new review-state screenshots.',
        'Training deck export queued for the final stakeholder share-out.',
      ],
      actionItems: [
        'Publish the revised incident glossary.',
        'Ship the new reviewer FAQ with the launch packet.',
      ],
    },
    {
      id: 'repo-5',
      name: 'ignitedx-mobile',
      owner: 'Experience',
      status: 'watch',
      branch: 'release/mobile-cutover',
      openPrs: 5,
      blockers: 0,
      reviewCoverage: '90%',
      deployWindow: '22:45 UTC',
      lastCommit: '12 minutes ago',
      notes: [
        'Crash-free sessions exceed the exit criteria for the beta cohort.',
        'The final dark-launch flag was moved behind remote config.',
      ],
      actionItems: [
        'Coordinate store metadata approval timing with the comms team.',
        'Confirm deeplink parity on the region failover build.',
      ],
    },
  ],
  squads: [
    {
      id: 'squad-1',
      name: 'Platform Core',
      throughput: '18 tasks closed today',
      focusArea: 'traffic ramp and failover readiness',
      members: [
        { id: 'member-1', name: 'Mina', role: 'Infra lead', focus: 'edge cache warmup', load: 78 },
        { id: 'member-2', name: 'Rafael', role: 'SRE', focus: 'alert budget tuning', load: 66 },
        { id: 'member-3', name: 'June', role: 'Release manager', focus: 'cutover sequencing', load: 83 },
      ],
    },
    {
      id: 'squad-2',
      name: 'Data Systems',
      throughput: '11 tasks closed today',
      focusArea: 'schema replay and downstream validation',
      members: [
        { id: 'member-4', name: 'Tariq', role: 'Staff engineer', focus: 'warehouse replay', load: 91 },
        { id: 'member-5', name: 'Ava', role: 'Analytics engineer', focus: 'event parity checks', load: 72 },
        { id: 'member-6', name: 'Luis', role: 'QA partner', focus: 'migration smoke tests', load: 64 },
      ],
    },
    {
      id: 'squad-3',
      name: 'Launch Ops',
      throughput: '24 tasks closed today',
      focusArea: 'support readiness and customer messaging',
      members: [
        { id: 'member-7', name: 'Nora', role: 'Support lead', focus: 'macro updates', load: 57 },
        { id: 'member-8', name: 'Eli', role: 'Enablement PM', focus: 'sales packet QA', load: 61 },
        { id: 'member-9', name: 'Sara', role: 'Comms manager', focus: 'launch sequence', load: 74 },
      ],
    },
  ],
}