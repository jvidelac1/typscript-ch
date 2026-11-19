// Una interface describe el contrato de un objeto: qué propiedades tiene y de qué tipo.
// Criterio del material: usamos interface para entidades que representan objetos del dominio.
export interface Categoria {
  readonly id: number;
  nombre: string;
  descripcion?: string;
}
