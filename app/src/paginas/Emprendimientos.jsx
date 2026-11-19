import { useState } from "react";
import ListaEmprendimientos from "../components/ListaEmprendimientos.jsx";
import { emprendimientos } from "../datos/emprendimientos.js";

export default function Emprendimientos() {
  const [categoria, setCategoria] = useState("todas");
  const categorias = [
    ...new Set(emprendimientos.map((emprendimiento) => emprendimiento.categoria)),
  ];
  const emprendimientosFiltrados =
    categoria === "todas"
      ? emprendimientos
      : emprendimientos.filter(
          (emprendimiento) => emprendimiento.categoria === categoria,
        );

  return (
    <section className="content-section">
      <div className="section-inner">
        <header className="section-header">
          <p className="subtitle">Comunidad local</p>
          <h2>Emprendimientos de La Araucanía</h2>
          <p>Conoce y apoya iniciativas locales de la región.</p>
        </header>
        <div className="filtros" aria-label="Filtrar emprendimientos por categoría">
          <button
            type="button"
            aria-pressed={categoria === "todas"}
            onClick={() => setCategoria("todas")}
          >
            Todas
          </button>
          {categorias.map((valor) => (
            <button
              key={valor}
              type="button"
              aria-pressed={categoria === valor}
              onClick={() => setCategoria(valor)}
            >
              {valor}
            </button>
          ))}
        </div>
        <ListaEmprendimientos emprendimientos={emprendimientosFiltrados} />
      </div>
    </section>
  );
}
