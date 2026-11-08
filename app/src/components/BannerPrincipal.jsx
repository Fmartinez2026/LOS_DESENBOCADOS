import Buscador from "./Buscador.jsx";

export default function BannerPrincipal({ titulo, subtitulo }) {
  return (
    <section className="hero-section">
      <div className="hero-layout">
        <article className="hero-card">
          <div className="badge">
            <span className="dot"></span> 42 rutas activas
          </div>
          
          {/* Aquí inyectamos la prop subtitulo */}
          <p className="subtitle">{subtitulo}</p>
          
          {/* Aquí inyectamos la prop titulo */}
          <h1>{titulo}</h1>
          
          <p className="description">
            Apoyamos a comunidades y negocios locales, conectándolos con viajeros 
            que buscan explorar bosques, volcanes y lagos con un enfoque sustentable.
          </p>
          <a href="#rutas" className="btn btn-primary btn-icon">
            <i className="fa-solid fa-compass"></i> Explorar Ecorutas
          </a>
        </article>

        {/* El Buscador va aquí dentro según el contrato */}
        <aside className="sidebar">
          <h2>¿QUÉ DESEAS HACER?</h2>
          <Buscador placeholder="Busca rutas, comunas o actividades..." />
        </aside>

      </div>
    </section>
  );
}