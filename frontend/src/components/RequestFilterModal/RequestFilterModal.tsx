import { useEffect, useState } from 'react'

export const REQUEST_STORES = ['HQ Main Store', '22 House Store', 'Tafo House Store'] as const
export type RequestStoreKey = (typeof REQUEST_STORES)[number]

export type RequestRecordKind = 'item' | 'tool' | 'assets'

export type RequestFilterState = {
  storeDropdown: string
  recordType: '' | RequestRecordKind
}

export function defaultRequestFilter(): RequestFilterState {
  return {
    storeDropdown: '',
    recordType: '',
  }
}

export function requestFilterActive(f: RequestFilterState | null): boolean {
  if (!f) return false
  return !!f.storeDropdown || !!f.recordType
}

type RequestFilterModalProps = {
  open: boolean
  applied: RequestFilterState | null
  onClose: () => void
  onApply: (next: RequestFilterState | null) => void
}

export function RequestFilterModal({ open, applied, onClose, onApply }: RequestFilterModalProps) {
  const [draft, setDraft] = useState<RequestFilterState>(defaultRequestFilter())

  useEffect(() => {
    if (!open) return
    setDraft(applied ? { ...applied } : defaultRequestFilter())
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
      <div className="modal request-filter-modal" role="dialog" aria-modal="true" aria-label="Filter request">
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
                {REQUEST_STORES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
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
                    name="request-record-type"
                    checked={draft.recordType === value}
                    onChange={() => setDraft((p) => ({ ...p, recordType: value }))}
                  />
                  <span>{label}</span>
                </label>
              ))}
              <label className="asset-filter-radio asset-filter-radio--muted">
                <input
                  type="radio"
                  name="request-record-type"
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
              const hasCriteria = !!draft.storeDropdown.trim() || !!draft.recordType
              onApply(hasCriteria ? draft : null)
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
