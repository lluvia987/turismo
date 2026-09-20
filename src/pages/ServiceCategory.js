import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useServices } from '../hooks/useServices';
import { BASE_URL_SERVICIOS } from '../config/cloudinary';

export default function ServiceCategory() {
  const { categoria } = useParams();
  const { destinos: servicios, loading, error } = useServices();

  if (loading) return <section className="section"><p style={{ textAlign: 'center' }}>Cargando...</p></section>;
  if (error) return <section className="section"><p style={{ textAlign: 'center', color: 'red' }}>Ocurrió un error al cargar los servicios.</p></section>;

  const items = servicios.filter(
    (s) => s.activate && s.category === decodeURIComponent(categoria)
  );

  return (
    <section className="section">
      <div className="section-header">
        <p className="section-eyebrow">Servicios</p>
        <h2 className="section-title">{decodeURIComponent(categoria)}</h2>
      </div>

      <div className="service-row-track" style={{ gridTemplateColumns: 'repeat(4, 1fr)', opacity: 1, transform: 'none' }}>
        {items.map((s) => (
          <div key={s.id} className="service-row-card">
            <img src={`${BASE_URL_SERVICIOS}${s.image}`} alt={s.name} className="service-row-img" loading="lazy" />
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

      {items.length === 0 && (
        <p style={{ textAlign: 'center', color: 'var(--text-light)' }}>
          No hay servicios disponibles en esta categoría por ahora.
        </p>
      )}
    </section>
  );
}