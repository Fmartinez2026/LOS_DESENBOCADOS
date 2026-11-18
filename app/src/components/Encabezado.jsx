import React, { useState } from 'react';

export default function Encabezado() {
  const [menuAbierto, setMenuAbierto] = useState(false);

  return (
    <>
      <header className="navbar">
        <a href="#" className="brand">
          <div className="logo-icon" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#22c55e', borderRadius: '8px', width: '35px', height: '35px' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L3 10h5l-4 8h16l-4-8h5z" />
              <path d="M12 22v-4" />
            </svg>
          </div>
          <div className="brand-text">
            <small>ECORUTAS · LA ARAUCANÍA</small>
            <strong>Los Desenvocados</strong>
          </div>
        </a>
        <nav className="nav-links">
          <a href="#rutas">Rutas</a>
          <a href="#comunidad">Comunidad</a>
          <a href="#contacto">Contacto</a>
        </nav>
        <button className="btn btn-primary" onClick={() => setMenuAbierto(true)}>Acceder</button>
      </header>

      {menuAbierto && (
        <div className="modal" onClick={() => setMenuAbierto(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            
            <button 
              className="close-btn" 
              onClick={() => setMenuAbierto(false)} 
              style={{ position: 'absolute', top: '15px', right: '15px', background: 'none', border: 'none', color: '#9ca3af', fontSize: '20px', cursor: 'pointer' }}
            >
              ✕
            </button>
            
            <div className="modal-header">
              <div className="modal-icon" style={{ color: '#d85c27', display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="7.5" cy="15.5" r="5.5"/>
                  <path d="m21 2-9.6 9.6"/>
                  <path d="m15.5 7.5 3 3L22 7l-3-3"/>
                </svg>
              </div>
              <h2>Iniciar Sesión</h2>
              <p>Accede para gestionar tus ecorutas.</p>
            </div>
            
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label htmlFor="correo">Correo Electrónico</label>
                  <input type="email" id="correo" className="form-control" placeholder="usuario@araucania.cl" />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Contraseña</label>
                  <input type="password" id="password" className="form-control" placeholder="........" />
                </div>
                <button type="button" className="btn btn-primary btn-block">
                  Ingresar
                </button>
              </form>
            </div>
            
          </div>
        </div>
      )}
    </>
  );
}