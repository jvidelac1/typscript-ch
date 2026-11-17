// Ejercicios de la clase 2 resueltos: el modo estricto en acción.
//
// Todos los ejemplos salen del material. En el starter este archivo tiene
// errores a propósito; acá está la versión corregida.
// Este archivo no se importa desde main.ts: solo lo revisa `npx tsc --noEmit`.
// Usamos `export` para que TypeScript no marque las funciones como "sin usar".

// ─── Ejercicio 1 · noImplicitAny ────────────────────────────────────────
// Antes: function calcularPrecio(precio, descuento) → los parámetros eran `any`.
// Ahora el compilador sabe qué valores espera la función y qué devuelve.

export function calcularPrecio(precio: number, descuento: number): number {
  return precio - descuento;
}

// `void` indica que la función no devuelve un valor útil.
export function mostrarProducto(nombre: string): void {
  console.log(nombre);
}

// ─── Ejercicio 2 · strictNullChecks ─────────────────────────────────────
// La variable puede contener un texto o null, y lo comprobamos antes de usarla.

export function saludarUsuario(): void {
  let nombreUsuario: string | null = null;
  nombreUsuario = "Martina";

  if (nombreUsuario !== null) {
    console.log(nombreUsuario.toUpperCase());
  }
}

// ─── Ejercicio 3 · strictPropertyInitialization ─────────────────────────
// Cada instancia recibe un nombre al momento de crearse.

export class Producto {
  nombre: string;

  constructor(nombre: string) {
    this.nombre = nombre;
  }
}

// ─── Ejercicio 4 · noUnusedLocals ───────────────────────────────────────
// Usamos la variable (o la borramos si no hacía falta).

export function mostrarMensaje(): void {
  const mensaje = "Hola";
  console.log(mensaje);
}

// ─── Ejercicio 5 · noUnusedParameters ───────────────────────────────────
// Sacamos el parámetro que la función no usaba.

export function mostrarNombre(nombre: string): void {
  console.log(nombre);
}

// ─── Ejercicio 6 · El error que no se ve: any ───────────────────────────
// Sin `: any`, TypeScript infiere el tipo del objeto ({ nombre: string; precio: number })
// y nos habría marcado `producto.precio.toUpperCase()` como error.
// Usamos el método sobre el valor que sí es un texto.

export function mostrarPrecio(): void {
  const producto = {
    nombre: "Producto de ejemplo",
    precio: 15000,
  };
  console.log(`${producto.nombre.toUpperCase()}: $${producto.precio}`);
}
