// src/components/Hero.jsx
import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/hero.css'

export default function Hero(){
  return (
    <section className="hero">
      <div className="hero-inner">
        <div className="hero-left">
          <h1>IQ Miners Investment</h1>
          <p className="muted">
            Let your money work for you with IQ Miners. Invest in our mining operations and receive daily profits directly to your account. Automated, secure, and transparent.
          </p>
          <div className="hero-actions">
            <Link to="/register" className="hero-btn hero-btn-primary">Sign up</Link>
            <Link to="/login" className="hero-btn hero-btn-ghost">Login</Link>
          </div>
        </div>
        {/* hero-right intentionally removed per previous request */}
      </div>
    </section>
  )
}