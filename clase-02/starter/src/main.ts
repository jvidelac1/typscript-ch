import "./style.css";

// 1. Variables tipadas (anotación explícita)
const nombreProyecto: string = "Mi aplicación frontend";
const descripcion: string = "Proyecto desarrollado con HTML, CSS y TypeScript.";

// 2. Inferencia: TypeScript deduce que es number sin que lo escribamos
let clics = 0;

// 3. Función con parámetros y retorno tipados
function crearMensaje(cantidad: number): string {
  if (cantidad === 1) {
    return "¡Tu aplicación TypeScript está funcionando!";
  }
  return `¡Sigue funcionando! Hiciste clic ${cantidad} veces.`;
}

// 4. querySelector puede devolver null: lo comprobamos antes de usarlo
const app = document.querySelector<HTMLDivElement>("#app");

if (app) {
  app.innerHTML = `
    <main class="contenedor">
      <h1>${nombreProyecto}</h1>
      <p>${descripcion}</p>
      <button id="btnBienvenida">Comenzar</button>
      <p id="mensaje"></p>
    </main>
  `;

  const boton = document.querySelector<HTMLButtonElement>("#btnBienvenida");
  const mensaje = document.querySelector<HTMLParagraphElement>("#mensaje");

  // 5. Evento: al hacer clic actualizamos el texto
  if (boton && mensaje) {
    boton.addEventListener("click", () => {
      clics++;
      mensaje.textContent = crearMensaje(clics);
    });
  }
}

// 6. Para probar la comprobación de tipos: descomentá la línea de abajo
//    y corré `npx tsc --noEmit` (o `npm run build`). La app en `npm run dev`
//    sigue andando, pero tsc marca el error.
// crearMensaje("tres");
