import { Link } from "react-router";

export default function TarjetaRuta({ id, ruta }) {
  return (
    <article className="route-card">
      <div className="route-img-wrapper">
        <img src={ruta.imagen} alt={ruta.alt} />
        <span className="route-badge">{ruta.dificultad}</span>
      </div>
      <div className="route-content">
        <p className="route-cat">{ruta.distanciaKm} km</p>
        <h3>{ruta.nombre}</h3>
        <p>
          {ruta.accesible
            ? "Accesible para personas con movilidad reducida."
            : "No cuenta con acceso adaptado para movilidad reducida."}
        </p>
        <div className="route-footer">
          <span className="route-loc">
            Dificultad: {ruta.dificultad}
          </span>
          <Link className="btn btn-primary" to={`/rutas/${id}`}>
            Ver ruta
          </Link>
        </div>
      </div>
    </article>
  );
}