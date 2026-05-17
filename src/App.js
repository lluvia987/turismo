import React, { useState, useEffect, useRef } from 'react';
import './App.css';

/* ─── DATA ─── */
const destinations = [
  {
    id: 1,
    name: 'Machu Picchu',
    altitude: '2,430 m.s.n.m.',
    tag: 'Maravilla Mundial',
    tagColor: '#c8860a',
    description: 'La ciudad perdida de los Incas, declarada Maravilla del Mundo Moderno. Sus terrazas escalonadas y arquitectura de precisión milimétrica siguen desafiando toda explicación.',
    duration: '1–2 días',
    difficulty: 'Moderado',
    image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?w=800&q=80',
    color: '#2d4a22',
  },
  {
    id: 2,
    name: 'Valle Sagrado',
    altitude: '2,800 m.s.n.m.',
    tag: 'Naturaleza & Historia',
    tagColor: '#1a5c3a',
    description: 'El corazón agrícola del Imperio Inca. Pisac, Ollantaytambo y los mercados artesanales tejen una experiencia que combina arqueología, paisaje andino y cultura viva.',
    duration: '1 día',
    difficulty: 'Fácil',
    image: 'https://images.unsplash.com/photo-1580502304784-8985b7eb7260?w=800&q=80',
    color: '#1a3d4a',
  },
  {
    id: 3,
    name: 'Camino Inca',
    altitude: '4,215 m.s.n.m.',
    tag: 'Trekking Legendario',
    tagColor: '#7a2d00',
    description: '43 kilómetros de senderos ancestrales entre niebla, selva nublada y ruinas en cada curva. Llegar a la Puerta del Sol al amanecer es una experiencia transformadora.',
    duration: '4 días',
    difficulty: 'Difícil',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80',
    color: '#4a1a2d',
  },
  {
    id: 4,
    name: 'Sacsayhuamán',
    altitude: '3,701 m.s.n.m.',
    tag: 'Fortaleza Inca',
    tagColor: '#5a3600',
    description: 'La imponente fortaleza de piedra que domina el Cusco. Sus bloques de hasta 120 toneladas encajan con precisión perfecta, un testimonio del genio arquitectónico inca.',
    duration: 'Medio día',
    difficulty: 'Fácil',
    image: 'https://images.unsplash.com/photo-1571385552689-5cb1e9f78ac7?w=800&q=80',
    color: '#3a2800',
  },
  {
    id: 5,
    name: 'Humantay Lake',
    altitude: '4,200 m.s.n.m.',
    tag: 'Naturaleza Pura',
    tagColor: '#0a4a5c',
    description: 'Un lago glacial de aguas turquesas al pie del nevado Humantay. El trekking hasta aquí ofrece vistas panorámicas de los Andes que dejan sin palabras — y sin aliento.',
    duration: '1 día',
    difficulty: 'Moderado',
    image: 'https://images.unsplash.com/photo-1593702288056-7cc9c6766e43?w=800&q=80',
    color: '#0a2a4a',
  },
  {
    id: 6,
    name: 'Plaza de Armas',
    altitude: '3,399 m.s.n.m.',
    tag: 'Centro Histórico',
    tagColor: '#4a0a2d',
    description: 'El corazón del Cusco colonial. La catedral barroca, los portales y el ambiente andino crean una atmósfera única donde conviven siglos de historia en una sola mirada.',
    duration: '2–3 horas',
    difficulty: 'Sin esfuerzo',
    image: 'https://images.unsplash.com/photo-1580502304784-8985b7eb7260?w=800&q=80',
    color: '#2a0a3a',
  },
];

const experiences = [
  { icon: '🏔️', title: 'Trekking de Alta Montaña', desc: 'Rutas desde 1 día hasta 7 días en los Andes cusqueños' },
  { icon: '🍽️', title: 'Gastronomía Andina', desc: 'Chicha de jora, cuy, quinua y sabores milenarios' },
  { icon: '🎭', title: 'Cultura & Festividades', desc: 'Inti Raymi, Corpus Christi y ceremonias ancestrales' },
  { icon: '🦙', title: 'Fauna Andina', desc: 'Llamas, vicuñas, cóndores y ecosistemas únicos' },
  { icon: '🏺', title: 'Artesanía & Textiles', desc: 'Tejidos quechuas con técnicas de 3,000 años' },
  { icon: '⭐', title: 'Astronomía Andina', desc: 'Cielos limpios y constelaciones de la cosmovisión inca' },
];

const stats = [
  { value: '3,399', label: 'metros sobre el mar', unit: 'm' },
  { value: '+400', label: 'sitios arqueológicos', unit: '' },
  { value: '4,000', label: 'años de historia viva', unit: '' },
  { value: '1M+', label: 'visitantes al año', unit: '' },
];

/* ─── COMPONENTS ─── */

