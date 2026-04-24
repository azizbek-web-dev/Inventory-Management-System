import { useEffect, useMemo, useState } from 'react'
import filterIcon from '../../assets/icons/filter.svg'
import boxIcon from '../../assets/icons/package_box.svg'
import itemThumb from '../../assets/images/unsplash_tpuAo8gVs58.png'
import eyeIcon from '../../assets/icons/eye.svg'
import editIcon from '../../assets/icons/edit.svg'
import trashIcon from '../../assets/icons/trash.svg'
import { Topbar } from '../../components/Topbar/Topbar'
import {
  AssetFilterModal,
  type AssetFilterCriteria,
} from '../../components/AssetFilterModal/AssetFilterModal'
import {
  AssetDescriptionModal,
  type AssetDescriptionData,
} from '../../components/AssetDescriptionModal/AssetDescriptionModal'

type AssetRow = {
  id: string
  name: string
  category: string
  brand: string
  serialNo: string
  status: string
  purchaseDate: string
  longDescription: string
  history: AssetDescriptionData['history']
}

const emptyFilters: AssetFilterCriteria = {
  keyword: '',
  category: '',
  brand: '',
  status: '',
}

const INITIAL_ROWS: AssetRow[] = [
  {
    id: 'AST-1001',
    name: 'Gas Kitting',
    category: 'Power',
    brand: 'Cisco',
    serialNo: 'SN-GK-77821',
    status: 'In use',
    purchaseDate: 'Unknown',
    longDescription: 'Unknown',
    history: [
      { label: '22 Store', state: 'done' },
      { label: 'Order Received', state: 'pending' },
      { label: 'Delivery', state: 'pending' },
    ],
  },
  {
    id: 'AST-1002',
    name: 'Dell Latitude 5420',
    category: 'Electronics',
    brand: 'Dell',
    serialNo: 'DL-99231-X',
    status: 'Available',
    purchaseDate: '2024-03-12',
    longDescription: 'Laptop assigned to HQ engineering pool.',
    history: [
      { label: 'HQ Main Store', state: 'done' },
      { label: 'Order Received', state: 'done' },
      { label: 'Delivery', state: 'done' },
    ],
  },
  {
    id: 'AST-1003',
    name: 'Office Chair Pro',
    category: 'Furniture',
    brand: 'HP',
    serialNo: 'FR-CH-221',
    status: 'Maintenance',
    purchaseDate: '2023-11-02',
    longDescription: 'Awaiting upholstery service.',
    history: [
      { label: '22 Store', state: 'done' },
      { label: 'Order Received', state: 'done' },
      { label: 'Delivery', state: 'pending' },
    ],
  },
  {
    id: 'AST-1004',
    name: 'Switch 24-port',
    category: 'Network',
    brand: 'Cisco',
    serialNo: 'CS-SW-44102',
    status: 'In use',
    purchaseDate: '2024-01-20',
    longDescription: 'Rack-mounted in server room A.',
    history: [
      { label: 'HQ Main Store', state: 'done' },
      { label: 'Order Received', state: 'pending' },
      { label: 'Delivery', state: 'pending' },
    ],
  },
  {
    id: 'AST-1005',
    name: 'Lenovo ThinkPad',
    category: 'Electronics',
    brand: 'Lenovo',
    serialNo: 'LV-TP-88331',
    status: 'Available',
    purchaseDate: 'Unknown',
    longDescription: 'Unknown',
    history: [
      { label: '22 Store', state: 'done' },
      { label: 'Order Received', state: 'done' },
      { label: 'Delivery', state: 'pending' },
    ],
  },
  {
    id: 'AST-1006',
    name: 'UPS 1500VA',
    category: 'Power',
    brand: 'HP',
    serialNo: 'PW-UPS-009',
    status: 'In use',
    purchaseDate: '2022-08-15',
    longDescription: 'Backup power for branch office.',
    history: [
      { label: 'HQ Main Store', state: 'done' },
      { label: 'Order Received', state: 'done' },
      { label: 'Delivery', state: 'done' },
    ],
  },
  {
    id: 'AST-1007',
    name: 'Access Point Wi‑Fi 6',
    category: 'Network',
    brand: 'Cisco',
    serialNo: 'CS-AP-7712',
    status: 'Available',
    purchaseDate: '2024-06-01',
    longDescription: 'Spare unit in storage.',
    history: [
      { label: '22 Store', state: 'done' },
      { label: 'Order Received', state: 'pending' },
      { label: 'Delivery', state: 'pending' },
    ],
  },
  {
    id: 'AST-1008',
    name: 'Standing Desk',
    category: 'Furniture',
    brand: 'Dell',
    serialNo: 'FR-DSK-12',
    status: 'Available',
    purchaseDate: 'Unknown',
    longDescription: 'Unknown',
    history: [
      { label: 'HQ Main Store', state: 'done' },
      { label: 'Order Received', state: 'done' },
      { label: 'Delivery', state: 'pending' },
    ],
  },
]

function rowMatchesFilters(row: AssetRow, f: AssetFilterCriteria): boolean {
  const kw = f.keyword.trim().toLowerCase()
  if (kw) {
    const blob = `${row.id} ${row.name} ${row.serialNo}`.toLowerCase()
    if (!blob.includes(kw)) return false
  }
  if (f.category && row.category !== f.category) return false
  if (f.brand && row.brand !== f.brand) return false
  if (f.status && row.status !== f.status) return false
  return true
}

type EditDraft = Pick<AssetRow, 'id' | 'name' | 'category' | 'brand' | 'serialNo' | 'status'>

