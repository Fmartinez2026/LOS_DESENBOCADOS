
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { API_URL } from "../api.js";
import Resenas from "../components/Resenas.jsx";

export default function DetalleRuta() {
  const { id } = useParams();

  const [ruta, setRuta] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [noEncontrada, setNoEncontrada] = useState(false);

  useEffect(() => {
    const controlador = new AbortController();

    async function cargarRuta() {
      setCargando(true);
      setError("");
      setNoEncontrada(false);
      setRuta(null);

      try {
        const respuesta = await fetch(`${API_URL}/rutas/${id}`, {
          signal: controlador.signal,
        });

        if (respuesta.status === 404) {
          setNoEncontrada(true);
          return;
        }

        if (!respuesta.ok) {
          throw new Error(`Error HTTP ${respuesta.status}`);
        }

        const datos = await respuesta.json();
        setRuta(datos);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError("No se pudo cargar la ruta. Revisa la API.");
        }
      } finally {
        if (!controlador.signal.aborted) {
          setCargando(false);
        }
      }
    }

    cargarRuta();

    return () => controlador.abort();
  }, [id]);

  if (cargando) {
    return (
      <p className="estado" role="status">
        Cargando detalle de la ruta...
      </p>
    );
  }

  if (error) {
    return (
      <p className="estado error" role="alert">
        {error}
      </p>
    );
  }

  if (noEncontrada || !ruta) {
    return (
      <section className="content-section">
        <div className="section-inner">
          <p className="estado">
            No existe una ruta con el número {id}.
          </p>
          <Link className="btn btn-primary" to="/rutas">
            Volver a las rutas
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="content-section">
      <div className="section-inner">
        <article className="route-card">
          <div className="route-img-wrapper">
            <img src={ruta.imagen} alt={ruta.alt || ruta.nombre} />
          </div>

          <div className="route-content">
            <p className="route-cat">
              Dificultad {ruta.dificultad}
            </p>

            <h1>{ruta.nombre}</h1>
            <p>Distancia: {ruta.distanciaKm} km</p>

            <p>
              Accesibilidad:{" "}
              {ruta.accesible
                ? "Accesible para personas con movilidad reducida."
                : "No cuenta con acceso adaptado para movilidad reducida."}
            </p>

            <Link className="btn btn-primary" to="/rutas">
              Volver a las rutas
            </Link>
          </div>
        </article>

        <Resenas rutaId={ruta.id} />
      </div>
    </section>
  );
}
