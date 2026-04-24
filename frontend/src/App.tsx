import { useEffect, useState } from 'react'
import { Sidebar } from './components/Sidebar/Sidebar'
import { DashboardPage } from './pages/Dashboard/DashboardPage'
import { ItemsPage } from './pages/Items/ItemsPage'
import { ToolsPage } from './pages/Tools/ToolsPage'
import { AssetsPage } from './pages/Assets/AssetsPage'

export function App() {
  const [page, setPage] = useState('dashboard')

  useEffect(() => {
    if (!document.documentElement.dataset.theme) {
      document.documentElement.dataset.theme = 'light'
    }
  }, [])

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
        ) : (
          <DashboardPage />
        )}
      </main>
    </div>
  )
}

