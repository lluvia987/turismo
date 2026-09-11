import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { servicios } from '../data/content';

export default function Services() {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="section experiences" id="experiencias" ref={ref}>
      <div className="exp-layout">
        <div className="exp-left">
          <p className="section-eyebrow">VIVE EL CUSCO</p>
          <h2 className="section-title">Centro Artesanal<em> y Cultural</em></h2>
          <p className="exp-body">
            Somos una asociación dedicada a brindar experiencias auténticas a quienes visitan el Valle Sagrado. Buscamos compartir nuestra cultura, tradiciones y artesanía, creando momentos únicos que permitan a nuestros visitantes conocer y conectar con la esencia de nuestra tierra.
          </p>
          <p className="exp-body">
            Ofrecemos una atención cercana y de primera calidad, acompañada de diferentes servicios y experiencias pensadas para que cada visita sea especial y nuestros visitantes se lleven un recuerdo inolvidable del Valle Sagrado.
          </p>
          <Link to="/contacto" className="btn-primary" style={{ marginTop: '2rem' }}>Planifica tu Visita</Link>
        </div>
        <div className="exp-right exp-grid">
          {servicios.map((e, i) => (
            <div
              key={i}
              className={`exp-item ${visible ? 'visible' : ''}`}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <span className="exp-icon">{e.icon}</span>
              <div>
                <h4 className="exp-title">{e.title}</h4>
                <p className="exp-desc">{e.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
