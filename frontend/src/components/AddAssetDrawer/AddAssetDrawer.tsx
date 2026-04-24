import { useState } from 'react'
import calendarCheckIcon from '../../assets/icons/calendar-check.svg'

export type AssetStoreName = 'HQ Main Store' | '22 House Store' | 'Tafo House Store'

export type NewAssetPayload = {
  recordType: 'item' | 'tool' | 'assets'
  name: string
  model: string
  type: string
  store: AssetStoreName
  amount: string
  project: string
  account: string
  purchaseDate: string
  longDescription: string
}

type AddAssetDrawerProps = {
  open: boolean
  onClose: () => void
  onAdd: (payload: NewAssetPayload) => void
}

function toStore(s: string): AssetStoreName {
  if (s === '22 House Store' || s === 'Tafo House Store') return s
  return 'HQ Main Store'
}

export function AddAssetDrawer({ open, onClose, onAdd }: AddAssetDrawerProps) {
  const [type, setType] = useState('')
  const [assetName, setAssetName] = useState('')
  const [status, setStatus] = useState('')
  const [serialNumber, setSerialNumber] = useState('')
  const [itemNumber, setItemNumber] = useState('')
  const [unit, setUnit] = useState('')
  const [amount, setAmount] = useState('')
  const [price, setPrice] = useState('')
  const [purchaseDate, setPurchaseDate] = useState('')
  const [currency, setCurrency] = useState('')
  const [store, setStore] = useState('')
  const [project, setProject] = useState('')
  const [department, setDepartment] = useState('')
  const [category, setCategory] = useState('')
  const [manufacturer, setManufacturer] = useState('')
  const [description, setDescription] = useState('')

  if (!open) return null

  const handleAdd = () => {
    const name = assetName.trim() || 'New asset'
    const model = serialNumber.trim() || itemNumber.trim() || '—'
    const typeVal = type.trim() || 'IE Project Items'
    const amountStr = [amount.trim(), unit].filter(Boolean).join(' ').trim() || '1 pcs'
    const account = status === 'Inactive' ? 'Need Invitation' : 'Activated'
    const meta = [department, manufacturer, category, price, currency].filter(Boolean).join(' · ')
    const longDescription = description.trim() || meta || 'Unknown'

    let recordType: NewAssetPayload['recordType'] = 'assets'
    if (typeVal.toLowerCase().includes('consum')) recordType = 'item'
    if (typeVal.toLowerCase().includes('tool') || typeVal.toLowerCase().includes('it'))
      recordType = 'tool'

    onAdd({
      recordType,
      name,
      model,
      type: typeVal,
      store: toStore(store),
      amount: amountStr,
      project: project.trim() || 'HQ',
      account,
      purchaseDate: purchaseDate.trim() || 'Unknown',
      longDescription,
    })
  }

  return (
    <div
      className="drawer-overlay"
      role="presentation"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <aside className="drawer" aria-label="Add new assets">
        <div className="drawer-head">
          <div className="drawer-title">Add New Assets</div>
          <button className="drawer-close" type="button" aria-label="Close" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="drawer-body">
          <form className="drawer-form" onSubmit={(e) => e.preventDefault()}>
            <div className="drawer-grid">
              <label className="drawer-field">
                <span className="drawer-label">
                  Type <span className="drawer-required">*</span>
                </span>
                <select className="drawer-input" value={type} onChange={(e) => setType(e.target.value)}>
                  <option value="">Choose type</option>
                  <option value="Hardware">Hardware</option>
                  <option value="Software">Software</option>
                  <option value="Consumable">Consumable</option>
                  <option value="IT Equipment">IT Equipment</option>
                </select>
              </label>

              <label className="drawer-field">
                <span className="drawer-label">
                  Asset Name <span className="drawer-required">*</span>
                </span>
                <input
                  className="drawer-input"
                  value={assetName}
                  onChange={(e) => setAssetName(e.target.value)}
                  placeholder="Enter assets name"
                />
              </label>

              <label className="drawer-field">
                <span className="drawer-label">
                  Image <span className="drawer-required">*</span>
                </span>
                <div className="drawer-file">
                  <span className="drawer-file-icon" aria-hidden="true">
                    📎
                  </span>
                  <span className="drawer-file-text">Choose file</span>
                  <input className="drawer-file-input" type="file" accept="image/*" />
                </div>
              </label>

              <label className="drawer-field">
                <span className="drawer-label">
                  Status <span className="drawer-required">*</span>
                </span>
                <select className="drawer-input" value={status} onChange={(e) => setStatus(e.target.value)}>
                  <option value="">Choose Status</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </label>

              <label className="drawer-field">
                <span className="drawer-label">
                  Serial Number <span className="drawer-required">*</span>
                </span>
                <input
                  className="drawer-input"
                  value={serialNumber}
                  onChange={(e) => setSerialNumber(e.target.value)}
                  placeholder="Enter serial number"
                />
              </label>

              <label className="drawer-field">
                <span className="drawer-label">
                  Item Numberr <span className="drawer-required">*</span>
                </span>
                <input
                  className="drawer-input"
                  value={itemNumber}
                  onChange={(e) => setItemNumber(e.target.value)}
                  placeholder="Enter assets number"
                />
              </label>

              <label className="drawer-field">
                <span className="drawer-label">
                  Unit of Measurement <span className="drawer-required">*</span>
                </span>
                <select className="drawer-input" value={unit} onChange={(e) => setUnit(e.target.value)}>
                  <option value="">Choose unit of Measurement</option>
                  <option value="pcs">pcs</option>
                  <option value="kg">kg</option>
                  <option value="m">m</option>
                </select>
              </label>

              <label className="drawer-field">
                <span className="drawer-label">
                  Amount <span className="drawer-required">*</span>
                </span>
                <input
                  className="drawer-input"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder=""
                />
              </label>

              <label className="drawer-field">
                <span className="drawer-label">
                  Price <span className="drawer-required">*</span>
                </span>
                <input
                  className="drawer-input"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="Enter price"
                />
              </label>

              <label className="drawer-field">
                <span className="drawer-label">
                  Date of Purchased <span className="drawer-required">*</span>
                </span>
                <div className="drawer-input-row">
                  <input
                    className="drawer-input"
                    type="date"
                    value={purchaseDate}
                    onChange={(e) => setPurchaseDate(e.target.value)}
                  />
                  <span className="drawer-input-suffix" aria-hidden="true">
                    <img src={calendarCheckIcon} alt="" />
                  </span>
                </div>
              </label>

              <label className="drawer-field">
                <span className="drawer-label">
                  Currency <span className="drawer-required">*</span>
                </span>
                <select className="drawer-input" value={currency} onChange={(e) => setCurrency(e.target.value)}>
                  <option value="">Choose Currency</option>
                  <option value="USD">USD</option>
                  <option value="UZS">UZS</option>
                </select>
              </label>

              <label className="drawer-field">
                <span className="drawer-label">
                  PI Document <span className="drawer-required">*</span>
                </span>
                <div className="drawer-file">
                  <span className="drawer-file-icon" aria-hidden="true">
                    📎
                  </span>
                  <span className="drawer-file-text">Choose file</span>
                  <input className="drawer-file-input" type="file" />
                </div>
              </label>

              <label className="drawer-field">
                <span className="drawer-label">
                  Store <span className="drawer-required">*</span>
                </span>
                <select className="drawer-input" value={store} onChange={(e) => setStore(e.target.value)}>
                  <option value="">Choose Store</option>
                  <option value="HQ Main Store">HQ Main Store</option>
                  <option value="22 House Store">22 House Store</option>
                  <option value="Tafo House Store">Tafo House Store</option>
                </select>
              </label>

              <label className="drawer-field">
                <span className="drawer-label">
                  Project <span className="drawer-required">*</span>
                </span>
                <select className="drawer-input" value={project} onChange={(e) => setProject(e.target.value)}>
                  <option value="">Choose project</option>
                  <option value="HQ">HQ</option>
                  <option value="IE">IE</option>
                </select>
              </label>

              <label className="drawer-field">
                <span className="drawer-label">
                  Department <span className="drawer-required">*</span>
                </span>
                <select
                  className="drawer-input"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                >
                  <option value="">Choose department</option>
                  <option value="IT">IT</option>
                  <option value="HR">HR</option>
                </select>
              </label>

              <label className="drawer-field">
                <span className="drawer-label">
                  Category <span className="drawer-required">*</span>
                </span>
                <select className="drawer-input" value={category} onChange={(e) => setCategory(e.target.value)}>
                  <option value="">Choose category</option>
                  <option value="Tools">Tools</option>
                  <option value="Office">Office</option>
                </select>
              </label>

              <label className="drawer-field">
                <span className="drawer-label">
                  Warranty <span className="drawer-required">*</span>
                </span>
                <div className="drawer-file">
                  <span className="drawer-file-icon" aria-hidden="true">
                    📎
                  </span>
                  <span className="drawer-file-text">Choose file</span>
                  <input className="drawer-file-input" type="file" />
                </div>
              </label>

              <label className="drawer-field">
                <span className="drawer-label">
                  Manufacturer <span className="drawer-required">*</span>
                </span>
                <select
                  className="drawer-input"
                  value={manufacturer}
                  onChange={(e) => setManufacturer(e.target.value)}
                >
                  <option value="">Choose manufacturer</option>
                  <option value="Apple">Apple</option>
                  <option value="Dell">Dell</option>
                </select>
              </label>
            </div>

            <label className="drawer-field drawer-field--full">
              <span className="drawer-label">
                Description <span className="drawer-required">*</span>
              </span>
              <textarea
                className="drawer-textarea"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Input description"
              />
            </label>
          </form>
        </div>

        <div className="drawer-foot">
          <button className="drawer-btn" type="button" onClick={onClose}>
            Cancel
          </button>
          <button className="drawer-btn drawer-btn--primary" type="button" onClick={handleAdd}>
            Add
          </button>
        </div>
      </aside>
    </div>
  )
}
