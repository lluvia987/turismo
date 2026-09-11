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
  const [aboutVisible, setAboutVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const statsRef = useRef(null);
  const aboutRef = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStatsVisible(true); }, { threshold: 0.2 });
    if (statsRef.current) obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setAboutVisible(true); }, { threshold: 0.2 });
    if (aboutRef.current) obs.observe(aboutRef.current);
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
            <Link to="/productos" className="btn-primary">Articulos</Link>
            <Link to="/experiencias" className="btn-ghost">Nuestros Servicios</Link>
          </div>
        </div>
        <div className="hero-scroll">
          <span>Descubre</span>
          <div className="scroll-line" />
        </div>
      </section>

      <section className={`stats-bar ${statsVisible ? 'visible' : ''}`} ref={statsRef}>
        <div className='stats-bar-grid'>
          {stats.map((s, i) => (
          <div key={i} className="stat-item" style={{ animationDelay: `${i * 0.12}s` }}>
            <span className="stat-value">{s.value}</span>
            <span className="stat-label">{s.label}</span>
          </div>
        ))}
        </div>
        
      </section>

      <section className={`container storytelling-section ${aboutVisible ? 'visible' : ''}`} ref={aboutRef}>
        <div className='storytelling-inner'>
          <div
            className={`storytelling-wrap`}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <img
              src="/portadareferencia.png"
              alt="Wiñay Awaq en Cusco"
              className={`storytelling-image ${hovered ? 'zoomed' : ''}`}
              loading="lazy"
            />
            <div className='card-gradient'></div>
          </div>
          <div className="about-content">
            <p className="about-eyebrow">NUESTRA HISTORIA</p>
            <h2 className="about-title">
              Guardianes de la <span className="accent">Tradición</span> Andina
            </h2>
            <p className="about-text">
              Desde hace más de 18 años, guiamos a viajeros de todo el mundo por los
              caminos ancestrales del Tahuantinsuyo. Cada ruta que ofrecemos nace del
              respeto por la cultura andina y el deseo de compartir experiencias
              auténticas, lejos del turismo masivo.
            </p>
            <p className="about-text">
              Somos un equipo local, apasionado por nuestras raíces, comprometido con
              un turismo responsable que beneficia a las comunidades que nos reciben.
            </p>
            <Link to="/nosotros" className="btn-ghost">Conócenos Más</Link>
          </div>
          
        </div>
        
      </section>
    </>
  );
}