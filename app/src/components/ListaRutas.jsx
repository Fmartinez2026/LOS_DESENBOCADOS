import TarjetaRuta from "./TarjetaRuta.jsx";

export default function ListaRutas({ rutas, titulo = "Rutas destacadas" }) {
  return (
    <section className="lista">
      <h2>{titulo}</h2>
      {rutas.length > 0 ? (
        <div className="catalog-grid">
          {rutas.map((ruta) => (
            <TarjetaRuta key={ruta.id} id={ruta.id} ruta={ruta} />
          ))}
        </div>
      ) : (
        <p>No hay rutas disponibles para esta dificultad.</p>
      )}
    </section>
  );
}