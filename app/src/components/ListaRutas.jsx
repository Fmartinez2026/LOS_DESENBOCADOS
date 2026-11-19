import TarjetaRuta from "./TarjetaRuta";

export default function ListaRutas({ rutas = [] }) {
  if (rutas.length === 0) {
    return <p className="lista-rutas__vacio">No hay rutas disponibles.</p>;
  }

  return (
    <section className="lista-rutas">
      {rutas.map((ruta) => (
        <TarjetaRuta
          key={ruta.id}
          nombre={ruta.nombre}
          imagen={ruta.imagen}
          alt={ruta.alt}
          distanciaKm={ruta.distanciaKm}
          dificultad={ruta.dificultad}
          accesible={ruta.accesible}
        />
      ))}
    </section>
  );
}