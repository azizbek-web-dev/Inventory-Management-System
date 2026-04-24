import { useEffect, useMemo, useState } from 'react'
import downloadIcon from '../../assets/icons/download.svg'
import filterIcon from '../../assets/icons/filter.svg'
import briefcaseIcon from '../../assets/icons/briefcase.svg'
import notepadIcon from '../../assets/icons/notepad.svg'
import itemThumb from '../../assets/images/unsplash_tpuAo8gVs58.png'
import { Topbar } from '../../components/Topbar/Topbar'
import {
  RequestFilterModal,
  requestFilterActive,
  type RequestFilterState,
  type RequestRecordKind,
  type RequestStoreKey,
} from '../../components/RequestFilterModal/RequestFilterModal'

type RequestTab = 'requested' | 'returned'

type RequestRow = {
  recordType: RequestRecordKind
  name: string
  model: string
  type: string
  store: RequestStoreKey
  amount: string
  project: string
  requester: string
}

function buildRows(tab: RequestTab): RequestRow[] {
  return Array.from({ length: 12 }).map((_, i) => {
    const name = i === 0 ? 'Gas Kitting' : 'Condet'
    const recordType: RequestRecordKind = i % 5 === 1 ? 'item' : i % 5 === 2 ? 'tool' : 'assets'
    const store: RequestStoreKey =
      i === 7 ? 'Tafo House Store' : i % 3 ? 'HQ Main Store' : '22 House Store'
    const model = i === 4 ? 'Co-789B' : i % 2 ? 'Co-7898' : 'G-7893'
    return {
      recordType,
      name,
      model,
      type: 'IE Project Items',
      store,
      amount: i % 3 === 0 ? '1 pcs' : i % 2 ? '3 pcs' : '5 pcs',
      project: 'HQ',
      requester: tab === 'returned' && i % 4 === 0 ? 'Store Lead' : 'HQ',
    }
  })
}

function rowMatchesFilter(row: RequestRow, f: RequestFilterState | null): boolean {
  if (!f) return true
  if (f.storeDropdown && row.store !== f.storeDropdown) return false
  if (!f.storesChecked[row.store]) return false
  if (f.recordType && row.recordType !== f.recordType) return false
  return true
}

function downloadCsv(filename: string, rows: RequestRow[]) {
  const esc = (s: string) => `"${String(s).replace(/"/g, '""')}"`
  const header = ['Item Name', 'Model', 'Type', 'Store', 'Amount', 'Project', 'Requester', 'Kind']
  const body = rows.map((r) =>
    [r.name, r.model, r.type, r.store, r.amount, r.project, r.requester, r.recordType].map(esc).join(','),
  )
  const csv = [header.join(','), ...body].join('\n')
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

export function RequestPage() {
  const [tab, setTab] = useState<RequestTab>('requested')
  const [requestedRows] = useState(() => buildRows('requested'))
  const [returnedRows] = useState(() => buildRows('returned'))
  const [listSearch, setListSearch] = useState('')
  const [filterOpen, setFilterOpen] = useState(false)
  const [filterSpec, setFilterSpec] = useState<RequestFilterState | null>(null)

  const baseRows = tab === 'requested' ? requestedRows : returnedRows

  const visibleRows = useMemo(() => {
    const q = listSearch.trim().toLowerCase()
    const byFilter = (r: RequestRow) => rowMatchesFilter(r, filterSpec)
    const bySearch = (r: RequestRow) =>
      !q || `${r.name} ${r.model} ${r.type} ${r.requester}`.toLowerCase().includes(q)
    return baseRows.filter(byFilter).filter(bySearch)
  }, [baseRows, listSearch, filterSpec])

  useEffect(() => {
    if (!filterOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setFilterOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [filterOpen])

  return (
    <>
      <Topbar title="Requested" subtitle="Items detail Information" />

      <section className="items-card request-page-card" aria-label="Requested and returned">
        <div className="project-tabs request-page-tabs" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={tab === 'requested'}
            className={tab === 'requested' ? 'project-tab is-active' : 'project-tab'}
            onClick={() => setTab('requested')}
          >
            <img className="project-tab-icon" src={briefcaseIcon} alt="" aria-hidden="true" />
            <span>Requested</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={tab === 'returned'}
            className={tab === 'returned' ? 'project-tab is-active' : 'project-tab'}
            onClick={() => setTab('returned')}
          >
            <img className="project-tab-icon" src={notepadIcon} alt="" aria-hidden="true" />
            <span>Returned</span>
          </button>
        </div>

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
              onClick={() =>
                downloadCsv(tab === 'requested' ? 'requested.csv' : 'returned.csv', visibleRows)
              }
            >
              <img className="items-btn-icon" src={downloadIcon} alt="" aria-hidden="true" />
              <span>Export</span>
            </button>
            <button
              type="button"
              className={requestFilterActive(filterSpec) ? 'items-btn items-btn--filter-active' : 'items-btn'}
              onClick={() => setFilterOpen(true)}
            >
              <img className="items-btn-icon" src={filterIcon} alt="" aria-hidden="true" />
              <span>Filter</span>
            </button>
          </div>
        </div>

        <div className="items-table-wrap items-table-wrap--assets">
          <table className="items-table items-table--assets" aria-label="Request list">
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
                <th>Requester</th>
              </tr>
            </thead>
            <tbody>
              {visibleRows.map((r, idx) => (
                <tr key={`${tab}-${idx}-${r.name}`}>
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
                  <td>{r.requester}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

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
                  width: `${visibleRows.length ? Math.min(100, Math.round((visibleRows.length / 12) * 100)) : 0}%`,
                }}
              />
            </div>
            <div className="items-muted items-footer-summary">
              Showing 1 to {visibleRows.length} out of 12 projects
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

      <RequestFilterModal
        open={filterOpen}
        applied={filterSpec}
        onClose={() => setFilterOpen(false)}
        onApply={setFilterSpec}
        onClear={() => setFilterSpec(null)}
      />
    </>
  )
}
