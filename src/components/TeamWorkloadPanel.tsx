import type { SquadRecord } from '../types/dashboard'

interface TeamWorkloadPanelProps {
  squads: SquadRecord[]
}

export function TeamWorkloadPanel({ squads }: TeamWorkloadPanelProps) {
  return (
    <article className="panel-card">
      <div className="panel-card__header">
        <div>
          <p className="panel-card__eyebrow">Team load</p>
          <h2>Squad workload and ownership</h2>
        </div>
      </div>

      <div className="squad-grid">
        {squads.map((squad) => (
          <section key={squad.id} className="squad-card">
            <div className="squad-card__header">
              <div>
                <h3>{squad.name}</h3>
                <p>{squad.focusArea}</p>
              </div>
              <span>{squad.throughput}</span>
            </div>

            <div className="squad-card__members">
              {squad.members.map((member) => (
                <article key={member.id} className="member-row">
                  <div>
                    <strong>{member.name}</strong>
                    <span>{member.role}</span>
                  </div>
                  <div>
                    <p>{member.focus}</p>
                    <div className="member-row__bar">
                      <div
                        className="member-row__bar-fill"
                        style={{ width: `${member.load}%` }}
                      />
                    </div>
                    <span>{member.load}% occupied</span>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </article>
  )
}