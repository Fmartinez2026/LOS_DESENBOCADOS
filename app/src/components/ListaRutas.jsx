import TarjetaRuta from "./TarjetaRuta";

export default function ListaRutas({
  rutas = [],
  titulo = "Rutas destacadas",
}) {
  if (rutas.length === 0) {
    return <p className="lista-rutas__vacio">No hay rutas disponibles.</p>; 
  }

  return (
    <section className="lista-rutas">
      <h2>{titulo}</h2>
      {rutas.map((ruta) => (
        <TarjetaRuta
          key={ruta.id}
          id={ruta.id}
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