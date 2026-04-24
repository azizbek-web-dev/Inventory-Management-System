import { useEffect, useState } from 'react'
import { Sidebar } from './components/Sidebar/Sidebar'
import { DashboardPage } from './pages/Dashboard/DashboardPage'
import { ItemsPage } from './pages/Items/ItemsPage'

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
        {page === 'items' ? <ItemsPage /> : <DashboardPage />}
      </main>
    </div>
  )
}

