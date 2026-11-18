import { NavLink } from "react-router";

export default function Encabezado() {
  const enlaces = [
    { nombre: "Inicio", ruta: "/" },
    { nombre: "Rutas", ruta: "/rutas" },
    { nombre: "Emprendimientos", ruta: "/emprendimientos" },
  ];

  return (
    <header className="navbar">
      <nav className="nav-links">
        {enlaces.map((enlace) => (
          <NavLink
            key={enlace.ruta}
            to={enlace.ruta}
            end={enlace.ruta === "/"}
            className={({ isActive }) => (isActive ? "activo" : "")}
          >
            {enlace.nombre}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}