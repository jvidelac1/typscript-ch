# Clase 2: Interfaces y modelado de datos

Guía para el docente. Sale del Módulo 2 del material, "Interfaces y modelado de datos" (páginas 64 a 121): las tres unidades, el repaso y la Preentrega 2.

**Objetivo:** al terminar la clase, cada estudiante puede definir interfaces y type aliases, relacionar entidades por composición, tipar una colección, separar un DTO de un modelo de dominio con un mapper, y usar uniones de literales y uniones discriminadas. Se sigue trabajando sobre el proyecto que ya tiene el modo estricto.

> **Sobre el calendario:** este es el contenido de la Semana 2 de Staff. El material oficial da por hecho que en el Módulo 1 ya se configuró el modo estricto y se publicó el repo (Preentrega 1). Si el grupo todavía no subió el proyecto a GitHub, pueden trabajar en local y publicar cuando esté el repo. La entrega de la Preentrega 2 es el enlace al repositorio público.

## Qué hay en esta carpeta

| Carpeta / archivo | Qué es | Para qué lo usás |
|---|---|---|
| `starter/` | El proyecto como quedó con `strict`, más los modelos con huecos y 10 errores a propósito | Punto de partida. `npx tsc --noEmit` tiene que dar 10 errores. `npm run dev` anda igual. |
| `completo/` | Modelos resueltos, catálogo en pantalla y README de las entidades | Tu machete. Es también un ejemplo de lo que pide la Preentrega 2. `npx tsc --noEmit` no muestra nada. |

Para correr cualquiera de los dos, desde su carpeta:

```bash
npm install
npm run dev
```

## Agenda sugerida (unas 2 horas)

| Bloque | Tiempo | Contenido |
|---|---|---|
| Apertura | 5 min | Repaso: el proyecto ya corre y el modo estricto está activo. Hoy modelamos los datos. |
| 1. Interfaces y type aliases | 25 min | Contratos, `readonly`, opcionales, `interface` vs `type`, `extends` |
| 2. Composición, arrays y DTO | 25 min | Composición vs `extends`, `Actividad[]`, filter, DTO + mapper, `src/models/` |
| 3. Uniones y nombres | 20 min | Literales, uniones, uniones discriminadas, nombres del dominio |
| 4. Práctica | 35 min | Los 8 ejercicios y, si hay tiempo, pintar el catálogo en `main.ts` |
| Cierre | 10 min | Errores frecuentes, checklist y Preentrega 2 |

---

## Bloque 1: Interfaces y type aliases

Partí de un objeto de JavaScript (como el del material) y mostrá el problema: nada garantiza que dos "servicios" tengan las mismas propiedades.

```ts
const servicio = {
  id: 1,
  nombre: "Sesión personalizada",
  precio: 15000,
  disponible: true,
};
```

Después, la interfaz como contrato. En el starter, `src/models/categoria.ts` ya está resuelto: es el ejemplo para copiar el patrón.

Marcá `readonly id` y `descripcion?`. Pedí qué pasa si alguien hace `categoria.id = 99` (error) y qué pasa si no mandan `descripcion` (es válido).

Diferencia `interface` vs `type` con la tabla del material. Criterio inicial: interface para entidades, type para uniones y literales. Para un objeto simple, las dos sirven.

👉 **Pregunta para el grupo:** "Si quiero un estado que solo pueda ser disponible, completa o cancelada, ¿interface o type?" Type, con una unión de literales.

Mostrá `extends` (una `ActividadDestacada` que reutiliza `Actividad`) y dejá la intersección (`&`) como dato corto.

> Del material: definir la interfaz no valida lo que llega de una API. Si alguien pregunta, es un adelanto del módulo de asincronismo.

## Bloque 2: Composición, arrays y DTO

Composición: "tiene un", no "es un". Una reserva tiene una actividad y un profesional:

```ts
export interface Reserva {
  readonly id: number;
  actividad: Actividad;
  profesional: Profesional;
  estado: EstadoReserva;
}
```

👉 **Rompelo:** si escribís `interface Reserva extends Actividad, Profesional`, la reserva *es* una actividad y un profesional al mismo tiempo. Es el error de la pregunta 2 del repaso del módulo.

Colección: `const actividades: Actividad[] = [ ... ]` (tres o más). `filter` devuelve `Actividad[]`. `find` devuelve `Actividad | undefined`. `map` puede cambiar el tipo.

DTO + mapper, con el ejemplo del material (nombres en inglés de una API → nombres en español del dominio). El archivo es `src/utils/mapearActividad.ts`. No hace falta una API real.

Estructura de carpetas:

```
src/
  models/
    categoria.ts
    profesional.ts
    actividad.ts
    reserva.ts
    estado-carga.ts
    colecciones.ts
  utils/
    calculos.ts
    mapearActividad.ts
  main.ts
```

