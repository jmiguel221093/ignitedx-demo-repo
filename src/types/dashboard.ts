export type RepositoryStatus = 'healthy' | 'watch' | 'at-risk'
export type SignalTone = 'positive' | 'neutral' | 'warning'
export type RiskLevel = 'critical' | 'elevated' | 'stable'

export interface ReleaseSummary {
  version: string
  branch: string
  windowLabel: string
  owner: string
  summary: string
}

export interface SignalItem {
  id: string
  label: string
  value: string
  tone: SignalTone
}

export interface MetricItem {
  id: string
  label: string
  value: string
  detail: string
  trend: string
}

export interface RiskItem {
  id: string
  title: string
  level: RiskLevel
  squad: string
  detail: string
  mitigation: string
}

export interface TimelineItem {
  id: string
  time: string
  title: string
  summary: string
  state: 'done' | 'in_progress' | 'up_next'
}

export interface RepositoryRecord {
  id: string
  name: string
  owner: string
  status: RepositoryStatus
  branch: string
  openPrs: number
  blockers: number
  reviewCoverage: string
  deployWindow: string
  lastCommit: string
  notes: string[]
  actionItems: string[]
}

export interface SquadMember {
  id: string
  name: string
  role: string
  focus: string
  load: number
}

export interface SquadRecord {
  id: string
  name: string
  throughput: string
  focusArea: string
  members: SquadMember[]
}

export interface DashboardData {
  release: ReleaseSummary
  signals: SignalItem[]
  metrics: MetricItem[]
  risks: RiskItem[]
  timeline: TimelineItem[]
  repositories: RepositoryRecord[]
  squads: SquadRecord[]
}