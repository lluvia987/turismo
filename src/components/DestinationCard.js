import React, { useState, useEffect, useRef } from 'react';

export default function DestinationCard({ dest, index }) {
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const diffColor = {
    'Fácil': '#1a5c3a',
    'Moderado': '#7a4a00',
    'Difícil': '#7a1a1a',
    'Sin esfuerzo': '#1a3a5c',
  }[dest.difficulty] || '#333';

  return (
    <article
      ref={ref}
      className={`dest-card ${visible ? 'visible' : ''}`}
      style={{ animationDelay: `${(index % 3) * 0.12}s` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="card-image-wrap">
        <img src={dest.image} alt={dest.name} className={`card-img ${hovered ? 'zoomed' : ''}`} loading="lazy" />
        <div className="card-gradient" />
        <span className="card-tag" style={{ background: dest.tagColor }}>{dest.tag}</span>
        <span className="card-altitude">▲ {dest.altitude}</span>
      </div>
      <div className="card-body">
        <h3 className="card-title">{dest.name}</h3>
        <p className="card-desc">{dest.description}</p>
        <div className="card-meta">
          <span className="meta-item">
            <span className="meta-icon">⏱</span> {dest.duration}
          </span>
          <span className="meta-item" style={{ color: diffColor }}>
            <span className="meta-icon">◎</span> {dest.difficulty}
          </span>
        </div>
        <button className="card-btn">Ver más →</button>
      </div>
    </article>
  );
}
