import type { RiskItem } from '../types/dashboard'

interface RiskMatrixProps {
  risks: RiskItem[]
}

export function RiskMatrix({ risks }: RiskMatrixProps) {
  return (
    <article className="panel-card">
      <div className="panel-card__header">
        <div>
          <p className="panel-card__eyebrow">Risk matrix</p>
          <h2>Live blockers and mitigations</h2>
        </div>
      </div>

      <div className="risk-list">
        {risks.map((risk) => (
          <section key={risk.id} className="risk-row">
            <div className={`risk-row__pill risk-row__pill--${risk.level}`}>{risk.level}</div>
            <div className="risk-row__content">
              <div className="risk-row__heading">
                <h3>{risk.title}</h3>
                <span>{risk.squad}</span>
              </div>
              <p>{risk.detail}</p>
              <strong>Mitigation</strong>
              <p>{risk.mitigation}</p>
            </div>
          </section>
        ))}
      </div>
    </article>
  )
}