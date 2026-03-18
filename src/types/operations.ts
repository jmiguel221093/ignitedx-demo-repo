export type ServiceSeverity = 'low' | 'medium' | 'high' | 'critical'

export interface ServiceHealth {
  id: string
  service: string
  team: string
  severity: ServiceSeverity
  uptime: number
  errorBudget: number
  pendingIncidents: number
  nextAction: string
  notes: string[]
}