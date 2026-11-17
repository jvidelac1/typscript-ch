# Clase 2: El compilador y el modo estricto

En esta clase seguimos con **el mismo proyecto de la clase 1**. Esta vez no creamos nada nuevo: aprendimos a **leer y configurar las reglas** que TypeScript aplica sobre nuestro código. Abrimos el archivo `tsconfig.json`, activamos el **modo estricto** de forma explícita y corregimos errores con los ejemplos del material.

## Qué hay en esta carpeta

| Carpeta / archivo | Qué es |
|---|---|
| [`starter/`](starter) | El proyecto como terminó la clase 1, más un archivo de ejercicios con errores a propósito. Es el punto de partida. |
| [`completo/`](completo) | Cómo queda el proyecto al terminar la clase: `tsconfig.json` comentado, un módulo nuevo y los ejercicios resueltos. |
| [`clase-02-typescript.pptx`](clase-02-typescript.pptx) | La presentación de la clase. |

## Cómo correr los proyectos

Desde la carpeta del proyecto que quieras correr (`starter` o `completo`):

```bash
npm install          # instala las dependencias (solo la primera vez)
npm run dev          # levanta la app en http://localhost:5173
npx tsc --noEmit     # revisa los tipos de todo el proyecto
```

> En el `starter`, `npx tsc --noEmit` muestra **7 errores**. Es a propósito: son los ejercicios de la clase.

## Lo que vimos en clase

### 1. El compilador: `tsc`

`tsc` (*TypeScript Compiler*) es la herramienta que **analiza** los archivos `.ts` y comprueba que respeten las reglas de tipos. También **puede transformar** TypeScript en JavaScript, según cómo esté configurado.

```ts
const nombre: string = "Lucía";
const precio: number = 15000;

const otroPrecio: number = "15000"; // ❌ Error: un string no es asignable a number
```

| Comando | Qué hace |
|---|---|
| `npx tsc` | Comprueba los archivos y, cuando corresponde, genera JavaScript |
| `npx tsc --noEmit` | Solo comprueba. No genera archivos |

> ⚠️ Que `tsc` no encuentre errores **no significa que el programa funcione**. El compilador analiza el código, pero no reemplaza probar la app.

### 2. El archivo `tsconfig.json`

Es la configuración que TypeScript usa para trabajar con el proyecto. Define:

- qué archivos se analizan,
- qué reglas de tipado se aplican,
- qué partes del lenguaje están disponibles,
- cómo se manejan los módulos,
- si se generan archivos JavaScript.

Las partes principales:

| Parte | Para qué sirve |
|---|---|
| `compilerOptions` | El objeto con todas las reglas |
| `include` | Qué carpetas se analizan. El nuestro: solo `src` |
| `exclude` | Saca archivos de esa selección. Ojo: un archivo excluido entra igual si otro archivo incluido lo importa |

> 💡 **No reemplaces el `tsconfig.json` que creó Vite** por uno copiado de otro lado. Las opciones dependen de las herramientas que usa cada proyecto. Primero hay que entenderlo.

En [`completo/tsconfig.json`](completo/tsconfig.json) tenés **cada opción comentada**.

### 3. Las opciones principales

No hace falta memorizarlas, pero sí reconocerlas:

| Opción | En nuestro proyecto | Qué hace |
|---|---|---|
| `target` | `"es2023"` | Hacia qué versión de JavaScript se transforma el código |
| `lib` | `["ES2023", "DOM"]` | Qué tipos están disponibles. `DOM` es lo que hace que TypeScript conozca `document`, `window`, `HTMLElement`... |
| `module` | `"esnext"` | El sistema de módulos: `import` y `export` |
| `moduleResolution` | `"bundler"` | Cómo TypeScript encuentra el archivo de cada `import`. `"bundler"` está pensado para herramientas como Vite |

**Un módulo** es un archivo que exporta algo para que otro lo use:

```ts
// src/utils/calculos.ts
export function calcularTotal(precio: number, cantidad: number): number {
  return precio * cantidad;
}
```

```ts
// src/main.ts
import { calcularTotal } from "./utils/calculos";

const total = calcularTotal(15000, 2); // 30000
```

### 4. El modo estricto: `strict`

```json
"strict": true
```

Activa un conjunto de comprobaciones más exigentes. **No obliga a escribir todos los tipos**: la inferencia sigue funcionando. Vimos tres de sus reglas:

#### `noImplicitAny`: nada de `any` escondido

Si TypeScript no puede deducir un tipo, no lo deja pasar como `any`.

```ts
function mostrarProducto(nombre) { }               // ❌ nombre sería any
function mostrarProducto(nombre: string): void { }  // ✅
```

> `void` significa que la función no devuelve un valor útil.

#### `strictNullChecks`: `null` no se cuela

Si una variable puede estar vacía, hay que decirlo y comprobarlo antes de usarla.

```ts
let nombreUsuario: string = "Martina";
nombreUsuario = null; // ❌ Error

let otroUsuario: string | null = null; // ✅ puede ser texto o null
if (otroUsuario !== null) {
  console.log(otroUsuario.toUpperCase());
}
```

