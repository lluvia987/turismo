import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
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
  );
}
