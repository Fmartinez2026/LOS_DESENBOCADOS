# Contrato API - Sprint 3

Base URL local: `http://localhost:3000`

Iniciar la API desde la carpeta `app`:

```sh
npm run server
```

## Auditoría de Semana 10

- `src/datos/rutas.js` y `src/datos/emprendimientos.js` exportan arreglos vacíos. No contienen registros de los que extraer campos.
- `App.jsx` pasa a `TarjetaRuta` las props `nombre`, `imagen`, `alt`, `distanciaKm`, `dificultad` y `accesible`; son los campos usados como fixture inicial de `rutas`.
- `TarjetaRuta.jsx` no recibe ni consume props actualmente. `ListaEmprendimientos.jsx` tampoco recibe ni consume props.
- `Buscador.jsx` solo recibe `placeholder`; no implementa filtros ni peticiones. Los filtros documentados abajo son la propuesta para conectar en Frontend, no funcionalidades existentes.
- `Emprendimiento` no tiene campos definidos en los componentes actuales. Sus campos de abajo son una propuesta de contrato que Frontend debe validar.
- No se definen recursos de usuario ni autenticación.

## Modelos TypeScript

```ts
export interface Ruta {
  id: number;
  nombre: string;
  imagen: string;
  alt: string;
  distanciaKm: number;
  dificultad: string;
  accesible: boolean;
}

export interface Emprendimiento {
  id: number;
  nombre: string;
  categoria: string;
  descripcion: string;
  ubicacion: string;
  imagen: string;
}

export interface Resena {
  id: number;
  rutaId: number;
  calificacion: number;
  comentario: string;
  fecha: string;
}
```

## Endpoints

| Método | Endpoint | Cuerpo que envía (JSON) | Responde la API | Código | Vista o componente |
|---|---|---|---|---|---|
| GET | `/rutas` | — | `Ruta[]` | 200 | Listado de rutas |
| GET | `/rutas/:id` | — | `Ruta` o error | 200 / 404 | Detalle de ruta |
| GET | `/rutas?dificultad=baja` | — | `Ruta[]` filtradas | 200 | Buscador (propuesto) |
| GET | `/rutas?accesible=true` | — | `Ruta[]` filtradas | 200 | Buscador (propuesto) |
| GET | `/emprendimientos` | — | `Emprendimiento[]` | 200 | Listado de emprendimientos |
| GET | `/emprendimientos/:id` | — | `Emprendimiento` o error | 200 / 404 | Detalle de emprendimiento |
| GET | `/emprendimientos?categoria=artesania` | — | `Emprendimiento[]` filtrados | 200 | Buscador (propuesto) |
| GET | `/resenas` | — | `Resena[]` | 200 | Reseñas |
| GET | `/resenas?rutaId=1` | — | `Resena[]` de la ruta | 200 | Detalle de ruta |
| POST | `/resenas` | `{"rutaId":1,"calificacion":5,"comentario":"Una experiencia muy agradable.","fecha":"2026-11-18"}` | `Resena` creada con `id` generado | 201 | Formulario de reseña |
| DELETE | `/resenas/:id` | — | Objeto vacío | 200 | Gestión de reseña |

El cliente no envía `id` en `POST`. Las relaciones son planas y se representan con `rutaId`.

## Datos de ejemplo

La ruta de `db.json` es un fixture basado en la tarjeta de prueba de `App.jsx`, no un registro extraído de `rutas.js` (que está vacío). `emprendimientos` permanece vacío porque su archivo fuente también está vacío. Las dos reseñas son datos de prueba asociados a la ruta con `id: 1`.

## Paso 1 · Recursos

| Recurso | La interfaz lo… | Vistas que lo usan | Para qué le sirve al usuario |
|---|---|---|---|
| `rutas` | solo lee | ListaRutas, DetalleRuta, Buscador | Explorar las rutas disponibles y filtrarlas por dificultad o accesibilidad |
| `emprendimientos` | solo lee | ListaEmprendimientos, Buscador | Conocer emprendimientos locales y filtrarlos por categoría |
| `resenas` | lee, crea y borra | DetalleRuta, FormularioResena | Leer opiniones de otros visitantes, publicar una reseña y eliminarla |

## Ejemplos en JSON (Paso 2)

```json
// Ruta
{
  "id": 1,
  "nombre": "Sendero Cerro Ñielol",
  "imagen": "/img/cerro-nielol.jpg",
  "alt": "Vista panorámica del sendero en el Cerro Ñielol",
  "distanciaKm": 4.5,
  "dificultad": "baja",
  "accesible": true
}

// Emprendimiento
{
  "id": 1,
  "nombre": "Tejidos Mapuche Rayén",
  "categoria": "artesania",
  "descripcion": "Textiles tradicionales elaborados a telar con lana natural.",
  "ubicacion": "Temuco",
  "imagen": "/img/tejidos-rayen.jpg"
}

// Resena
{
  "id": 1,
  "rutaId": 1,
  "calificacion": 5,
  "comentario": "Una experiencia muy agradable y bien señalizada.",
  "fecha": "2026-11-18"
}
```

