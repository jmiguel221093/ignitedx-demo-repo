import { useMemo, useState } from 'react'
import './App.css'
import { ActionDrawer } from './components/ActionDrawer'
import { CommandCenterHeader } from './components/CommandCenterHeader'
import { MetricGrid } from './components/MetricGrid'
import { ReleaseTimeline } from './components/ReleaseTimeline'
import { RepositoryHealthTable } from './components/RepositoryHealthTable'
import { RiskMatrix } from './components/RiskMatrix'
import { SignalStrip } from './components/SignalStrip'
import { TeamWorkloadPanel } from './components/TeamWorkloadPanel'
import { dashboardData } from './lib/mock-data'

const statusOrder = ['all', 'at-risk', 'watch', 'healthy'] as const
type StatusFilter = (typeof statusOrder)[number]

function App() {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')
  const [selectedRepoId, setSelectedRepoId] = useState(
    dashboardData.repositories[0]?.id ?? ''
  )

  const visibleRepositories = useMemo(() => {
    if (statusFilter === 'all') {
      return dashboardData.repositories
    }

    return dashboardData.repositories.filter(
      (repository) => repository.status === statusFilter
    )
  }, [statusFilter])

  const selectedRepository = useMemo(() => {
    return (
      dashboardData.repositories.find(
        (repository) => repository.id === selectedRepoId
      ) ?? visibleRepositories[0] ?? dashboardData.repositories[0]
    )
  }, [selectedRepoId, visibleRepositories])

  return (
    <main className="app-shell">
      <div className="app-shell__backdrop" />
      <div className="app-shell__grid">
        <CommandCenterHeader
          release={dashboardData.release}
          filters={statusOrder}
          activeFilter={statusFilter}
          onFilterChange={setStatusFilter}
        />

        <SignalStrip signals={dashboardData.signals} />

        <section className="dashboard-section dashboard-section--wide">
          <MetricGrid metrics={dashboardData.metrics} />
        </section>

        <section className="dashboard-section dashboard-section--wide dashboard-section--two-column">
          <RiskMatrix risks={dashboardData.risks} />
          <ReleaseTimeline items={dashboardData.timeline} />
        </section>

        <section className="dashboard-section dashboard-section--wide dashboard-section--two-column">
          <RepositoryHealthTable
            repositories={visibleRepositories}
            selectedRepoId={selectedRepository?.id ?? ''}
            onSelectRepository={setSelectedRepoId}
          />
          <ActionDrawer repository={selectedRepository} />
        </section>

        <section className="dashboard-section dashboard-section--wide">
          <TeamWorkloadPanel squads={dashboardData.squads} />
        </section>
      </div>
    </main>
  )
}

export default App
