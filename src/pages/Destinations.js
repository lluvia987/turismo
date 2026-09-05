import React from 'react';
import DestinationCard from '../components/DestinationCard';
import { destinations } from '../data/content';

export default function Destinations() {
  return (
    <section className="section destinations" id="destinos">
      <div className="section-header">
        <p className="section-eyebrow">NUESTROS SERVICIOS</p>
        <h2 className="section-title">Joyas del <em>Tahuantinsuyo</em></h2>
        <p className="section-sub">Cada lugar es un capítulo de la historia más grande de América del Sur.</p>
      </div>
      <div className="dest-grid">
        {destinations.map((d, i) => <DestinationCard key={d.id} dest={d} index={i} />)}
      </div>
    </section>
  );
}
