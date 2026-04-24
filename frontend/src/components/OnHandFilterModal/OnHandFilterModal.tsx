import { useEffect, useState } from 'react'

export const ON_HAND_STORES = ['HQ Main Store', '22 House Store', 'Tafo House Store'] as const

export type OnHandRecordKind = 'item' | 'tool' | 'assets'

export type OnHandFilterState = {
  storeDropdown: string
  itemGroup: string
  recordType: '' | OnHandRecordKind
}

export function defaultOnHandFilter(): OnHandFilterState {
  return {
    storeDropdown: '',
    itemGroup: '',
    recordType: '',
  }
}

export function onHandFilterActive(f: OnHandFilterState | null): boolean {
  if (!f) return false
  return !!f.storeDropdown || !!f.itemGroup || !!f.recordType
}

type OnHandFilterModalProps = {
  open: boolean
  applied: OnHandFilterState | null
  onClose: () => void
  onApply: (next: OnHandFilterState | null) => void
}

export function OnHandFilterModal({ open, applied, onClose, onApply }: OnHandFilterModalProps) {
  const [draft, setDraft] = useState<OnHandFilterState>(defaultOnHandFilter())

  useEffect(() => {
    if (!open) return
    setDraft(applied ? { ...applied } : defaultOnHandFilter())
  }, [open, applied])

  if (!open) return null

  return (
    <div
      className="modal-overlay modal-overlay--blur"
      role="presentation"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="modal request-filter-modal" role="dialog" aria-modal="true" aria-label="Filter on hand">
        <div className="modal-head">
          <div className="modal-title">Filter Request</div>
        </div>

        <div className="modal-body asset-filter-body">
          <div className="asset-filter-section">
            <div className="asset-filter-label">Select Store</div>
            <label className="asset-filter-select-wrap">
              <select
                className="modal-input asset-filter-select"
                value={draft.storeDropdown}
                onChange={(e) => setDraft((p) => ({ ...p, storeDropdown: e.target.value }))}
                aria-label="Select store"
              >
                <option value="">Select Store</option>
                {ON_HAND_STORES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="asset-filter-section">
            <div className="asset-filter-label">Select Item Group</div>
            <label className="asset-filter-select-wrap">
              <select
                className="modal-input asset-filter-select"
                value={draft.itemGroup}
                onChange={(e) => setDraft((p) => ({ ...p, itemGroup: e.target.value }))}
                aria-label="Item group"
              >
                <option value="">Item Group</option>
                <option value="IE Project Items">IE Project Items</option>
                <option value="Consumables">Consumables</option>
                <option value="Hardware">Hardware</option>
              </select>
            </label>
          </div>

          <div className="asset-filter-section">
            <div className="asset-filter-label">Select type</div>
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
                    name="onhand-record-type"
                    checked={draft.recordType === value}
                    onChange={() => setDraft((p) => ({ ...p, recordType: value }))}
                  />
                  <span>{label}</span>
                </label>
              ))}
              <label className="asset-filter-radio asset-filter-radio--muted">
                <input
                  type="radio"
                  name="onhand-record-type"
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
              const has =
                !!draft.storeDropdown.trim() || !!draft.itemGroup.trim() || !!draft.recordType
              onApply(has ? draft : null)
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
