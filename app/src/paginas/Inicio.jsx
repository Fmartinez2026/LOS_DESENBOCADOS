import { useEffect, useState } from "react";
import { Link } from "react-router";
import BannerPrincipal from "../components/BannerPrincipal.jsx";
import ListaRutas from "../components/ListaRutas.jsx";
import { API_URL } from "../api.js";

export default function Inicio() {
  const [rutas, setRutas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controlador = new AbortController();

    async function cargarRutas() {
      try {
        const respuesta = await fetch(`${API_URL}/rutas`, {
          signal: controlador.signal,
        });

        if (!respuesta.ok) {
          throw new Error(`Error HTTP ${respuesta.status}`);
        }

        const datos = await respuesta.json();

        if (!Array.isArray(datos)) {
          throw new Error("La respuesta no contiene una lista de rutas");
        }

        setRutas(datos);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError("No se pudieron cargar las rutas. Revisa la API.");
        }
      } finally {
        if (!controlador.signal.aborted) {
          setCargando(false);
        }
      }
    }

    cargarRutas();

    return () => controlador.abort();
  }, []);

  return (
    <>
      <BannerPrincipal
        titulo="Rutas sostenibles de La Araucanía"
        subtitulo="Senderos y emprendimientos cerca de Temuco"
      />

      {cargando ? (
        <p className="estado" role="status">
          Cargando rutas...
        </p>
      ) : error ? (
        <p className="estado error" role="alert">
          {error}
        </p>
      ) : (
        <ListaRutas rutas={rutas.slice(0, 3)} />
      )}

      <Link to="/rutas" className="boton">
        Ver todas las rutas
      </Link>
    </>
  );
}
