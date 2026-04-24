import { useId, useState } from 'react'
import logo from '../../assets/logo.png'

export function LoginPage() {
  const emailId = useId()
  const passwordId = useId()
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="login-layout">
      <div className="login-left" aria-hidden="true" />

      <div className="login-right">
        <div className="login-card">
          <div className="login-brand">
            <img className="login-logo" src={logo} alt="" />
            <span className="login-brand-name">Inventory</span>
          </div>

          <div className="login-header">
            <h1 className="login-title">Welcome</h1>
            <p className="login-subtitle">Please login here</p>
          </div>

          <form
            className="login-form"
            onSubmit={(e) => {
              e.preventDefault()
            }}
          >
            <div className="field">
              <label className="label" htmlFor={emailId}>
                Email Address
              </label>
              <input
                id={emailId}
                className="input"
                type="email"
                name="email"
                autoComplete="email"
                placeholder="you@example.com"
                required
              />
            </div>

            <div className="field">
              <label className="label" htmlFor={passwordId}>
                Password
              </label>
              <div className="input-with-action">
                <input
                  id={passwordId}
                  className="input"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  autoComplete="current-password"
                  placeholder="••••••••••"
                  required
                />
                <button
                  type="button"
                  className="icon-btn"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  onClick={() => setShowPassword((v) => !v)}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="M2.1 12.3c-.1-.2-.1-.4 0-.6C4 7.7 7.7 5 12 5c4.3 0 8 2.7 9.9 6.7.1.2.1.4 0 .6C20 16.3 16.3 19 12 19c-4.3 0-8-2.7-9.9-6.7Z"
                      stroke="currentColor"
                      strokeWidth="1.7"
                    />
                    <path
                      d="M15.5 12c0 1.9-1.6 3.5-3.5 3.5S8.5 13.9 8.5 12 10.1 8.5 12 8.5s3.5 1.6 3.5 3.5Z"
                      stroke="currentColor"
                      strokeWidth="1.7"
                    />
                    <path
                      d="M4 4l16 16"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      opacity={showPassword ? 0 : 1}
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div className="login-row">
              <label className="checkbox">
                <input type="checkbox" name="remember" defaultChecked />
                <span>Remember Me</span>
              </label>
              <a className="link" href="#" onClick={(e) => e.preventDefault()}>
                Forgot Password?
              </a>
            </div>

            <button className="primary-btn" type="submit">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