Cuando solo se importa un tipo, `import type { Actividad } from "./models/actividad"`. Con `verbatimModuleSyntax` (ya está en el `tsconfig`), TypeScript lo pide.

## Bloque 3: Uniones, literales y nombres

Partí de `let estado: string = "pendiente"` y asigná `"cualquier cosa"`: compila, y la app no debería aceptarlo. Pasá a:

```ts
export type EstadoReserva = "pendiente" | "confirmada" | "cancelada";
```

Unión discriminada: el ejemplo del material (`EstadoCarga` con `"cargando" | "exito" | "error"`). Mostrá por qué una sola interfaz con `datos?` y `error?` permite un objeto imposible (cargando + datos + error). El discriminante `estado` obliga a comprobar antes de acceder.

Nombres autodescriptivos: `Data` no dice nada; `EstadoReserva` sí. PascalCase, sin prefijo `I`. Los nombres salen del dominio (Actividad, Profesional, Reserva).

## Bloque 4: Práctica

Se trabaja sobre el proyecto de cada estudiante. Quien no lo tenga puede usar el `starter/`. El starter ya parte del proyecto con `strict` y los ejercicios adentro.

```bash
npx tsc --noEmit
```

Tienen que aparecer 10 errores:

| # | Archivo | Tema | Error |
|---|---|---|---|
| 1 | `profesional.ts` | Tipar el parámetro con `Profesional` | TS7006 |
| 2 | `actividad.ts` | `EstadoActividad` como unión, no `string` | TS2345 |
| 3 | `actividad.ts` | Agregar `categoria: Categoria` | TS2339 |
| 4 | `reserva.ts` | No reasignar `id` (readonly) | TS2540 |
| 5 | `mapearActividad.ts` | Devolver una `Actividad`, no el DTO | TS2740 |
| 6 | `estado-carga.ts` | `switch` / `if` sobre `resultado.estado` | TS2339 |
| 7 | `actividad.ts` | `ActividadDestacada extends Actividad` | TS2339 |
| 8 | `colecciones.ts` | Tipar la función (`Actividad[]`, `number`) | 3 × TS7006 (los dos parámetros y el de `filter`, que se va al tipar `lista`) |

Se corrigen de a uno y se corre el comando después de cada corrección. Las soluciones están en `completo/src/`.

Si hay tiempo (paso extra): importar los modelos en `main.ts` y mostrar el catálogo. El checkpoint del `completo/` es una tarjeta con actividades, un filtro por precio, un DTO mapeado y dos reservas.

```bash
npm run build
```

Con los ejercicios corregidos, el build pasa. Si queda alguno sin corregir, falla, y eso está bien.

✅ **Checkpoint:** `npx tsc --noEmit` no muestra nada, la pantalla muestra el catálogo (o al menos los modelos compilando) y `npm run build` genera `dist/`.

## Cierre

### Errores frecuentes (del material y del aula)

| Síntoma | Causa probable |
|---|---|
| `profesional` implicitly has an `any` type | Falta el tipo del parámetro (ejercicio 1) |
| `Argument of type 'string' is not assignable to ...` | `EstadoActividad` sigue siendo `string` |
| `Property 'categoria' does not exist` | Falta la composición en `Actividad` |
| `Cannot assign to 'id' because it is a read-only property` | Están mutando un `readonly` |
| `Property 'mensaje' does not exist on type 'EstadoCarga'` | Acceden a la propiedad sin narrowing |
| Usar `any` para "saltear" el mapper | Compila, pero se pierde la comprobación |
| `interface Reserva extends Actividad` | Confundieron composición con herencia |

### Preentrega 2 (decirlo en voz alta)

El `completo/` cubre la consigna, pero la preentrega se hace sobre **la temática de cada estudiante**, en el mismo repo de la Preentrega 1. Pedidos mínimos: 3 interfaces, `readonly` y opcionales, una unión de literales, una composición, un array tipado con ≥3 elementos y una función tipada, un DTO + mapper, archivos en `src/models/` (o similar), README que justifica `interface` vs `type`, `strict` sin `any`, `npm run build` OK.

Aprobación: 70/100. No se exige `Pick`/`Omit`, ni API, ni Firebase, ni una UI compleja. La entrega es el enlace de GitHub, no un PDF.

### Checklist

- [ ] Distinguir `interface` y `type`
- [ ] Usar `readonly` y opcionales
- [ ] Composición de entidades
- [ ] Colección tipada y función tipada
- [ ] DTO y mapper
- [ ] Unión de literales y unión discriminada
- [ ] Modelos organizados en `src/models/`

### Para llevar

- **Tarea:** terminar los 8 ejercicios, mostrar el catálogo y documentar las entidades en el README.
- **Preentrega 2:** aplicar lo mismo a su temática y publicar en GitHub.
- **Próximo tema oficial:** DOM, eventos y formularios (Módulo 3). Si el grupo todavía no tiene el repo público, conviene resolverlo antes de la preentrega.
