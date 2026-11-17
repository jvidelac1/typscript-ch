# Clase 2: El compilador y el modo estricto

Guía para el docente. Sale de la unidad "Configuración del compilador y modo estricto" (Módulo 1 del material, páginas 30 a 42).

**Objetivo:** al terminar la clase, cada estudiante entiende qué hace `tsc`, puede leer el `tsconfig.json` de su proyecto opción por opción y sabe corregir los errores que marca el modo estricto. Se sigue trabajando sobre el proyecto de la clase 1, sin reemplazar su configuración.

## Qué hay en esta carpeta

| Carpeta / archivo | Qué es | Para qué lo usás |
|---|---|---|
| `starter/` | El proyecto como terminó la clase 1, con el `tsconfig.json` original de Vite y un archivo de ejercicios con errores a propósito | Es el punto de partida. `npx tsc --noEmit` tiene que dar 7 errores. |
| `completo/` | Cómo queda al terminar la clase: `tsconfig.json` comentado, `strict` explícito, un módulo y los ejercicios resueltos | Es tu machete. `npx tsc --noEmit` no muestra nada. |
| `clase-02-typescript.pptx` | La presentación: 31 slides con notas del orador | La guía sigue el mismo orden. |

Para correr cualquiera de los dos, desde su carpeta:

```bash
npm install
```

```bash
npm run dev
```

## Agenda sugerida (unas 2 horas)

| Bloque | Tiempo | Contenido | Slides |
|---|---|---|---|
| Apertura | 5 min | Repaso de la clase 1 y objetivo | 1–2 |
| 1. El compilador y `tsconfig.json` | 20 min | Qué es `tsc`, qué define el archivo, `include` y `exclude` | 3–8 |
| 2. Principales opciones | 15 min | `target`, `lib`, `module`, `moduleResolution` | 9–12 |
| 3. El modo estricto | 30 min | `strict` y sus tres reglas, otras opciones, TypeScript y Vite | 13–22 |
| 4. Práctica | 40 min | Pasos 1 a 5 | 23–27 |
| Cierre | 10 min | Errores frecuentes, verdadero o falso, checklist y próxima clase | 28–31 |

---

## Bloque 1: El compilador y `tsconfig.json` (slides 3–8)

### Qué es `tsc` (slide 4)

El compilador analiza los `.ts` y comprueba que respeten las reglas de tipos. También puede transformar el código en JavaScript, según la configuración. Ejemplo del material:

```ts
const nombre: string = "Lucía";
const precio: number = 15000;
console.log(`${nombre} seleccionó un producto de $${precio}`);

const precio2: number = "15000"; // Error: string no es asignable a number
```

### `npx tsc` y `npx tsc --noEmit` (slide 5)

- `npx tsc` usa la configuración del proyecto para comprobar y, cuando corresponde, generar JavaScript.
- `npx tsc --noEmit` solo comprueba.

👉 **Pregunta para el grupo:** "Si corro `npx tsc` en nuestro proyecto, ¿aparecen archivos `.js`?" No aparecen, porque el `tsconfig.json` ya tiene `"noEmit": true`. Es la forma de mostrar que el archivo de configuración manda.

Para ver que `tsc` **sí** puede generar JavaScript, mostrá esta demo opcional. Compila un archivo suelto ignorando la configuración:

```bash
npx tsc --ignoreConfig src/utils/calculos.ts --outDir salida
```

Abrí `salida/calculos.js`: es la misma función sin los tipos. Después borrá la carpeta `salida/`. (Esta demo necesita que ya exista `src/utils/calculos.ts`. Si la querés hacer en este momento, usá el `completo/`.)

> **Importante (del material):** encontrar errores de tipos no significa que el programa se haya ejecutado. El compilador analiza el código, pero no reemplaza las pruebas de funcionamiento.

### Qué define `tsconfig.json` (slides 6–7)

Qué archivos analizar, qué reglas aplicar, qué partes del lenguaje están disponibles, cómo se manejan los módulos y si se generan archivos JavaScript.

