import { Rocket, ShieldCheck } from 'lucide-react'
import type { ReleaseSummary, RepositoryStatus } from '../types/dashboard'
import { Button } from './ui/button'

interface CommandCenterHeaderProps {
  release: ReleaseSummary
  filters: readonly ('all' | RepositoryStatus)[]
  activeFilter: 'all' | RepositoryStatus
  onFilterChange: (filter: 'all' | RepositoryStatus) => void
}

export function CommandCenterHeader({
  release,
  filters,
  activeFilter,
  onFilterChange,
}: CommandCenterHeaderProps) {
  return (
    <section className="hero-panel dashboard-section dashboard-section--wide">
      <div className="hero-panel__content">
        <div className="hero-panel__eyebrow">
          <Rocket size={16} />
          <span>Launch control surface</span>
        </div>
        <div className="hero-panel__copy">
          <div>
            <p className="hero-panel__kicker">{release.version}</p>
            <h1>Release command center</h1>
          </div>
          <p>{release.summary}</p>
        </div>
        <dl className="hero-panel__facts">
          <div>
            <dt>Branch</dt>
            <dd>{release.branch}</dd>
          </div>
          <div>
            <dt>Window</dt>
            <dd>{release.windowLabel}</dd>
          </div>
          <div>
            <dt>Owner</dt>
            <dd>{release.owner}</dd>
          </div>
        </dl>
      </div>

      <div className="hero-panel__controls">
        <div className="hero-panel__badge">
          <ShieldCheck size={16} />
          <span>Dry-run release artifact</span>
        </div>

        <div className="hero-panel__filters">
          {filters.map((filter) => (
            <Button
              key={filter}
              variant={filter === activeFilter ? 'default' : 'outline'}
              className="hero-panel__filter-button"
              onClick={() => onFilterChange(filter)}
            >
              {filter === 'all' ? 'All repos' : filter}
            </Button>
          ))}
        </div>
      </div>
    </section>
  )
}