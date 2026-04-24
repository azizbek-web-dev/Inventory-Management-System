import { useEffect, useMemo, useState } from 'react'

const ASSET_CHIPS = [
  'Gas kitting',
  'Gypson/floor',
  'Ground case cable',
  'pipe jonter',
  'Punta',
  'Wood punta 8mm',
  'Harry Potter',
]

export type AssetClassFilter = '' | 'fixed' | 'consumable' | 'it'

export type BatchAssetsApplied = {
  enabled: boolean
  store: string
  category: string
  assetClass: AssetClassFilter
  chipNames: string[]
}

export function emptyBatchAssetsApplied(): BatchAssetsApplied {
  return {
    enabled: false,
    store: '',
    category: '',
    assetClass: '',
    chipNames: [],
  }
}

export function batchAssetsFilterActive(b: BatchAssetsApplied): boolean {
  return b.enabled
}

type BatchRequestAssetsModalProps = {
  open: boolean
  applied: BatchAssetsApplied
  onClose: () => void
  onApply: (next: BatchAssetsApplied) => void
  onClearFilters: () => void
}

export function BatchRequestAssetsModal({
  open,
  applied,
  onClose,
  onApply,
  onClearFilters,
}: BatchRequestAssetsModalProps) {
  const [search, setSearch] = useState('')
  const [store, setStore] = useState('')
  const [category, setCategory] = useState('')
  const [assetClass, setAssetClass] = useState<AssetClassFilter>('')
  const [selected, setSelected] = useState<Record<string, boolean>>({})
  const [showStoreError, setShowStoreError] = useState(false)

  useEffect(() => {
    if (!open) return
    setSearch('')
    setStore(applied.enabled ? applied.store : '')
    setCategory(applied.enabled ? applied.category : '')
    setAssetClass(applied.enabled ? applied.assetClass : '')
    const sel: Record<string, boolean> = {}
    for (const n of applied.chipNames) {
      sel[n] = true
    }
    setSelected(sel)
    setShowStoreError(false)
  }, [open, applied])

  const chips = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return ASSET_CHIPS
    return ASSET_CHIPS.filter((c) => c.toLowerCase().includes(q))
  }, [search])

  if (!open) return null

  const chipNames = ASSET_CHIPS.filter((n) => selected[n])

  return (
    <div
      className="modal-overlay modal-overlay--blur"
      role="presentation"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="modal modal--wide" role="dialog" aria-modal="true" aria-label="Batch request assets">
        <div className="modal-head">
          <div className="modal-title">Batch Request Assets</div>
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
                Asset category <span className="batch-required">*</span>
              </span>
              <select className="modal-input" value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="">Asset group</option>
                <option value="IE Project Items">IE Project Items</option>
                <option value="Consumables">Consumables</option>
                <option value="Hardware">Hardware</option>
              </select>
            </label>
          </div>

          <div className="batch-asset-class" role="radiogroup" aria-label="Asset type">
            <label className="batch-asset-class-option">
              <input
                type="radio"
                name="batch-asset-class"
                checked={assetClass === 'fixed'}
                onChange={() => setAssetClass('fixed')}
              />
              <span>Fixed Asset</span>
            </label>
            <label className="batch-asset-class-option">
              <input
                type="radio"
                name="batch-asset-class"
                checked={assetClass === 'consumable'}
                onChange={() => setAssetClass('consumable')}
              />
              <span>Consumable</span>
            </label>
            <label className="batch-asset-class-option">
              <input
                type="radio"
                name="batch-asset-class"
                checked={assetClass === 'it'}
                onChange={() => setAssetClass('it')}
              />
              <span>IT Asset</span>
            </label>
            <label className="batch-asset-class-option batch-asset-class-option--muted">
              <input
                type="radio"
                name="batch-asset-class"
                checked={assetClass === ''}
                onChange={() => setAssetClass('')}
              />
              <span>Any</span>
            </label>
          </div>

          <div className="chip-grid" aria-label="Assets">
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

          <button
            className="batch-clear-link"
            type="button"
            onClick={() => {
              onClearFilters()
              onClose()
            }}
          >
            Clear table filters
          </button>
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
              onApply({
                enabled: true,
                store,
                category,
                assetClass,
                chipNames,
              })
              onClose()
            }}
          >
            Add Item
          </button>
        </div>
      </div>
    </div>
  )
}
