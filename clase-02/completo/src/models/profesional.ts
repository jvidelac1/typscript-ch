export interface Profesional {
  readonly id: number;
  nombre: string;
  especialidad: string;
}

export function obtenerEspecialidad(profesional: Profesional): string {
  return profesional.especialidad;
}
