import { useEffect, useState } from 'react'

export const ASSET_STORES = ['HQ Main Store', '22 House Store', 'Tafo House Store'] as const
export type AssetStoreName = (typeof ASSET_STORES)[number]

export type AssetRecordKind = 'item' | 'tool' | 'assets'

export type AssetFilterCriteria = {
  /** Narrow to one store; empty uses only checkbox selection. */
  storeDropdown: string
  /** Include row if `storesChecked[row.store]` is true. */
  storesChecked: Record<AssetStoreName, boolean>
  /** Empty = any kind; otherwise match `row.recordType`. */
  recordType: '' | AssetRecordKind
}

export function defaultAssetFilters(): AssetFilterCriteria {
  return {
    storeDropdown: '',
    storesChecked: {
      'HQ Main Store': true,
      '22 House Store': true,
      'Tafo House Store': true,
    },
    recordType: '',
  }
}

function filtersEqual(a: AssetFilterCriteria, b: AssetFilterCriteria): boolean {
  if (a.storeDropdown !== b.storeDropdown || a.recordType !== b.recordType) return false
  return ASSET_STORES.every((s) => a.storesChecked[s] === b.storesChecked[s])
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

  const toggleStore = (name: AssetStoreName) => {
    setDraft((p) => ({
      ...p,
      storesChecked: { ...p.storesChecked, [name]: !p.storesChecked[name] },
    }))
  }

  return (
    <div
      className="modal-overlay modal-overlay--blur"
      role="presentation"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="modal asset-filter-modal" role="dialog" aria-modal="true" aria-label="Filter">
        <div className="modal-head">
          <div className="modal-title">Filter</div>
        </div>

        <div className="modal-body asset-filter-body">
          <div className="asset-filter-section">
            <div className="asset-filter-label">Store</div>
            <label className="asset-filter-select-wrap">
              <span className="sr-only">Select store</span>
              <select
                className="modal-input asset-filter-select"
                value={draft.storeDropdown}
                onChange={(e) => setDraft((p) => ({ ...p, storeDropdown: e.target.value }))}
                aria-label="Select store"
              >
                <option value="">Select store</option>
                {ASSET_STORES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </label>

            <ul className="asset-filter-store-list" aria-label="Stores to include">
              {ASSET_STORES.map((name) => (
                <li key={name}>
                  <label className="asset-filter-check">
                    <input
                      type="checkbox"
                      checked={draft.storesChecked[name]}
                      onChange={() => toggleStore(name)}
                    />
                    <span>{name}</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>

          <div className="asset-filter-section">
            <div className="asset-filter-label">Select Type</div>
            <div className="asset-filter-type-row" role="radiogroup" aria-label="Record type">
              {(
                [
                  { value: 'item' as const, label: 'Item' },
                  { value: 'tool' as const, label: 'Tool' },
                  { value: 'assets' as const, label: 'Assets' },
                ] as const
              ).map(({ value, label }) => (
                <label key={value} className="asset-filter-radio">
                  <input
                    type="radio"
                    name="asset-record-type"
                    checked={draft.recordType === value}
                    onChange={() => setDraft((p) => ({ ...p, recordType: value }))}
                  />
                  <span>{label}</span>
                </label>
              ))}
              <label className="asset-filter-radio asset-filter-radio--muted">
                <input
                  type="radio"
                  name="asset-record-type"
                  checked={draft.recordType === ''}
                  onChange={() => setDraft((p) => ({ ...p, recordType: '' }))}
                />
                <span>Any</span>
              </label>
            </div>
          </div>
        </div>

        <div className="modal-footer modal-footer--split">
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
            Apply
          </button>
        </div>
      </div>
    </div>
  )
}

export function assetFiltersActive(f: AssetFilterCriteria): boolean {
  const def = defaultAssetFilters()
  if (f.storeDropdown) return true
  if (f.recordType) return true
  return !filtersEqual(f, def)
}
