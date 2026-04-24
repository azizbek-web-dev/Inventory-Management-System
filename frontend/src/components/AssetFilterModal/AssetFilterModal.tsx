import { useEffect, useState } from 'react'

export type AssetFilterCriteria = {
  keyword: string
  category: string
  brand: string
  status: string
}

const defaultCriteria: AssetFilterCriteria = {
  keyword: '',
  category: '',
  brand: '',
  status: '',
}

type AssetFilterModalProps = {
  open: boolean
  applied: AssetFilterCriteria
  onClose: () => void
  onApply: (next: AssetFilterCriteria) => void
}

export function AssetFilterModal({ open, applied, onClose, onApply }: AssetFilterModalProps) {
  const [draft, setDraft] = useState<AssetFilterCriteria>(applied)

  useEffect(() => {
    if (open) setDraft(applied)
  }, [open, applied])

  if (!open) return null

  return (
    <div
      className="modal-overlay"
      role="presentation"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="modal modal--wide" role="dialog" aria-modal="true" aria-label="Filter assets">
        <div className="modal-head">
          <div className="modal-title">Filter assets</div>
        </div>

        <div className="modal-body">
          <div className="filter-assets-grid">
            <label className="batch-field filter-assets-field--full">
              <span className="batch-label">Search</span>
              <input
                className="modal-input"
                value={draft.keyword}
                onChange={(e) => setDraft((p) => ({ ...p, keyword: e.target.value }))}
                placeholder="Name, ID, or serial number"
              />
            </label>

            <label className="batch-field">
              <span className="batch-label">Category</span>
              <select
                className="modal-input"
                value={draft.category}
                onChange={(e) => setDraft((p) => ({ ...p, category: e.target.value }))}
              >
                <option value="">Any category</option>
                <option value="Electronics">Electronics</option>
                <option value="Furniture">Furniture</option>
                <option value="Network">Network</option>
                <option value="Power">Power</option>
              </select>
            </label>

            <label className="batch-field">
              <span className="batch-label">Brand</span>
              <select
                className="modal-input"
                value={draft.brand}
                onChange={(e) => setDraft((p) => ({ ...p, brand: e.target.value }))}
              >
                <option value="">Any brand</option>
                <option value="Dell">Dell</option>
                <option value="HP">HP</option>
                <option value="Lenovo">Lenovo</option>
                <option value="Cisco">Cisco</option>
              </select>
            </label>

            <label className="batch-field filter-assets-field--full">
              <span className="batch-label">Status</span>
              <select
                className="modal-input"
                value={draft.status}
                onChange={(e) => setDraft((p) => ({ ...p, status: e.target.value }))}
              >
                <option value="">Any status</option>
                <option value="Available">Available</option>
                <option value="In use">In use</option>
                <option value="Maintenance">Maintenance</option>
              </select>
            </label>
          </div>
        </div>

        <div className="modal-footer modal-footer--center">
          <button className="modal-btn" type="button" onClick={() => setDraft(defaultCriteria)}>
            Clear all
          </button>
          <button className="modal-btn" type="button" onClick={onClose}>
            Cancel
          </button>
          <button
            className="modal-btn modal-btn--primary"
            type="button"
            onClick={() => {
              onApply(draft)
              onClose()
            }}
          >
            Apply filters
          </button>
        </div>
      </div>
    </div>
  )
}
