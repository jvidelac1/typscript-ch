import type { Actividad } from "./actividad";
import type { Profesional } from "./profesional";

export type EstadoReserva = "pendiente" | "confirmada" | "cancelada";

export interface Reserva {
  readonly id: number;
  // Composición: la reserva contiene una actividad y un profesional.
  actividad: Actividad;
  profesional: Profesional;
  estado: EstadoReserva;
  notas?: string;
}

export function marcarComoConfirmada(reserva: Reserva): void {
  // ─── Ejercicio 4 · readonly ───────────────────────────────────────────
  // `id` es readonly: no se puede reasignar.
  // En vez de mutar el id, cambiá el estado (o devolvé un objeto nuevo).
  reserva.id = 0;
  reserva.estado = "confirmada";
}
