import { Link, useParams } from "react-router";
import { rutas } from "../datos/rutas.js";

export default function DetalleRuta() {
  const { id } = useParams();
  const ruta = rutas.find((r) => r.id === Number(id));

  if (!ruta) {
    return (
      <p className="lista">No existe una ruta con el número {id}.</p>
    );
  }

  return (
    <section className="content-section">
      <div className="section-inner">
        <article className="route-card">
          <div className="route-img-wrapper">
            <img src={ruta.imagen} alt={ruta.alt} />
          </div>
          <div className="route-content">
            <p className="route-cat">Dificultad {ruta.dificultad}</p>
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
      </div>
    </section>
  );
}
