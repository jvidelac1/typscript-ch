// ─── Ejercicio 2 · type alias y unión de literales ──────────────────────
// EstadoActividad no puede ser cualquier string.
// Tiene que admitir solo: "disponible" | "completa" | "cancelada".
export type EstadoActividad = string;

export interface Actividad {
  readonly id: number;
  nombre: string;
  duracionMinutos: number;
  precio: number;
  cuposDisponibles: number;
  descripcion?: string;
  // ─── Ejercicio 3 · composición ────────────────────────────────────────
  // Una actividad *tiene* una categoría.
  // Agregá:  categoria: Categoria;
  // y el import:  import type { Categoria } from "./categoria";
  estado: EstadoActividad;
}

export function etiquetaEstado(estado: "disponible" | "completa" | "cancelada"): string {
  if (estado === "disponible") {
    return "Hay cupos";
  }
  if (estado === "completa") {
    return "Sin cupos";
  }
  return "Cancelada";
}

export function nombreCategoria(actividad: Actividad): string {
  // Hasta que agregues `categoria` a la interfaz, esta línea marca error.
  return actividad.categoria.nombre;
}

export function puedeInscribirse(actividad: Actividad): boolean {
  return actividad.estado === "disponible" && actividad.cuposDisponibles > 0;
}

export function mostrarEtiqueta(actividad: Actividad): string {
  // Error a propósito: EstadoActividad es `string`, y etiquetaEstado no acepta cualquier string.
  return etiquetaEstado(actividad.estado);
}

// ─── Ejercicio 7 · extends ──────────────────────────────────────────────
// En vez de repetir las propiedades, extendé Actividad:
//   export interface ActividadDestacada extends Actividad { destacado: true }
export interface ActividadDestacada {
  destacado: true;
}

export function tituloDestacada(actividad: ActividadDestacada): string {
  // Error a propósito: `nombre` no existe hasta que la interfaz extienda Actividad.
  return actividad.nombre;
}
