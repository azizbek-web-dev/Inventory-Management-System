import addCircleIcon from '../../assets/icons/add-circle.svg'
import filterIcon from '../../assets/icons/filter.svg'
import boxIcon from '../../assets/icons/package_box.svg'
import itemThumb from '../../assets/images/unsplash_tpuAo8gVs58.png'
import { Topbar } from '../../components/Topbar/Topbar'

type ItemRow = {
  name: string
  model: string
  type: string
  store: string
  amount: string
  project: string
  account: string
}

const ROWS: ItemRow[] = Array.from({ length: 10 }).map((_, i) => ({
  name: i === 0 ? 'Gas Kitting' : 'Condet',
  model: i % 2 ? 'Co-7898' : 'G-7893',
  type: 'IE Project Items',
  store: i % 3 ? 'HQ Main Store' : '22 House Store',
  amount: i % 2 ? '3 pcs' : '5 pcs',
  project: 'HQ',
  account: i % 3 === 2 ? 'Need Invitation' : 'Activated',
}))

export function ItemsPage() {
  return (
    <>
      <Topbar title="All Items" subtitle="Items detail Information" />

      <section className="items-card" aria-label="All items">
        <div className="items-toolbar">
          <label className="items-search" aria-label="Search item">
            <input className="items-search-input" placeholder="Search Item" />
          </label>

          <div className="items-actions">
            <span className="items-cube" aria-hidden="true">
              <img src={boxIcon} alt="" />
            </span>
            <button className="items-btn items-btn--primary" type="button">
              <img className="items-btn-icon" src={addCircleIcon} alt="" aria-hidden="true" />
              <span>Add Item</span>
            </button>
            <button className="items-btn" type="button">
              <img className="items-btn-icon" src={filterIcon} alt="" aria-hidden="true" />
              <span>Filter</span>
            </button>
          </div>
        </div>

        <div className="items-table-wrap">
          <table className="items-table" aria-label="Items table">
            <thead>
              <tr>
                <th className="items-col-check" aria-label="Select" />
                <th>Item Name</th>
                <th>Image</th>
                <th>Model</th>
                <th>Type</th>
                <th>Store</th>
                <th>Amount</th>
                <th>Project</th>
                <th>Account</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r, idx) => (
                <tr key={`${r.name}-${idx}`}>
                  <td className="items-col-check">
                    <input type="checkbox" aria-label={`Select row ${idx + 1}`} />
                  </td>
                  <td>{r.name}</td>
                  <td>
                    <img className="items-thumb" src={itemThumb} alt="" />
                  </td>
                  <td>{r.model}</td>
                  <td>{r.type}</td>
                  <td>{r.store}</td>
                  <td>{r.amount}</td>
                  <td>{r.project}</td>
                  <td>{r.account}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="items-footer" aria-label="Pagination">
          <div className="items-footer-left">
            <span className="items-muted">Showing</span>
            <select className="items-select" defaultValue="10" aria-label="Rows per page">
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
          </div>

          <div className="items-footer-center items-muted">Showing 1 to 10 out of 40 records</div>

          <div className="items-footer-right">
            <button className="items-page-btn" type="button" aria-label="Previous page">
              ‹
            </button>
            <button className="items-page is-active" type="button">
              1
            </button>
            <button className="items-page" type="button">
              2
            </button>
            <button className="items-page" type="button">
              3
            </button>
            <button className="items-page" type="button">
              4
            </button>
            <button className="items-page-btn" type="button" aria-label="Next page">
              ›
            </button>
          </div>
        </div>
      </section>
    </>
  )
}

