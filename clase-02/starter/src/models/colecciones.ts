// ─── Ejercicio 8 · arrays y función tipada ──────────────────────────────
// Tipá los parámetros y el valor de retorno.

export function filtrarPorPrecioMinimo(lista, precioMinimo) {
  return lista.filter((actividad) => actividad.precio >= precioMinimo);
}