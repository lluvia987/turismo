import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const navItems = [
  { label: 'Inicio', to: '/' },
  { label: 'Destinos', to: '/destinos' },
  { label: 'Experiencias', to: '/experiencias' },
  { label: 'Practica', to: '/practica' },
  { label: 'Contacto', to: '/contacto', cta: true },
];

export default function Navbar({ scrolled }) {
  const [open, setOpen] = useState(false);
  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-brand">
        <span className="brand-icon">◈</span>
        <span className="brand-text">WINAY AWAQ</span>
      </div>
      <ul className={`nav-links ${open ? 'open' : ''}`}>
        {navItems.map(item => (
          <li key={item.to}>
            <NavLink
              to={item.to}
              className={({ isActive }) =>
                item.cta ? 'nav-cta' : isActive ? 'active' : ''
              }
              onClick={() => setOpen(false)}
              end={item.to === '/'}
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
      <button className="hamburger" onClick={() => setOpen(!open)} aria-label="Menu">
        <span /><span /><span />
      </button>
    </nav>
  );
}
