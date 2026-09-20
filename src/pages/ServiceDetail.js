import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaWhatsapp } from 'react-icons/fa';
import { useServices } from '../hooks/useServices';
import { BASE_URL_SERVICIOS } from '../config/cloudinary';

const WHATSAPP_NUMBER = '51930675547';

export default function ServiceDetail() {
  const { id } = useParams();
  const { destinos: servicios, loading, error } = useServices();

  if (loading) return <section className="section"><p style={{ textAlign: 'center' }}>Cargando...</p></section>;
  if (error) return <section className="section"><p style={{ textAlign: 'center', color: 'red' }}>Ocurrió un error al cargar el servicio.</p></section>;

  const service = servicios.find((s) => String(s.id) === id);

  if (!service) {
    return (
      <section className="section" style={{ textAlign: 'center' }}>
        <h2 className="section-title">Servicio no encontrado</h2>
        <Link to="/servicios" className="btn-primary" style={{ marginTop: '1.5rem', display: 'inline-block' }}>
          Volver a Servicios
        </Link>
      </section>
    );
  }

  // Los campos vienen de Supabase como texto separado por "%"
  const includes = (service.includes || '').split('%').filter(Boolean);
  const notIncludes = (service.notIncludes || '').split('%').filter(Boolean);
  const highlights = (service.highlights || '').split('%').filter(Boolean);

  const whatsappMsg = `Hola Wiñay Awaq, quisiera consultar sobre el servicio "${service.name}". ¿Me podrían dar más información?`;
  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMsg)}`;

  return (
    <section className="section product-main">
      <div className="product-main-layout">
        <div className="product-main-image">
          <img src={`${BASE_URL_SERVICIOS}${service.image}`} alt={service.name} />
        </div>
        <div className="product-main-info">
          <span className="product-main-tag" style={{ background: 'var(--gold)' }}>
            {service.category}
          </span>
          <h1 className="product-main-title">{service.name}</h1>
          <p className="product-main-price">S/ {service.price}</p>
          <p className="product-main-desc">{service.description}</p>

          <div className="product-main-meta">
            <div>
              <strong>Duración</strong>
              <span>{service.duration}</span>
            </div>
            <div>
              <strong>Dificultad</strong>
              <span>{service.difficulty}</span>
            </div>
            <div>
              <strong>Ubicación</strong>
              <span>{service.location}</span>
            </div>
          </div>

          <div className="service-includes">
            <div>
              <h4>Incluye</h4>
              <ul>
                {includes.map((item, i) => <li key={i}>✓ {item}</li>)}
              </ul>
            </div>
            <div>
              <h4>No Incluye</h4>
              <ul>
                {notIncludes.map((item, i) => <li key={i}>✕ {item}</li>)}
              </ul>
            </div>
          </div>

          <div className="service-highlights">
            <h4>Lo Más Destacado</h4>
            <ul>
              {highlights.map((item, i) => <li key={i}>★ {item}</li>)}
            </ul>
          </div>

          <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="btn-primary product-whatsapp-btn">
            <FaWhatsapp size={20} /> Consultar Disponibilidad
          </a>
        </div>
      </div>
    </section>
  );
}