import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { categoryServices } from '../data/content';
import { useServices } from '../hooks/useServices';
import { BASE_URL_SERVICIOS } from '../config/cloudinary';
import ServiceCards from '../components/ServiceCards';

export default function Services() {
  const [visible, setVisible] = useState(false);
  const [rowsVisible, setRowsVisible] = useState(false);
  const ref = useRef(null);
  const rowsRef = useRef(null);

  const { destinos: servicios, loading, error } = useServices();

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setRowsVisible(true); }, { threshold: 0.05 });
    if (rowsRef.current) obs.observe(rowsRef.current);
    return () => obs.disconnect();
  }, [servicios]); // vuelve a observar cuando ya cargaron los datos

  const activeServices = servicios.filter((s) => s.activate);
  const categories = [...new Set(activeServices.map((s) => s.category))];

  return (
    <>
    <section className='title-section'>
      <div className="section-header">
          <p className="section-eyebrow">NUESTROS SERVICIOS</p>
          <h2 className="section-title">Experimenta la <em> cultura Andina</em></h2>
          <p className="section-sub">
            Servicios ofrecidos con la finalidad de conectar al viajero con la cultura y escencia del mundo andino
          </p>
      </div>
    </section>
        

      <ServiceCards />
    

      {/* ── FILAS POR CATEGORÍA ── */}
      <section className="section service-rows" ref={rowsRef}>
        {loading && <p style={{ textAlign: 'center' }}>Cargando servicios...</p>}
        {error && <p style={{ textAlign: 'center', color: 'red' }}>Ocurrió un error al cargar los servicios.</p>}

        {!loading && !error && categories.map((cat) => {
          const items = activeServices.filter((s) => s.category === cat).slice(0, 6);
          return (
            <div key={cat} className="service-row-block">
              <div className="service-row-header">
                <h3 className="service-row-title">{cat}</h3>
                <Link
                  to={`/servicios/categoria/${encodeURIComponent(cat)}`}
                  className="service-row-viewall"
                >
                  Ver Más →
                </Link>
              </div>
              <div className={`service-row-track ${rowsVisible ? 'visible' : ''}`}>
                {items.map((s) => (
                  <div key={s.id} className="service-row-card">
                    <img
                      src={`${BASE_URL_SERVICIOS}${s.image}`}
                      alt={s.name}
                      className="service-row-img"
                      loading="lazy"
                    />
                    <div className="service-row-body">
                      <h4 className="service-row-name">{s.name}</h4>
                      <p className="service-row-desc">{s.shortDescription}</p>
                      <Link to={`/servicios/detalle/${s.id}`} className="service-row-btn">
                        Saber Más →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </section>
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
            {categoryServices.map((e, i) => (
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
    </>
  );
}