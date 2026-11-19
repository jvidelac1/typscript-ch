// Ejemplo resuelto: una interface describe el contrato de un objeto.
// El resto de los modelos de esta carpeta los completás vos.
// Criterio del material: usamos interface para entidades (objetos del dominio).
export interface Categoria {
  readonly id: number;
  nombre: string;
  descripcion?: string;
}