> Ya lo usamos en la clase 1: el `if (app)` después del `querySelector`.

#### `strictPropertyInitialization`: las propiedades necesitan valor

```ts
class Producto {
  nombre: string; // ❌ no tiene un valor inicial garantizado
}

class Producto {
  nombre: string;
  constructor(nombre: string) {
    this.nombre = nombre; // ✅ cada producto recibe su nombre al crearse
  }
}
```

> Las clases las vemos más adelante en el curso.

#### Dato importante sobre nuestro proyecto

En nuestro `tsconfig.json` original **no aparece** `"strict": true`... pero el modo estricto **igual está activo**: en TypeScript 7 viene activado por defecto. En la clase lo agregamos para que el archivo diga lo que hace.

### 5. Otras configuraciones útiles

| Opción | Qué detecta |
|---|---|
| `noUnusedLocals` | Variables que declarás y nunca usás |
| `noUnusedParameters` | Parámetros que una función recibe y no usa |
| `noEmit` | No es un detector: hace que `tsc` solo compruebe, sin generar `.js`. La transformación la hace Vite |

Por eso el script `build` es `tsc && vite build`: **`tsc` revisa** los tipos y, si no hay errores, **Vite arma** la carpeta `dist/`.

### 6. ¿Quién hace qué? TypeScript y Vite

| TypeScript | Vite |
|---|---|
| Comprueba los tipos del código | Da el servidor de desarrollo |
| Analiza las reglas configuradas | Procesa los módulos de la aplicación |
| Detecta incompatibilidades de tipos | Transforma TypeScript para ejecutarlo |
| Puede generar JavaScript | Genera los archivos optimizados para producción |

> Algunos proyectos de Vite tienen tres archivos: `tsconfig.json`, `tsconfig.app.json` y `tsconfig.node.json`. El nuestro tiene uno solo. **La estructura puede variar** según la versión y la plantilla.

## 🛠️ Ejercicios

En [`starter/src/ejercicios/modo-estricto.ts`](starter/src/ejercicios/modo-estricto.ts) hay 6 ejercicios con los ejemplos del material. Copiá ese archivo a tu proyecto (en la misma ruta) y corré:

```bash
npx tsc --noEmit
```

Corregí los errores de a uno, hasta que el comando no muestre nada.

| # | Regla | Errores |
|---|---|---|
| 1 | `noImplicitAny` | 3 |
| 2 | `strictNullChecks` | 1 |
| 3 | `strictPropertyInitialization` | 1 |
| 4 | `noUnusedLocals` | 1 |
| 5 | `noUnusedParameters` | 1 |
| 6 | `any` | **0... y ese es el problema** |

El ejercicio 6 compila sin errores, pero falla en el navegador: `any` apaga las comprobaciones de TypeScript. Las soluciones están en [`completo/src/ejercicios/modo-estricto.ts`](completo/src/ejercicios/modo-estricto.ts). Intentá resolverlos antes de mirarlas.

> 🧪 **Probá esto:** corré `npx tsc --noEmit --strict false` en el `starter`. De 7 errores quedan solo 2. Los otros 5 **siguen en el código**: apagar `strict` no los arregla, los esconde.

## Errores frecuentes

| Tentación | Por qué no |
|---|---|
| Desactivar `strict` para que no haya errores | Los errores siguen ahí: solo dejás de verlos |
| Usar `any` para resolver todo | Compila, pero TypeScript deja de comprobar |
| Copiar un `tsconfig.json` de otro proyecto | Las opciones dependen de las herramientas de cada proyecto |
| Pensar que compilar es lo mismo que funcionar | Una respuesta de una API puede fallar aunque `tsc` no marque nada |

## Glosario rápido

- **`tsc`:** el compilador de TypeScript. Revisa los tipos y puede generar JavaScript.
- **`tsconfig.json`:** el archivo de configuración de TypeScript.
- **`compilerOptions`:** el objeto del `tsconfig.json` con todas las reglas.
- **Modo estricto (`strict`):** un conjunto de comprobaciones más exigentes.
- **`any`:** un tipo que apaga las comprobaciones. Lo evitamos.
- **`void`:** el tipo de retorno de una función que no devuelve nada útil.
- **`string | null`:** "puede ser un texto o `null`".
- **Módulo:** un archivo que exporta algo (`export`) para que otro lo importe (`import`).

## ✅ Checklist de la clase

- [ ] Reconozco qué hace el compilador de TypeScript
- [ ] Entiendo la estructura general de `tsconfig.json`
- [ ] Identifico `target`, `lib`, `module` y `moduleResolution`
- [ ] Agregué `"strict": true` a mi `tsconfig.json`
- [ ] Separé `calcularTotal` en `src/utils/calculos.ts`
- [ ] Corregí los ejercicios: `npx tsc --noEmit` no muestra errores
- [ ] Sé qué hace TypeScript y qué hace Vite

## Para la próxima clase

- **Tarea:** terminá los 6 ejercicios y dejá tu `tsconfig.json` comentado con tus palabras: un comentario `//` arriba de cada opción.
- **Próximo tema:** Git y GitHub. Vamos a subir este mismo proyecto a un repositorio público.
