import { useEffect, useState } from 'react'
import addCircleIcon from '../../assets/icons/add-circle.svg'
import filterIcon from '../../assets/icons/filter.svg'
import boxIcon from '../../assets/icons/package_box.svg'
import itemThumb from '../../assets/images/unsplash_tpuAo8gVs58.png'
import eyeIcon from '../../assets/icons/eye.svg'
import editIcon from '../../assets/icons/edit.svg'
import trashIcon from '../../assets/icons/trash.svg'
import { Topbar } from '../../components/Topbar/Topbar'
import { ToolFilterModal } from '../../components/ToolFilterModal/ToolFilterModal'
import { AddToolDrawer } from '../../components/AddToolDrawer/AddToolDrawer'
import { EntityViewModal } from '../../components/EntityViewModal/EntityViewModal'

type ToolRow = {
  name: string
  model: string
  type: string
  store: string
  amount: string
  project: string
  account: string
}

const INITIAL_ROWS: ToolRow[] = Array.from({ length: 10 }).map((_, i) => ({
  name: i === 0 ? 'Gas Kitting' : 'Condet',
  model: i % 2 ? 'Co-7898' : 'G-7893',
  type: 'IE Project Items',
  store: i % 3 ? 'HQ Main Store' : '22 House Store',
  amount: i % 2 ? '3 pcs' : '5 pcs',
  project: 'HQ',
  account: i % 3 === 2 ? 'Need Invitation' : 'Activated',
}))

