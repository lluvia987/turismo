import React from 'react';
import { Link } from 'react-router-dom';
import { destinations } from '../data/content';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <span className="brand-icon">◈</span>
          <span className="brand-text">WIÑAY AWAQ</span>
          <p>Tu guía de confianza en la capital arqueológica de América.</p>
        </div>
        <div className="footer-links">
          <h4>Destinos</h4>
          <ul>
            {destinations.slice(0, 4).map(d => (
              <li key={d.id}><Link to="/destinos">{d.name}</Link></li>
            ))}
          </ul>
        </div>
        <div className="footer-links">
          <h4>Información</h4>
          <ul>
            <li><Link to="/practica">Cuándo Viajar</Link></li>
            <li><Link to="/practica">Cómo Llegar</Link></li>
            <li><Link to="/practica">Consejos</Link></li>
            <li><Link to="/contacto">Contacto</Link></li>
          </ul>
        </div>
        <div className="footer-links">
          <h4>Legal</h4>
          <ul>
            <li><Link to="/">Política de Privacidad</Link></li>
            <li><Link to="/">Términos y Condiciones</Link></li>
            <li><Link to="/">MINCETUR Reg. #12345</Link></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2024 Wiñay Awaq. Todos los derechos reservados. Hecho con amor en el Cusco.</p>
        <p className="footer-quechua"><em>Allin p'unchay, allin tuta.</em> — Que tengas un buen día y buena noche.</p>
      </div>
    </footer>
  );
}
