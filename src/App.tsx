import { useState } from 'react'
import './App.css'

function App() {
  const [selectedView, setSelectedView] = useState('Overview')

  const projects = [
    {
      id: 'p-1',
      name: 'Website refresh',
      owner: 'Ana',
      status: 'active',
      revenue: 18000,
      updatedToday: true,
    },
    {
      id: 'p-2',
      name: 'Support automation',
      owner: 'Marco',
      status: 'planned',
      revenue: 6400,
      updatedToday: false,
    },
    {
      id: 'p-3',
      name: 'Billing cleanup',
      owner: 'Sofia',
      status: 'active',
      revenue: 9200,
      updatedToday: true,
    },
  ]

  const totalRevenue = projects.reduce((sum, project) => sum + project.revenue, 0)
  const totalProjects = projects.length
  const activeProjects = projects.filter((project) => project.status === 'active').length
  const plannedProjects = projects.filter((project) => project.status === 'planned').length
  const updatedToday = projects.filter((project) => project.updatedToday).length

  return (
    <main
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #f8fafc 0%, #eef2ff 100%)',
        color: '#0f172a',
        fontFamily: 'Inter, sans-serif',
        padding: '40px 24px',
      }}
    >
      <section
        style={{
          maxWidth: 960,
          margin: '0 auto',
          display: 'grid',
          gap: 24,
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 16,
            flexWrap: 'wrap',
          }}
        >
          <div>
            <p style={{ margin: 0, color: '#475569', fontSize: 14 }}>Overview</p>
            <h1 style={{ margin: '8px 0 0', fontSize: 36 }}>Studio dashboard</h1>
            <p style={{ margin: '8px 0 0', color: '#64748b', fontSize: 15 }}>
              {plannedProjects === 1 ? '1 planned handoff is queued next' : `${plannedProjects} planned handoffs are queued next`}
            </p>
          </div>

          <div style={{ display: 'flex', gap: 12 }}>
            <button
              onClick={() => setSelectedView('Overview')}
              style={{
                border: '1px solid #cbd5e1',
                background: selectedView === 'Overview' ? '#0f172a' : '#ffffff',
                color: selectedView === 'Overview' ? '#ffffff' : '#0f172a',
                borderRadius: 999,
                padding: '10px 16px',
              }}
            >
              Overview
            </button>
            <button
              onClick={() => setSelectedView('Pipeline')}
              style={{
                border: '1px solid #cbd5e1',
                background: selectedView === 'Pipeline' ? '#0f172a' : '#ffffff',
                color: selectedView === 'Pipeline' ? '#ffffff' : '#0f172a',
                borderRadius: 999,
                padding: '10px 16px',
              }}
            >
              Pipeline
            </button>
          </div>
        </div>

        <div
          style={{
            display: 'grid',
            gap: 16,
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          }}
        >
          <article
            style={{
              background: '#ffffff',
              borderRadius: 20,
              padding: 20,
              border: '1px solid #e2e8f0',
              boxShadow: '0 14px 30px rgba(15, 23, 42, 0.05)',
            }}
          >
            <p style={{ margin: 0, color: '#64748b', fontSize: 14 }}>Revenue</p>
            <strong style={{ display: 'block', marginTop: 10, fontSize: 28 }}>
              ${totalRevenue.toLocaleString()}
            </strong>
            <span style={{ display: 'block', marginTop: 10, color: '#475569' }}>
              Across {totalProjects} tracked projects
            </span>
          </article>

          <article
            style={{
              background: '#ffffff',
              borderRadius: 20,
              padding: 20,
              border: '1px solid #e2e8f0',
              boxShadow: '0 14px 30px rgba(15, 23, 42, 0.05)',
            }}
          >
            <p style={{ margin: 0, color: '#64748b', fontSize: 14 }}>Active projects</p>
            <strong style={{ display: 'block', marginTop: 10, fontSize: 28 }}>
              {activeProjects}
            </strong>
            <span style={{ display: 'block', marginTop: 10, color: '#475569' }}>
              {activeProjects === 1 ? '1 project in delivery' : `${activeProjects} projects in delivery`}
            </span>
          </article>

          <article
            style={{
              background: '#ffffff',
              borderRadius: 20,
              padding: 20,
              border: '1px solid #e2e8f0',
              boxShadow: '0 14px 30px rgba(15, 23, 42, 0.05)',
            }}
          >
            <p style={{ margin: 0, color: '#64748b', fontSize: 14 }}>Updated today</p>
            <strong style={{ display: 'block', marginTop: 10, fontSize: 28 }}>
              {updatedToday}
            </strong>
            <span style={{ display: 'block', marginTop: 10, color: '#475569' }}>
              {updatedToday === 1 ? '1 project changed today' : `${updatedToday} projects changed today`}
            </span>
          </article>
        </div>

        <section
          style={{
            background: '#ffffff',
            borderRadius: 24,
            padding: 24,
            border: '1px solid #e2e8f0',
            boxShadow: '0 14px 30px rgba(15, 23, 42, 0.05)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
            <div>
              <h2 style={{ margin: 0, fontSize: 22 }}>{selectedView}</h2>
              <p style={{ margin: '8px 0 0', color: '#64748b' }}>
                A quick look at the delivery work moving through the studio.
              </p>
            </div>

            <button
              style={{
                borderRadius: 999,
                border: '1px solid #cbd5e1',
                background: '#ffffff',
                padding: '10px 16px',
              }}
            >
              Export
            </button>
          </div>

          <div style={{ display: 'grid', gap: 14 }}>
            {projects.map((project) => (
              <div
                key={project.id}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '2fr 1fr 1fr 1fr',
                  gap: 12,
                  alignItems: 'center',
                  padding: '18px 16px',
                  borderRadius: 18,
                  background: '#f8fafc',
                }}
              >
                <div>
                  <strong style={{ display: 'block', fontSize: 16 }}>{project.name}</strong>
                  <span style={{ color: '#64748b', fontSize: 14 }}>Owned by {project.owner}</span>
                </div>

                <span
                  style={{
                    justifySelf: 'start',
                    borderRadius: 999,
                    padding: '6px 10px',
                    background: project.status === 'active' ? '#dcfce7' : '#e0e7ff',
                    color: project.status === 'active' ? '#166534' : '#4338ca',
                    fontSize: 13,
                    fontWeight: 600,
                  }}
                >
                  {project.status === 'active' ? 'Active' : 'Planned'}
                </span>

                <span style={{ color: '#0f172a', fontWeight: 600 }}>
                  ${project.revenue.toLocaleString()}
                </span>

                <span style={{ color: '#64748b', textAlign: 'right' }}>
                  {project.updatedToday ? 'Updated today' : 'Waiting to start'}
                </span>
              </div>
            ))}
          </div>
        </section>
      </section>
    </main>
  )
}

export default App
