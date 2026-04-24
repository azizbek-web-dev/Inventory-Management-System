import searchIcon from '../../assets/icons/search.svg'
import notificationIcon from '../../assets/icons/notification.svg'
import chevronDownIcon from '../../assets/icons/direction-down.svg'
import profileLogo from '../../assets/images/profile_logo.png'

type TopbarProps = {
  title: string
  subtitle?: string
}

export function Topbar({ title, subtitle }: TopbarProps) {
  return (
    <header className="dash-topbar">
      <div className="dash-greeting">
        <div className="dash-title">{title}</div>
        {subtitle ? <div className="dash-subtitle">{subtitle}</div> : null}
      </div>

      <div className="dash-actions">
        <label className="dash-search" aria-label="Search">
          <img className="dash-search-icon" src={searchIcon} alt="" aria-hidden="true" />
          <input className="dash-search-input" placeholder="Search" />
        </label>

        <button className="dash-icon-btn" type="button" aria-label="Notifications">
          <img src={notificationIcon} alt="" aria-hidden="true" />
        </button>

        <button className="dash-profile" type="button" aria-label="Profile">
          <img className="dash-avatar" src={profileLogo} alt="" />
          <span className="dash-profile-meta">
            <span className="dash-profile-name">Mathias W.</span>
            <span className="dash-profile-role">Store Manager</span>
          </span>
          <img className="dash-chevron" src={chevronDownIcon} alt="" aria-hidden="true" />
        </button>
      </div>
    </header>
  )
}

