import FormularioResena from "./FormularioResena.jsx";
import { useEffect, useState } from "react";
import { API_URL } from "../api.js";

export default function Resenas({ rutaId }) {
  const [resenas, setResenas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [errorEliminar, setErrorEliminar] = useState("");
  const [eliminandoId, setEliminandoId] = useState(null);
  const [actualizacion, setActualizacion] = useState(0);

  useEffect(() => {
    const controlador = new AbortController();

    async function cargarResenas() {
      setCargando(true);
      setError("");

      try {
        const respuesta = await fetch(
          `${API_URL}/resenas?rutaId=${rutaId}`,
          { signal: controlador.signal }
        );

        if (!respuesta.ok) {
          throw new Error(`Error HTTP ${respuesta.status}`);
        }

        const datos = await respuesta.json();

        if (!Array.isArray(datos)) {
          throw new Error("La respuesta no contiene una lista");
        }

        setResenas(datos);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError("No se pudieron cargar las reseñas.");
        }
      } finally {
        if (!controlador.signal.aborted) {
          setCargando(false);
        }
      }
    }

    cargarResenas();

    return () => controlador.abort();
  }, [rutaId, actualizacion]);

  async function eliminarResena(id) {
    setErrorEliminar("");
    setEliminandoId(id);

    try {
      const respuesta = await fetch(`${API_URL}/resenas/${id}`, {
        method: "DELETE",
      });

      if (!respuesta.ok) {
        throw new Error(`Error HTTP ${respuesta.status}`);
      }

      setActualizacion((valor) => valor + 1);
    } catch {
      setErrorEliminar("No se pudo eliminar la reseña.");
    } finally {
      setEliminandoId(null);
    }
  }

  return (
    <section className="resenas" aria-label="Reseñas de la ruta">
      <h2>Reseñas de visitantes</h2>

      <FormularioResena
        rutaId={rutaId}
        onCreada={() => setActualizacion((valor) => valor + 1)}
      />

      {cargando ? (
        <p className="estado" role="status">
          Cargando reseñas...
        </p>
      ) : error ? (
        <p className="estado error" role="alert">
          {error}
        </p>
      ) : resenas.length === 0 ? (
        <p>Esta ruta todavía no tiene reseñas.</p>
      ) : (
        resenas.map((resena) => (
          <article className="resena" key={resena.id}>
            <p>
              <strong>Calificación:</strong>{" "}
              {resena.calificacion}/5
            </p>

            <p>{resena.comentario}</p>

            <p>
              <small>Fecha: {resena.fecha}</small>
            </p>

            <button
              type="button"
              className="btn btn-primary"
              disabled={eliminandoId !== null}
              onClick={() => eliminarResena(resena.id)}
              aria-label={`Eliminar reseña ${resena.id}`}
            >
              {eliminandoId === resena.id
                ? "Eliminando..."
                : "Eliminar reseña"}
            </button>
          </article>
        ))
      )}

      {errorEliminar && (
        <p className="estado error" role="alert">
          {errorEliminar}
        </p>
      )}
    </section>
  );
}
