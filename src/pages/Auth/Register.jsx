// src/pages/Auth/Register.jsx
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import COUNTRIES from '../../utils/countries'
import PasswordStrength from '../../components/PasswordStrength'
import '../../styles/register.css'

export default function Register(){
  const [profileType] = useState('Investor account') // Only investor account type is available
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [gender, setGender] = useState('Male')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [country, setCountry] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [pwValid, setPwValid] = useState(false)
  const [refCode, setRefCode] = useState(null)
  const { register } = useAuth()
  const nav = useNavigate()

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search)
      const r = params.get('ref')
      if (r) setRefCode(String(r))
    } catch (err) {
      // ignore parsing errors
    }
  }, [])

  async function handle(e){
    e.preventDefault()
    setError(null)

    if (!pwValid) {
      setError('Please choose a stronger password that meets all requirements.')
      return
    }

    if(password !== confirm) { setError('Passwords do not match'); return }
    
    setLoading(true)
    try{
      const payload = { 
        profileType, 
        firstName, 
        lastName, 
        gender, 
        phone, 
        email: email.toLowerCase(), 
        country, 
        password, 
        ...(refCode ? { ref: refCode } : {}) 
      }
      const { user } = await register(payload)
      if(user.role === 'agent') nav('/agent')
      else nav('/dashboard')
    }catch(err){
      setError(err?.response?.data?.message || (err?.response?.data?.details ? err.response.data.details.join(', ') : err.message) || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="register-page">
      <div className="register-card">
        <div className="auth-brand">
          <div className="brand-logo">IQ</div>
          <div className="brand-text">Join IQMiners</div>
          <div className="brand-subtitle">Start your investment journey</div>
        </div>
        
        <h2>Create Account</h2>

        <form onSubmit={handle} className="register-form" noValidate>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label required">First Name</label>
              <input 
                className="form-input"
                value={firstName} 
                onChange={e => setFirstName(e.target.value)} 
                required 
                placeholder="John"
              />
            </div>
            <div className="form-group">
              <label className="form-label required">Last Name</label>
              <input 
                className="form-input"
                value={lastName} 
                onChange={e => setLastName(e.target.value)} 
                required 
                placeholder="Doe"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label required">Gender</label>
              <select className="form-select" value={gender} onChange={e => setGender(e.target.value)}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <input 
                className="form-input"
                value={phone} 
                onChange={e => setPhone(e.target.value)} 
                placeholder="+1234567890"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label required">Email Address</label>
            <input 
              type="email" 
              className="form-input"
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              required 
              placeholder="john.doe@example.com"
            />
          </div>

          <div className="form-group">
            <label className="form-label required">Country</label>
            <select className="form-select" value={country} onChange={e => setCountry(e.target.value)} required>
              <option value="">Select your country</option>
              {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label required">Password</label>
            <input
              className="form-input"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              placeholder="Create a strong password"
            />
            <PasswordStrength password={password} onValidityChange={setPwValid} />
          </div>

          <div className="form-group">
            <label className="form-label required">Confirm Password</label>
            <input 
              type="password" 
              className="form-input"
              value={confirm} 
              onChange={e => setConfirm(e.target.value)} 
              required 
              placeholder="Confirm your password"
            />
          </div>

          {refCode && (
            <div className="referral-badge">
              Referred by: <strong>{refCode}</strong>
            </div>
          )}

          <button 
            className="auth-submit" 
            type="submit" 
            disabled={!pwValid || password === '' || confirm === '' || loading}
          >
            {loading ? (
              <>
                <span className="loading-spinner"></span>
                Creating Account...
              </>
            ) : (
              `Create Investor Account`
            )}
          </button>

          {!pwValid && password !== '' && (
            <div className="auth-message auth-info">
              Password must meet all requirements to register.
            </div>
          )}

          {error && <div className="auth-message auth-error">{error}</div>}
        </form>

        <div className="auth-actions">
          <button className="auth-link" type="button" onClick={() => nav('/login')}>
            Already have an account? Sign In
          </button>
        </div>
      </div>
    </div>
  )
}