El material muestra este ejemplo introductorio:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "strict": true,
    "noEmit": true
  },
  "include": ["src"]
}
```

⚠️ **No es igual al de nuestro proyecto, y está bien.** El mismo material aclara que es introductorio y que no hay que reemplazar la configuración que genera la herramienta. La slide 7 compara los dos archivos:

| | Material | Nuestro proyecto (Vite + TypeScript 7) |
|---|---|---|
| `target` / `lib` | `ES2022` | `es2023` (una versión más nueva de JS) |
| `DOM.Iterable` | Aparece en `lib` | No aparece: en TypeScript 7 ya está incluido dentro de `DOM` (lo comprobamos recorriendo un `querySelectorAll` con `for...of`) |
| `strict` | `true` | No aparece: en TypeScript 7 viene activado por defecto. En el Paso 2 lo escribimos para que quede explícito. |
| Opciones extra | No tiene | Tiene `types`, `noUnusedLocals`, `noUnusedParameters`, `erasableSyntaxOnly` y otras. |

### `compilerOptions`, `include` y `exclude` (slide 8)

- `compilerOptions` es el objeto con las reglas.
- `include` indica qué se analiza. Nuestro proyecto analiza solo `src`.
- `exclude` saca archivos de esa selección, pero **no es una prohibición absoluta**: un archivo excluido entra igual si otro archivo incluido lo importa.

## Bloque 2: Principales opciones (slides 9–12)

"No hace falta memorizarlas, sí reconocerlas."

- **`target`:** la versión de JavaScript hacia la que se transforma el código. Depende de qué navegadores hay que soportar.
- **`lib`:** las definiciones de tipos disponibles. `DOM` es lo que hace que TS conozca `document`, `window`, `HTMLElement`, `HTMLInputElement` y `fetch`.
  👉 **Rompelo:** sacá `"DOM"` de `lib` y corré `npx tsc --noEmit`. Todo lo que usa `document` se pone en rojo. Después volvé a ponerlo.
- **`module`:** el sistema de módulos, o sea los `import` y `export`. Usamos el ejemplo del material, `src/utils/calculos.ts`, que es el Paso 3 de la práctica.
- **`moduleResolution`:** cómo TS encuentra el archivo de cada `import`. Con Vite se usa `"bundler"`. No se toca seguido, pero conviene conocerlo para cuando haya problemas con las importaciones.

## Bloque 3: El modo estricto (slides 13–22)

### Por qué `strict` (slide 14)

```ts
function calcularPrecio(precio, descuento) {
  return precio - descuento;
}
```

Sin el modo estricto, `precio` y `descuento` quedan como `any` implícito y el compilador no puede detectar nada. Con tipos, sabe qué espera y qué devuelve. El modo estricto **no obliga a escribir todos los tipos**: la inferencia sigue funcionando.

### Las tres reglas del material (slides 15–17)

| Regla | Ejemplo del material | Error en TypeScript 7 | Cómo se corrige |
|---|---|---|---|
| `noImplicitAny` | `function mostrarProducto(nombre)` | TS7006 | `nombre: string` y `: void` |
| `strictNullChecks` | `let nombreUsuario: string = "Martina"; nombreUsuario = null;` | TS2322 | `string \| null` y `if (nombreUsuario !== null)` |
| `strictPropertyInitialization` | `class Producto { nombre: string; }` | TS2564 | Inicializarla en el `constructor` |

Para `strictPropertyInitialization` alcanza con mostrarlo: el material aclara que la programación orientada a objetos se ve más adelante.

### Momento clave: ¿qué pasa si apago `strict`? (slide 18)

Pedile al grupo que **apueste** cuántos de los 7 errores del archivo de ejercicios desaparecen. Después corré, en el `starter/`:

```bash
npx tsc --noEmit --strict false
```

Quedan solo 2, los de `noUnusedLocals` y `noUnusedParameters`, porque esas reglas no son parte de `strict`. Los otros 5 **siguen estando en el código**: solo dejamos de verlos. Es el primer error frecuente del material: "desactivar strict para evitar errores".

### Otras configuraciones útiles (slides 19–20)

- `noUnusedLocals`: variables declaradas que no se usan (`const mensaje = "Hola"`).
- `noUnusedParameters`: parámetros que no se usan (`edad` en `mostrarNombre`).
- `noEmit`: usar TS solo para comprobar. Es lo habitual cuando otra herramienta (Vite) transforma y empaqueta.

### TypeScript y Vite (slides 21–22)

| TypeScript | Vite |
|---|---|
| Comprueba los tipos del código | Da el servidor de desarrollo |
| Analiza las reglas configuradas | Procesa los módulos de la aplicación |
| Detecta incompatibilidades de tipos | Transforma TypeScript para su ejecución |
| Puede generar JavaScript | Genera los archivos optimizados para producción |

El material menciona proyectos con `tsconfig.app.json` y `tsconfig.node.json`. **Nuestra plantilla genera un solo `tsconfig.json`**, y el material lo contempla: "la estructura puede variar según la versión y la plantilla". Si algún estudiante tiene los tres archivos, el `tsconfig.json` funciona como entrada y las opciones del navegador están en `tsconfig.app.json`.

> ⚠️ **Error del material:** al final de la sección 7 dice "En la próxima unidad vamos a trabajar directamente con Vite". Ya lo hicimos en la clase 1, así que no lo leas tal cual.

## Bloque 4: Práctica (slides 23–27)

Se trabaja sobre el proyecto de cada estudiante. Quien no lo tenga puede usar el `starter/`.

### Paso 1. Leer el `tsconfig.json` (slide 24)

En parejas, cada opción del archivo se clasifica en una de tres categorías: **entorno** (`target`, `lib`, `module`, `moduleResolution`, `types`), **modo estricto y prolijidad** (`noUnused...`, `noFallthrough...`, `erasableSyntaxOnly`) o **qué hace tsc** (`noEmit`, `include`). Cada uno escribe un comentario `//` arriba de cada opción. El archivo admite comentarios aunque sea `.json`. La versión comentada completa está en `completo/tsconfig.json`.

