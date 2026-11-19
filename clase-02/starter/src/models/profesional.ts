export interface Profesional {
  readonly id: number;
  nombre: string;
  especialidad: string;
}

// ─── Ejercicio 1 · tipar un parámetro con una interfaz ──────────────────
// `profesional` queda como `any` implícito hasta que le pongas el tipo.
// Pista: usá la interfaz Profesional que está arriba.
export function obtenerEspecialidad(profesional): string {
  return profesional.especialidad;
}
