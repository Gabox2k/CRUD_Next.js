# CRUD Clientes — Next.js + SQLite

Aplicación web para gestionar clientes con operaciones CRUD completas. Construida con Next.js 15+, TypeScript y SQLite.

---

## Tecnologías

- **Next.js 16** — Framework de React con App Router
- **TypeScript** — Tipado estático
- **SQLite** — Base de datos local mediante `sqlite` y `sqlite3`
- **Turbopack** — Bundler de desarrollo

---

## Estructura del proyecto

```
clientes-app/
├── app/
│   ├── page.tsx                        # Listado principal de clientes
│   ├── layout.tsx                      # Layout global
│   ├── globals.css                     # Estilos globales
│   ├── api/
│   │   └── clientes/
│   │       └── route.js                # API REST (GET, POST, PUT, DELETE)
│   └── clientes/
│       ├── nuevo/
│       │   └── page.tsx                # Formulario para crear cliente
│       └── editar/
│           └── [clienteId]/
│               └── page.tsx            # Formulario para editar/eliminar cliente
├── base_datos/
│   ├── initDB.js                       # Configuración de la DB y función de inicialización
│   ├── seed.js                         # Script para crear tablas e insertar datos iniciales
│   ├── base_datos.js                   # Referencia alternativa (no utilizada en producción)
│   └── clientes.db                     # Archivo de base de datos SQLite (generado)
├── package.json
└── README.md
```

---

## Instalación y configuración

### 1. Clonar el repositorio

```bash
git clone <url-del-repositorio>
cd clientes-app
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Crear la base de datos e insertar datos iniciales

Este paso es obligatorio antes de correr el servidor por primera vez. Crea la tabla `clientes` e inserta 3 registros de ejemplo.

```bash
npm run seed
```

Deberías ver en la terminal:
```
tablas creadas y datos iniciales
```

### 4. Correr el servidor de desarrollo

```bash
npm run dev
```

La aplicación estará disponible en [http://localhost:3000](http://localhost:3000).

---

## Scripts disponibles

| Script | Descripción |
|--------|-------------|
| `npm run dev` | Inicia el servidor de desarrollo con Turbopack |
| `npm run build` | Genera el build de producción |
| `npm run start` | Inicia el servidor en modo producción |
| `npm run seed` | Crea las tablas e inserta datos iniciales en la DB |

> **Importante:** `npm run seed` solo debe correrse una vez. Si se corre de nuevo, los datos iniciales se ignoran gracias a `INSERT OR IGNORE`.

---

## Base de datos

### Esquema de la tabla `clientes`

| Columna | Tipo | Descripción |
|---------|------|-------------|
| `id` | INTEGER PRIMARY KEY AUTOINCREMENT | Identificador único |
| `nombre` | TEXT NOT NULL | Nombre completo del cliente |
| `email` | TEXT UNIQUE NOT NULL | Email (debe ser único) |
| `telefono` | TEXT | Teléfono (opcional) |
| `estado` | TEXT DEFAULT 'activo' | Estado: `activo` o `inactivo` |
| `fecha_creacion` | TEXT DEFAULT CURRENT_TIMESTAMP | Fecha de registro |

### Ubicación del archivo

El archivo `clientes.db` se genera automáticamente dentro de la carpeta `base_datos/` al correr el seed.

---

## API REST

Todos los endpoints se encuentran en `/api/clientes`.

### GET `/api/clientes`
Retorna todos los clientes registrados.

**Respuesta exitosa:**
```json
[
  {
    "id": 1,
    "nombre": "Juan Perez",
    "email": "juan@example.com",
    "telefono": "099123456",
    "estado": "activo",
    "fecha_creacion": "2026-02-17 20:00:00"
  }
]
```

---

### POST `/api/clientes`
Crea un nuevo cliente.

**Body:**
```json
{
  "nombre": "Carlos Lopez",
  "email": "carlos@example.com",
  "telefono": "091234567"
}
```

**Respuesta exitosa (201):**
```json
{
  "id": 4,
  "nombre": "Carlos Lopez",
  "email": "carlos@example.com",
  "telefono": "091234567"
}
```

**Error (400):** El email ya existe en la base de datos.

---

### PUT `/api/clientes`
Actualiza los datos de un cliente existente.

**Body:**
```json
{
  "id": 1,
  "nombre": "Juan Perez Actualizado",
  "email": "juannuevo@example.com",
  "telefono": "099999999",
  "estado": "inactivo"
}
```

**Respuesta exitosa:** Retorna el cliente con los datos actualizados.

---

### DELETE `/api/clientes?id={id}`
Elimina un cliente por su ID.

**Ejemplo:** `DELETE /api/clientes?id=3`

**Respuesta exitosa:**
```json
{ "message": "cliente eliminado" }
```

---

## Flujo de la aplicación

```
/                          → Listado de todos los clientes con buscador
/clientes/nuevo            → Formulario para registrar un nuevo cliente
/clientes/editar/[id]      → Formulario para editar o eliminar un cliente existente
```

### Listado principal (`/`)
- Muestra todos los clientes con nombre, email, estado y fecha de creación.
- Incluye un buscador en tiempo real que filtra por nombre o email.
- Botón "Nuevo Cliente" que redirige a `/clientes/nuevo`.
- Botón "Editar" por cada cliente que redirige a `/clientes/editar/{id}`.

### Crear cliente (`/clientes/nuevo`)
- Formulario con campos: nombre (requerido), email (requerido), teléfono (opcional).
- Al guardar exitosamente redirige al listado principal.

### Editar/Eliminar cliente (`/clientes/editar/[clienteId]`)
- Carga los datos actuales del cliente al entrar.
- Permite modificar nombre, email, teléfono y estado (activo/inactivo).
- Botón "Actualizar" para guardar los cambios.
- Botón "Eliminar" para borrar el cliente y redirigir al listado.

---
