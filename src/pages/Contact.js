import React, { useState } from 'react';
import { destinations } from '../data/content';

const API_URL = import.meta.env.VITE_API_URL;

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', destination: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | loading | sent | error

  const handle = e => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async e => {
    e.preventDefault();
    setStatus('loading');

    try {
      const res = await fetch(`https://turimo-backend.vercel.app/api/contacto`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: form.name,
          email: form.email,
          numero: form.phone,
          interes: form.destination,
          mensaje: form.message,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.ok) throw new Error(data.mensaje || 'Error al enviar');

      setStatus('sent');
    } catch (err) {
      console.error('Error enviando consulta:', err);
      setStatus('error');
    }
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
            <div className="info-item">📍 Calle Albergue S/N - Chinchero</div>
            <div className="info-item">📞 +51 930675547</div>
            <div className="info-item">✉️ winayawaq2008@gmail.com</div>
            <div className="info-item">🕐 Lun–Dom: 7am – 7pm</div>
          </div>
        </div>
        <div className="contact-right">
          {status === 'sent' ? (
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
                <label>Teléfono</label>
                <input type="tel" name="phone" value={form.phone} onChange={handle} placeholder="+51 999 999 999" required />
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
              <button type="submit" className="btn-primary full" disabled={status === 'loading'}>
                {status === 'loading' ? 'Enviando...' : 'Enviar Consulta →'}
              </button>
              {status === 'error' && (
                <p className="form-error">No pudimos enviar tu mensaje. Intenta de nuevo o contáctanos por WhatsApp.</p>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}