import { useEffect, useMemo, useState } from 'react'
import addCircleIcon from '../../assets/icons/add-circle.svg'
import filterIcon from '../../assets/icons/filter.svg'
import downloadIcon from '../../assets/icons/download.svg'
import boxIcon from '../../assets/icons/package_box.svg'
import itemThumb from '../../assets/images/unsplash_tpuAo8gVs58.png'
import eyeIcon from '../../assets/icons/eye.svg'
import editIcon from '../../assets/icons/edit.svg'
import trashIcon from '../../assets/icons/trash.svg'
import { Topbar } from '../../components/Topbar/Topbar'
import {
  AssetFilterModal,
  assetFiltersActive,
  defaultAssetFilters,
  type AssetFilterCriteria,
  type AssetRecordKind,
  type AssetStoreName,
} from '../../components/AssetFilterModal/AssetFilterModal'
import {
  AssetDescriptionModal,
  type AssetDescriptionData,
} from '../../components/AssetDescriptionModal/AssetDescriptionModal'

type AssetRow = {
  id: string
  recordType: AssetRecordKind
  name: string
  model: string
  type: string
  store: AssetStoreName
  amount: string
  project: string
  account: string
  purchaseDate: string
  longDescription: string
  history: AssetDescriptionData['history']
}

type LineDraft = {
  name: string
  model: string
  type: string
  store: AssetStoreName
  amount: string
  project: string
  account: string
}

function initialRows(): AssetRow[] {
  return Array.from({ length: 10 }).map((_, i) => {
    const name = i === 0 ? 'Gas Kitting' : 'Condet'
    const recordType: AssetRecordKind = i % 5 === 1 ? 'item' : i % 5 === 2 ? 'tool' : 'assets'
    const store: AssetStoreName =
      i === 7 ? 'Tafo House Store' : i % 3 ? 'HQ Main Store' : '22 House Store'
    const historyStore = store === '22 House Store' ? '22 Store' : store
    return {
      id: `AST-${1001 + i}`,
      recordType,
      name,
      model: i % 2 ? 'Co-7898' : 'G-7893',
      type: i === 3 ? 'Single Item' : 'IE Project Items',
      store,
      amount: i % 3 === 0 ? '1 pcs' : i % 2 ? '3 pcs' : '5 pcs',
      project: 'HQ',
      account: i % 3 === 2 ? 'Need Invitation' : 'Activated',
      purchaseDate: i === 0 ? 'Unknown' : '2024-02-10',
      longDescription: i === 0 ? 'Unknown' : 'Registered asset.',
      history: [
        { label: historyStore, state: 'done' },
        { label: 'Order Received', state: i === 0 ? 'pending' : i % 2 ? 'done' : 'pending' },
        { label: 'Delivery', state: 'pending' },
      ],
    }
  })
}

function rowMatchesFilters(row: AssetRow, f: AssetFilterCriteria): boolean {
  if (f.storeDropdown && row.store !== f.storeDropdown) return false
  if (!f.storesChecked[row.store]) return false
  if (f.recordType && row.recordType !== f.recordType) return false
  return true
}

function matchesListSearch(row: AssetRow, q: string): boolean {
  const t = q.trim().toLowerCase()
  if (!t) return true
  return `${row.id} ${row.name} ${row.model} ${row.type}`.toLowerCase().includes(t)
}

