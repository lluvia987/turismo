import React, { useState, useEffect, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import { BASE_URL_PRODUCTOS } from '../config/cloudinary';
import "../styles/Products.css";

const PAGE_SIZE = 9;

const steps = [
  { num: '01', title: 'Elige tu Producto', text: 'Explora nuestro catálogo y encuentra la pieza artesanal que más te enamore.' },
  { num: '02', title: 'Consulta por WhatsApp', text: 'Escríbenos para confirmar disponibilidad, tallas, colores y resolver tus dudas.' },
  { num: '03', title: 'Coordinamos Contigo', text: 'Acordamos juntos la entrega y el pago, de forma directa y personalizada.' },
];

const testimonials = [
  {
    name: 'Valeria M.',
    text: 'El poncho que compré es hermoso, se nota el trabajo a mano. La atención por WhatsApp fue súper rápida y clara.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
  },
  {
    name: 'Jorge P.',
    text: 'Excelente calidad y un proceso de compra muy personal, se sintió mucho más cercano que una tienda online normal.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
  },
  {
    name: 'Camila R.',
    text: 'Me encantó poder consultar directamente antes de decidir. Llegó justo como en las fotos, hermoso trabajo artesanal.',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80',
  },
];

export default function Products() {
  const { products, loading, error } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState(searchParams.get('categoria') || '');
  const [material, setMaterial] = useState('');
  const [page, setPage] = useState(1);

  const activeProducts = useMemo(
    () => products.filter((p) => p.activate),
    [products]
  );

  const categories = useMemo(
    () => [...new Set(activeProducts.map((p) => p.category))].filter(Boolean),
    [activeProducts]
  );
  const materials = useMemo(
    () => [...new Set(activeProducts.map((p) => p.material))].filter(Boolean),
    [activeProducts]
  );

  const filtered = useMemo(() => {
    return activeProducts.filter((p) => {
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
      const matchCategory = category ? p.category === category : true;
      const matchMaterial = material ? p.material === material : true;
      return matchSearch && matchCategory && matchMaterial;
    });
  }, [activeProducts, search, category, material]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  // Si cambian los filtros, vuelve a la página 1
  useEffect(() => {
    setPage(1);
  }, [search, category, material]);

  // Sincroniza el filtro de categoría con la URL (para los links "Ver Más" de otras páginas)
  useEffect(() => {
    const params = {};
    if (category) params.categoria = category;
    setSearchParams(params, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  const resetFilters = () => {
    setSearch('');
    setCategory('');
    setMaterial('');
  };

  return (
    <>
      {/* ── HERO ── */}
      <section className="products-hero">
        <div className="products-hero-overlay" />
        <div className="products-hero-content">
          <p className="hero-eyebrow">NUESTRA TIENDA</p>
          <h1 className="products-hero-title">
            Artesanía con <span className="accent">Alma Andina</span>
          </h1>
          <p className="products-hero-sub">
            Piezas únicas, tejidas a mano por artesanos de Chinchero, Cusco.
          </p>
        </div>
      </section>

      {/* ── FILTROS ── */}
      <section className="products-filters-bar">
        <div className="filters-inner">
          <div className="filter-search">
            <span className="filter-search-icon">⌕</span>
            <input
              type="text"
              placeholder="Buscar producto..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">Todas las categorías</option>
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          <select value={material} onChange={(e) => setMaterial(e.target.value)}>
            <option value="">Todos los materiales</option>
            {materials.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>

          {(search || category || material) && (
            <button className="filter-reset" onClick={resetFilters}>
              Limpiar ✕
            </button>
          )}
        </div>
        <p className="filters-count">
          {filtered.length} {filtered.length === 1 ? 'producto encontrado' : 'productos encontrados'}
        </p>
      </section>

      {/* ── GRID DE PRODUCTOS ── */}
      <section className="section products-grid-section">
        {loading && <p style={{ textAlign: 'center' }}>Cargando productos...</p>}
        {error && <p style={{ textAlign: 'center', color: 'red' }}>Ocurrió un error al cargar los productos.</p>}

        {!loading && !error && (
          <>
            {paginated.length === 0 ? (
              <p style={{ textAlign: 'center', color: 'var(--text-light)' }}>
                No se encontraron productos con esos filtros.
              </p>
            ) : (
              <div className="product-tile-grid">
                {paginated.map((p) => (
                  <Link to={`/productos/${p.id}`} key={p.id} className="product-tile">
                    <div className="product-tile-img-wrap">
                      <img
                        src={`${BASE_URL_PRODUCTOS}${p.image}`}
                        alt={p.name}
                        loading="lazy"
                      />
                      <span className="product-tile-tag" style={{ background: p.tagColor }}>
                        {p.tag}
                      </span>
                      <div className="product-tile-hover">
                        <span>{p.material}</span>
                        <span>{p.fabrication}</span>
                      </div>
                      <div className="product-tile-arrow">→</div>
                    </div>
                    <div className="product-tile-caption">
                      <p className="product-tile-category">{p.category}</p>
                      <div className="product-tile-row">
                        <h3 className="product-tile-name">{p.name}</h3>
                        <span className="product-tile-price">{p.price}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {/* ── PAGINACIÓN ── */}
            {totalPages > 1 && (
              <div className="pagination">
                <button
                  className="pagination-arrow"
                  disabled={page === 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                >
                  ← Anterior
                </button>

                <div className="pagination-numbers">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                    <button
                      key={n}
                      className={`pagination-number ${page === n ? 'active' : ''}`}
                      onClick={() => setPage(n)}
                    >
                      {n}
                    </button>
                  ))}
                </div>

                <button
                  className="pagination-arrow"
                  disabled={page === totalPages}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                >
                  Siguiente →
                </button>
              </div>
            )}
          </>
        )}
      </section>
      {/* ── CÓMO FUNCIONA ── */}
      <section className="section how-it-works">
        <div className="section-header">
          <p className="section-eyebrow">PROCESO SIMPLE</p>
          <h2 className="section-title">¿Cómo <em>Funciona</em>?</h2>
          <p className="section-sub" style={{ margin: '0 auto' }}>
            No vendemos por catálogo online — cada compra es una conversación personal contigo.
          </p>
        </div>
        <div className="steps-grid">
          {steps.map((s, i) => (
            <div key={i} className="step-card">
              <span className="step-num">{s.num}</span>
              <h3 className="step-title">{s.title}</h3>
              <p className="step-text">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── TESTIMONIOS ── */}
      <section className="section testimonials-section">
        <div className="section-header">
          <p className="section-eyebrow">LO QUE DICEN</p>
          <h2 className="section-title">Historias de Nuestros <em>Clientes</em></h2>
        </div>
        <div className="testimonials-grid">
          {testimonials.map((t, i) => (
            <div key={i} className="testimonial-card">
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

      {/* ── BANNER A SERVICIOS ── */}
      <section className="products-cta-banner">
        <div className="products-cta-overlay" />
        <div className="products-cta-content">
          <p className="hero-eyebrow">VIVE LA EXPERIENCIA COMPLETA</p>
          <h2 className="products-cta-title">
            Conoce también <span className="accent">Nuestras Experiencias</span>
          </h2>
          <p className="products-cta-sub">
            Tours culturales, gastronomía andina y demostraciones textiles en vivo.
          </p>
          <Link to="/servicios" className="btn-primary">Explorar Servicios</Link>
        </div>
      </section>
    </>
  );
}