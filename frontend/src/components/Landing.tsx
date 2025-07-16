import React from 'react';
import { useNavigate } from 'react-router-dom';

const Landing: React.FC = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/events');
  };

  // Tamal SVG component
  const TamalLogo = () => (
    <svg 
      style={{ width: '80px', height: '80px', animation: 'bounce 2s ease-in-out infinite' }} 
      viewBox="0 0 100 100" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse cx="50" cy="50" rx="35" ry="45" fill="#8FBC8F" opacity="0.9"/>
      <ellipse cx="50" cy="50" rx="32" ry="42" fill="#9ACD32" opacity="0.8"/>
      <ellipse cx="50" cy="50" rx="25" ry="35" fill="#FFE4B5"/>
      <ellipse cx="50" cy="50" rx="22" ry="32" fill="#F5DEB3"/>
      <circle cx="45" cy="40" r="3" fill="#CD853F" opacity="0.8"/>
      <circle cx="55" cy="45" r="2.5" fill="#A0522D" opacity="0.8"/>
      <circle cx="48" cy="55" r="2" fill="#8B4513" opacity="0.8"/>
      <circle cx="52" cy="60" r="2.5" fill="#CD853F" opacity="0.8"/>
      <path d="M30 20 Q32 15 30 10" stroke="rgba(255,255,255,0.6)" strokeWidth="2" fill="none" opacity="0.7"/>
      <path d="M50 18 Q52 13 50 8" stroke="rgba(255,255,255,0.6)" strokeWidth="2" fill="none" opacity="0.7"/>
      <path d="M70 20 Q72 15 70 10" stroke="rgba(255,255,255,0.6)" strokeWidth="2" fill="none" opacity="0.7"/>
    </svg>
  );

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: '2rem', position: 'relative' }}>
      
      {/* Floating background shapes */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1 }}>
        <div className="floating-shape" style={{ width: '120px', height: '120px', top: '10%', left: '10%' }}></div>
        <div className="floating-shape" style={{ width: '80px', height: '80px', top: '20%', right: '20%' }}></div>
        <div className="floating-shape" style={{ width: '60px', height: '60px', bottom: '30%', left: '15%' }}></div>
        <div className="floating-shape" style={{ width: '100px', height: '100px', bottom: '20%', right: '10%' }}></div>
      </div>

      {/* Main content */}
      <div style={{ position: 'relative', zIndex: 10 }}>
        {/* Brand */}
        <div style={{ marginBottom: '3rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
            <TamalLogo />
            <h1 style={{ 
              fontSize: '5rem', 
              fontWeight: 900, 
              background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4, #95e1d3, #fce38a)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              letterSpacing: '-0.02em'
            }}>
              Tamalee
            </h1>
          </div>
          <p style={{ fontSize: '1.8rem', color: 'rgba(255, 255, 255, 0.9)', fontWeight: 500, marginBottom: '0.5rem' }}>
            Wrap Your Plans Around 🌮
          </p>
          <p style={{ fontSize: '1.2rem', color: 'rgba(255, 255, 255, 0.7)', fontWeight: 400 }}>
            Where friends gather like familia, and every event is perfectly wrapped
          </p>
        </div>

        {/* Features */}
        <div style={{ display: 'flex', gap: '2rem', margin: '3rem 0', flexWrap: 'wrap', justifyContent: 'center' }}>
          <div className="card" style={{ minWidth: '200px', padding: '1.5rem' }}>
            <span style={{ fontSize: '2rem', marginBottom: '1rem', display: 'block' }}>🌽</span>
            <h3 style={{ color: 'white', fontWeight: 600, marginBottom: '0.5rem', fontSize: '1.1rem' }}>Fresh Planning</h3>
            <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.9rem', lineHeight: '1.4' }}>Made-to-order events, crafted with love and perfectly wrapped</p>
          </div>
          <div className="card" style={{ minWidth: '200px', padding: '1.5rem' }}>
            <span style={{ fontSize: '2rem', marginBottom: '1rem', display: 'block' }}>👨‍👩‍👧‍👦</span>
            <h3 style={{ color: 'white', fontWeight: 600, marginBottom: '0.5rem', fontSize: '1.1rem' }}>Familia Vibes</h3>
            <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.9rem', lineHeight: '1.4' }}>Bring everyone together like a warm family gathering</p>
          </div>
          <div className="card" style={{ minWidth: '200px', padding: '1.5rem' }}>
            <span style={{ fontSize: '2rem', marginBottom: '1rem', display: 'block' }}>🎉</span>
            <h3 style={{ color: 'white', fontWeight: 600, marginBottom: '0.5rem', fontSize: '1.1rem' }}>Sabor & Fun</h3>
            <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.9rem', lineHeight: '1.4' }}>Every event packed with flavor, joy, and unforgettable moments</p>
          </div>
        </div>

        {/* CTA Button */}
        <div style={{ marginTop: '3rem' }}>
          <button 
            onClick={handleGetStarted}
            className="btn"
            style={{ 
              fontSize: '1.2rem', 
              padding: '18px 40px',
              margin: '0.5rem',
              borderRadius: '50px'
            }}
          >
            Start Wrapping 🌮✨
          </button>
        </div>

        {/* Stats */}
        <div style={{ marginTop: '4rem', display: 'flex', gap: '3rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <div className="card" style={{ textAlign: 'center', padding: '1.5rem' }}>
            <span style={{ fontSize: '2.5rem', fontWeight: 800, color: 'white', display: 'block', marginBottom: '0.5rem' }}>1K+</span>
            <span style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '1rem', fontWeight: 500 }}>Events Wrapped</span>
          </div>
          <div className="card" style={{ textAlign: 'center', padding: '1.5rem' }}>
            <span style={{ fontSize: '2.5rem', fontWeight: 800, color: 'white', display: 'block', marginBottom: '0.5rem' }}>5K+</span>
            <span style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '1rem', fontWeight: 500 }}>Happy Amigos</span>
          </div>
          <div className="card" style={{ textAlign: 'center', padding: '1.5rem' }}>
            <span style={{ fontSize: '2.5rem', fontWeight: 800, color: 'white', display: 'block', marginBottom: '0.5rem' }}>10K+</span>
            <span style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '1rem', fontWeight: 500 }}>Memories Made</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;