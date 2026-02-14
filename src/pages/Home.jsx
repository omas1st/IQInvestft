import React from 'react';
import Hero from '../components/Hero';
import TradingViewWidget from '../components/TradingViewWidget';
import SuccessWithdrawals from '../components/SuccessWithdrawals'; // ✅ import added
import '../styles/home.css';
import { useAuth } from '../contexts/AuthContext';

export default function Home() {
  const { user } = useAuth();

  return (
    <>
      {user && (
        <div style={{ textAlign: 'center', padding: '1rem' }}>
          Welcome back, {user.email}!
        </div>
      )}
      <Hero />
      <section style={{ height: '600px', width: '100%' }}>
        <TradingViewWidget />
      </section>

      {/* ✅ Success Withdrawals component added below the widget */}
      <SuccessWithdrawals />
    </>
  );
}