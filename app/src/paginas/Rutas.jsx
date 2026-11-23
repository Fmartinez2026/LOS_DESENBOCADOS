import { useState, useEffect } from "react";
import ListaRutas from "../components/ListaRutas.jsx";
import { API_URL } from "../api.js";

export default function Rutas() {
  // 1) Todos los hooks arriba
  const [rutas, setRutas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [dificultad, setDificultad] = useState("todas");

  // 2) El fetch dentro de useEffect
  useEffect(() => {
    async function cargarRutas() {
      try {
        const respuesta = await fetch(`${API_URL}/rutas`);
        if (!respuesta.ok) {
          throw new Error(`La API respondió ${respuesta.status}`);
        }
        setRutas(await respuesta.json());
      } catch {
        setError("No se pudieron cargar las rutas. ¿Está corriendo la API?");
      } finally {
        setCargando(false);
      }
    }
    cargarRutas();
  }, []);

  // 3) Los if con return, después de los hooks
  if (cargando) {
    return (
      <p className="lista estado" role="status">
        Cargando rutas…
      </p>
    );
  }
  if (error) {
    return (
      <p className="lista estado error" role="alert">
        {error}
      </p>
    );
  }

  // 4) Tu filtro de la semana 11, igual, pero sobre el estado
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