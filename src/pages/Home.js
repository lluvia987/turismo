import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import CategoryCards from '../components/CategoryCard';
import { materials } from '../data/content';

const stats = [
  { value: '18+', label: 'Años de Experiencia' },
  { value: '500+', label: 'Viajeros Felices' },
  { value: '+20', label: 'Destinos Únicos' },
  { value: '100%', label: 'Experiencias Auténticas' },
];

export default function Home() {
  const [statsVisible, setStatsVisible] = useState(false);
  const [aboutVisible, setAboutVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const statsRef = useRef(null);
  const aboutRef = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStatsVisible(true); }, { threshold: 0.2 });
    if (statsRef.current) obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setAboutVisible(true); }, { threshold: 0.2 });
    if (aboutRef.current) obs.observe(aboutRef.current);
    return () => obs.disconnect();
  }, []);


  return (
    <>
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
            <span className="title-line">Wiñay</span>
            <span className="title-line accent">Awaq</span>
            <span className="title-line small">Te Espera</span>
          </h1>
          <p className="hero-subtitle">
            Donde los Andes guardan secretos de cinco mil años. Donde la piedra habla
            y el viento trae ecos del Tahuantinsuyo.
          </p>
          <div className="hero-cta-group">
            <Link to="/productos" className="btn-primary">Articulos</Link>
            <Link to="/experiencias" className="btn-ghost">Nuestros Servicios</Link>
          </div>
        </div>
        <div className="hero-scroll">
          <span>Descubre</span>
          <div className="scroll-line" />
        </div>
      </section>

      <section className={`stats-bar ${statsVisible ? 'visible' : ''}`} ref={statsRef}>
        <div className='stats-bar-grid'>
          {stats.map((s, i) => (
          <div key={i} className="stat-item" style={{ animationDelay: `${i * 0.12}s` }}>
            <span className="stat-value">{s.value}</span>
            <span className="stat-label">{s.label}</span>
          </div>
        ))}
        </div>
        
      </section>

      <section className='container home-section'>
        <div className={`section-head ${statsVisible ? 'visible' : ''}`}>
          <p className='section-tag'>
            
            Colecciones
          </p>  
          <h2>
            Encuentra una prenda ideal para ti
          </h2>
          <p>
            Ofrecemos una variedad de productos elaborados con distintos materiales, estilos y acabados, pensados para adaptarse a cada persona, su estilo de vida y cada ocasión.

          </p>
        </div>
        <CategoryCards />
        <div className="category-cta">
          <Link to="/productos" className="btn-primary">Ver Todos</Link>
        </div>

      </section>

      <section className={`container storytelling-section ${aboutVisible ? 'visible' : ''}`} ref={aboutRef}>
        <div className={`section-head ${statsVisible ? 'visible' : ''}`}>
          <p className='section-tag'>
            Conocenos
          </p>  
          <h2>
            Conoce un poco de nuestra historia
          </h2>
          <p>
            Centro Cultural y  artesanal Wiñay Awaq desde el 2008 tejiendo historia.

          </p>
        </div>
        <div className='storytelling-inner'>
          <div
            className={`storytelling-wrap`}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <img
              src="/portadareferencia.png"
              alt="Wiñay Awaq en Cusco"
              className={`storytelling-image ${hovered ? 'zoomed' : ''}`}
              loading="lazy"
            />
            <div className='card-gradient'></div>
          </div>
          <div className="about-content">
            <p className="about-eyebrow">NUESTRA HISTORIA</p>
            <h2 className="about-title">
              Centro <span className="accent">Textil </span> Wiñay<span className="accent"> Awaq </span>
            </h2>
            <p className="about-text"> Desde hace más de 18 años, servimos a viajeros de todo el mundo, brindándoles la oportunidad de conocer y vivir en primera persona la cultura ancestral del Valle Sagrado. Cada uno de nuestros servicios nace del respeto por la cultura andina, sus tradiciones y del deseo de compartir con nuestros visitantes el legado ancestral que hace de esta tierra un lugar único. </p> 
            <p className="about-text"> Somos una organización apasionada por compartir un pedacito de nuestras raíces, comprometida siempre con un turismo responsable con la naturaleza y con las personas que hacen posible que cada experiencia sea auténtica y especial. </p>
            <Link to="/nosotros" className="btn-ghost">Conócenos Más</Link>
          </div>
          
        </div>
        
      </section>
      <section className='container materials'>
        <div className={`section-head ${statsVisible ? 'visible' : ''}`}>
          <p className='section-tag'>
            Materiales
          </p>  
          <h2>
            Lineas textiles disponibles
          </h2>
          <p>
            Contamos con Productos elaborados en distintos materiales siendo la alpaca nuestro MVP

          </p>
        </div>
        <div className='material-grid' data-stagger-step="70">
          {materials.map((m)=>(
            <a className='material-card' href='/productos'>
              <span className='material-card-name'>
                {m.name}
              </span>
              <span className='material-card-desc'>
                {m.description}
              </span>
            </a>
          ))}

        </div>
      </section>
    </>
  );
}