export function AssetsPage() {
  const [rows, setRows] = useState<AssetRow[]>(INITIAL_ROWS)
  const [filters, setFilters] = useState<AssetFilterCriteria>(emptyFilters)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [isDescOpen, setIsDescOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [editIndex, setEditIndex] = useState<number | null>(null)
  const [descData, setDescData] = useState<AssetDescriptionData | null>(null)
  const [editDraft, setEditDraft] = useState<EditDraft>({
    id: '',
    name: '',
    category: '',
    brand: '',
    serialNo: '',
    status: '',
  })

  const visibleRows = useMemo(() => rows.filter((r) => rowMatchesFilters(r, filters)), [rows, filters])

  const hasActiveFilters = useMemo(
    () =>
      !!filters.keyword.trim() || !!filters.category || !!filters.brand || !!filters.status,
    [filters],
  )

  useEffect(() => {
    if (!isFilterOpen && !isDescOpen && !isEditOpen) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsFilterOpen(false)
        setIsDescOpen(false)
        setIsEditOpen(false)
        setEditIndex(null)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isFilterOpen, isDescOpen, isEditOpen])

  return (
    <>
      <Topbar title="All Items" subtitle="Assets and inventory" />

      <section className="items-card" aria-label="All assets">
        <div className="items-toolbar">
          <label className="items-search" aria-label="Search assets">
            <input className="items-search-input" placeholder="Search Item" />
          </label>

          <div className="items-actions">
            <span className="items-cube" aria-hidden="true">
              <img src={boxIcon} alt="" />
            </span>
            <button
              className={hasActiveFilters ? 'items-btn items-btn--filter-active' : 'items-btn'}
              type="button"
              onClick={() => {
                setIsDescOpen(false)
                setIsEditOpen(false)
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
                <th>Image</th>
                <th>ID</th>
                <th>Item Name</th>
                <th>Category</th>
                <th>Brand</th>
                <th>Serial No</th>
                <th>Status</th>
                <th className="items-col-action">Action</th>
              </tr>
            </thead>
            <tbody>
              {visibleRows.length === 0 ? (
                <tr>
                  <td colSpan={8} className="assets-empty-cell">
                    No assets match the current filters.
                  </td>
                </tr>
              ) : (
                visibleRows.map((r) => {
                  const idx = rows.indexOf(r)
                  return (
                    <tr key={r.id}>
                      <td>
                        <img className="items-thumb" src={itemThumb} alt="" />
                      </td>
                      <td>{r.id}</td>
                      <td>{r.name}</td>
                      <td>{r.category}</td>
                      <td>{r.brand}</td>
                      <td>{r.serialNo}</td>
                      <td>
                        <span className="assets-status">{r.status}</span>
                      </td>
                      <td className="items-col-action">
                        <div className="row-actions" role="group" aria-label="Row actions">
                          <button
                            type="button"
                            className="row-action row-action--view"
                            aria-label="View"
                            onClick={() => {
                              setIsEditOpen(false)
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
                              setEditIndex(idx)
                              setEditDraft({
                                id: r.id,
                                name: r.name,
                                category: r.category,
                                brand: r.brand,
                                serialNo: r.serialNo,
                                status: r.status,
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

          <div className="items-footer-center items-muted">
            Showing 1 to {visibleRows.length} of {rows.length} records
          </div>

          <div className="items-footer-right">
            <button className="items-page-btn" type="button" aria-label="Previous page">
              ‹
            </button>
            <button className="items-page is-active" type="button">
              1
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
                  <span className="modal-label">ID</span>
                  <input className="modal-input" value={editDraft.id} readOnly />
                </label>

                <label className="modal-field">
                  <span className="modal-label">Item Name</span>
                  <input
                    className="modal-input"
                    value={editDraft.name}
                    onChange={(e) => setEditDraft((p) => ({ ...p, name: e.target.value }))}
                  />
                </label>

                <label className="modal-field">
                  <span className="modal-label">Category</span>
                  <select
                    className="modal-input"
                    value={editDraft.category}
                    onChange={(e) => setEditDraft((p) => ({ ...p, category: e.target.value }))}
                  >
                    <option value="Electronics">Electronics</option>
                    <option value="Furniture">Furniture</option>
                    <option value="Network">Network</option>
                    <option value="Power">Power</option>
                  </select>
                </label>

                <label className="modal-field">
                  <span className="modal-label">Brand</span>
                  <select
                    className="modal-input"
                    value={editDraft.brand}
                    onChange={(e) => setEditDraft((p) => ({ ...p, brand: e.target.value }))}
                  >
                    <option value="Dell">Dell</option>
                    <option value="HP">HP</option>
                    <option value="Lenovo">Lenovo</option>
                    <option value="Cisco">Cisco</option>
                  </select>
                </label>

                <label className="modal-field">
                  <span className="modal-label">Serial No</span>
                  <input
                    className="modal-input"
                    value={editDraft.serialNo}
                    onChange={(e) => setEditDraft((p) => ({ ...p, serialNo: e.target.value }))}
                  />
                </label>

                <label className="modal-field">
                  <span className="modal-label">Status</span>
                  <select
                    className="modal-input"
                    value={editDraft.status}
                    onChange={(e) => setEditDraft((p) => ({ ...p, status: e.target.value }))}
                  >
                    <option value="Available">Available</option>
                    <option value="In use">In use</option>
                    <option value="Maintenance">Maintenance</option>
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
                      next[editIndex] = {
                        ...cur,
                        name: editDraft.name,
                        category: editDraft.category,
                        brand: editDraft.brand,
                        serialNo: editDraft.serialNo,
                        status: editDraft.status,
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
    </>
  )
}