function Navbar({ scrolled }) {
  const [open, setOpen] = useState(false);
  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-brand">
        <span className="brand-icon">◈</span>
        <span className="brand-text">CUSCO ETERNO</span>
      </div>
      <ul className={`nav-links ${open ? 'open' : ''}`}>
        {['Destinos', 'Experiencias', 'Practica', 'Contacto'].map(l => (
          <li key={l}>
            <a href={`#${l.toLowerCase()}`} onClick={() => setOpen(false)}>{l}</a>
          </li>
        ))}
        <li><a href="#contacto" className="nav-cta" onClick={() => setOpen(false)}>Reservar</a></li>
      </ul>
      <button className="hamburger" onClick={() => setOpen(!open)} aria-label="Menu">
        <span /><span /><span />
      </button>
    </nav>
  );
}

function Hero() {
  return (
    <section className="hero" id="inicio">
      <div className="hero-overlay" />
      <div className="hero-particles">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="particle" style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 8}s`,
            animationDuration: `${6 + Math.random() * 6}s`,
          }} />
        ))}
      </div>
      <div className="hero-content">
        <p className="hero-eyebrow">PERÚ · REGIÓN CUSCO · 3,399 m.s.n.m.</p>
        <h1 className="hero-title">
          <span className="title-line">El Imperio</span>
          <span className="title-line accent">Eterno</span>
          <span className="title-line small">Te Espera</span>
        </h1>
        <p className="hero-subtitle">
          Donde los Andes guardan secretos de cinco mil años. Donde la piedra habla
          y el viento trae ecos del Tahuantinsuyo.
        </p>
        <div className="hero-cta-group">
          <a href="#destinos" className="btn-primary">Explorar Destinos</a>
          <a href="#experiencias" className="btn-ghost">Nuestras Experiencias</a>
        </div>
      </div>
      <div className="hero-scroll">
        <span>Descubre</span>
        <div className="scroll-line" />
      </div>
    </section>
  );
}

function StatsBar() {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div className={`stats-bar ${visible ? 'visible' : ''}`} ref={ref}>
      {stats.map((s, i) => (
        <div key={i} className="stat-item" style={{ animationDelay: `${i * 0.15}s` }}>
          <span className="stat-value">{s.value}</span>
          <span className="stat-label">{s.label}</span>
        </div>
      ))}
    </div>
  );
}

function DestinationCard({ dest, index }) {
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

function Destinations() {
  return (
    <section className="section destinations" id="destinos">
      <div className="section-header">
        <p className="section-eyebrow">NUESTROS DESTINOS</p>
        <h2 className="section-title">Joyas del <em>Tahuantinsuyo</em></h2>
        <p className="section-sub">Cada lugar es un capítulo de la historia más grande de América del Sur.</p>
      </div>
      <div className="dest-grid">
        {destinations.map((d, i) => <DestinationCard key={d.id} dest={d} index={i} />)}
      </div>
    </section>
  );
}

function Experiences() {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="section experiences" id="experiencias" ref={ref}>
      <div className="exp-layout">
        <div className="exp-left">
          <p className="section-eyebrow">VIVE EL CUSCO</p>
          <h2 className="section-title">Más que un <em>destino</em></h2>
          <p className="exp-body">
            El Cusco no se visita — se experimenta. Cada calle empedrada, cada mercado,
            cada amanecer sobre los Andes revela una capa nueva de una civilización
            que aún late con fuerza propia.
          </p>
          <p className="exp-body">
            Nuestros guías locales — herederos directos de la cultura quechua —
            te conectarán con una realidad que ningún libro puede transmitir.
          </p>
          <a href="#contacto" className="btn-primary" style={{ marginTop: '2rem' }}>Planifica tu Viaje</a>
        </div>
        <div className="exp-right">
          {experiences.map((e, i) => (
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
  );
}

function PracticalInfo() {
  const seasons = [
    { name: 'Temporada Seca', months: 'Abr – Oct', ideal: true, desc: 'La mejor época. Días soleados, noches frías, ideal para trekking y Machu Picchu.' },
    { name: 'Temporada Lluvia', months: 'Nov – Mar', ideal: false, desc: 'Verde intenso, menos turistas. Camino Inca cerrado en febrero.' },
  ];
  const tips = [
    { icon: '🌬️', tip: 'Soroche (mal de altura): llega 1–2 días antes y bebe mate de coca.' },
    { icon: '🧥', tip: 'Viste en capas. Puede hacer 20°C al mediodía y 5°C en la noche.' },
    { icon: '💧', tip: 'Bebe al menos 3 litros de agua al día.' },
    { icon: '🎫', tip: 'El Boleto Turístico cubre 16 sitios. Compra con anticipación.' },
    { icon: '📱', tip: 'Movistar tiene mejor cobertura en zonas rurales.' },
    { icon: '💵', tip: 'Lleva soles en efectivo. Las zonas arqueológicas no aceptan tarjeta.' },
  ];
  return (
    <section className="section practical" id="practica">
      <div className="section-header">
        <p className="section-eyebrow">INFORMACIÓN PRÁCTICA</p>
        <h2 className="section-title">Antes de <em>Viajar</em></h2>
      </div>
      <div className="practical-grid">
        <div className="practical-card seasons">
          <h3>¿Cuándo ir?</h3>
          {seasons.map((s, i) => (
            <div key={i} className={`season-item ${s.ideal ? 'ideal' : ''}`}>
              <div className="season-header">
                <strong>{s.name}</strong>
                <span className="season-months">{s.months}</span>
                {s.ideal && <span className="season-badge">Recomendado</span>}
              </div>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
        <div className="practical-card tips">
          <h3>Consejos Esenciales</h3>
          <div className="tips-grid">
            {tips.map((t, i) => (
              <div key={i} className="tip-item">
                <span className="tip-icon">{t.icon}</span>
                <p>{t.tip}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="practical-card transport">
          <h3>¿Cómo Llegar?</h3>
          <div className="transport-steps">
            <div className="t-step">
              <span className="t-num">01</span>
              <div>
                <strong>Lima → Cusco</strong>
                <p>Vuelo directo de 1h 20min. Aeropuerto Alejandro Velasco Astete.</p>
              </div>
            </div>
            <div className="t-step">
              <span className="t-num">02</span>
              <div>
                <strong>Cusco → Machu Picchu</strong>
                <p>Tren desde Ollantaytambo (1h 45min) o Poroy. Empresas: Inca Rail / Peru Rail.</p>
              </div>
            </div>
            <div className="t-step">
              <span className="t-num">03</span>
              <div>
                <strong>Aguas Calientes → Machu Picchu</strong>
                <p>Bus de 25 min o caminata de 1h 30min por la ruta empedrada.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', destination: '', message: '' });
  const [sent, setSent] = useState(false);
  const handle = e => setForm({ ...form, [e.target.name]: e.target.value });
  const submit = e => {
    e.preventDefault();
    setSent(true);
  };
  return (
    <section className="section contact" id="contacto">
      <div className="contact-layout">
        <div className="contact-left">
          <p className="section-eyebrow">ESCRÍBENOS</p>
          <h2 className="section-title">Inicia tu <em>Aventura</em></h2>
          <p className="contact-body">
            Nuestro equipo de expertos cusqueños diseñará un itinerario personalizado
            para ti. Sin fórmulas. Sin tours genéricos.
          </p>
          <div className="contact-info">
            <div className="info-item">📍 Calle Triunfo 392, Cusco, Perú</div>
            <div className="info-item">📞 +51 84 123 456</div>
            <div className="info-item">✉️ hola@cuscoeterno.pe</div>
            <div className="info-item">🕐 Lun–Sab: 8am – 7pm</div>
          </div>
        </div>
        <div className="contact-right">
          {sent ? (
            <div className="sent-msg">
              <span>◈</span>
              <h3>¡Mensaje Enviado!</h3>
              <p>Nos pondremos en contacto contigo en menos de 24 horas.</p>
            </div>
          ) : (
            <form onSubmit={submit} className="contact-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Nombre</label>
                  <input name="name" value={form.name} onChange={handle} placeholder="Tu nombre" required />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" name="email" value={form.email} onChange={handle} placeholder="tu@email.com" required />
                </div>
              </div>
              <div className="form-group">
                <label>Destino de Interés</label>
                <select name="destination" value={form.destination} onChange={handle} required>
                  <option value="">Selecciona un destino</option>
                  {destinations.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
                  <option value="Tour completo">Tour completo por la región</option>
                </select>
              </div>
              <div className="form-group">
                <label>Cuéntanos tu viaje</label>
                <textarea name="message" value={form.message} onChange={handle} placeholder="Fechas, número de personas, intereses especiales..." rows={4} required />
              </div>
              <button type="submit" className="btn-primary full">Enviar Consulta →</button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <span className="brand-icon">◈</span>
          <span className="brand-text">CUSCO ETERNO</span>
          <p>Tu guía de confianza en la capital arqueológica de América.</p>
        </div>
        <div className="footer-links">
          <h4>Destinos</h4>
          <ul>
            {destinations.slice(0, 4).map(d => <li key={d.id}><a href="#destinos">{d.name}</a></li>)}
          </ul>
        </div>
        <div className="footer-links">
          <h4>Información</h4>
          <ul>
            <li><a href="#practica">Cuándo Viajar</a></li>
            <li><a href="#practica">Cómo Llegar</a></li>
            <li><a href="#practica">Consejos</a></li>
            <li><a href="#contacto">Contacto</a></li>
          </ul>
        </div>
        <div className="footer-links">
          <h4>Legal</h4>
          <ul>
            <li><a href="#inicio">Política de Privacidad</a></li>
            <li><a href="#inicio">Términos y Condiciones</a></li>
            <li><a href="#inicio">MINCETUR Reg. #12345</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2024 Cusco Eterno. Todos los derechos reservados. Hecho con amor en el Cusco.</p>
        <p className="footer-quechua"><em>Allin p'unchay, allin tuta.</em> — Que tengas un buen día y buena noche.</p>
      </div>
    </footer>
  );
}

/* ─── MAIN APP ─── */
export default function App() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="app">
      <Navbar scrolled={scrolled} />
      <Hero />
      <StatsBar />
      <Destinations />
      <Experiences />
      <PracticalInfo />
      <Contact />
      <Footer />
    </div>
  );
}
