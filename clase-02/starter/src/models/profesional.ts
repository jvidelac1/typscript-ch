// ─── Ejercicio 1 · tipar un parámetro con una interfaz ──────────────────
// `profesional` queda como `any` implícito hasta que le pongas el tipo.
export interface Profesional {
  readonly id: number;
  nombre: string;
  especialidad: string;
}

export function obtenerEspecialidad(profesional: Profesional): string {
  return profesional.especialidad;
}
