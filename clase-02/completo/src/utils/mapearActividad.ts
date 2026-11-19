import type { Actividad } from "../models/actividad";
import type { Categoria } from "../models/categoria";

// DTO: la forma en la que llegan los datos de afuera (por ejemplo, de una API).
// Los nombres no coinciden con los de nuestro modelo de dominio.
export interface ActividadDTO {
  activity_id: number;
  activity_name: string;
  duration_min: number;
  price_amount: number;
  spots_available: number;
  status: "disponible" | "completa" | "cancelada";
  category_id: number;
  category_name: string;
  description?: string;
}

// Mapper: transforma el DTO al modelo que usa la aplicación.
export function mapearActividad(
  datos: ActividadDTO,
  categoria: Categoria,
): Actividad {
  return {
    id: datos.activity_id,
    nombre: datos.activity_name,
    duracionMinutos: datos.duration_min,
    precio: datos.price_amount,
    cuposDisponibles: datos.spots_available,
    descripcion: datos.description,
    categoria,
    estado: datos.status,
  };
}
