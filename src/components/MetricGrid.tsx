import type { MetricItem } from '../types/dashboard'

interface MetricGridProps {
  metrics: MetricItem[]
}

export function MetricGrid({ metrics }: MetricGridProps) {
  return (
    <div className="metric-grid">
      {metrics.map((metric) => (
        <article key={metric.id} className="metric-card">
          <p className="metric-card__label">{metric.label}</p>
          <strong className="metric-card__value">{metric.value}</strong>
          <p className="metric-card__detail">{metric.detail}</p>
          <span className="metric-card__trend">{metric.trend}</span>
        </article>
      ))}
    </div>
  )
}
