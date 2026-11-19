// Unión discriminada del material: cada variante tiene un `estado` literal distinto.
export type EstadoCarga =
  | { estado: "cargando" }
  | { estado: "exito"; datos: string[] }
  | { estado: "error"; mensaje: string };

export function mensajeCarga(resultado: EstadoCarga): string {
  // ─── Ejercicio 6 · unión discriminada ─────────────────────────────────
  switch(resultado.estado) {
    case "cargando":
      return "Cargando...";
    case "exito":
      return "Carga exitosa";
    case "error":
      return resultado.mensaje;
  }
}
