import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaWhatsapp } from 'react-icons/fa';
import { products } from '../data/content';
import { BASE_URL_PRODUCTOS } from '../config/cloudinary';

const WHATSAPP_NUMBER = '51930675547';

export default function ProductDetail() {
  const { id } = useParams();

  const product = products.find(
    (p) => String(p.id) === id
  );

  if (!product) {
    return (
      <section
        className="section"
        style={{ textAlign: 'center' }}
      >
        <h2 className="section-title">
          Producto no encontrado
        </h2>

        <Link
          to="/productos"
          className="btn-primary"
          style={{
            marginTop: '1.5rem',
            display: 'inline-block'
          }}
        >
          Volver a Productos
        </Link>
      </section>
    );
  }

  const similares = products
    .filter(
      (p) =>
        p.category === product.category &&
        p.id !== product.id
    )
    .slice(0, 6);

  const otrosProductos = products
    .filter((p) => p.id !== product.id)
    .slice(0, 18);

  const whatsappMsg = `Hola Wiñay Awaq, quisiera consultar acerca del producto "${product.name}". ¿Me podrían decir si sigue disponible y darme más información?`;

  const whatsappLink =
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      whatsappMsg
    )}`;

  return (
    <>
      {/* SECCIÓN 1: SIMILARES */}
      {similares.length > 0 && (
        <section className="section similar-section">
          <div
            className="section-header"
            style={{
              marginBottom: '1.5rem',
              textAlign: 'left'
            }}
          >
            <p className="section-eyebrow">
              Quizás te interese
            </p>

            <h3
              className="section-title"
              style={{
                fontSize: 'clamp(1.5rem, 3vw, 2.2rem)'
              }}
            >
              Artículos Similares
            </h3>
          </div>
          <div className='similar-more'>
            <Link
              to={`/productos?categoria=${encodeURIComponent(
                product.category
              )}`}
              className="similar-more-link"
            >
              Ver Más →
            </Link>
          </div>
            


          <div className="similar-track">
            {similares.map((s) => (
              <Link
                to={`/productos/${s.id}`}
                key={s.id}
                className="similar-item"
              >
                <img
                  src={`${BASE_URL_PRODUCTOS}${s.image}`}
                  alt={s.name}
                  loading="lazy"
                />

                <span className="similar-name">
                  {s.name}
                </span>

                <span className="similar-price">
                  {s.price}
                </span>
              </Link>
            ))}

            
          </div>
        </section>
      )}

      {/* SECCIÓN 2: PRODUCTO PRINCIPAL */}
      <section className="section product-main">
        <div className="product-main-layout">

          <div className="product-main-image">
            <img
              src={`${BASE_URL_PRODUCTOS}${product.image}`}
              alt={product.name}
            />
          </div>

          <div className="product-main-info">

            <span
              className="product-main-tag"
              style={{ background: product.tagColor }}
            >
              {product.tag}
            </span>

            <h1 className="product-main-title">
              {product.name}
            </h1>

            <p className="product-main-price">
              {product.price}
            </p>

            <p className="product-main-desc">
              {product.description}
            </p>

            <div className="product-main-meta">

              <div>
                <strong>Material</strong>
                <span>{product.material}</span>
              </div>

              <div>
                <strong>Fabricación</strong>
                <span>{product.fabrication}</span>
              </div>

              <div>
                <strong>Categoría</strong>
                <span>{product.category}</span>
              </div>

            </div>

            {/* WhatsApp */}
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary product-whatsapp-btn"
            >
              <FaWhatsapp size={20} />
              Consultar Disponibilidad
            </a>

          </div>
        </div>
      </section>

      {/* SECCIÓN 3: TAMBIÉN TE PODRÍA INTERESAR */}
      <section className="section also-interest">

        <div
          className="section-header"
          style={{ marginBottom: '2.5rem' }}
        >
          <p className="section-eyebrow">
            Explora Más
          </p>

          <h2 className="section-title">
            También Te Podría <em>Interesar</em>
          </h2>
        </div>

        <div className="also-grid">
          {otrosProductos.map((p) => (
            <Link
              to={`/productos/${p.id}`}
              key={p.id}
              className="also-item"
            >
              <img
                src={`${BASE_URL_PRODUCTOS}${p.image}`}
                alt={p.name}
                loading="lazy"
              />

              <span className="also-name">
                {p.name}
              </span>

              <span className="also-price">
                {p.price}
              </span>
            </Link>
          ))}
        </div>

        <div
          style={{
            textAlign: 'center',
            marginTop: '2.5rem'
          }}
        >
          <Link
            to="/productos"
            className="btn-ghost"
            style={{
              background: 'transparent',
              border: '2px solid var(--gold)',
              color: 'var(--gold)'
            }}
          >
            Ver Más →
          </Link>
        </div>

      </section>
    </>
  );
}