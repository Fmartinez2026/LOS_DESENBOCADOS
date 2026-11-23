import { useState } from "react";
import { API_URL } from "../api.js";

export default function FormularioResena({ rutaId, onCreada }) {
  const [calificacion, setCalificacion] = useState("");
  const [comentario, setComentario] = useState("");
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [enviando, setEnviando] = useState(false);

  async function enviar(evento) {
    evento.preventDefault();
    setError("");
    setMensaje("");

    const nota = Number(calificacion);
    if (!comentario.trim() || !Number.isInteger(nota) || nota < 1 || nota > 5) {
      setError("Escribe un comentario y elige una calificación de 1 a 5.");
      return;
    }

    setEnviando(true);
    try {
      const respuesta = await fetch(`${API_URL}/resenas`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rutaId,
          calificacion: nota,
          comentario: comentario.trim(),
          fecha: new Date().toISOString().slice(0, 10), // ajusta al formato de tu contrato
        }),
      });
      if (respuesta.status !== 201) {
        throw new Error(`La API respondió ${respuesta.status}`);
      }
      const nueva = await respuesta.json();
      if (onCreada) onCreada(nueva);
      setCalificacion("");
      setComentario("");
      setMensaje("Reseña enviada");
    } catch {
      setError("No se pudo enviar la reseña. ¿Está corriendo la API?");
    } finally {
      setEnviando(false);
    }
  }

  return (
    <form className="formulario-resena" onSubmit={enviar}>
      <label htmlFor="calificacion">Calificación (1 a 5)</label>
      <input
        id="calificacion"
        type="number"
        min="1"
        max="5"
        value={calificacion}
        onChange={(e) => setCalificacion(e.target.value)}
      />

      <label htmlFor="comentario">Comentario</label>
      <textarea
        id="comentario"
        value={comentario}
        onChange={(e) => setComentario(e.target.value)}
      />

      <button type="submit" disabled={enviando}>
        {enviando ? "Enviando..." : "Enviar reseña"}
      </button>

      {error && <p role="alert">{error}</p>}
      {mensaje && <p role="status">{mensaje}</p>}
    </form>
  );
}