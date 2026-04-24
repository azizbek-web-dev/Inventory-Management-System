import { useEffect, useState } from 'react'
import { Sidebar } from './components/Sidebar/Sidebar'
import { DashboardPage } from './pages/Dashboard/DashboardPage'
import { ItemsPage } from './pages/Items/ItemsPage'
import { ToolsPage } from './pages/Tools/ToolsPage'
import { AssetsPage } from './pages/Assets/AssetsPage'
import { ProjectsPage } from './pages/Projects/ProjectsPage'
import { ProjectDetailPage } from './pages/Projects/ProjectDetailPage'
import type { ProjectSummary } from './pages/Projects/projectData'
import { RequestPage } from './pages/Request/RequestPage'

export function App() {
  const [page, setPage] = useState('dashboard')
  const [selectedProject, setSelectedProject] = useState<ProjectSummary | null>(null)

  useEffect(() => {
    if (!document.documentElement.dataset.theme) {
      document.documentElement.dataset.theme = 'light'
    }
  }, [])

  useEffect(() => {
    if (page !== 'project') setSelectedProject(null)
  }, [page])

  return (
    <div className="dash-shell">
      <Sidebar activeKey={page} onSelect={setPage} />

      <main className="dash-main" aria-label="Main content">
        {page === 'items' ? (
          <ItemsPage />
        ) : page === 'tools' ? (
          <ToolsPage />
        ) : page === 'assets' ? (
          <AssetsPage />
        ) : page === 'project' ? (
          selectedProject ? (
            <ProjectDetailPage project={selectedProject} onBack={() => setSelectedProject(null)} />
          ) : (
            <ProjectsPage onOpenProject={setSelectedProject} />
          )
        ) : page === 'request' ? (
          <RequestPage />
        ) : (
          <DashboardPage />
        )}
      </main>
    </div>
  )
}
