export default function ListaEmprendimientos({ emprendimientos }) {
  if (emprendimientos.length === 0) {
    return <p>No hay emprendimientos disponibles en esta categoría.</p>;
  }

  return (
    <div className="catalog-grid">
      {emprendimientos.map((emprendimiento) => (
        <article className="route-card" key={emprendimiento.id}>
          <div className="route-img-wrapper">
            <img
              src={emprendimiento.imagen}
              alt={`${emprendimiento.nombre} en ${emprendimiento.ubicacion}`}
            />
          </div>
          <div className="route-content">
            <p className="route-cat">{emprendimiento.categoria}</p>
            <h3>{emprendimiento.nombre}</h3>
            <p>{emprendimiento.descripcion}</p>
            <div className="route-footer">
              <span className="route-loc">{emprendimiento.ubicacion}</span>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}