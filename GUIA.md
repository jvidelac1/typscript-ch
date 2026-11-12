# Clase 1: Primera app con Vite + TypeScript

Guía para el docente. La teoría sale de la unidad "TypeScript más allá de JavaScript" y la práctica de "Creación de una aplicación frontend con Vite y TypeScript" (Módulo 1 del material).

**Objetivo:** al terminar la clase, cada estudiante tiene un proyecto Vite + TypeScript que corre en el navegador. El proyecto tiene variables y una función tipadas, una interacción con un botón, una comprobación de tipos y un build funcionando.

## Qué hay en esta carpeta

| Carpeta | Qué es | Para qué la usás |
|---|---|---|
| `starter/` | El proyecto recién creado con `npm create vite@latest -- --template vanilla-ts`, sin tocar | Es el punto de partida. Lo podés compartir con quien no pudo crear el proyecto. |
| `completo/` | Cómo queda el proyecto al terminar la clase | Es tu machete. Si alguien se traba, compará contra este. |

Para correr cualquiera de los dos:

```bash
npm install
```

```bash
npm run dev
```

La presentación es [clase-01-typescript.pptx](clase-01-typescript.pptx): 31 slides, con lo que hay que decir en las notas del orador de cada una. La guía sigue el mismo orden; los números entre paréntesis son las slides.

## Agenda sugerida (unas 2 horas)

| Bloque | Tiempo | Contenido | Slides |
|---|---|---|---|
| Apertura | 5 min | Objetivo del módulo y agenda | 1–2 |
| 1. TypeScript más allá de JavaScript | 35 min | Teoría completa de la unidad 1 | 3–15 |
| 2. Entorno y creación del proyecto | 20 min | Pasos 1 y 2 | 16–20 |
| 3. Recorrido por la estructura | 10 min | Paso 3 | 21 |
| 4. Primera interfaz | 30 min | Pasos 4 a 7 | 22–26 |
| 5. Comprobación de tipos y build | 15 min | Pasos 8 y 9, errores frecuentes | 27–29 |
| Cierre | 5 min | Checklist, tarea y próxima clase | 30–31 |

---

## Bloque 1: TypeScript más allá de JavaScript (slides 3–15)

Este bloque recorre la unidad 1 del material en su orden. Antes de ejecutar el primer ejemplo, pedile al grupo que adivine qué muestra la consola (slide 4).

Mostrá en vivo este código en JavaScript:

```js
function calcularTotal(precio, cantidad) {
  return precio * cantidad;
}
calcularTotal("precio", 2); // NaN, y nadie avisa
```

Después mostrá la versión tipada y el error que marca el editor:

```ts
function calcularTotal(precio: number, cantidad: number): number {
  return precio * cantidad;
}
calcularTotal("precio", 2); // Error de TypeScript
```

Ideas que tienen que quedar claras:

- TypeScript es un **superconjunto** de JavaScript. No hay que aprender a programar de nuevo.
- Hay dos formas de tipar: la **anotación explícita** (`let edad: number = 28`) y la **inferencia** (`let edad = 28`).
- El navegador no entiende TypeScript. El código se **transpila** a JavaScript y los tipos desaparecen.
- **En tiempo de compilación** TypeScript te avisa los errores de tipos. **En tiempo de ejecución** pueden fallar otras cosas: una API que devuelve algo raro, un elemento que no existe, un formulario mal completado o una solicitud HTTP que falla. TypeScript no valida automáticamente los datos externos.
- **Tipos como contratos** (slide 13): una `interface Producto` define qué propiedades debe tener un objeto. Es un adelanto del Módulo 2, así que no hace falta profundizar.
- **Errores que previene** (slide 14): propiedades inexistentes, argumentos incorrectos, valores que pueden ser `null` y modificaciones en el código. TypeScript no garantiza una app sin errores.

Como hilo de la clase usamos una imagen: **TypeScript es como un corrector ortográfico**. Subraya mientras escribís, no te impide escribir y lo subrayado no se imprime (los tipos desaparecen al transpilar). La retomamos en el Paso 8.

Para cerrar el bloque está el verdadero o falso de la slide 15: que voten a mano alzada antes de mostrar la respuesta.

## Bloque 2: Entorno y creación del proyecto

### Paso 1. Verificar las herramientas

```bash
node -v
```

```bash
npm -v
```

Si alguno de los dos comandos falla, hay que instalar Node.js LTS desde nodejs.org. Como editor usamos VS Code.

### Paso 2. Crear el proyecto

```bash
npm create vite@latest mi-proyecto -- --template vanilla-ts
```

Si alguien prefiere el asistente interactivo, corre `npm create vite@latest` y elige **Vanilla** y después **TypeScript**.

```bash
cd mi-proyecto
```

```bash
npm install
```

```bash
npm run dev
```

Abrí `http://localhost:5173/`. Se tiene que ver la página de ejemplo de Vite, igual que en `starter/`.

✅ **Checkpoint:** todos ven la página de Vite en el navegador. Para frenar el servidor se usa `Ctrl + C`.

## Bloque 3: Recorrido por la estructura

Abrí `starter/` en VS Code y recorré estos archivos:

- `index.html`: el punto de entrada. Mostrá `<script type="module" src="/src/main.ts">` y explicá que Vite transforma ese `.ts` para que el navegador lo pueda ejecutar.
- `src/main.ts`: acá va la lógica.
- `src/style.css`: los estilos, que se importan desde TypeScript con `import "./style.css"`.
- `package.json`: los scripts `dev`, `build` (que ejecuta `tsc && vite build`) y `preview`.
- `tsconfig.json`: alcanza con decir que existe. Se ve a fondo en la próxima unidad.
- `public/`: archivos estáticos.
- `node_modules/`: no se toca y no se sube a GitHub (para eso está el `.gitignore`).

