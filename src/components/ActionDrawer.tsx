import { BellRing, GitPullRequest, ShieldAlert } from 'lucide-react'
import type { RepositoryRecord } from '../types/dashboard'
import { Button } from './ui/button'

interface ActionDrawerProps {
  repository?: RepositoryRecord
}

export function ActionDrawer({ repository }: ActionDrawerProps) {
  if (!repository) {
    return (
      <article className="panel-card action-drawer">
        <div className="panel-card__header">
          <div>
            <p className="panel-card__eyebrow">Action drawer</p>
            <h2>Select a repository</h2>
          </div>
        </div>
      </article>
    )
  }

  return (
    <article className="panel-card action-drawer">
      <div className="panel-card__header">
        <div>
          <p className="panel-card__eyebrow">Action drawer</p>
          <h2>{repository.name}</h2>
        </div>
        <span className={`status-pill status-pill--${repository.status}`}>
          {repository.status}
        </span>
      </div>

      <div className="action-drawer__meta">
        <div>
          <span>Branch</span>
          <strong>{repository.branch}</strong>
        </div>
        <div>
          <span>Last commit</span>
          <strong>{repository.lastCommit}</strong>
        </div>
        <div>
          <span>Blocking findings</span>
          <strong>{repository.blockers}</strong>
        </div>
      </div>

      <div className="action-drawer__section">
        <div className="action-drawer__title">
          <ShieldAlert size={16} />
          <h3>Current notes</h3>
        </div>
        <ul>
          {repository.notes.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
      </div>

      <div className="action-drawer__section">
        <div className="action-drawer__title">
          <GitPullRequest size={16} />
          <h3>Action items</h3>
        </div>
        <ol>
          {repository.actionItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      </div>

      <div className="action-drawer__footer">
        <Button>Open release thread</Button>
        <Button variant="outline">
          <BellRing size={16} />
          Page owner
        </Button>
      </div>
    </article>
  )
}