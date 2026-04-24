import { useEffect, useMemo, useState } from 'react'
import downloadIcon from '../../assets/icons/download.svg'
import filterIcon from '../../assets/icons/filter.svg'
import briefcaseIcon from '../../assets/icons/briefcase.svg'
import assetsIcon from '../../assets/icons/assets.svg'
import itemThumb from '../../assets/images/unsplash_tpuAo8gVs58.png'
import { Topbar } from '../../components/Topbar/Topbar'
import { ItemFilterModal } from '../../components/ItemFilterModal/ItemFilterModal'
import {
  BatchRequestAssetsModal,
  batchAssetsFilterActive,
  emptyBatchAssetsApplied,
  type BatchAssetsApplied,
} from '../../components/BatchRequestAssetsModal/BatchRequestAssetsModal'
import type { ProjectSummary } from './projectData'
import type { AssetStoreName } from '../../components/AddAssetDrawer/AddAssetDrawer'

type Tab = 'items' | 'assets'

type ItemLine = {
  name: string
  model: string
  type: string
  store: string
  amount: string
  project: string
  account: string
}

type AssetRecordKind = 'item' | 'tool' | 'assets'

type AssetLine = {
  recordType: AssetRecordKind
  name: string
  model: string
  type: string
  store: AssetStoreName
  amount: string
  project: string
  account: string
}

function buildItemRows(projectLabel: string): ItemLine[] {
  return Array.from({ length: 10 }).map((_, i) => ({
    name: i === 0 ? 'Gas Kitting' : 'Condet',
    model: i % 2 ? 'Co-7898' : 'G-7893',
    type: 'IE Project Items',
    store: i % 3 ? 'HQ Main Store' : '22 House Store',
    amount: i % 3 === 0 ? '1 pcs' : i % 2 ? '3 pcs' : '5 pcs',
    project: projectLabel,
    account: i % 3 === 2 ? 'Need Invitation' : 'Activated',
  }))
}

function buildAssetRows(projectLabel: string): AssetLine[] {
  return Array.from({ length: 10 }).map((_, i) => {
    const name = i === 0 ? 'Gas Kitting' : 'Condet'
    const recordType: AssetRecordKind = i % 5 === 1 ? 'item' : i % 5 === 2 ? 'tool' : 'assets'
    const store: AssetStoreName =
      i === 7 ? 'Tafo House Store' : i % 3 ? 'HQ Main Store' : '22 House Store'
    return {
      recordType,
      name,
      model: i % 2 ? 'Co-7898' : 'G-7893',
      type: 'IE Project Items',
      store,
      amount: i % 3 === 0 ? '1 pcs' : i % 2 ? '3 pcs' : '5 pcs',
      project: projectLabel,
      account: i % 3 === 2 ? 'Need Invitation' : 'Activated',
    }
  })
}

function normName(s: string) {
  return s.toLowerCase().replace(/\s+/g, ' ').trim()
}

function assetMatchesBatch(row: AssetLine, b: BatchAssetsApplied): boolean {
  if (!b.enabled) return true
  if (row.store !== b.store) return false
  if (b.category && row.type !== b.category) return false
  if (b.assetClass) {
    const want: AssetRecordKind =
      b.assetClass === 'fixed' ? 'assets' : b.assetClass === 'consumable' ? 'item' : 'tool'
    if (row.recordType !== want) return false
  }
  if (b.chipNames.length) {
    if (!b.chipNames.some((c) => normName(c) === normName(row.name))) return false
  }
  return true
}

