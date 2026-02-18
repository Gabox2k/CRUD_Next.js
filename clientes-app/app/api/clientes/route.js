import {NextResponse} from "next/server"
import { abrirDB } from "@/base_datos/initDB"

//Lista de clientes 
export async function GET() {
    try{
        const db = await abrirDB()

        const clientes = await db.all("SELECT * FROM clientes")

        await db.close()

        return NextResponse.json(clientes ?? [])

    } catch (error) {
        return NextResponse.json(
            {error: "Error al obtener a los clientes"},
            { status: 500}
        )

    }
    
}

//Crea los clientes
export async function POST(request) {
    const {nombre, email, telefono } = await request.json()
    const db = await abrirDB()

    try {
        const result = await db.run(
            "INSERT INTO clientes (nombre, email, telefono, estado, fecha_creacion) VALUES (?, ?, ?, 'activo', CURRENT_TIMESTAMP)",
            [nombre, email, telefono]
        )
        return NextResponse.json({id: result.lastID, nombre, email, telefono})

    } catch (error){
        console.error("Error POST:", error.message)
        return NextResponse.json({error: "Email ya existe"}, {status: 400})


    } finally {
        await db.close()
    }
}

//Edita a los clientes
export async function PUT(request) {
    const {id, nombre, email, telefono, estado } = await request.json()
    const db= await abrirDB()

    try{
        await db.run (
            "UPDATE clientes SET nombre= ?, email= ?, telefono= ?, estado= ? WHERE id= ?",
            [nombre, email, telefono, estado, id]
        )
        return NextResponse.json({id, nombre, email, telefono, estado})

    } catch (error){
        return NextResponse.json({error: "Error al actualizar al cliente"}, {status:400})

    } finally {
        await db.close()
    }
}

//Elimina a los clientes 
export async function DELETE(request) {
    const {searchParams} = new URL(request.url)
    const id = searchParams.get("id")
    const db = await abrirDB()

    try{
        await db.run("DELETE FROM clientes WHERE id= ?", [id])
        return NextResponse.json({ message: "cliente eliminado" })

    } catch(error){
        return NextResponse.json({error: "Error al eliminar al cliente"}, {status: 400})

    } finally {
        await db.close()
    }
}