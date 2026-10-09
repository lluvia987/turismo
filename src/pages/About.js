import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { BASE_URL_NOSOTROS } from '../config/cloudinary';
import { useGalery } from '../hooks/useGalery';
import '../styles/About.css';



const values = [
  {
    icon: '🤝',
    title: 'Compromiso Comunitario',
    text: 'Trabajamos junto a las familias de Chinchero, apoyando directamente a los artesanos y su economía local.',
  },
  {
    icon: '🌿',
    title: 'Turismo Responsable',
    text: 'Promovemos un turismo respetuoso con la naturaleza, las tradiciones y las personas que nos reciben.',
  },
  {
    icon: '🧵',
    title: 'Autenticidad',
    text: 'Cada experiencia y cada pieza que ofrecemos nace de saberes ancestrales transmitidos por generaciones.',
  },
];

const milestones = [
  { year: '2008', title: 'Nuestros Inicios', text: 'Un grupo de familias de Chinchero se une para compartir su cultura textil con visitantes del mundo.' },
  { year: '2010', title: 'Primeras Alianzas', text: 'Comenzamos a colaborar con operadores turísticos locales para llegar a más viajeros.' },
  { year: '2016', title: 'Crecimiento Comunitario', text: 'Ampliamos nuestro equipo, incorporando a más artesanas y personas que aporten conocimiento a la organización' },
  { year: '2024', title: 'Wiñay Awaq Hoy', text: 'Más de 500 viajeros nos han visitado, llevándose una experiencia auténtica del Valle Sagrado.' },
];

const team = [
  { name: 'Julio Callañaupa', role: 'Fundadora & Artesano', image: 'perfiljulio.png' },
  { name: 'Liberata Sallo', role: 'Maestra Artesana', image: 'perfilliberata.png' },
  { name: 'Libia Sallo', role: 'Tejedora', image: '' },
  { name: 'Cesar Callañaupa', role: 'Organizador', image: '' },
];

