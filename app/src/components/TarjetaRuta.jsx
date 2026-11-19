export default function TarjetaRuta({
  nombre,
  imagen,
  alt,
  distanciaKm,
  dificultad,
  accesible,
}) {
  return (
    <article className="tarjeta-ruta">
      <img
        src={imagen}
        alt={alt || nombre}
        className="tarjeta-ruta__imagen"
      />

      <div className="tarjeta-ruta__contenido">
        <h3 className="tarjeta-ruta__titulo">{nombre}</h3>

        <ul className="tarjeta-ruta__detalles">
          <li>
            <strong>Distancia:</strong> {distanciaKm} km
          </li>
          <li>
            <strong>Dificultad:</strong> {dificultad}
          </li>
          <li>
            <strong>Accesible:</strong> {accesible ? "Sí" : "No"}
          </li>
        </ul>
      </div>
    </article>
  );
}