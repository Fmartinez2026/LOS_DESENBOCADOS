import { Link } from "react-router";

export default function NoEncontrada() {
  return (
    <section className="lista">
      <h1>Página no encontrada</h1>
      <p>La dirección que buscas no existe.</p>
      <Link to="/" className="boton">
        Volver al inicio
      </Link>
    </section>
  );
}
