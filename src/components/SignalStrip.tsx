import type { SignalItem } from '../types/dashboard'

interface SignalStripProps {
  signals: SignalItem[]
}

export function SignalStrip({ signals }: SignalStripProps) {
  return (
    <section className="signal-strip dashboard-section dashboard-section--wide">
      {signals.map((signal, index) => (
        <article key={index} className={`signal-card signal-card--${signal.tone}`}>
          <p>{signal.label}</p>
          <strong>{signal.value}</strong>
        </article>
      ))}
    </section>
  )
}