import { Sidebar } from './components/Sidebar/Sidebar'

export function App() {
  return (
    <div className="app-shell">
      <Sidebar />
      <main className="app-main" aria-label="Main content">
        <div className="app-placeholder">
          <h1>Dashboard</h1>
          <p>Content area</p>
        </div>
      </main>
    </div>
  )
}

