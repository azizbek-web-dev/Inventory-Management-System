import type { KeyboardEvent } from 'react'
import { useId, useRef, useState } from 'react'
import logo from '../../assets/logo.png'
import arrowLeftIcon from '../../assets/icons/arrow-left.svg'

type Screen = 'login' | 'forgotPassword' | 'enterOtp'

export function LoginPage() {
  const emailId = useId()
  const passwordId = useId()
  const [showPassword, setShowPassword] = useState(false)
  const [screen, setScreen] = useState<Screen>('login')
  const [emailForReset, setEmailForReset] = useState('')

  const otpRefs = useRef<Array<HTMLInputElement | null>>([])
  const otpLength = 5

  const focusOtp = (index: number) => {
    otpRefs.current[index]?.focus()
  }

  const handleOtpKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !e.currentTarget.value && index > 0) {
      focusOtp(index - 1)
    }
    if (e.key === 'ArrowLeft' && index > 0) focusOtp(index - 1)
    if (e.key === 'ArrowRight' && index < otpLength - 1) focusOtp(index + 1)
  }

  if (screen === 'forgotPassword') {
    return (
      <div className="login-layout">
        <div className="login-left" aria-hidden="true" />

        <div className="login-right">
          <div className="login-card">
            <button type="button" className="back-btn" onClick={() => setScreen('login')}>
              <img className="back-icon" src={arrowLeftIcon} alt="" aria-hidden="true" />
              <span>Back</span>
            </button>

            <div className="login-header">
              <h1 className="login-title">Forgot Password</h1>
              <p className="login-subtitle">
                Enter your registered email address, we'll send you a code to reset your password.
              </p>
            </div>

            <form
              className="login-form"
              onSubmit={(e) => {
                e.preventDefault()
                setScreen('enterOtp')
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
                  value={emailForReset}
                  onChange={(e) => setEmailForReset(e.target.value)}
                />
              </div>

              <button className="primary-btn" type="submit">
                Send OTP
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }

  if (screen === 'enterOtp') {
    const maskedEmail = emailForReset || 'your email'
    return (
      <div className="login-layout">
        <div className="login-left" aria-hidden="true" />

        <div className="login-right">
          <div className="login-card">
            <button type="button" className="back-btn" onClick={() => setScreen('forgotPassword')}>
              <img className="back-icon" src={arrowLeftIcon} alt="" aria-hidden="true" />
              <span>Back</span>
            </button>

            <div className="login-header">
              <h1 className="login-title">Enter OTP</h1>
              <p className="login-subtitle">
                We have share a code of your registered email address
                <br />
                <span className="login-email">{maskedEmail}</span>
              </p>
            </div>

            <form
              className="login-form"
              onSubmit={(e) => {
                e.preventDefault()
              }}
            >
              <div className="otp" role="group" aria-label="OTP code">
                {Array.from({ length: otpLength }).map((_, i) => (
                  <input
                    key={i}
                    ref={(el) => {
                      otpRefs.current[i] = el
                    }}
                    className="otp-input"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={1}
                    aria-label={`Digit ${i + 1}`}
                    onKeyDown={(e) => handleOtpKeyDown(e, i)}
                    onChange={(e) => {
                      const v = e.target.value.replace(/\D/g, '')
                      e.target.value = v
                      if (v && i < otpLength - 1) focusOtp(i + 1)
                    }}
                  />
                ))}
              </div>

              <button className="primary-btn" type="submit">
                Verify
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }

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
              <button type="button" className="link-btn" onClick={() => setScreen('forgotPassword')}>
                Forgot Password?
              </button>
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

