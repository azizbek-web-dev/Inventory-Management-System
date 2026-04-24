import { useEffect } from 'react'
import { Sidebar } from '../../components/Sidebar/Sidebar'
import searchIcon from '../../assets/icons/search.svg'
import notificationIcon from '../../assets/icons/notification.svg'
import chevronDownIcon from '../../assets/icons/direction-down.svg'
import quantityIcon from '../../assets/icons/quantity.svg'
import locationIcon from '../../assets/icons/location.svg'
import suppliersIcon from '../../assets/icons/suppliers.svg'
import categoriesIcon from '../../assets/icons/categories.svg'
import profileLogo from '../../assets/images/profile_logo.png'
import itemThumb from '../../assets/images/unsplash_tpuAo8gVs58.png'

type ListRow = {
  name: string
  store: string
  amount: string
}

const ITEM_ROWS: ListRow[] = [
  { name: 'Gas Kitting', store: '22 House Store', amount: '1 pcs' },
  { name: 'Condet', store: 'HQ Main Store', amount: '3 pcs' },
  { name: 'Condet', store: 'HQ Main Store', amount: '5 pcs' },
  { name: 'Condet', store: 'HQ Main Store', amount: '5 pcs' },
]

export function DashboardPage() {
  useEffect(() => {
    if (!document.documentElement.dataset.theme) {
      document.documentElement.dataset.theme = 'light'
    }
  }, [])

  return (
    <div className="dash-shell">
      <Sidebar />

      <main className="dash-main" aria-label="Dashboard">
        <header className="dash-topbar">
          <div className="dash-greeting">
            <div className="dash-title">Hello Mathias</div>
            <div className="dash-subtitle">Good Morning</div>
          </div>

          <div className="dash-actions">
            <label className="dash-search" aria-label="Search">
              <img className="dash-search-icon" src={searchIcon} alt="" aria-hidden="true" />
              <input className="dash-search-input" placeholder="Search" />
            </label>

            <button className="dash-icon-btn" type="button" aria-label="Notifications">
              <img src={notificationIcon} alt="" aria-hidden="true" />
            </button>

            <button className="dash-profile" type="button" aria-label="Profile">
              <img className="dash-avatar" src={profileLogo} alt="" />
              <span className="dash-profile-meta">
                <span className="dash-profile-name">Mathias W.</span>
                <span className="dash-profile-role">Store Manager</span>
              </span>
              <img className="dash-chevron" src={chevronDownIcon} alt="" aria-hidden="true" />
            </button>
          </div>
        </header>

        <section className="dash-grid" aria-label="Dashboard content">
          <div className="dash-card">
            <div className="dash-card-head">
              <div className="dash-card-title">Item List</div>
              <button className="dash-link" type="button">
                View All
              </button>
            </div>
            <table className="dash-table" aria-label="Item list">
              <thead>
                <tr>
                  <th>Item Name</th>
                  <th>Image</th>
                  <th>Store</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {ITEM_ROWS.map((r, idx) => (
                  <tr key={`${r.name}-${idx}`}>
                    <td>{r.name}</td>
                    <td>
                      <img className="dash-thumb" src={itemThumb} alt="" />
                    </td>
                    <td>{r.store}</td>
                    <td>{r.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="dash-card">
            <div className="dash-card-head">
              <div className="dash-card-title">Asset List</div>
              <button className="dash-link" type="button">
                View All
              </button>
            </div>
            <table className="dash-table" aria-label="Asset list">
              <thead>
                <tr>
                  <th>Asset Name</th>
                  <th>Image</th>
                  <th>Store</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {ITEM_ROWS.map((r, idx) => (
                  <tr key={`${r.name}-asset-${idx}`}>
                    <td>{r.name}</td>
                    <td>
                      <img className="dash-thumb" src={itemThumb} alt="" />
                    </td>
                    <td>{r.store}</td>
                    <td>{r.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="dash-card dash-card--summary">
            <div className="dash-card-title">Item Summary</div>
            <div className="dash-summary">
              <div className="dash-metric">
                <div className="dash-metric-icon">
                  <img src={locationIcon} alt="" aria-hidden="true" />
                </div>
                <div className="dash-metric-value">868</div>
                <div className="dash-metric-label">Quantity in Hand</div>
              </div>
              <div className="dash-metric">
                <div className="dash-metric-icon">
                  <img src={quantityIcon} alt="" aria-hidden="true" />
                </div>
                <div className="dash-metric-value">200</div>
                <div className="dash-metric-label">To be received</div>
              </div>
            </div>
          </div>

          <div className="dash-card dash-card--summary">
            <div className="dash-card-title">Product Summary</div>
            <div className="dash-summary">
              <div className="dash-metric">
                <div className="dash-metric-icon">
                  <img src={suppliersIcon} alt="" aria-hidden="true" />
                </div>
                <div className="dash-metric-value">31</div>
                <div className="dash-metric-label">Number of Suppliers</div>
              </div>
              <div className="dash-metric">
                <div className="dash-metric-icon">
                  <img src={categoriesIcon} alt="" aria-hidden="true" />
                </div>
                <div className="dash-metric-value">21</div>
                <div className="dash-metric-label">Number of Categories</div>
              </div>
            </div>
          </div>

          <div className="dash-card dash-card--summary">
            <div className="dash-card-title">Total items</div>
            <div className="dash-summary">
              <div className="dash-metric">
                <div className="dash-metric-icon">
                  <img src={suppliersIcon} alt="" aria-hidden="true" />
                </div>
                <div className="dash-metric-value">31</div>
                <div className="dash-metric-label">Total Number of Items</div>
              </div>
              <div className="dash-metric">
                <div className="dash-metric-icon">
                  <img src={quantityIcon} alt="" aria-hidden="true" />
                </div>
                <div className="dash-metric-value">21</div>
                <div className="dash-metric-label">To be received</div>
              </div>
            </div>
          </div>

          <div className="dash-card dash-card--summary">
            <div className="dash-card-title">Total assets</div>
            <div className="dash-summary">
              <div className="dash-metric">
                <div className="dash-metric-icon">
                  <img src={suppliersIcon} alt="" aria-hidden="true" />
                </div>
                <div className="dash-metric-value">31</div>
                <div className="dash-metric-label">Total Number of Assets</div>
              </div>
              <div className="dash-metric">
                <div className="dash-metric-icon">
                  <img src={quantityIcon} alt="" aria-hidden="true" />
                </div>
                <div className="dash-metric-value">21</div>
                <div className="dash-metric-label">To be received</div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

