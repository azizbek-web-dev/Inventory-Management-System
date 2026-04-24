import { useMemo, useState } from 'react'

type ToolFilterModalProps = {
  open: boolean
  onClose: () => void
}

const TOOL_CHIPS = [
  'Gas kitting',
  'Condet',
  'Punta',
  'Wood punta 8mm',
  'Gypson/floor',
  'Ground case cable',
  'pipe jonter',
  'Harry Potter',
]

export function ToolFilterModal({ open, onClose }: ToolFilterModalProps) {
  const [search, setSearch] = useState('')
  const [store, setStore] = useState('')
  const [category, setCategory] = useState('')
  const [selected, setSelected] = useState<Record<string, boolean>>({})
  const [showStoreError, setShowStoreError] = useState(false)

  const chips = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return TOOL_CHIPS
    return TOOL_CHIPS.filter((c) => c.toLowerCase().includes(q))
  }, [search])

  if (!open) return null

  return (
    <div
      className="modal-overlay"
      role="presentation"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="modal modal--wide" role="dialog" aria-modal="true" aria-label="Batch request tools">
        <div className="modal-head">
          <div className="modal-title">Batch Request Tools</div>
        </div>

        <div className="modal-body">
          <div className="batch-grid">
            <label className="batch-field">
              <span className="batch-label">
                Search <span className="batch-required">*</span>
              </span>
              <input
                className="modal-input"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search"
              />
            </label>

            <label className="batch-field">
              <span className="batch-label">
                Store <span className="batch-required">*</span>
              </span>
              <select
                className="modal-input"
                value={store}
                onChange={(e) => {
                  setStore(e.target.value)
                  setShowStoreError(false)
                }}
              >
                <option value="">Store</option>
                <option value="HQ Main Store">HQ Main Store</option>
                <option value="22 House Store">22 House Store</option>
                <option value="Tafo House Store">Tafo House Store</option>
              </select>
              {showStoreError ? <div className="batch-error">Please select store to proceed</div> : null}
            </label>

            <label className="batch-field">
              <span className="batch-label">
                Tool category <span className="batch-required">*</span>
              </span>
              <select className="modal-input" value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="">Item group</option>
                <option value="IE Project Items">IE Project Items</option>
                <option value="Consumables">Consumables</option>
                <option value="Hardware">Hardware</option>
              </select>
            </label>
          </div>

          <div className="chip-grid" aria-label="Tools">
            {chips.map((name) => {
              const isOn = !!selected[name]
              return (
                <button
                  key={name}
                  type="button"
                  className={isOn ? 'chip is-selected' : 'chip'}
                  onClick={() => setSelected((prev) => ({ ...prev, [name]: !prev[name] }))}
                >
                  {name}
                </button>
              )
            })}
          </div>
        </div>

        <div className="modal-footer modal-footer--center">
          <button className="modal-btn" type="button" onClick={onClose}>
            Cancel
          </button>
          <button
            className="modal-btn modal-btn--primary"
            type="button"
            onClick={() => {
              if (!store) {
                setShowStoreError(true)
                return
              }
              onClose()
            }}
          >
            Add Tool
          </button>
        </div>
      </div>
    </div>
  )
}