function useReveal(threshold = 0.15) {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

export default function About() {
  const { photos, loading, error } = useGalery();

  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [galleryRef, galleryVisible] = useReveal(0.1);

  const openLightbox = (i) => setLightboxIndex(i);
  const closeLightbox = () => setLightboxIndex(null);
  const nextPhoto = (e) => { e.stopPropagation(); setLightboxIndex((i) => (i + 1) % photos.length); };
  const prevPhoto = (e) => { e.stopPropagation(); setLightboxIndex((i) => (i - 1 + photos.length) % photos.length); };

  const [valuesRef, valuesVisible] = useReveal();
  const [timelineRef, timelineVisible] = useReveal(0.1);
  const [teamRef, teamVisible] = useReveal();

  return (
    <>
      {/* ── HERO ── */}
      <section className="about-hero">
        <div className="about-hero-overlay" />
        <div className="about-hero-content">
          <p className="hero-eyebrow">NUESTRA HISTORIA</p>
          <h1 className="about-hero-title">
            Somos <span className="accent">Wiñay Awaq</span>
          </h1>
          <p className="about-hero-sub">
            Conocedores del tejido ancestral, guiamos tu experiencia en el corazón del Valle Sagrado.
          </p>
        </div>
      </section>

      {/* ── INTRO / HISTORIA ── */}
      <section className="section about-intro">
        <div className="about-intro-layout">
          <div className="about-intro-image">
            <img
              src="about.jpeg"
              alt="Comunidad de Wiñay Awaq"
            />
            <div className="about-intro-badge">
              <span className="about-intro-badge-value">18+</span>
              <span className="about-intro-badge-label">Años de Trayectoria</span>
            </div>
          </div>
          <div className="about-intro-text">
            <p className="section-eyebrow">QUIÉNES SOMOS</p>
            <h2 className="section-title">
              Una comunidad, <em>un legado</em>
            </h2>
            <p className="section-sub" style={{ marginBottom: '1.2rem' }}>
              Wiñay Awaq nace en Chinchero, Cusco, como una iniciativa de familias tejedoras
              que decidieron abrir las puertas de su comunidad para compartir su cultura viva
              con el mundo.
            </p>
            <p className="section-sub">
              Hoy seguimos guiados por el mismo propósito: ofrecer experiencias genuinas,
              donde cada visitante no solo observa, sino que participa y se lleva consigo
              un pedazo de nuestra tradición andina.
            </p>
            <Link to="/servicios" className="btn-primary" style={{ marginTop: '2rem', display: 'inline-block' }}>
              Conoce Nuestros Servicios
            </Link>
          </div>
        </div>
      </section>

      {/* ── MISIÓN / VISIÓN / VALORES ── */}
      <section className="section about-values" ref={valuesRef}>
        <div className="section-header">
          <p className="section-eyebrow">LO QUE NOS MUEVE</p>
          <h2 className="section-title">Nuestros <em>Valores</em></h2>
        </div>
        <div className="values-grid">
          {values.map((v, i) => (
            <div
              key={i}
              className={`value-card ${valuesVisible ? 'visible' : ''}`}
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              <span className="value-icon">{v.icon}</span>
              <h3 className="value-title">{v.title}</h3>
              <p className="value-text">{v.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── GALERÍA DEL PROCESO ── */}
      <section className="section about-gallery" ref={galleryRef}>
        <div className="section-header">
          <p className="section-eyebrow">DETRÁS DEL TEJIDO</p>
          <h2 className="section-title">Nuestro <em>Proceso Artesanal</em></h2>
          <p className="section-sub" style={{ margin: '0 auto' }}>
            Cada pieza nace de un proceso cuidado a mano, paso a paso, tal como lo han hecho nuestras familias por generaciones.
          </p>
        </div>
        <div className={`gallery-mosaic ${galleryVisible ? 'visible' : ''}`}>
          {loading && <p style={{ textAlign: 'center' }}>Cargando imagenes...</p>}
          {error && <p style={{ textAlign: 'center', color: 'red' }}>Ocurrió un error al cargar los productos.</p>}

          {!loading && !error && (
            <>
            {photos.map((p, i) => (
            <div
              key={i}
              className={`gallery-item gallery-${p.size}`}
              style={{ animationDelay: `${i * 0.08}s` }}
              onClick={() => openLightbox(i)}
            >
              <img src={`${BASE_URL_NOSOTROS}${p.image}`} alt={p.alt} loading="lazy" />
              <div className="gallery-item-overlay">
                <span className="gallery-zoom-icon">⊕</span>
              </div>
            </div>
            ))}
          </>
        )}                   
        </div>
      </section>

      {/* ── LIGHTBOX ── */}
      {lightboxIndex !== null && (
        <div className="lightbox" onClick={closeLightbox}>
          <button className="lightbox-close" onClick={closeLightbox}>✕</button>
          <button className="lightbox-nav lightbox-prev" onClick={prevPhoto}>‹</button>
          <img
            src={`${BASE_URL_NOSOTROS}${photos[lightboxIndex].image}`}
            alt={photos[lightboxIndex].alt}
            className="lightbox-img"
            onClick={(e) => e.stopPropagation()}
          />
          <button className="lightbox-nav lightbox-next" onClick={nextPhoto}>›</button>
          <p className="lightbox-caption">{photos[lightboxIndex].alt}</p>
        </div>
      )}

      {/* ── LÍNEA DE TIEMPO ── */}
      <section className="section about-timeline-section" ref={timelineRef}>
        <div className="section-header">
          <p className="section-eyebrow">NUESTRO CAMINO</p>
          <h2 className="section-title">Una Historia en <em>el Tiempo</em></h2>
        </div>
        <div className="about-timeline">
          {milestones.map((m, i) => (
            <div
              key={i}
              className={`timeline-item ${i % 2 === 0 ? 'left' : 'right'} ${timelineVisible ? 'visible' : ''}`}
              style={{ animationDelay: `${i * 0.2}s` }}
            >
              <div className="timeline-content">
                <span className="timeline-year">{m.year}</span>
                <h4 className="timeline-title">{m.title}</h4>
                <p className="timeline-text">{m.text}</p>
              </div>
              <div className="timeline-dot" />
            </div>
          ))}
          <div className="timeline-line" />
        </div>
      </section>

      {/* ── EQUIPO / COMUNIDAD ── */}
      <section className="section about-team" ref={teamRef}>
        <div className="section-header">
          <p className="section-eyebrow">NUESTRA GENTE</p>
          <h2 className="section-title">Quienes Hacen Posible <em>la Experiencia</em></h2>
        </div>
        <div className="team-grid">
          {team.map((t, i) => (
            <div
              key={i}
              className={`team-card ${teamVisible ? 'visible' : ''}`}
              style={{ animationDelay: `${i * 0.12}s` }}
            >
              <div className="team-photo">
                <img src={t.image} alt={t.name} loading="lazy" />
              </div>
              <h4 className="team-name">{t.name}</h4>
              <p className="team-role">{t.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CITA DESTACADA ── */}
      <section className="about-quote">
        <p className="about-quote-text">
          "No vendemos tours, compartimos nuestra forma de vivir el Cusco."
        </p>
        <span className="about-quote-author">— Familia Wiñay Awaq</span>
      </section>

      {/* ── CTA FINAL ── */}
      <section className="about-cta">
        <h2 className="about-cta-title">¿Listo para vivir esta experiencia?</h2>
        <p className="about-cta-sub">Escríbenos y planifiquemos juntos tu visita al Valle Sagrado.</p>
        <Link to="/contacto" className="btn-primary">Contáctanos</Link>
      </section>
    </>
  );
}