import React, { useState } from 'react';
import { destinations } from '../data/content';

export default function Contact() {
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
