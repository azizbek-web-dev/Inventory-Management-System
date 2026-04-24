import { useState } from 'react'
import calendarCheckIcon from '../../assets/icons/calendar-check.svg'

type AddItemDrawerProps = {
  open: boolean
  onClose: () => void
}

export function AddItemDrawer({ open, onClose }: AddItemDrawerProps) {
  const [groupItem, setGroupItem] = useState(false)
  const [consumableItem, setConsumableItem] = useState(false)
  const [fixedAsset, setFixedAsset] = useState(false)

  const [type, setType] = useState('')
  const [itemName, setItemName] = useState('')
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

  return (
    <div
      className="drawer-overlay"
      role="presentation"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <aside className="drawer" aria-label="Add new item">
        <div className="drawer-head">
          <div className="drawer-title">Add New Item</div>
          <button className="drawer-close" type="button" aria-label="Close" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="drawer-body">
          <div className="drawer-checks">
            <label className="drawer-check">
              <input type="checkbox" checked={groupItem} onChange={(e) => setGroupItem(e.target.checked)} />
              <span>Group Item</span>
            </label>
            <label className="drawer-check">
              <input
                type="checkbox"
                checked={consumableItem}
                onChange={(e) => setConsumableItem(e.target.checked)}
              />
              <span>Consumable Item</span>
            </label>
          </div>

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
                </select>
              </label>

              <label className="drawer-field">
                <span className="drawer-label">
                  Item Name <span className="drawer-required">*</span>
                </span>
                <input
                  className="drawer-input"
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                  placeholder="Enter item name"
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
                  placeholder="Enter item number"
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
                  placeholder="Enter item number"
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

            <label className="drawer-check drawer-check--solo">
              <input type="checkbox" checked={fixedAsset} onChange={(e) => setFixedAsset(e.target.checked)} />
              <span>Fixed Asset</span>
            </label>
          </form>
        </div>

        <div className="drawer-foot">
          <button className="drawer-btn" type="button" onClick={onClose}>
            Cancel
          </button>
          <button className="drawer-btn drawer-btn--primary" type="button" onClick={onClose}>
            Add
          </button>
        </div>
      </aside>
    </div>
  )
}
