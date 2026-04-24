type TimelineStep = { label: string; state: 'done' | 'pending' }

export type AssetDescriptionData = {
  name: string
  purchaseDate: string
  description: string
  history: TimelineStep[]
}

type AssetDescriptionModalProps = {
  open: boolean
  data: AssetDescriptionData | null
  onClose: () => void
}

function ImagePlaceholder() {
  return (
    <div className="asset-desc-placeholder" aria-hidden="true">
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M8 36V12L20 24L28 16L40 28V36H8Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <circle cx="16" cy="14" r="3" stroke="currentColor" strokeWidth="2" />
      </svg>
    </div>
  )
}

export function AssetDescriptionModal({ open, data, onClose }: AssetDescriptionModalProps) {
  if (!open || !data) return null

  return (
    <div
      className="modal-overlay modal-overlay--blur"
      role="presentation"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="modal asset-desc-modal" role="dialog" aria-modal="true" aria-label="Item description">
        <div className="modal-head">
          <div className="modal-title">Item Description</div>
        </div>

        <div className="modal-body asset-desc-body">
          <div className="asset-desc-top">
            <div className="asset-desc-visual">
              <ImagePlaceholder />
            </div>
            <div className="asset-desc-meta">
              <h2 className="asset-desc-name">{data.name}</h2>
              <dl className="asset-desc-dl">
                <div>
                  <dt>Purchase Date</dt>
                  <dd>{data.purchaseDate}</dd>
                </div>
                <div>
                  <dt>Description</dt>
                  <dd>{data.description}</dd>
                </div>
              </dl>
            </div>
          </div>

          <div className="asset-desc-history">
            <div className="asset-desc-history-title">Inventory History</div>
            <ul className="asset-desc-timeline" aria-label="Inventory history">
              {data.history.map((step, i) => (
                <li key={`${step.label}-${i}`} className="asset-desc-timeline-item">
                  <span
                    className={
                      step.state === 'done'
                        ? 'asset-desc-dot asset-desc-dot--active'
                        : 'asset-desc-dot asset-desc-dot--pending'
                    }
                    aria-hidden="true"
                  />
                  <span className="asset-desc-timeline-label">{step.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="modal-footer">
          <button className="modal-btn modal-btn--primary" type="button" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