function downloadCsv(filename: string, headers: string[], lines: string[][]) {
  const esc = (s: string) => `"${String(s).replace(/"/g, '""')}"`
  const csv = [headers.map(esc).join(','), ...lines.map((row) => row.map(esc).join(','))].join('\n')
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

type ProjectDetailPageProps = {
  project: ProjectSummary
  onBack: () => void
}

export function ProjectDetailPage({ project, onBack }: ProjectDetailPageProps) {
  const [tab, setTab] = useState<Tab>('items')
  const [itemRows] = useState(() => buildItemRows(project.detailTitle))
  const [assetRows] = useState(() => buildAssetRows(project.detailTitle))
  const [listSearch, setListSearch] = useState('')
  const [itemFilterOpen, setItemFilterOpen] = useState(false)
  const [assetFilterOpen, setAssetFilterOpen] = useState(false)
  const [batchFilter, setBatchFilter] = useState<BatchAssetsApplied>(() => emptyBatchAssetsApplied())

  const filteredItems = useMemo(() => {
    const q = listSearch.trim().toLowerCase()
    if (!q) return itemRows
    return itemRows.filter((r) => `${r.name} ${r.model} ${r.type}`.toLowerCase().includes(q))
  }, [itemRows, listSearch])

  const filteredAssets = useMemo(() => {
    const q = listSearch.trim().toLowerCase()
    const bySearch = (r: AssetLine) =>
      !q || `${r.name} ${r.model} ${r.type}`.toLowerCase().includes(q)
    return assetRows.filter((r) => assetMatchesBatch(r, batchFilter)).filter(bySearch)
  }, [assetRows, listSearch, batchFilter])

  const visibleRows = tab === 'items' ? filteredItems : filteredAssets
  const filterActive = tab === 'assets' && batchAssetsFilterActive(batchFilter)

  useEffect(() => {
    if (!itemFilterOpen && !assetFilterOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setItemFilterOpen(false)
        setAssetFilterOpen(false)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [itemFilterOpen, assetFilterOpen])

  const onExport = () => {
    if (tab === 'items') {
      downloadCsv(
        'project-items.csv',
        ['Item Name', 'Model', 'Type', 'Store', 'Amount', 'Project', 'Account'],
        filteredItems.map((r) => [r.name, r.model, r.type, r.store, r.amount, r.project, r.account]),
      )
    } else {
      downloadCsv(
        'project-assets.csv',
        ['Asset name', 'Model', 'Type', 'Store', 'Amount', 'Project', 'Account'],
        filteredAssets.map((r) => [r.name, r.model, r.type, r.store, r.amount, r.project, r.account]),
      )
    }
  }

  return (
    <>
      <Topbar title="All Items" subtitle="Items detail Information" />

      <section className="items-card project-detail-card" aria-label="Project detail">
        <button type="button" className="project-back" onClick={onBack}>
          ← All projects
        </button>

        <h1 className="project-detail-title">Project: {project.detailTitle}</h1>

        <div className="project-tabs" role="tablist" aria-label="Project data">
          <button
            type="button"
            role="tab"
            aria-selected={tab === 'items'}
            className={tab === 'items' ? 'project-tab is-active' : 'project-tab'}
            onClick={() => setTab('items')}
          >
            <img className="project-tab-icon" src={briefcaseIcon} alt="" aria-hidden="true" />
            <span>Items</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={tab === 'assets'}
            className={tab === 'assets' ? 'project-tab is-active' : 'project-tab'}
            onClick={() => setTab('assets')}
          >
            <img className="project-tab-icon" src={assetsIcon} alt="" aria-hidden="true" />
            <span>Assets</span>
          </button>
        </div>

        <div className="items-toolbar project-detail-toolbar">
          <label className="items-search" aria-label="Search table">
            <input
              className="items-search-input"
              placeholder="Search Item"
              value={listSearch}
              onChange={(e) => setListSearch(e.target.value)}
            />
          </label>

          <div className="items-actions">
            <button type="button" className="items-btn items-btn--primary" onClick={onExport}>
              <img className="items-btn-icon" src={downloadIcon} alt="" aria-hidden="true" />
              <span>Export</span>
            </button>
            <button
              type="button"
              className={filterActive ? 'items-btn items-btn--filter-active' : 'items-btn'}
              onClick={() => {
                if (tab === 'items') setItemFilterOpen(true)
                else setAssetFilterOpen(true)
              }}
            >
              <img className="items-btn-icon" src={filterIcon} alt="" aria-hidden="true" />
              <span>Filter</span>
            </button>
          </div>
        </div>

        {tab === 'items' ? (
          <div className="items-table-wrap items-table-wrap--assets">
            <table className="items-table items-table--assets" aria-label="Project items">
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
                {filteredItems.map((r, idx) => (
                  <tr key={`${r.name}-${idx}`}>
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
        ) : (
          <div className="items-table-wrap items-table-wrap--assets">
            <table className="items-table items-table--assets" aria-label="Project assets">
              <thead>
                <tr>
                  <th className="items-col-check" aria-label="Select" />
                  <th>
                    <span className="th-sort">
                      Asset name
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
                {filteredAssets.map((r, idx) => (
                  <tr key={`${r.name}-${idx}`}>
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
              <option value="20">20</option>
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

      <ItemFilterModal open={itemFilterOpen} onClose={() => setItemFilterOpen(false)} />

      <BatchRequestAssetsModal
        open={assetFilterOpen}
        applied={batchFilter}
        onClose={() => setAssetFilterOpen(false)}
        onApply={setBatchFilter}
        onClearFilters={() => setBatchFilter(emptyBatchAssetsApplied())}
      />
    </>
  )
}
