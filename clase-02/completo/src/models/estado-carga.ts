// Unión discriminada: cada variante tiene una propiedad literal distinta (`estado`).
// Así no se pueden mezclar "está cargando" con "tiene datos" y "tiene error" al mismo tiempo.
export type EstadoCarga =
  | { estado: "cargando" }
  | { estado: "exito"; datos: string[] }
  | { estado: "error"; mensaje: string };

export function mensajeCarga(resultado: EstadoCarga): string {
  switch (resultado.estado) {
    case "cargando":
      return "Cargando actividades…";
    case "exito":
      return `Listo: ${resultado.datos.join(", ")}`;
    case "error":
      return `Error: ${resultado.mensaje}`;
  }
}
