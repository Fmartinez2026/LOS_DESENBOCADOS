import { Link } from "react-router";

export default function TarjetaRuta({
  id,
  nombre,
  imagen,
  alt,
  distanciaKm,
  dificultad,
  accesible,
}) {
  return (
    <article className="route-card">
      <div className="route-img-wrapper">
        <img src={imagen} alt={alt || nombre} />
        <span className="route-badge">{dificultad}</span>
      </div>
      <div className="route-content">
        <p className="route-cat">{distanciaKm} km</p>
        <h3>{nombre}</h3>
        <p>
          {accesible
            ? "Accesible para personas con movilidad reducida."
            : "No cuenta con acceso adaptado para movilidad reducida."}
        </p>
        <div className="route-footer">
          <span className="route-loc">
            Dificultad: {dificultad}
          </span>
          <Link className="btn btn-primary" to={id ? `/rutas/${id}` : "/rutas"}>
            Ver ruta
          </Link>
        </div>
      </div>
    </article>
  );
}