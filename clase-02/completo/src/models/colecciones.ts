import type { Categoria } from "./categoria";
import type { Actividad } from "./actividad";
import type { Profesional } from "./profesional";
import type { Reserva } from "./reserva";

export const bienestar: Categoria = {
  id: 1,
  nombre: "Bienestar",
  descripcion: "Actividades de movimiento y relax",
};

export const ana: Profesional = {
  id: 1,
  nombre: "Ana López",
  especialidad: "Yoga",
};

export const martin: Profesional = {
  id: 2,
  nombre: "Martín Ruiz",
  especialidad: "Entrenamiento",
};

export const actividades: Actividad[] = [
  {
    id: 1,
    nombre: "Yoga",
    duracionMinutos: 60,
    precio: 15000,
    cuposDisponibles: 5,
    descripcion: "Clase de yoga para todos los niveles",
    categoria: bienestar,
    estado: "disponible",
  },
  {
    id: 2,
    nombre: "Pilates",
    duracionMinutos: 45,
    precio: 12000,
    cuposDisponibles: 0,
    categoria: bienestar,
    estado: "completa",
  },
  {
    id: 3,
    nombre: "Funcional",
    duracionMinutos: 50,
    precio: 18000,
    cuposDisponibles: 8,
    categoria: bienestar,
    estado: "disponible",
  },
];

export function filtrarPorPrecioMinimo(
  lista: Actividad[],
  precioMinimo: number,
): Actividad[] {
  return lista.filter((actividad) => actividad.precio >= precioMinimo);
}

export const reservas: Reserva[] = [
  {
    id: 1,
    actividad: actividades[0],
    profesional: ana,
    estado: "confirmada",
  },
  {
    id: 2,
    actividad: actividades[2],
    profesional: martin,
    estado: "pendiente",
    notas: "Prefiere el turno de la tarde",
  },
];
