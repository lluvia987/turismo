import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaWhatsapp } from 'react-icons/fa';
import { categoryServices } from '../data/content';
import { useServices } from '../hooks/useServices';
import { BASE_URL_SERVICIOS } from '../config/cloudinary';
import '../styles/Services.css';

const WHATSAPP_NUMBER = '51930675547';
const WHATSAPP_MSG = 'Hola Wiñay Awaq, quisiera más información sobre sus servicios y experiencias.';
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MSG)}`;

const trustStats = [
  { value: '20+', label: 'Experiencias Únicas' },
  { value: '100%', label: 'Guías Locales' },
  { value: '18+', label: 'Años de Trayectoria' },
  { value: '5★', label: 'Grupos Reducidos' },
];

const steps = [
  { num: '01', title: 'Elige tu Experiencia', text: 'Explora nuestras categorías y encuentra la actividad que más te llame la atención.' },
  { num: '02', title: 'Consulta por WhatsApp', text: 'Escríbenos para confirmar horarios, disponibilidad y resolver cualquier duda.' },
  { num: '03', title: 'Vive la Experiencia', text: 'Coordinamos el punto de encuentro y te acompañamos en cada paso del camino.' },
];

const testimonials = [
  {
    name: 'Andrés F.',
    text: 'La visita guiada fue espectacular, el guía conocía cada detalle histórico. Totalmente recomendado.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80',
  },
  {
    name: 'Lucía S.',
    text: 'El turismo vivencial nos permitió conocer de verdad la cultura local, una experiencia muy auténtica.',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80',
  },
  {
    name: 'Diego T.',
    text: 'La gastronomía andina superó nuestras expectativas, sabores increíbles y mucha calidez en la atención.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80',
  },
];

function useReveal(threshold = 0.1) {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

export default function Services() {
  const { destinos: servicios, loading, error } = useServices();

  const [statsRef, statsVisible] = useReveal(0.3);
  const [bentoRef, bentoVisible] = useReveal(0.15);
  const [rowsRef, rowsVisible] = useReveal(0.05);
  const [stepsRef, stepsVisible] = useReveal(0.2);
  const [testiRef, testiVisible] = useReveal(0.2);

  const activeServices = servicios.filter((s) => s.activate);
  const categories = [...new Set(activeServices.map((s) => s.category))];

  return (
    <>
      {/* ── HERO ── */}
      <section className="services-hero">
        <div className="services-hero-overlay" />
        <div className="services-hero-content">
          <p className="hero-eyebrow">VIVE EL CUSCO AUTÉNTICO</p>
          <h1 className="services-hero-title">
            Experiencias que <span className="accent">Transforman</span>
          </h1>
          <p className="services-hero-sub">
            Turismo vivencial, gastronomía andina y tradición textil, guiados por manos locales.
          </p>
          <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="btn-primary services-hero-cta">
            <FaWhatsapp size={18} /> Consultar Disponibilidad
          </a>
        </div>
      </section>

      {/* ── FRANJA DE CONFIANZA ── */}
      <section className="services-trust" ref={statsRef}>
        <div className={`trust-grid ${statsVisible ? 'visible' : ''}`}>
          {trustStats.map((s, i) => (
            <div key={i} className="trust-item" style={{ animationDelay: `${i * 0.1}s` }}>
              <span className="trust-value">{s.value}</span>
              <span className="trust-label">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── BENTO GRID DE CATEGORÍAS ── */}
      <section className="section categories-bento" ref={bentoRef}>
        <div className="section-header">
          <p className="section-eyebrow">EXPLORA POR CATEGORÍA</p>
          <h2 className="section-title">Cuatro Formas de <em>Conectar con Cusco</em></h2>
        </div>
        <div className={`bento-grid ${bentoVisible ? 'visible' : ''}`}>
          {categoryServices.map((c, i) => (
            <Link
              to={`/servicios/categoria/${encodeURIComponent(c.title)}`}
              key={i}
              className={`bento-card bento-card-${i}`}
              style={{ animationDelay: `${i * 0.12}s` }}
            >
              <img src={c.image} alt={c.title} loading="lazy" />
              <div className="bento-overlay" />
              <div className="bento-content">
                <span className="bento-icon">{c.icon}</span>
                <h3 className="bento-title">{c.title}</h3>
                <p className="bento-desc">{c.desc}</p>
                <span className="bento-link">Explorar →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── FILAS DE SERVICIOS POR CATEGORÍA ── */}
      <section className="section service-rows" ref={rowsRef}>
        {loading && <p style={{ textAlign: 'center' }}>Cargando servicios...</p>}
        {error && <p style={{ textAlign: 'center', color: 'red' }}>Ocurrió un error al cargar los servicios.</p>}

        {!loading && !error && categories.map((cat) => {
          const items = activeServices.filter((s) => s.category === cat).slice(0, 6);
          return (
            <div key={cat} className="service-row-block">
              <div className="service-row-header">
                <h3 className="service-row-title">{cat}</h3>
                <Link to={`/servicios/categoria/${encodeURIComponent(cat)}`} className="service-row-viewall">
                  Ver Todos →
                </Link>
              </div>
              <div className={`service-tile-grid ${rowsVisible ? 'visible' : ''}`}>
                {items.map((s) => (
                  <Link to={`/servicios/detalle/${s.id}`} key={s.id} className="service-tile">
                    <div className="service-tile-img-wrap">
                      <img src={`${BASE_URL_SERVICIOS}${s.image}`} alt={s.name} loading="lazy" />
                      <div className="service-tile-hover">
                        <span>{s.duration}</span>
                        <span>{s.difficulty}</span>
                      </div>
                      <div className="service-tile-arrow">→</div>
                    </div>
                    <div className="service-tile-caption">
                      <h4 className="service-tile-name">{s.name}</h4>
                      <p className="service-tile-desc">{s.shortDescription}</p>
                      <span className="service-tile-price">S/ {s.price}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </section>

      {/* ── CÓMO RESERVAR ── */}
      <section className="section how-to-book" ref={stepsRef}>
        <div className="section-header">
          <p className="section-eyebrow">PROCESO SIMPLE</p>
          <h2 className="section-title">¿Cómo <em>Reservar</em>?</h2>
        </div>
        <div className="steps-grid">
          {steps.map((s, i) => (
            <div key={i} className={`step-card ${stepsVisible ? 'visible' : ''}`} style={{ animationDelay: `${i * 0.15}s` }}>
              <span className="step-num">{s.num}</span>
              <h3 className="step-title">{s.title}</h3>
              <p className="step-text">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── TESTIMONIOS ── */}
      <section className="section services-testimonials" ref={testiRef}>
        <div className="section-header">
          <p className="section-eyebrow">LO QUE DICEN</p>
          <h2 className="section-title">Historias de Nuestros <em>Viajeros</em></h2>
        </div>
        <div className={`testimonials-grid ${testiVisible ? 'visible' : ''}`}>
          {testimonials.map((t, i) => (
            <div key={i} className="testimonial-card" style={{ animationDelay: `${i * 0.15}s` }}>
              <span className="testimonial-quote-mark">"</span>
              <p className="testimonial-text">{t.text}</p>
              <div className="testimonial-author">
                <img src={t.image} alt={t.name} />
                <span>{t.name}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section className="services-cta-banner">
        <div className="services-cta-overlay" />
        <div className="services-cta-content">
          <p className="hero-eyebrow">¿LISTO PARA VIVIRLO?</p>
          <h2 className="services-cta-title">
            Tu Aventura en Cusco <span className="accent">Empieza Aquí</span>
          </h2>
          <div className="services-cta-actions">
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="btn-primary">
              <FaWhatsapp size={18} /> Escríbenos por WhatsApp
            </a>
            <Link to="/contacto" className="btn-ghost">Ir a Contacto</Link>
          </div>
        </div>
      </section>
    </>
  );
}