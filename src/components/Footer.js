import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaWhatsapp,
  FaInstagram,
  FaTiktok,
  FaFacebookF
} from 'react-icons/fa';
import { destinations } from '../data/content';

const WHATSAPP_NUMBER = '51930675547';

const WHATSAPP_MESSAGE =
  'Hola, estoy interesado en sus productos y servicios. ¿Me podrían enviar más información?';

const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  WHATSAPP_MESSAGE
)}`;

const INSTAGRAM_LINK = 'https://instagram.com/tu_usuario';
const TIKTOK_LINK = 'https://tiktok.com/@tu_usuario';
const FACEBOOK_LINK = 'https://facebook.com/tu_pagina';

export default function Footer() {
  return (
    <footer className="footer">

      <div className="footer-top">

        {/* Marca */}
        <div className="footer-brand">
          <span className="brand-icon">◈</span>

          <span className="brand-text">
            WIÑAY AWAQ
          </span>

          <p>
            Tu guía de confianza en la capital arqueológica de América.
          </p>

          {/* Redes Sociales */}
          <div className="footer-social">

            {/* WhatsApp */}
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon whatsapp"
              aria-label="WhatsApp"
            >
              <FaWhatsapp />
            </a>

            {/* Instagram */}
            <a
              href={INSTAGRAM_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon instagram"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>

            {/* TikTok */}
            <a
              href={TIKTOK_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon tiktok"
              aria-label="TikTok"
            >
              <FaTiktok />
            </a>

            {/* Facebook */}
            <a
              href={FACEBOOK_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon facebook"
              aria-label="Facebook"
            >
              <FaFacebookF />
            </a>

          </div>
        </div>

        {/* Destinos */}
        <div className="footer-links">
          <h4>Destinos</h4>

          <ul>
            {destinations.slice(0, 4).map((d) => (
              <li key={d.id}>
                <Link to="/destinos">
                  {d.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Información */}
        <div className="footer-links">
          <h4>Información</h4>

          <ul>
            <li>
              <Link to="/practica">
                Cuándo Viajar
              </Link>
            </li>

            <li>
              <Link to="/practica">
                Cómo Llegar
              </Link>
            </li>

            <li>
              <Link to="/practica">
                Consejos
              </Link>
            </li>

            <li>
              <Link to="/contacto">
                Contacto
              </Link>
            </li>
          </ul>
        </div>

        {/* Legal */}
        <div className="footer-links">
          <h4>Legal</h4>

          <ul>
            <li>
              <Link to="/">
                Política de Privacidad
              </Link>
            </li>

            <li>
              <Link to="/">
                Términos y Condiciones
              </Link>
            </li>

            <li>
              <Link to="/">
                MINCETUR Reg. #12345
              </Link>
            </li>
          </ul>
        </div>

      </div>

      {/* Footer inferior */}
      <div className="footer-bottom">

        <p>
          © 2024 Wiñay Awaq. Todos los derechos reservados.
          Hecho con amor en el Cusco.
        </p>

        <p className="footer-quechua">
          <em>
            Allin p'unchay, allin tuta.
          </em>
          {' '}— Que tengas un buen día y buena noche.
        </p>

      </div>

    </footer>
  );
}

