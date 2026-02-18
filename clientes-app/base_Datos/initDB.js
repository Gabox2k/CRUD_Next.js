import sqlite3 from "sqlite3"
import { open } from "sqlite"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export async function abrirDB() {
    return open({
        filename: path.join(__dirname, "clientes.db"),
        driver: sqlite3.Database,
    })
}

//Funcion para crear tablas
export async function initDB() {
    const db = await abrirDB()

    //Crea la tabla de clientes
    await db.exec(`
    CREATE TABLE IF NOT EXISTS clientes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      telefono TEXT,
      estado TEXT DEFAULT 'activo',
      fecha_creacion TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `)

  //Insertar clientes en la base de datos
  await db.exec(`
    INSERT INTO clientes (nombre, email, telefono)
    VALUES
      ('Juan Perez', 'juan@example.com', '099123456'),
      ('Ana Gomez', 'ana@example.com', '098765432'),
      ('Luis Martinez', 'luis@example.com', '097112233')
  `)

  console.log("tablas creadas y datos iniciales")
  await db.close()
  process.exit()
}


