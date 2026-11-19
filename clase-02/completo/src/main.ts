import "./style.css";
import { calcularTotal } from "./utils/calculos";
import { mapearActividad } from "./utils/mapearActividad";
import type { ActividadDTO } from "./utils/mapearActividad";
import {
  actividades,
  bienestar,
  filtrarPorPrecioMinimo,
  reservas,
} from "./models/colecciones";
import { puedeInscribirse, etiquetaEstado } from "./models/actividad";
import { mensajeCarga } from "./models/estado-carga";
import type { EstadoCarga } from "./models/estado-carga";

const nombreProyecto: string = "Estudio de actividades";
const descripcion: string = "Catálogo tipado con interfaces, uniones y un mapper.";

const precio: number = 15000;
const cantidad: number = 2;
const total = calcularTotal(precio, cantidad);

let clics = 0;

function crearMensaje(cantidad: number): string {
  if (cantidad === 1) {
    return "¡Tu aplicación TypeScript está funcionando!";
  }
  return `¡Sigue funcionando! Hiciste clic ${cantidad} veces.`;
}

// Dato de ejemplo como si viniera de una API (nombres en inglés).
const respuestaAPI: ActividadDTO = {
  activity_id: 4,
  activity_name: "Stretching",
  duration_min: 40,
  price_amount: 11000,
  spots_available: 6,
  status: "disponible",
  category_id: bienestar.id,
  category_name: bienestar.nombre,
  description: "Movilidad y elongación",
};

const stretching = mapearActividad(respuestaAPI, bienestar);
const desdePrecio = 13000;
const actividadesFiltradas = filtrarPorPrecioMinimo(actividades, desdePrecio);
const carga: EstadoCarga = {
  estado: "exito",
  datos: actividades.map((actividad) => actividad.nombre),
};

function tarjetaActividad(actividad: (typeof actividades)[number], origen?: string): string {
  const inscripcion = puedeInscribirse(actividad)
    ? "Se puede inscribir"
    : "No se puede inscribir";
  const extra = origen ? `<p class="origen">${origen}</p>` : "";
  return `
    <article class="tarjeta">
      <h3>${actividad.nombre}</h3>
      <p class="meta">${actividad.categoria.nombre} · ${actividad.duracionMinutos} min · $${actividad.precio}</p>
      <p class="estado estado-${actividad.estado}">${etiquetaEstado(actividad.estado)}</p>
      <p>${inscripcion}. Cupos: ${actividad.cuposDisponibles}</p>
      ${extra}
    </article>
  `;
}

const app = document.querySelector<HTMLDivElement>("#app");

if (app) {
  app.innerHTML = `
    <main class="contenedor">
      <h1>${nombreProyecto}</h1>
      <p>${descripcion}</p>
      <p class="total">${cantidad} productos de $${precio} = <strong>$${total}</strong></p>
      <button id="btnBienvenida">Comenzar</button>
      <p id="mensaje"></p>

      <section class="catalogo">
        <h2>Actividades</h2>
        <p class="carga">${mensajeCarga(carga)}</p>
        <div class="grilla">
          ${actividades.map((actividad) => tarjetaActividad(actividad)).join("")}
        </div>
      </section>

      <section class="catalogo">
        <h2>Filtradas: precio desde $${desdePrecio}</h2>
        <div class="grilla">
          ${actividadesFiltradas.map((actividad) => tarjetaActividad(actividad)).join("")}
        </div>
      </section>

      <section class="catalogo">
        <h2>Llegó desde una API</h2>
        ${tarjetaActividad(stretching, `DTO: ${respuestaAPI.activity_name} ($${respuestaAPI.price_amount}) → modelo: ${stretching.nombre} ($${stretching.precio})`)}
      </section>

      <section class="catalogo">
        <h2>Reservas</h2>
        <ul class="reservas">
          ${reservas
            .map(
              (reserva) => `
            <li>
              <strong>${reserva.actividad.nombre}</strong>
              con ${reserva.profesional.nombre}
              <span class="estado estado-${reserva.estado}">${reserva.estado}</span>
              ${reserva.notas ? `<em>${reserva.notas}</em>` : ""}
            </li>`,
            )
            .join("")}
        </ul>
      </section>
    </main>
  `;

  const boton = document.querySelector<HTMLButtonElement>("#btnBienvenida");
  const mensaje = document.querySelector<HTMLParagraphElement>("#mensaje");

  if (boton && mensaje) {
    boton.addEventListener("click", () => {
      clics++;
      mensaje.textContent = crearMensaje(clics);
    });
  }
}
