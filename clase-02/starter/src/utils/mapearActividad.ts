import type { Actividad } from "../models/actividad";
import type { Categoria } from "../models/categoria";

// DTO: la forma en la que llegan los datos de afuera (por ejemplo, de una API).
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

// ─── Ejercicio 5 · mapper ───────────────────────────────────────────────
// Esta función tiene que devolver una Actividad, no el DTO.
// Mapeá cada propiedad (activity_id → id, activity_name → nombre, etc.)
// y asigná `categoria` en el objeto (categoria: categoria).
export function mapearActividad(
  datos: ActividadDTO,
  categoria: Categoria,
): Actividad {
  if (categoria.id < 0) {
    throw new Error("Categoría inválida");
  }
  return datos;
}
