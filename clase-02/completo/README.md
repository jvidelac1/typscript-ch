# Estudio de actividades

Aplicación frontend con Vite y TypeScript. En esta etapa le sumamos una capa de modelos de datos (Módulo 2 / Preentrega 2).

## Cómo correrla

```bash
npm install
npm run dev
```

Para comprobar los tipos y armar la versión de producción:

```bash
npx tsc --noEmit
npm run build
```

## Entidades

El dominio es un estudio que ofrece actividades, con profesionales y reservas.

| Modelo | Herramienta | Por qué |
|---|---|---|
| `Categoria` | `interface` | Es una entidad (objeto) que otras pueden reutilizar. |
| `Profesional` | `interface` | Igual: describe a la persona que dicta la actividad. |
| `Actividad` | `interface` | Entidad principal. *Tiene* una `Categoria` (composición) y un `estado`. |
| `Reserva` | `interface` | Composición: contiene una `Actividad` y un `Profesional`. |
| `ActividadDestacada` | `interface` + `extends` | Reutiliza `Actividad` y suma `destacado`. |
| `EstadoActividad`, `EstadoReserva` | `type` + unión de literales | No son objetos: son un conjunto cerrado de textos permitidos. |
| `EstadoCarga` | `type` + unión discriminada | Cada variante tiene una forma distinta (`cargando`, `exito`, `error`). |
| `ActividadDTO` | `interface` | Forma externa (nombres en inglés, como vendría de una API). |

`id` es `readonly` en las entidades. `descripcion` y `notas` son opcionales.

## Relaciones

- Una `Actividad` tiene una `Categoria`.
- Una `Reserva` tiene una `Actividad` y un `Profesional`.
- `src/models/colecciones.ts` arma un array `Actividad[]` con tres actividades y la función `filtrarPorPrecioMinimo`.
- `src/utils/mapearActividad.ts` transforma un `ActividadDTO` al modelo `Actividad`.

Elegimos `interface` para las entidades porque describen objetos y se pueden extender. Elegimos `type` para los estados y para `EstadoCarga` porque son uniones, no objetos simples.
