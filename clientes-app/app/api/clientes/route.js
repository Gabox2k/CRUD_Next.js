import {NextResponse} from "next/server"
import { abrirDB } from "@/base_datos/initDB"

//Envia la base de datos al servidor 
export async function GET() {
    try{
        const db = await abrirDB()

        const clientes = await db.all("SELECT * FROM clientes")

        await db.close()

        return NextResponse.json(clientes)

    } catch (error) {
        return NextResponse.json(
            {error: "Error al obtener a los clientes"},
            { status: 500}
        )

    }
    
}