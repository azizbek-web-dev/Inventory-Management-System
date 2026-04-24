import { useMemo, useState } from 'react'

type FilterModalProps = {
  open: boolean
  onClose: () => void
}

export function FilterModal({ open, onClose }: FilterModalProps) {
  const [selectedStores, setSelectedStores] = useState<Record<string, boolean>>({
    'HQ Main Store': true,
    '22 House Store': false,
    'Tafo House Store': false,
  })
  const [storeMode, setStoreMode] = useState<'office' | 'home'>('office')

  const storeOptions = useMemo(() => Object.keys(selectedStores), [selectedStores])

  if (!open) return null

  return (
    <div
      className="modal-overlay"
      role="presentation"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="modal" role="dialog" aria-modal="true" aria-label="Filter">
        <div className="modal-head">
          <div className="modal-title">Filter</div>
        </div>

        <div className="modal-body">
          <div className="modal-section">
            <div className="modal-label">Store</div>
            <div className="modal-select">
              <span className="modal-select-placeholder">Select store</span>
              <span className="modal-select-chevron" aria-hidden="true">
                ▾
              </span>
            </div>

            <div className="modal-checks">
              {storeOptions.map((name) => (
                <label key={name} className="modal-check">
                  <input
                    type="checkbox"
                    checked={!!selectedStores[name]}
                    onChange={(e) => setSelectedStores((prev) => ({ ...prev, [name]: e.target.checked }))}
                  />
                  <span>{name}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="modal-section">
            <div className="modal-label">Select store</div>
            <div className="modal-radios" role="radiogroup" aria-label="Store mode">
              <label className="modal-radio">
                <input
                  type="radio"
                  name="storeMode"
                  checked={storeMode === 'office'}
                  onChange={() => setStoreMode('office')}
                />
                <span>Office</span>
              </label>
              <label className="modal-radio">
                <input
                  type="radio"
                  name="storeMode"
                  checked={storeMode === 'home'}
                  onChange={() => setStoreMode('home')}
                />
                <span>Work from Home</span>
              </label>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="modal-btn" type="button" onClick={onClose}>
            Cancel
          </button>
          <button className="modal-btn modal-btn--primary" type="button" onClick={onClose}>
            Apply
          </button>
        </div>
      </div>
    </div>
  )
}
