// Unión discriminada del material: cada variante tiene un `estado` literal distinto.
export type EstadoCarga =
  | { estado: "cargando" }
  | { estado: "exito"; datos: string[] }
  | { estado: "error"; mensaje: string };

export function mensajeCarga(resultado: EstadoCarga): string {
  // ─── Ejercicio 6 · unión discriminada ─────────────────────────────────
  // `mensaje` solo existe cuando estado es "error".
  // Pista: usá un switch o un if sobre resultado.estado antes de acceder
  // a `datos` o a `mensaje`.
  return resultado.mensaje;
}
