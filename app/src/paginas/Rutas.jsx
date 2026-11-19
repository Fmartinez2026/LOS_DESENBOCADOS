import { useState } from "react";
import ListaRutas from "../components/ListaRutas.jsx";
import { rutas } from "../datos/rutas.js";

export default function Rutas() {
  const [dificultad, setDificultad] = useState("todas");
  const dificultades = ["todas", "baja", "media", "alta"];
  const rutasFiltradas =
    dificultad === "todas"
      ? rutas
      : rutas.filter((ruta) => ruta.dificultad === dificultad);

  return (
    <section className="content-section">
      <div className="section-inner">
        <header className="section-header">
          <p className="subtitle">Explora La Araucanía</p>
          <h2>Rutas y senderos</h2>
          <p>Encuentra un recorrido según el nivel de dificultad.</p>
        </header>
        <div className="filtros" aria-label="Filtrar rutas por dificultad">
          {dificultades.map((valor) => (
            <button
              key={valor}
              type="button"
              aria-pressed={dificultad === valor}
              onClick={() => setDificultad(valor)}
            >
              {valor === "todas"
                ? "Todas"
                : valor.charAt(0).toUpperCase() + valor.slice(1)}
            </button>
          ))}
        </div>
        <ListaRutas rutas={rutasFiltradas} titulo="Rutas disponibles" />
      </div>
    </section>
  );
}
