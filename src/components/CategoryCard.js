import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { products } from '../data/content';
import { BASE_URL_PRODUCTOS } from '../config/cloudinary';

const CARDS_PER_VIEW = 4;
const ROTATE_INTERVAL = 5000; // 5 segundos, ajusta a tu gusto

function getVisibleProducts(startIndex) {
  const total = products.length;
  const visible = [];
  for (let i = 0; i < CARDS_PER_VIEW; i++) {
    visible.push(products[(startIndex + i) % total]);
  }
  return visible;
}

export default function CategoryCards() {
  const [startIndex, setStartIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    if (products.length <= CARDS_PER_VIEW) return; // no rota si hay 4 o menos

    const interval = setInterval(() => {
      setFade(false); // inicia fade-out
      setTimeout(() => {
        setStartIndex(prev => (prev + CARDS_PER_VIEW) % products.length);
        setFade(true); // fade-in con las nuevas tarjetas
      }, 400); // debe coincidir con la duración de la transición CSS
    }, ROTATE_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  const visibleProducts = getVisibleProducts(startIndex);

  return (
    <div className={`category-grid ${fade ? 'fade-in' : 'fade-out'}`}>
      {visibleProducts.map((p) => (
        <div key={p.id} className="product-card">
          <div className="product-image-wrap">
            <img src={`${BASE_URL_PRODUCTOS}${p.image}`} alt={p.name} className="product-img" />
            <div className="product-gradient" />
          </div>
          <div className="product-body">
            <h3 className="product-title">{p.name}</h3>
            <div className="product-meta">
              <span><strong>Material:</strong> {p.material}</span>
              <span><strong>Fabricación:</strong> {p.fabrication}</span>
            </div>
            <div className="product-footer">
              <span className="product-price">{p.price}</span>
              <Link
                to={`/productos?categoria=${encodeURIComponent(p.category)}`}
                className="product-similar-btn"
              >
                Ver Similares
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}