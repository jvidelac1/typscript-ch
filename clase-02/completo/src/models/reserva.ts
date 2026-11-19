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

export function marcarComoConfirmada(reserva: Reserva): Reserva {
  // No reasignamos id: es readonly. Devolvemos un objeto nuevo con el estado actualizado.
  return {
    ...reserva,
    estado: "confirmada",
  };
}
