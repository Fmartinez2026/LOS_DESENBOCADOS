const URL_CLIMA =
  "https://api.open-meteo.com/v1/forecast?latitude=-38.8&longitude=-71.3" +
  "&current=temperature_2m,wind_speed_10m,weather_code&timezone=America/Santiago";

const estado = document.querySelector("#estado");
const temperatura = document.querySelector("#temperatura");
const viento = document.querySelector("#viento");
const cielo = document.querySelector("#cielo");
const avisoClima = document.querySelector("#aviso-clima");
const botonToggle = document.querySelector("#btn-toggle-clima");
const detalleClima = document.querySelector("#detalle-clima");

function describirCielo(codigo) {
  if (codigo === 0) return "Despejado";
  if (codigo === 1) return "Mayormente despejado";
  if (codigo === 2) return "Parcialmente nublado";
  if (codigo === 3) return "Nublado";
  if (codigo === 45 || codigo === 48) return "Niebla";
  if (codigo >= 51 && codigo <= 55) return "Llovizna";
  if (codigo === 56 || codigo === 57) return "Llovizna helada";
  if (codigo >= 61 && codigo <= 65) return "Lluvia";
  if (codigo === 66 || codigo === 67) return "Lluvia helada";
  if (codigo >= 71 && codigo <= 75) return "Nieve";
  if (codigo === 77) return "Granos de nieve";
  if (codigo >= 80 && codigo <= 82) return "Chubascos";
  if (codigo === 85 || codigo === 86) return "Chubascos de nieve";
  if (codigo === 95 || codigo === 96 || codigo === 99) return "Tormenta";
  return "Condiciones desconocidas";
}

function mostrarAviso(clima) {
  if (clima.temperature_2m < 8) {
    avisoClima.textContent = "Hace frío: lleva abrigo";
  } else if (clima.wind_speed_10m > 40) {
    avisoClima.textContent = "Viento fuerte: evita los miradores";
  } else {
    avisoClima.textContent = "Buen momento para salir";
  }

  avisoClima.hidden = false;
}

async function cargarClima() {
  estado.textContent = "Cargando clima...";

  try {
    const respuesta = await fetch(URL_CLIMA);

    if (!respuesta.ok) {
      throw new Error(`Error al consultar el clima: ${respuesta.status}`);
    }

    const datos = await respuesta.json();
    const clima = datos.current;

    if (
      !clima ||
      typeof clima.temperature_2m !== "number" ||
      typeof clima.wind_speed_10m !== "number" ||
      typeof clima.weather_code !== "number"
    ) {
      throw new Error("La respuesta no contiene datos actuales válidos del clima.");
    }

    temperatura.textContent = `${clima.temperature_2m} °C`;
    viento.textContent = `${clima.wind_speed_10m} km/h`;
    cielo.textContent = describirCielo(clima.weather_code);
    mostrarAviso(clima);
    estado.textContent = "Clima actualizado.";
  } catch (error) {
    console.error("No se pudo cargar el clima:", error);
    estado.textContent = "No pudimos cargar el clima.";
  }
}

if (estado && botonToggle && detalleClima) {
  botonToggle.addEventListener("click", () => {
    const mostrarDetalle = detalleClima.hidden;

    detalleClima.hidden = !mostrarDetalle;
    botonToggle.setAttribute("aria-expanded", String(mostrarDetalle));
    botonToggle.textContent = mostrarDetalle
      ? "Ocultar detalle del clima"
      : "Ver detalle del clima";
  });

  cargarClima();
}