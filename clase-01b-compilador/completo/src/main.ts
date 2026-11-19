import "./style.css";
// Importamos una función de otro archivo (un módulo). Ver src/utils/calculos.ts
import { calcularTotal } from "./utils/calculos";

// 1. Variables tipadas (anotación explícita)
const nombreProyecto: string = "Mi aplicación frontend";
const descripcion: string = "Proyecto desarrollado con HTML, CSS y TypeScript.";

// 2. Datos de ejemplo para usar la función importada
const precio: number = 15000;
const cantidad: number = 2;
const total = calcularTotal(precio, cantidad); // inferido como number

// 3. Inferencia: TypeScript deduce que es number sin que lo escribamos
let clics = 0;

// 4. Función con parámetros y retorno tipados
function crearMensaje(cantidad: number): string {
  if (cantidad === 1) {
    return "¡Tu aplicación TypeScript está funcionando!";
  }
  return `¡Sigue funcionando! Hiciste clic ${cantidad} veces.`;
}

// 5. querySelector puede devolver null: con strictNullChecks (parte del modo
//    estricto) TypeScript nos obliga a comprobarlo antes de usarlo
const app = document.querySelector<HTMLDivElement>("#app");

if (app) {
  app.innerHTML = `
    <main class="contenedor">
      <h1>${nombreProyecto}</h1>
      <p>${descripcion}</p>
      <p class="total">${cantidad} productos de $${precio} = <strong>$${total}</strong></p>
      <button id="btnBienvenida">Comenzar</button>
      <p id="mensaje"></p>
    </main>
  `;

  const boton = document.querySelector<HTMLButtonElement>("#btnBienvenida");
  const mensaje = document.querySelector<HTMLParagraphElement>("#mensaje");

  // 6. Evento: al hacer clic actualizamos el texto
  if (boton && mensaje) {
    boton.addEventListener("click", () => {
      clics++;
      mensaje.textContent = crearMensaje(clics);
    });
  }
}
