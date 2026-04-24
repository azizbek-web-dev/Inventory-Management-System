import { useEffect, useMemo, useState } from 'react'
import appsIcon from '../../assets/icons/apps.svg'
import shoppingBagIcon from '../../assets/icons/shopping bag.svg'
import toolsIcon from '../../assets/icons/notepad.svg'
import assetsIcon from '../../assets/icons/assets.svg'
import projectIcon from '../../assets/icons/briefcase.svg'
import requestIcon from '../../assets/icons/request.svg'
import onHandIcon from '../../assets/icons/hand.svg'
import grnReportIcon from '../../assets/icons/calendar-check.svg'
import logo from '../../assets/logo.png'

type Theme = 'light' | 'dark'

type NavItem = {
  key: string
  label: string
  icon: string
}

type SidebarProps = {
  activeKey?: string
  onSelect?: (key: string) => void
}

const NAV_ITEMS: NavItem[] = [
  { key: 'dashboard', label: 'Dashboard', icon: appsIcon },
  { key: 'items', label: 'Items', icon: shoppingBagIcon },
  { key: 'tools', label: 'Tools', icon: toolsIcon },
  { key: 'assets', label: 'Assets', icon: assetsIcon },
  { key: 'project', label: 'Project', icon: projectIcon },
  { key: 'request', label: 'Requested & Returned', icon: requestIcon },
  { key: 'on-hand', label: 'On hand', icon: onHandIcon },
  { key: 'grn-report', label: 'GRN Report', icon: grnReportIcon },
]

function getInitialTheme(): Theme {
  const stored = localStorage.getItem('ims.theme')
  if (stored === 'light' || stored === 'dark') return stored
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function Sidebar({ activeKey: controlledActiveKey, onSelect }: SidebarProps) {
  const [internalActiveKey, setInternalActiveKey] = useState<string>('dashboard')
  const [theme, setTheme] = useState<Theme>(() => getInitialTheme())

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('ims.theme', theme)
  }, [theme])

  const navItems = useMemo(() => NAV_ITEMS, [])
  const activeKey = controlledActiveKey ?? internalActiveKey

  return (
    <aside className="sidebar" aria-label="Sidebar navigation">
      <div className="sidebar-inner">
        <div className="sidebar-top">
          <div className="brand" aria-label="Inventory brand">
            <img className="brand-logo" src={logo} alt="" />
            <span className="brand-name">Inventory</span>
          </div>
        </div>

        <nav className="nav" aria-label="Primary">
          {navItems.map((item) => (
            <button
              key={item.key}
              type="button"
              className={item.key === activeKey ? 'nav-item is-active' : 'nav-item'}
              onClick={() => {
                setInternalActiveKey(item.key)
                onSelect?.(item.key)
              }}
            >
              <span className="nav-item-icon" aria-hidden="true">
                <img src={item.icon} alt="" />
              </span>
              <span className="nav-item-label">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="theme-toggle" role="group" aria-label="Theme toggle">
            <button
              type="button"
              className={theme === 'light' ? 'theme-btn is-active' : 'theme-btn'}
              onClick={() => setTheme('light')}
            >
              <span className="theme-btn-icon" aria-hidden="true">
                ☀
              </span>
              <span>Light</span>
            </button>
            <button
              type="button"
              className={theme === 'dark' ? 'theme-btn is-active' : 'theme-btn'}
              onClick={() => setTheme('dark')}
            >
              <span className="theme-btn-icon" aria-hidden="true">
                ☾
              </span>
              <span>Dark</span>
            </button>
          </div>
        </div>
      </div>
    </aside>
  )
}