### Paso 2. Hacer explícito el modo estricto (slide 25)

Dentro de `compilerOptions`, agregá:

```json
"strict": true,
```

Corré `npx tsc --noEmit`: no cambia nada, porque ya estaba activo. Ahora el archivo dice lo que hace.

### Paso 3. Separar código en un módulo (slide 26)

Creá `src/utils/calculos.ts`:

```ts
export function calcularTotal(precio: number, cantidad: number): number {
  return precio * cantidad;
}
```

En `src/main.ts`, importala y mostrá el total en la tarjeta:

```ts
import { calcularTotal } from "./utils/calculos";

const precio: number = 15000;
const cantidad: number = 2;
const total = calcularTotal(precio, cantidad);
```

```html
<p class="total">${cantidad} productos de $${precio} = <strong>$${total}</strong></p>
```

👉 **Rompelo:** llamá `calcularTotal("15000", 2)` y mostrá que el error se marca en `main.ts`, aunque la función esté en otro archivo.

### Paso 4. Los ejercicios del modo estricto (slide 27)

Copiá `starter/src/ejercicios/modo-estricto.ts` en el proyecto, en la misma ruta. Tiene los ejemplos del material, con errores a propósito. No se importa desde `main.ts`, así que `npm run dev` sigue andando.

```bash
npx tsc --noEmit
```

Tienen que aparecer 7 errores:

| Ejercicio | Regla | Errores |
|---|---|---|
| 1 | `noImplicitAny` | 3 (TS7006) |
| 2 | `strictNullChecks` | 1 (TS2322) |
| 3 | `strictPropertyInitialization` | 1 (TS2564) |
| 4 | `noUnusedLocals` | 1 (TS6133) |
| 5 | `noUnusedParameters` | 1 (TS6133) |
| 6 | `any` | **0**, y ese es el problema |

Se corrigen de a uno y se corre el comando después de cada corrección. El ejercicio 6 es el más importante: `producto.precio.toUpperCase()` compila porque `producto` es `any`, pero falla en el navegador. Al sacar el `: any`, TypeScript infiere el tipo y marca el error. Las soluciones están en `completo/src/ejercicios/modo-estricto.ts`.

### Paso 5. Build

```bash
npm run build
```

Con los ejercicios corregidos, el build pasa. Si queda alguno sin corregir, falla, y eso está bien.

✅ **Checkpoint:** `npx tsc --noEmit` no muestra nada, la tarjeta muestra "2 productos de $15000 = $30000" y `npm run build` genera `dist/`.

## Cierre (slides 28–31)

### Errores frecuentes (del material)

1. **Desactivar `strict` para evitar errores.** Los errores siguen ahí; lo que se pierde es la posibilidad de verlos.
2. **Usar `any` para resolver todo.** Compila, pero TS deja de comprobar.
3. **Copiar un `tsconfig.json` de otro proyecto.** Las opciones dependen del entorno y de las herramientas.
4. **Confundir compilar con funcionar.** Una respuesta HTTP puede fallar aunque `tsc` no muestre errores.

### Errores frecuentes en el aula

| Síntoma | Causa probable |
|---|---|
| `Cannot find module './utils/calculos'` | El archivo no está en `src/utils/`, o el nombre está mal escrito |
| `npx tsc` no genera ningún `.js` | Es lo esperado: el `tsconfig.json` tiene `"noEmit": true` |
| El `tsconfig.json` deja de funcionar al agregar `strict` | Falta una coma: `"strict": true,` |
| `error TS5112` al correr `tsc` con un archivo | Desde TS 7, para compilar un archivo suelto con un `tsconfig.json` presente hay que agregar `--ignoreConfig` |
| Ningún error en el ejercicio 6 | Es lo esperado: `any` apaga las comprobaciones |

### Checklist (el "aprendimos a" del material)

- [ ] Reconocer la función del compilador de TypeScript
- [ ] Comprender la estructura general de `tsconfig.json`
- [ ] Identificar `target`, `lib`, `module` y `moduleResolution`
- [ ] Usar el modo estricto para detectar incompatibilidades
- [ ] Conocer `noImplicitAny`, `strictNullChecks` y `strictPropertyInitialization`
- [ ] Diferenciar las responsabilidades de TypeScript y Vite

### Para llevar

- **Tarea:** terminar los 6 ejercicios y dejar el `tsconfig.json` propio comentado con sus palabras.
- **Próxima clase:** Git y GitHub. Vamos a subir este mismo proyecto a un repositorio público, que se actualiza con cada preentrega.