function downloadCsv(filename: string, rows: AssetRow[]) {
  const esc = (s: string) => `"${String(s).replace(/"/g, '""')}"`
  const header = ['Name', 'Model', 'Type', 'Store', 'Amount', 'Project', 'Account', 'Kind']
  const body = rows.map((r) =>
    [r.name, r.model, r.type, r.store, r.amount, r.project, r.account, r.recordType].map(esc).join(','),
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

const emptyLineDraft = (): LineDraft => ({
  name: '',
  model: '',
  type: 'IE Project Items',
  store: 'HQ Main Store',
  amount: '',
  project: 'HQ',
  account: 'Activated',
})

export function AssetsPage() {
  const [rows, setRows] = useState<AssetRow[]>(initialRows)
  const [filters, setFilters] = useState<AssetFilterCriteria>(() => defaultAssetFilters())
  const [listSearch, setListSearch] = useState('')
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [isDescOpen, setIsDescOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [editIndex, setEditIndex] = useState<number | null>(null)
  const [descData, setDescData] = useState<AssetDescriptionData | null>(null)
  const [editDraft, setEditDraft] = useState<LineDraft>(emptyLineDraft())
  const [addDraft, setAddDraft] = useState<LineDraft>(emptyLineDraft())
  const [addKind, setAddKind] = useState<AssetRecordKind>('assets')

  const filteredByModal = useMemo(() => rows.filter((r) => rowMatchesFilters(r, filters)), [rows, filters])
  const visibleRows = useMemo(
    () => filteredByModal.filter((r) => matchesListSearch(r, listSearch)),
    [filteredByModal, listSearch],
  )

  const filterBtnActive = assetFiltersActive(filters)

  useEffect(() => {
    if (!isFilterOpen && !isDescOpen && !isEditOpen && !isAddOpen) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsFilterOpen(false)
        setIsDescOpen(false)
        setIsEditOpen(false)
        setIsAddOpen(false)
        setEditIndex(null)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isFilterOpen, isDescOpen, isEditOpen, isAddOpen])

  return (
    <>
      <Topbar title="All Items" subtitle="Items detail Information" />

      <section className="items-card" aria-label="All assets">
        <div className="items-toolbar">
          <label className="items-search" aria-label="Search item">
            <input
              className="items-search-input"
              placeholder="Search Item"
              value={listSearch}
              onChange={(e) => setListSearch(e.target.value)}
            />
          </label>

          <div className="items-actions">
            <button type="button" className="items-cube-btn" aria-label="View options">
              <img src={boxIcon} alt="" />
            </button>
            <button
              type="button"
              className="items-btn items-btn--outline"
              onClick={() => downloadCsv('assets.csv', visibleRows)}
            >
              <img className="items-btn-icon" src={downloadIcon} alt="" aria-hidden="true" />
              <span>Download</span>
            </button>
            <button
              className="items-btn items-btn--primary"
              type="button"
              onClick={() => {
                setIsFilterOpen(false)
                setIsDescOpen(false)
                setIsEditOpen(false)
                setEditIndex(null)
                setAddDraft(emptyLineDraft())
                setAddKind('assets')
                setIsAddOpen(true)
              }}
            >
              <img className="items-btn-icon" src={addCircleIcon} alt="" aria-hidden="true" />
              <span>Add Asset</span>
            </button>
            <button
              className={filterBtnActive ? 'items-btn items-btn--filter-active' : 'items-btn'}
              type="button"
              onClick={() => {
                setIsDescOpen(false)
                setIsEditOpen(false)
                setIsAddOpen(false)
                setEditIndex(null)
                setIsFilterOpen(true)
              }}
            >
              <img className="items-btn-icon" src={filterIcon} alt="" aria-hidden="true" />
              <span>Filter</span>
            </button>
          </div>
        </div>

        <div className="items-table-wrap items-table-wrap--assets">
          <table className="items-table items-table--assets" aria-label="Assets table">
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
                <th className="items-col-action">Action</th>
              </tr>
            </thead>
            <tbody>
              {visibleRows.length === 0 ? (
                <tr>
                  <td colSpan={10} className="assets-empty-cell">
                    No assets match the current filters or search.
                  </td>
                </tr>
              ) : (
                visibleRows.map((r) => {
                  const idx = rows.indexOf(r)
                  return (
                    <tr key={r.id}>
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
                      <td>{r.account}</td>
                      <td className="items-col-action">
                        <div className="row-actions" role="group" aria-label="Row actions">
                          <button
                            type="button"
                            className="row-action row-action--view"
                            aria-label="View"
                            onClick={() => {
                              setIsEditOpen(false)
                              setIsAddOpen(false)
                              setEditIndex(null)
                              setDescData({
                                name: r.name,
                                purchaseDate: r.purchaseDate,
                                description: r.longDescription,
                                history: r.history,
                              })
                              setIsDescOpen(true)
                            }}
                          >
                            <img src={eyeIcon} alt="" />
                          </button>
                          <button
                            type="button"
                            className="row-action row-action--edit"
                            aria-label="Edit"
                            onClick={() => {
                              setIsDescOpen(false)
                              setIsAddOpen(false)
                              setEditIndex(idx)
                              setEditDraft({
                                name: r.name,
                                model: r.model,
                                type: r.type,
                                store: r.store,
                                amount: r.amount,
                                project: r.project,
                                account: r.account,
                              })
                              setIsEditOpen(true)
                            }}
                          >
                            <img src={editIcon} alt="" />
                          </button>
                          <button
                            type="button"
                            className="row-action row-action--delete"
                            aria-label="Delete"
                            onClick={() => {
                              if (!window.confirm('Delete this asset?')) return
                              setRows((prev) => prev.filter((_, i) => i !== idx))
                            }}
                          >
                            <img src={trashIcon} alt="" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })
              )}
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

          <div className="items-footer-center">
            <div className="items-footer-progress" aria-hidden="true">
              <span
                className="items-footer-progress-fill"
                style={{
                  width: `${Math.min(100, Math.round((visibleRows.length / 40) * 100))}%`,
                }}
              />
            </div>
            <div className="items-muted items-footer-summary">
              Showing 1 to {visibleRows.length} out of 40 records
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

      <AssetFilterModal
        open={isFilterOpen}
        applied={filters}
        onClose={() => setIsFilterOpen(false)}
        onApply={setFilters}
      />

      <AssetDescriptionModal open={isDescOpen} data={descData} onClose={() => setIsDescOpen(false)} />

      {isEditOpen ? (
        <div
          className="modal-overlay"
          role="presentation"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              setIsEditOpen(false)
              setEditIndex(null)
            }
          }}
        >
          <div className="modal" role="dialog" aria-modal="true" aria-label="Edit asset">
            <div className="modal-head">
              <div className="modal-title">Edit Asset</div>
            </div>

            <div className="modal-body">
              <form className="modal-form" onSubmit={(e) => e.preventDefault()}>
                <label className="modal-field">
                  <span className="modal-label">Asset name</span>
                  <input
                    className="modal-input"
                    value={editDraft.name}
                    onChange={(e) => setEditDraft((p) => ({ ...p, name: e.target.value }))}
                    placeholder="Asset name"
                  />
                </label>

                <label className="modal-field">
                  <span className="modal-label">Model</span>
                  <input
                    className="modal-input"
                    value={editDraft.model}
                    onChange={(e) => setEditDraft((p) => ({ ...p, model: e.target.value }))}
                    placeholder="G-7893"
                  />
                </label>

                <label className="modal-field">
                  <span className="modal-label">Type</span>
                  <input
                    className="modal-input"
                    value={editDraft.type}
                    onChange={(e) => setEditDraft((p) => ({ ...p, type: e.target.value }))}
                    placeholder="IE Project Items"
                  />
                </label>

                <label className="modal-field">
                  <span className="modal-label">Store</span>
                  <select
                    className="modal-input"
                    value={editDraft.store}
                    onChange={(e) =>
                      setEditDraft((p) => ({ ...p, store: e.target.value as AssetStoreName }))
                    }
                  >
                    <option value="HQ Main Store">HQ Main Store</option>
                    <option value="22 House Store">22 House Store</option>
                    <option value="Tafo House Store">Tafo House Store</option>
                  </select>
                </label>

                <label className="modal-field">
                  <span className="modal-label">Amount</span>
                  <input
                    className="modal-input"
                    value={editDraft.amount}
                    onChange={(e) => setEditDraft((p) => ({ ...p, amount: e.target.value }))}
                    placeholder="5 pcs"
                  />
                </label>

                <label className="modal-field">
                  <span className="modal-label">Project</span>
                  <input
                    className="modal-input"
                    value={editDraft.project}
                    onChange={(e) => setEditDraft((p) => ({ ...p, project: e.target.value }))}
                    placeholder="HQ"
                  />
                </label>

                <label className="modal-field">
                  <span className="modal-label">Account</span>
                  <select
                    className="modal-input"
                    value={editDraft.account}
                    onChange={(e) => setEditDraft((p) => ({ ...p, account: e.target.value }))}
                  >
                    <option value="Activated">Activated</option>
                    <option value="Need Invitation">Need Invitation</option>
                  </select>
                </label>
              </form>
            </div>

            <div className="modal-footer">
              <button
                className="modal-btn"
                type="button"
                onClick={() => {
                  setIsEditOpen(false)
                  setEditIndex(null)
                }}
              >
                Cancel
              </button>
              <button
                className="modal-btn modal-btn--primary"
                type="button"
                onClick={() => {
                  if (editIndex !== null) {
                    setRows((prev) => {
                      const next = [...prev]
                      const cur = next[editIndex]
                      const firstLabel =
                        editDraft.store === '22 House Store' ? '22 Store' : editDraft.store
                      next[editIndex] = {
                        ...cur,
                        name: editDraft.name,
                        model: editDraft.model,
                        type: editDraft.type,
                        store: editDraft.store,
                        amount: editDraft.amount,
                        project: editDraft.project,
                        account: editDraft.account,
                        history: cur.history.map((step, i) =>
                          i === 0 ? { ...step, label: firstLabel } : step,
                        ),
                      }
                      return next
                    })
                  }
                  setIsEditOpen(false)
                  setEditIndex(null)
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {isAddOpen ? (
        <div
          className="modal-overlay"
          role="presentation"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              setIsAddOpen(false)
            }
          }}
        >
          <div className="modal" role="dialog" aria-modal="true" aria-label="Add asset">
            <div className="modal-head">
              <div className="modal-title">Add Asset</div>
            </div>

            <div className="modal-body">
              <form className="modal-form" onSubmit={(e) => e.preventDefault()}>
                <label className="modal-field">
                  <span className="modal-label">Record type</span>
                  <select
                    className="modal-input"
                    value={addKind}
                    onChange={(e) => setAddKind(e.target.value as AssetRecordKind)}
                  >
                    <option value="assets">Assets</option>
                    <option value="item">Item</option>
                    <option value="tool">Tool</option>
                  </select>
                </label>

                <label className="modal-field">
                  <span className="modal-label">Asset name</span>
                  <input
                    className="modal-input"
                    value={addDraft.name}
                    onChange={(e) => setAddDraft((p) => ({ ...p, name: e.target.value }))}
                    placeholder="Asset name"
                  />
                </label>

                <label className="modal-field">
                  <span className="modal-label">Model</span>
                  <input
                    className="modal-input"
                    value={addDraft.model}
                    onChange={(e) => setAddDraft((p) => ({ ...p, model: e.target.value }))}
                    placeholder="G-7893"
                  />
                </label>

                <label className="modal-field">
                  <span className="modal-label">Type</span>
                  <input
                    className="modal-input"
                    value={addDraft.type}
                    onChange={(e) => setAddDraft((p) => ({ ...p, type: e.target.value }))}
                    placeholder="IE Project Items"
                  />
                </label>

                <label className="modal-field">
                  <span className="modal-label">Store</span>
                  <select
                    className="modal-input"
                    value={addDraft.store}
                    onChange={(e) =>
                      setAddDraft((p) => ({ ...p, store: e.target.value as AssetStoreName }))
                    }
                  >
                    <option value="HQ Main Store">HQ Main Store</option>
                    <option value="22 House Store">22 House Store</option>
                    <option value="Tafo House Store">Tafo House Store</option>
                  </select>
                </label>

                <label className="modal-field">
                  <span className="modal-label">Amount</span>
                  <input
                    className="modal-input"
                    value={addDraft.amount}
                    onChange={(e) => setAddDraft((p) => ({ ...p, amount: e.target.value }))}
                    placeholder="1 pcs"
                  />
                </label>

                <label className="modal-field">
                  <span className="modal-label">Project</span>
                  <input
                    className="modal-input"
                    value={addDraft.project}
                    onChange={(e) => setAddDraft((p) => ({ ...p, project: e.target.value }))}
                    placeholder="HQ"
                  />
                </label>

                <label className="modal-field">
                  <span className="modal-label">Account</span>
                  <select
                    className="modal-input"
                    value={addDraft.account}
                    onChange={(e) => setAddDraft((p) => ({ ...p, account: e.target.value }))}
                  >
                    <option value="Activated">Activated</option>
                    <option value="Need Invitation">Need Invitation</option>
                  </select>
                </label>
              </form>
            </div>

            <div className="modal-footer">
              <button className="modal-btn" type="button" onClick={() => setIsAddOpen(false)}>
                Cancel
              </button>
              <button
                className="modal-btn modal-btn--primary"
                type="button"
                onClick={() => {
                  const name = addDraft.name.trim() || 'New asset'
                  const histLabel = addDraft.store === '22 House Store' ? '22 Store' : addDraft.store
                  setRows((prev) => [
                    ...prev,
                    {
                      id: `AST-${Date.now()}`,
                      recordType: addKind,
                      name,
                      model: addDraft.model.trim() || '—',
                      type: addDraft.type.trim() || 'IE Project Items',
                      store: addDraft.store,
                      amount: addDraft.amount.trim() || '1 pcs',
                      project: addDraft.project.trim() || 'HQ',
                      account: addDraft.account,
                      purchaseDate: 'Unknown',
                      longDescription: 'Unknown',
                      history: [
                        { label: histLabel, state: 'done' },
                        { label: 'Order Received', state: 'pending' },
                        { label: 'Delivery', state: 'pending' },
                      ],
                    },
                  ])
                  setIsAddOpen(false)
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}
