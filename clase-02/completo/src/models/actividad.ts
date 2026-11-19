import type { Categoria } from "./categoria";

// type alias + unión de literales: solo admite estos tres valores, no cualquier string.
export type EstadoActividad = "disponible" | "completa" | "cancelada";

export interface Actividad {
  readonly id: number;
  nombre: string;
  duracionMinutos: number;
  precio: number;
  cuposDisponibles: number;
  descripcion?: string;
  // Composición: la actividad *tiene* una categoría (no hereda de ella).
  categoria: Categoria;
  estado: EstadoActividad;
}

// Extender una interfaz: reutilizamos Actividad y sumamos una propiedad.
export interface ActividadDestacada extends Actividad {
  destacado: true;
}

export function etiquetaEstado(estado: EstadoActividad): string {
  if (estado === "disponible") {
    return "Hay cupos";
  }
  if (estado === "completa") {
    return "Sin cupos";
  }
  return "Cancelada";
}

export function nombreCategoria(actividad: Actividad): string {
  return actividad.categoria.nombre;
}

export function puedeInscribirse(actividad: Actividad): boolean {
  return actividad.estado === "disponible" && actividad.cuposDisponibles > 0;
}

export function mostrarEtiqueta(actividad: Actividad): string {
  // Con EstadoActividad tipado como unión, esto compila sin problemas.
  return etiquetaEstado(actividad.estado);
}

export function tituloDestacada(actividad: ActividadDestacada): string {
  return actividad.nombre;
}