## Bloque 4: Primera interfaz

### Paso 4. Limpiar el ejemplo de Vite

Borrá `src/counter.ts`, la carpeta `src/assets/` y `public/icons.svg`. Por ahora el editor va a marcar errores en `main.ts`, porque todavía importa esos archivos. Se resuelven en el Paso 6.

### Paso 5. `index.html`

Reemplazá el contenido por:

```html
<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Mi aplicación TypeScript</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
```

> ⚠️ El material pone el `<title>` dentro del `<body>`. Acá está corregido y va en el `<head>`.

### Paso 6. `src/main.ts`, construido de a poco

Conviene escribirlo en vivo en este orden, guardando después de cada paso para que vean el HMR:

**6a. Importar los estilos y declarar variables tipadas.**

```ts
import "./style.css";

const nombreProyecto: string = "Mi aplicación frontend";
const descripcion: string = "Proyecto desarrollado con HTML, CSS y TypeScript.";
```

👉 Mostrá el error en el editor: cambiá el valor a `nombreProyecto = 5` con `let` y pasá el mouse por encima.

**6b. Seleccionar el contenedor y comprobar que no sea null.**

```ts
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
}
```

👉 Sacá el `if` y mostrá que TypeScript avisa que `app` puede ser `null`.

**6c. Agregar el botón y el evento.** Esto va dentro del `if (app)`.

```ts
  const boton = document.querySelector<HTMLButtonElement>("#btnBienvenida");
  const mensaje = document.querySelector<HTMLParagraphElement>("#mensaje");

  if (boton && mensaje) {
    boton.addEventListener("click", () => {
      mensaje.textContent = "¡Tu aplicación TypeScript está funcionando!";
    });
  }
```

> ⚠️ El ejemplo del material tiene un error de sintaxis: le sobra una `}` en el `querySelector` del botón. Si alguien lo copia tal cual del PDF, no compila.

**6d. Un paso más, con inferencia y una función tipada.** Esto es un agregado al material: sirve para practicar "funciones correctamente tipadas", que es uno de los objetivos de la unidad.

Arriba del todo, después de las variables:

```ts
let clics = 0; // inferido como number

function crearMensaje(cantidad: number): string {
  if (cantidad === 1) {
    return "¡Tu aplicación TypeScript está funcionando!";
  }
  return `¡Sigue funcionando! Hiciste clic ${cantidad} veces.`;
}
```

Y dentro del evento:

```ts
    boton.addEventListener("click", () => {
      clics++;
      mensaje.textContent = crearMensaje(clics);
    });
```

### Paso 7. `src/style.css`

Reemplazá el contenido por el que está en `completo/src/style.css` (es el estilo Dracula que propone el material). Cambiá algún color con la app abierta para que vean cómo HMR lo actualiza sin recargar la página.

✅ **Checkpoint:** se ven el título, la descripción y el botón. Al hacer clic aparece el mensaje, y con más clics el contador sube.

## Bloque 5: Comprobación de tipos y build

### Paso 8. Romper el código a propósito

Al final de `main.ts` agregá esta línea:

```ts
crearMensaje("tres");
```

Fijate en tres cosas:

1. El editor lo marca en rojo.
2. `npm run dev` **sigue funcionando**: Vite transpila sin chequear los tipos.
3. Si corrés el chequeo, falla:

```bash
npx tsc --noEmit
```

```
src/main.ts: error TS2345: Argument of type 'string' is not assignable to parameter of type 'number'.
```

💡 Este es el momento clave de la clase: **que la app se vea bien no significa que no tenga errores de tipos.** Borrá la línea antes de seguir.

### Paso 9. Build y preview

```bash
npm run build
```

```bash
npm run preview
```

`build` corre `tsc` y después `vite build`, y genera la carpeta `dist/`. Si dejaste el error del Paso 8, el build falla, y eso está bien: es lo que esperamos.

✅ **Checkpoint final (lo que pide la unidad):**

- [ ] Proyecto creado con Vite + TypeScript
- [ ] HTML inicial con `#app`
- [ ] CSS vinculado desde `main.ts`
- [ ] `main.ts` funcionando
- [ ] Variables y una función tipadas
- [ ] Interacción con un botón
- [ ] `npx tsc --noEmit` sin errores
- [ ] `npm run build` genera `dist/`

## Errores frecuentes en el aula

| Síntoma | Causa probable |
|---|---|
| `npm run dev` dice que no encuentra `package.json` | La terminal está fuera de la carpeta del proyecto |
| `vite: command not found` | Falta correr `npm install` |
| La página queda en blanco | Hay un error en `main.ts`, la ruta del script está mal o no existe `#app`. Revisar la terminal y la consola del navegador. |
| Errores de import después de limpiar | Quedó un `import` de `counter.ts` o de `assets/` |
| El puerto 5173 está ocupado | Vite usa otro puerto: abrir el que aparece en la terminal |

## Cierre (10 min)

- **Repaso:** superconjunto, anotación contra inferencia, compilación contra ejecución, y que `dev` no chequea tipos pero `tsc` y `build` sí.
- **Tarea:** personalizar el título, la descripción y los colores según la temática que cada uno tenga en mente (catálogo, reservas, servicios u otra). Todavía no hace falta decidirla.
- **Próxima clase:** `tsconfig.json` y modo estricto, sobre este mismo proyecto.
