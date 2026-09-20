import React, { useState, useEffect, useRef } from 'react';
import { useProducts } from '../hooks/useProducts';
import { BASE_URL_PRODUCTOS } from '../config/cloudinary';
import { Link } from 'react-router-dom';

export default function Products() {
  const { products, loading, error } = useProducts(); // ✅ llamas al hook aquí

  const [productsVisible, setProductsVisible] = useState(false);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const productsRef = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setProductsVisible(true); }, { threshold: 0.1 });
    if (productsRef.current) obs.observe(productsRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="section practical" id="practica">

      {/* ── PRODUCTOS ── */}
      <div ref={productsRef} style={{ marginBottom: '5rem' }}>
        <div className="section-header" style={{ marginBottom: '3rem' }}>
          <p className="section-eyebrow">NUESTRA TIENDA</p>
          <h2 className="section-title">Lleva un Pedazo de <em>Nuestra Artesanía</em></h2>
          <p className="section-sub">
            Artesanía auténtica hecha a mano por nuestra comunidad. Cada pieza apoya
            directamente el trabajo de los artesanos locales.
          </p>
        </div>

        {loading && <p>Cargando productos...</p>}
        {error && <p>Hubo un error cargando los productos.</p>}

        {!loading && !error && (
          <div className="dest-grid">
            {products.map((p, i) => (   // ✅ ahora products, no useProducts
              <article
                key={p.id}
                className={`dest-card ${productsVisible ? 'visible' : ''}`}
                style={{ animationDelay: `${(i % 3) * 0.12}s` }}
                onMouseEnter={() => setHoveredProduct(p.id)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                <div className="card-image-wrap">
                  <img
                    src={`${BASE_URL_PRODUCTOS}${p.image}`}
                    alt={p.name}
                    className={`card-img ${hoveredProduct === p.id ? 'zoomed' : ''}`}
                    loading="lazy"
                  />
                  <div className="card-gradient" />
                  <span className="card-tag" style={{ background: p.tagColor }}>{p.tag}</span>
                  <span className="card-altitude">{p.price}</span>
                </div>
                <div className="card-body">
                  <h3 className="card-title">{p.name}</h3>
                  <p className="card-desc">{p.description}</p>
                  <div className="card-meta">
                    <span className="meta-item">
                      <span className="meta-icon">◈</span> {p.material}
                    </span>
                  </div>
                  <Link to={`/productos/${p.id}`} className="card-btn">Ver Detalles →</Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      <div className="section-header">
        <p className="section-eyebrow">Opciones Económicas</p>
        <h2 className="section-title">Productos en <em>Oferta</em></h2>
      </div>

    </section>
  );
}