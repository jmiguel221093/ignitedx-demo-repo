import type { TimelineItem } from '../types/dashboard'

interface ReleaseTimelineProps {
  items: TimelineItem[]
}

export function ReleaseTimeline({ items }: ReleaseTimelineProps) {
  return (
    <article className="panel-card">
      <div className="panel-card__header">
        <div>
          <p className="panel-card__eyebrow">Timeline</p>
          <h2>Cutover checkpoints</h2>
        </div>
      </div>

      <div className="timeline-list">
        {items.map((item, index) => (
          <section key={index} className="timeline-row">
            <div className={`timeline-row__dot timeline-row__dot--${item.state}`} />
            <div className="timeline-row__content">
              <div className="timeline-row__heading">
                <strong>{item.time}</strong>
                <span>{item.state.replace('_', ' ')}</span>
              </div>
              <h3>{item.title}</h3>
              <p>{item.summary}</p>
            </div>
          </section>
        ))}
      </div>
    </article>
  )
}