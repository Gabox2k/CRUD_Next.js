import sqlite from "sqlite3"
import {open } from "sqlite3"
import path from "path"

export async function getBD() {
    return open({
        filename: path.join (process.cwd(), "clientes.db"),
        driver: sqlite3.Database
    })

}