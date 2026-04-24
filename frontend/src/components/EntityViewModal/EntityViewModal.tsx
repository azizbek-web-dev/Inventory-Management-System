type Row = {
  name: string
  model: string
  type: string
  store: string
  amount: string
  project: string
  account: string
}

type EntityViewModalProps = {
  open: boolean
  title: string
  row: Row | null
  onClose: () => void
}

export function EntityViewModal({ open, title, row, onClose }: EntityViewModalProps) {
  if (!open || !row) return null

  return (
    <div
      className="modal-overlay"
      role="presentation"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="modal" role="dialog" aria-modal="true" aria-label={title}>
        <div className="modal-head">
          <div className="modal-title">{title}</div>
        </div>

        <div className="modal-body">
          <div className="view-grid">
            <div className="view-kv">
              <div className="view-k">Name</div>
              <div className="view-v">{row.name}</div>
            </div>
            <div className="view-kv">
              <div className="view-k">Model</div>
              <div className="view-v">{row.model}</div>
            </div>
            <div className="view-kv">
              <div className="view-k">Type</div>
              <div className="view-v">{row.type}</div>
            </div>
            <div className="view-kv">
              <div className="view-k">Store</div>
              <div className="view-v">{row.store}</div>
            </div>
            <div className="view-kv">
              <div className="view-k">Amount</div>
              <div className="view-v">{row.amount}</div>
            </div>
            <div className="view-kv">
              <div className="view-k">Project</div>
              <div className="view-v">{row.project}</div>
            </div>
            <div className="view-kv view-kv--full">
              <div className="view-k">Account</div>
              <div className="view-v">{row.account}</div>
            </div>
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