export function ToolsPage() {
  const [rows, setRows] = useState<ToolRow[]>(INITIAL_ROWS)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isViewOpen, setIsViewOpen] = useState(false)
  const [editIndex, setEditIndex] = useState<number | null>(null)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [draft, setDraft] = useState<ToolRow>({
    name: '',
    model: '',
    type: '',
    store: 'HQ Main Store',
    amount: '',
    project: 'HQ',
    account: 'Activated',
  })

  useEffect(() => {
    if (!isEditOpen && !isViewOpen && !isFilterOpen && !isAddOpen) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsEditOpen(false)
        setEditIndex(null)
        setIsViewOpen(false)
        setIsFilterOpen(false)
        setIsAddOpen(false)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isEditOpen, isViewOpen, isFilterOpen, isAddOpen])

  return (
    <>
      <Topbar title="All Tools" subtitle="Tools detail information" />

      <section className="items-card" aria-label="All tools">
        <div className="items-toolbar">
          <label className="items-search" aria-label="Search tool">
            <input className="items-search-input" placeholder="Search Tool" />
          </label>

          <div className="items-actions">
            <span className="items-cube" aria-hidden="true">
              <img src={boxIcon} alt="" />
            </span>
            <button
              className="items-btn items-btn--primary"
              type="button"
              onClick={() => {
                setIsEditOpen(false)
                setIsViewOpen(false)
                setIsFilterOpen(false)
                setIsAddOpen(true)
              }}
            >
              <img className="items-btn-icon" src={addCircleIcon} alt="" aria-hidden="true" />
              <span>Add Tool</span>
            </button>
            <button
              className="items-btn"
              type="button"
              onClick={() => {
                setIsEditOpen(false)
                setIsViewOpen(false)
                setIsAddOpen(false)
                setIsFilterOpen(true)
              }}
            >
              <img className="items-btn-icon" src={filterIcon} alt="" aria-hidden="true" />
              <span>Filter</span>
            </button>
          </div>
        </div>

        <div className="items-table-wrap items-table-wrap--dark">
          <table className="items-table items-table--dark" aria-label="Tools table">
            <thead>
              <tr>
                <th className="items-col-check" aria-label="Select" />
                <th>
                  <span className="th-sort">
                    Tools name
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
              {rows.map((r, idx) => (
                <tr key={`${idx}-${r.name}-${r.model}`}>
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
                  <td className="items-col-action">
                    <div className="row-actions" role="group" aria-label="Row actions">
                      <button
                        type="button"
                        className="row-action row-action--view"
                        aria-label="View"
                        onClick={(e) => {
                          e.stopPropagation()
                          setIsEditOpen(false)
                          setEditIndex(null)
                          setIsFilterOpen(false)
                          setIsAddOpen(false)
                          setDraft(r)
                          setIsViewOpen(true)
                        }}
                      >
                        <img src={eyeIcon} alt="" />
                      </button>
                      <button
                        type="button"
                        className="row-action row-action--edit"
                        aria-label="Edit"
                        onClick={(e) => {
                          e.stopPropagation()
                          setIsViewOpen(false)
                          setIsFilterOpen(false)
                          setIsAddOpen(false)
                          setEditIndex(idx)
                          setDraft(r)
                          setIsEditOpen(true)
                        }}
                      >
                        <img src={editIcon} alt="" />
                      </button>
                      <button
                        type="button"
                        className="row-action row-action--delete"
                        aria-label="Delete"
                        onClick={(e) => {
                          e.stopPropagation()
                          if (!window.confirm('Delete this tool?')) return
                          setRows((prev) => prev.filter((_, i) => i !== idx))
                        }}
                      >
                        <img src={trashIcon} alt="" />
                      </button>
                    </div>
                  </td>
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

          <div className="items-footer-center items-muted">
            Showing 1 to {rows.length} out of 40 records
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
          <div className="modal" role="dialog" aria-modal="true" aria-label="Edit tool">
            <div className="modal-head">
              <div className="modal-title">Edit Tool</div>
            </div>

            <div className="modal-body">
              <form className="modal-form" onSubmit={(e) => e.preventDefault()}>
                <label className="modal-field">
                  <span className="modal-label">Tools name</span>
                  <input
                    className="modal-input"
                    value={draft.name}
                    onChange={(e) => setDraft((p) => ({ ...p, name: e.target.value }))}
                    placeholder="Tool name"
                  />
                </label>

                <label className="modal-field">
                  <span className="modal-label">Model</span>
                  <input
                    className="modal-input"
                    value={draft.model}
                    onChange={(e) => setDraft((p) => ({ ...p, model: e.target.value }))}
                    placeholder="G-7893"
                  />
                </label>

                <label className="modal-field">
                  <span className="modal-label">Type</span>
                  <input
                    className="modal-input"
                    value={draft.type}
                    onChange={(e) => setDraft((p) => ({ ...p, type: e.target.value }))}
                    placeholder="IE Project Items"
                  />
                </label>

                <label className="modal-field">
                  <span className="modal-label">Store</span>
                  <select
                    className="modal-input"
                    value={draft.store}
                    onChange={(e) => setDraft((p) => ({ ...p, store: e.target.value }))}
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
                    value={draft.amount}
                    onChange={(e) => setDraft((p) => ({ ...p, amount: e.target.value }))}
                    placeholder="5 pcs"
                  />
                </label>

                <label className="modal-field">
                  <span className="modal-label">Project</span>
                  <input
                    className="modal-input"
                    value={draft.project}
                    onChange={(e) => setDraft((p) => ({ ...p, project: e.target.value }))}
                    placeholder="HQ"
                  />
                </label>

                <label className="modal-field">
                  <span className="modal-label">Account</span>
                  <select
                    className="modal-input"
                    value={draft.account}
                    onChange={(e) => setDraft((p) => ({ ...p, account: e.target.value }))}
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
                      next[editIndex] = { ...draft }
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

      <EntityViewModal
        open={isViewOpen}
        title="View Tool"
        row={draft}
        onClose={() => setIsViewOpen(false)}
      />

      <ToolFilterModal open={isFilterOpen} onClose={() => setIsFilterOpen(false)} />
      <AddToolDrawer open={isAddOpen} onClose={() => setIsAddOpen(false)} />
    </>
  )
}
