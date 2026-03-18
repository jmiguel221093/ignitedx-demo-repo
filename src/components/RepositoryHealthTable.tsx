import type { RepositoryRecord } from '../types/dashboard'

interface RepositoryHealthTableProps {
  repositories: RepositoryRecord[]
  selectedRepoId: string
  onSelectRepository: (repositoryId: string) => void
}

export function RepositoryHealthTable({
  repositories,
  selectedRepoId,
  onSelectRepository,
}: RepositoryHealthTableProps) {
  return (
    <article className="panel-card">
      <div className="panel-card__header">
        <div>
          <p className="panel-card__eyebrow">Repository health</p>
          <h2>Release train readiness</h2>
        </div>
      </div>

      <div className="repo-table">
        <div className="repo-table__header repo-table__row">
          <span>Repository</span>
          <span>Status</span>
          <span>Coverage</span>
          <span>Open PRs</span>
          <span>Deploy window</span>
        </div>

        {repositories.map((repository) => (
          <button
            key={repository.id}
            type="button"
            className={`repo-table__row repo-table__row--interactive ${
              repository.id === selectedRepoId ? 'repo-table__row--selected' : ''
            }`}
            onClick={() => onSelectRepository(repository.id)}
          >
            <span>
              <strong>{repository.name}</strong>
              <small>{repository.owner}</small>
            </span>
            <span className={`status-pill status-pill--${repository.status}`}>
              {repository.status}
            </span>
            <span>{repository.reviewCoverage}</span>
            <span>{repository.openPrs}</span>
            <span>{repository.deployWindow}</span>
          </button>
        ))}
      </div>
    </article>
  )
}