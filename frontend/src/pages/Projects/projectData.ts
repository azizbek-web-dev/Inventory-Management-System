export type ProjectMember = {
  initials: string
  name: string
  role: string
}

export type ProjectSummary = {
  id: string
  code: string
  client: string
  /** Shown on detail page as "Project: …" */
  detailTitle: string
  progress: number
  members: ProjectMember[]
}

export const PROJECTS: ProjectSummary[] = [
  {
    id: 'p1',
    code: 'BDU-DCF',
    client: 'Bahir Dar Univeristy',
    detailTitle: 'BDU SIMS',
    progress: 62,
    members: [{ initials: 'LA', name: 'Letera Tadele', role: 'Project Manager' }],
  },
  {
    id: 'p2',
    code: 'HQ-IE1',
    client: 'HQ Engineering',
    detailTitle: 'BDU SIMS',
    progress: 40,
    members: [{ initials: 'LA', name: 'Letera Tadele', role: 'Project Manager' }],
  },
  {
    id: 'p3',
    code: 'IE-OPS',
    client: 'Operations Unit',
    detailTitle: 'IE Operations',
    progress: 78,
    members: [{ initials: 'LA', name: 'Letera Tadele', role: 'Project Manager' }],
  },
  {
    id: 'p4',
    code: 'NW-EXP',
    client: 'Network Expansion',
    detailTitle: 'Network Phase 2',
    progress: 25,
    members: [{ initials: 'LA', name: 'Letera Tadele', role: 'Project Manager' }],
  },
  {
    id: 'p5',
    code: 'ST-INV',
    client: 'Store Inventory',
    detailTitle: 'Store Rollout',
    progress: 90,
    members: [{ initials: 'LA', name: 'Letera Tadele', role: 'Project Manager' }],
  },
  {
    id: 'p6',
    code: 'GRN-22',
    client: '22 House Logistics',
    detailTitle: 'GRN Integration',
    progress: 55,
    members: [{ initials: 'LA', name: 'Letera Tadele', role: 'Project Manager' }],
  },
  {
    id: 'p7',
    code: 'TA-FO1',
    client: 'Tafo Branch',
    detailTitle: 'Tafo Staging',
    progress: 33,
    members: [{ initials: 'LA', name: 'Letera Tadele', role: 'Project Manager' }],
  },
  {
    id: 'p8',
    code: 'HR-POR',
    client: 'HR Portal',
    detailTitle: 'HR Portal',
    progress: 12,
    members: [{ initials: 'LA', name: 'Letera Tadele', role: 'Project Manager' }],
  },
  {
    id: 'p9',
    code: 'FIN-Q1',
    client: 'Finance',
    detailTitle: 'Finance Q1',
    progress: 70,
    members: [{ initials: 'LA', name: 'Letera Tadele', role: 'Project Manager' }],
  },
  {
    id: 'p10',
    code: 'SEC-AU',
    client: 'Security Audit',
    detailTitle: 'Security Audit',
    progress: 45,
    members: [{ initials: 'LA', name: 'Letera Tadele', role: 'Project Manager' }],
  },
  {
    id: 'p11',
    code: 'LAB-01',
    client: 'Lab Services',
    detailTitle: 'Lab Services',
    progress: 88,
    members: [{ initials: 'LA', name: 'Letera Tadele', role: 'Project Manager' }],
  },
  {
    id: 'p12',
    code: 'MOB-AP',
    client: 'Mobile Apps',
    detailTitle: 'Mobile Apps',
    progress: 20,
    members: [{ initials: 'LA', name: 'Letera Tadele', role: 'Project Manager' }],
  },
]
