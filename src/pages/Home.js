import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const stats = [
  { value: '18+', label: 'Años de Experiencia' },
  { value: '500+', label: 'Viajeros Felices' },
  { value: '+20', label: 'Destinos Únicos' },
  { value: '100%', label: 'Experiencias Auténticas' },
];

export default function Home() {
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStatsVisible(true); }, { threshold: 0.2 });
    if (statsRef.current) obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <section className="hero" id="inicio">
        <div className="hero-overlay" />
        <div className="hero-particles">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="particle" style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${6 + Math.random() * 6}s`,
            }} />
          ))}
        </div>
        <div className="hero-content">
          <p className="hero-eyebrow">PERÚ · REGIÓN CUSCO · 3,399 m.s.n.m.</p>
          <h1 className="hero-title">
            <span className="title-line">Wiñay</span>
            <span className="title-line accent">Awaq</span>
            <span className="title-line small">Te Espera</span>
          </h1>
          <p className="hero-subtitle">
            Donde los Andes guardan secretos de cinco mil años. Donde la piedra habla
            y el viento trae ecos del Tahuantinsuyo.
          </p>
          <div className="hero-cta-group">
            <Link to="/destinos" className="btn-primary">Articulos</Link>
            <Link to="/experiencias" className="btn-ghost">Nuestros Servicios</Link>
          </div>
        </div>
        <div className="hero-scroll">
          <span>Descubre</span>
          <div className="scroll-line" />
        </div>
      </section>

      <div className={`stats-bar ${statsVisible ? 'visible' : ''}`} ref={statsRef}>
        {stats.map((s, i) => (
          <div key={i} className="stat-item" style={{ animationDelay: `${i * 0.12}s` }}>
            <span className="stat-value">{s.value}</span>
            <span className="stat-label">{s.label}</span>
          </div>
        ))}
      </div>
    </>
  );
}