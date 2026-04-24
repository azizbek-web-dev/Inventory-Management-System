import { useEffect, useMemo, useState } from 'react'
import downloadIcon from '../../assets/icons/download.svg'
import filterIcon from '../../assets/icons/filter.svg'
import itemThumb from '../../assets/images/unsplash_tpuAo8gVs58.png'
import { Topbar } from '../../components/Topbar/Topbar'
import {
  OnHandFilterModal,
  onHandFilterActive,
  type OnHandFilterState,
  type OnHandRecordKind,
} from '../../components/OnHandFilterModal/OnHandFilterModal'

type OnHandRow = {
  recordType: OnHandRecordKind
  name: string
  model: string
  type: string
  store: string
  amount: string
  project: string
  account: string
}

function buildRows(): OnHandRow[] {
  return Array.from({ length: 12 }).map((_, i) => {
    const name = i === 0 ? 'Gas Kitting' : 'Condet'
    const recordType: OnHandRecordKind = i % 5 === 1 ? 'item' : i % 5 === 2 ? 'tool' : 'assets'
    const store = i === 7 ? 'Tafo House Store' : i % 3 ? 'HQ Main Store' : '22 House Store'
    return {
      recordType,
      name,
      model: i % 2 ? 'Co-7898' : 'G-7893',
      type: 'IE Project Items',
      store,
      amount: i % 3 === 0 ? '1 pcs' : i % 2 ? '3 pcs' : '5 pcs',
      project: 'HQ',
      account: i % 3 === 2 ? 'Need Invitation' : 'Activated',
    }
  })
}

function rowMatchesFilter(row: OnHandRow, f: OnHandFilterState | null): boolean {
  if (!f) return true
  if (f.storeDropdown && row.store !== f.storeDropdown) return false
  if (f.itemGroup && row.type !== f.itemGroup) return false
  if (f.recordType && row.recordType !== f.recordType) return false
  return true
}

function downloadCsv(rows: OnHandRow[]) {
  const esc = (s: string) => `"${String(s).replace(/"/g, '""')}"`
  const header = ['Item Name', 'Model', 'Type', 'Store', 'Amount', 'Project', 'Account', 'Kind']
  const body = rows.map((r) =>
    [r.name, r.model, r.type, r.store, r.amount, r.project, r.account, r.recordType].map(esc).join(','),
  )
  const csv = [header.join(','), ...body].join('\n')
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'on-hand.csv'
  a.click()
  URL.revokeObjectURL(url)
}

function EmptyIllustration() {
  return (
    <svg
      className="on-hand-empty-svg"
      viewBox="0 0 220 150"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect x="48" y="32" width="124" height="78" rx="8" stroke="#0d66c2" strokeWidth="2.2" />
      <rect x="56" y="40" width="108" height="58" rx="4" stroke="#0d66c2" strokeOpacity="0.35" strokeWidth="1.5" />
      <path
        d="M40 110 L180 110 L186 118 L34 118 Z"
        fill="#0d66c2"
        fillOpacity="0.12"
        stroke="#0d66c2"
        strokeWidth="1.8"
      />
      <circle cx="138" cy="62" r="18" stroke="#0d66c2" strokeWidth="2.2" />
      <path d="M152 76 l16 16" stroke="#0d66c2" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  )
}

export function OnHandPage() {
  const [rows] = useState(buildRows)
  const [listSearch, setListSearch] = useState('')
  const [filterOpen, setFilterOpen] = useState(false)
  const [filterSpec, setFilterSpec] = useState<OnHandFilterState | null>(null)

  const visibleRows = useMemo(() => {
    const q = listSearch.trim().toLowerCase()
    const byFilter = (r: OnHandRow) => rowMatchesFilter(r, filterSpec)
    const bySearch = (r: OnHandRow) =>
      !q || `${r.name} ${r.model} ${r.type} ${r.store}`.toLowerCase().includes(q)
    return rows.filter(byFilter).filter(bySearch)
  }, [rows, listSearch, filterSpec])

  useEffect(() => {
    if (!filterOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setFilterOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [filterOpen])

  const total = 12
  const empty = visibleRows.length === 0

  return (
    <>
      <Topbar title="On use" subtitle="Items detail Information" />

      <section className="items-card on-hand-card" aria-label="On hand inventory">
        <div className="items-toolbar project-detail-toolbar">
          <label className="items-search" aria-label="Search item">
            <input
              className="items-search-input"
              placeholder="Search Item"
              value={listSearch}
              onChange={(e) => setListSearch(e.target.value)}
            />
          </label>

          <div className="items-actions">
            <button
              type="button"
              className="items-btn items-btn--primary"
              onClick={() => downloadCsv(visibleRows)}
            >
              <img className="items-btn-icon" src={downloadIcon} alt="" aria-hidden="true" />
              <span>Export</span>
            </button>
            <button
              type="button"
              className={onHandFilterActive(filterSpec) ? 'items-btn items-btn--filter-active' : 'items-btn'}
              onClick={() => setFilterOpen(true)}
            >
              <img className="items-btn-icon" src={filterIcon} alt="" aria-hidden="true" />
              <span>Filter</span>
            </button>
          </div>
        </div>

        {empty ? (
          <div className="on-hand-empty" role="status">
            <EmptyIllustration />
            <p className="on-hand-empty-title">Nothing found.</p>
          </div>
        ) : (
          <div className="items-table-wrap items-table-wrap--assets">
            <table className="items-table items-table--assets" aria-label="On hand items">
              <thead>
                <tr>
                  <th className="items-col-check" aria-label="Select" />
                  <th>
                    <span className="th-sort">
                      Item Name
                      <span className="th-sort-icon" aria-hidden="true">
                        ⇅
                      </span>
                    </span>
                  </th>
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
                {visibleRows.map((r, idx) => (
                  <tr key={`${idx}-${r.name}`}>
                    <td className="items-col-check">
                      <input type="checkbox" aria-label={`Select ${r.name}`} />
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
                    <td>
                      <span
                        className={
                          r.account === 'Need Invitation'
                            ? 'account-pill account-pill--invite'
                            : 'account-pill account-pill--ok'
                        }
                      >
                        {r.account}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="items-footer" aria-label="Pagination">
          <div className="items-footer-left">
            <span className="items-muted">Showing</span>
            <select className="items-select" defaultValue="6" aria-label="Rows per page">
              <option value="6">6</option>
              <option value="10">10</option>
              <option value="12">12</option>
            </select>
          </div>

          <div className="items-footer-center">
            <div className="items-footer-progress" aria-hidden="true">
              <span
                className="items-footer-progress-fill"
                style={{
                  width: `${empty ? 0 : Math.min(100, Math.round((visibleRows.length / total) * 100))}%`,
                }}
              />
            </div>
            <div className="items-muted items-footer-summary">
              {empty
                ? 'Showing 0 to 0 out of 12 projects'
                : `Showing 1 to ${visibleRows.length} out of ${total} projects`}
            </div>
          </div>

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
            <button className="items-page-btn" type="button" aria-label="Next page">
              ›
            </button>
          </div>
        </div>
      </section>

      <OnHandFilterModal
        open={filterOpen}
        applied={filterSpec}
        onClose={() => setFilterOpen(false)}
        onApply={setFilterSpec}
      />
    </>
  )
}
