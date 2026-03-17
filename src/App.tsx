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
    <main className="dashboard-page">
      <section className="dashboard-shell">
        <div className="dashboard-header">
          <div>
            <p className="eyebrow">Overview</p>
            <h1 className="dashboard-title">Studio dashboard</h1>
            <p className="dashboard-subtitle">
              {plannedProjects === 1 ? '1 planned handoff is queued next' : `${plannedProjects} planned handoffs are queued next`}
            </p>
          </div>

          <div className="view-switcher">
            <button
              className={`pill-button ${selectedView === 'Overview' ? 'pill-button-active' : ''}`}
              onClick={() => setSelectedView('Overview')}
            >
              Overview
            </button>
            <button
              className={`pill-button ${selectedView === 'Pipeline' ? 'pill-button-active' : ''}`}
              onClick={() => setSelectedView('Pipeline')}
            >
              Pipeline
            </button>
          </div>
        </div>

        <div className="stats-grid">
          <article className="surface-card stat-card">
            <p className="stat-label">Revenue</p>
            <strong className="stat-value">
              ${totalRevenue.toLocaleString()}
            </strong>
            <span className="stat-note">
              Across {totalProjects} tracked projects
            </span>
          </article>

          <article className="surface-card stat-card">
            <p className="stat-label">Active projects</p>
            <strong className="stat-value">
              {activeProjects}
            </strong>
            <span className="stat-note">
              {activeProjects === 1 ? '1 project in delivery' : `${activeProjects} projects in delivery`}
            </span>
          </article>

          <article className="surface-card stat-card">
            <p className="stat-label">Updated today</p>
            <strong className="stat-value">
              {updatedToday}
            </strong>
            <span className="stat-note">
              {updatedToday === 1 ? '1 project changed today' : `${updatedToday} projects changed today`}
            </span>
          </article>
        </div>

        <section className="surface-card panel-card">
          <div className="panel-header">
            <div>
              <h2 className="panel-title">{selectedView}</h2>
              <p className="panel-copy">
                A quick look at the delivery work moving through the studio.
              </p>
            </div>

            <button className="pill-button"> 
              Export
            </button>
          </div>

          <div className="project-list">
            {projects.map((project) => (
              <div key={project.id} className="project-row">
                <div>
                  <strong className="project-name">{project.name}</strong>
                  <span className="project-owner">Owned by {project.owner}</span>
                </div>

                <span className={`status-badge ${project.status === 'active' ? 'status-active' : 'status-planned'}`}>
                  {project.status === 'active' ? 'Active' : 'Planned'}
                </span>

                <span className="project-revenue">
                  ${project.revenue.toLocaleString()}
                </span>

                <span className="project-updated">
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
