import React from 'react'
import '../styles/footer.css'

export default function Footer(){
  const currentYear = new Date().getFullYear()

  // Public files are served from PUBLIC_URL; fallback to '' if not set
  const logoPath = (process.env && process.env.PUBLIC_URL ? process.env.PUBLIC_URL : '') + '/logo192.png'
  
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-brand">
            {/* Replaced text brand mark with logo image from public/logo192.png */}
            <img src={logoPath} className="footer-logo" alt="IQ Miners logo" />
            <div className="footer-company">IQ Miners</div>
          </div>
          
          <div className="footer-info">
            <p className="footer-tagline">Professional Mining Investment Platform</p>
            <div className="footer-meta">
              <span className="footer-copyright">© {currentYear} IQ Miners. All rights reserved.</span>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="footer-compliance">
            <span className="compliance-badge">🔒 Secure Platform</span>
            <span className="compliance-badge">⚡ Daily Payouts</span>
            <span className="compliance-badge">📊 Transparent Operations</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
