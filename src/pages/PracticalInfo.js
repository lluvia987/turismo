import React from 'react';

export default function PracticalInfo() {
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
