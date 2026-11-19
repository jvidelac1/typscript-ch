// Ejercicios de la clase 2: el modo estricto en acción.
//
// Este archivo tiene errores A PROPÓSITO. Todos los ejemplos salen del material.
// Este archivo no se importa desde main.ts, así que `npm run dev` anda igual.
// Para ver los errores, corré:
//
//   npx tsc --noEmit
//
// Tu tarea: corregir cada ejercicio hasta que el comando no muestre nada.
// Usamos `export` para que TypeScript no marque las funciones como "sin usar".

// ─── Ejercicio 1 · noImplicitAny ────────────────────────────────────────
// TypeScript no puede deducir el tipo de estos parámetros.
// Pista: agregá los tipos de los parámetros y del valor de retorno.

export function calcularPrecio(precio, descuento) {
  return precio - descuento;
}

export function mostrarProducto(nombre) {
  console.log(nombre);
}

// ─── Ejercicio 2 · strictNullChecks ─────────────────────────────────────
// La variable no admite null, pero la lógica necesita que pueda no haber usuario.
// Pista: usá `string | null` y comprobá el valor antes de usarlo.

export function saludarUsuario(): void {
  let nombreUsuario: string = "Martina";
  nombreUsuario = null;
  console.log(nombreUsuario.toUpperCase());
}

// ─── Ejercicio 3 · strictPropertyInitialization ─────────────────────────
// La propiedad `nombre` no tiene un valor inicial garantizado.
// Pista: inicializala con un constructor.

export class Producto {
  nombre: string;
}

// ─── Ejercicio 4 · noUnusedLocals ───────────────────────────────────────
// Hay una variable declarada que nunca se usa.

export function mostrarMensaje(): void {
  const mensaje = "Hola";
}

// ─── Ejercicio 5 · noUnusedParameters ───────────────────────────────────
// Hay un parámetro que la función no usa.

export function mostrarNombre(nombre: string, edad: number): void {
  console.log(nombre);
}

// ─── Ejercicio 6 · El error que no se ve: any ───────────────────────────
// Este ejercicio NO muestra ningún error... y ese es el problema.
// `any` apaga las comprobaciones: el código compila, pero en el navegador
// falla, porque `precio` es un número y los números no tienen toUpperCase().
// Pista: sacá el `: any` y dejá que TypeScript infiera el tipo.

export function mostrarPrecio(): void {
  let producto: any = {
    nombre: "Producto de ejemplo",
    precio: 15000,
  };
  console.log(producto.precio.toUpperCase());
}
