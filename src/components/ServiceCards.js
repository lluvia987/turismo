import React from 'react';
import { Link } from 'react-router-dom';
import { servicios } from '../data/content';

export default function ServiceCards() {
  const needsLoop = servicios.length > 4;
  // Si hay más de 4, duplicamos la lista para crear el efecto de loop infinito sin cortes
  const trackItems = needsLoop ? [...servicios, ...servicios] : servicios;

  return (
    <section className="services-section">
      <div className="section-head">
        <p className="section-tag">Servicios</p>
        <h2>Lo que ofrecemos para ti</h2>
      </div>

      <div className={`services-track-wrap ${needsLoop ? 'is-looping' : ''}`}>
        <div className={`services-track ${needsLoop ? 'animate-scroll' : ''}`}>
          {trackItems.map((s, i) => (
            <div className="service-card" key={i}>
              <img src={s.image} alt={s.title} className="service-card-img" />
              <div className="service-card-gradient" />
              <div className="service-card-content">
                <div className="service-stars" aria-label="Recomendado">
                  {'★★★★★'.split('').map((star, idx) => (
                    <span key={idx}>{star}</span>
                  ))}
                </div>
                <h3 className="service-card-title">{s.title}</h3>
                <p className="service-card-desc">{s.desc}</p>
                <Link to="/servicios" className="service-card-btn">
                  Ver Más
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}