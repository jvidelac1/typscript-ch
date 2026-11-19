// ─── Ejercicio 8 · arrays y función tipada ──────────────────────────────
// Tipá los parámetros y el valor de retorno.
// Pista:
//   import type { Actividad } from "./actividad";
//   export function filtrarPorPrecioMinimo(lista: Actividad[], precioMinimo: number): Actividad[]
export function filtrarPorPrecioMinimo(lista, precioMinimo) {
  return lista.filter((actividad) => actividad.precio >= precioMinimo);
}
