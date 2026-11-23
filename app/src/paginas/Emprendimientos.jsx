
import { useEffect, useState } from "react";
import ListaEmprendimientos from "../components/ListaEmprendimientos.jsx";
import { API_URL } from "../api.js";

export default function Emprendimientos() {
  const [emprendimientos, setEmprendimientos] = useState([]);
  const [categoria, setCategoria] = useState("todas");
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controlador = new AbortController();

    async function cargarEmprendimientos() {
      try {
        const respuesta = await fetch(
          `${API_URL}/emprendimientos`,
          { signal: controlador.signal }
        );

        if (!respuesta.ok) {
          throw new Error(`Error HTTP ${respuesta.status}`);
        }

        const datos = await respuesta.json();

        if (!Array.isArray(datos)) {
          throw new Error("La respuesta no contiene una lista");
        }

        setEmprendimientos(datos);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError("No se pudieron cargar los emprendimientos. Revisa la API.");
        }
      } finally {
        if (!controlador.signal.aborted) {
          setCargando(false);
        }
      }
    }

    cargarEmprendimientos();

    return () => controlador.abort();
  }, []);

  const categorias = [
    ...new Set(
      emprendimientos.map((emprendimiento) => emprendimiento.categoria)
    ),
  ];

  const emprendimientosFiltrados =
    categoria === "todas"
      ? emprendimientos
      : emprendimientos.filter(
          (emprendimiento) => emprendimiento.categoria === categoria
        );

  return (
    <section className="content-section">
      <div className="section-inner">
        <header className="section-header">
          <p className="subtitle">Comunidad local</p>
          <h2>Emprendimientos de La Araucanía</h2>
          <p>Conoce y apoya iniciativas locales de la región.</p>
        </header>

        {cargando ? (
          <p className="estado" role="status">
            Cargando emprendimientos...
          </p>
        ) : error ? (
          <p className="estado error" role="alert">
            {error}
          </p>
        ) : (
          <>
            <div
              className="filtros"
              aria-label="Filtrar emprendimientos por categoría"
            >
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

            <ListaEmprendimientos
              emprendimientos={emprendimientosFiltrados}
            />
          </>
        )}
      </div>
    </section>
  );
}
