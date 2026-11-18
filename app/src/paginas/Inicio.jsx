import { Link } from "react-router";
import BannerPrincipal from "../components/BannerPrincipal.jsx";
import ListaRutas from "../components/ListaRutas.jsx";
import { rutas } from "../datos/rutas.js";

export default function Inicio() {
  return (
    <>
      <BannerPrincipal
        titulo="Rutas sostenibles de La Araucanía"
        subtitulo="Senderos y emprendimientos cerca de Temuco"
      />
      <ListaRutas rutas={rutas.slice(0, 3)} />
      <Link to="/rutas" className="boton">
        Ver todas las rutas
      </Link>
    </>
  );
}
