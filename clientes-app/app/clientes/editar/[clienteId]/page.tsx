"use client"

import React, { useEffect, useState, use } from "react"
import { useRouter } from "next/navigation"

//Define el tipo de cliente
type Cliente = {
  id: number
  nombre: string
  email: string
  telefono?: string
  estado?: string
  fecha_creacion?: string
}

//Recibi parametros de la URL 
interface EditarClienteProps {
  params: Promise<{ clienteId: string }>
}

//Funcion para guardar lo que se edita, para controlar el estado 
export default function EditarCliente({ params }: EditarClienteProps) {
  const { clienteId: id } = use(params)
  const [cliente, setCliente] = useState<Cliente | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {

    //Trae los clientes de la Api 
    fetch("/api/clientes")
      .then(res => res.json())
      .then((data: Cliente[]) => {
        const c = data.find(cli => cli.id === parseInt(id))
        setCliente(c ?? null)
      })
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <p>Cargando...</p>
  if (!cliente) return <p>Cliente no encontrado</p>

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    //Envia los datos actualizado a la Api 
    const res = await fetch("/api/clientes", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cliente),
    })
    if (res.ok) router.push("/")
    else alert("Error al actualizar cliente")
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Editar Cliente</h1>
      <form onSubmit={handleSubmit}>
        <input
          value={cliente.nombre}
          onChange={e => setCliente({ ...cliente, nombre: e.target.value })}
        />
        <input
          type="email"
          value={cliente.email}
          onChange={e => setCliente({ ...cliente, email: e.target.value })}
        />
        <input
          value={cliente.telefono ?? ""}
          onChange={e => setCliente({ ...cliente, telefono: e.target.value })}
        />
        <select
          value={cliente.estado ?? "activo"}
          onChange={e => setCliente({ ...cliente, estado: e.target.value })}
        >
          <option value="activo">Activo</option>
          <option value="inactivo">Inactivo</option>
        </select>
        <button type="submit">Actualizar</button>
      </form>
      <button
        onClick={async () => {
          await fetch(`/api/clientes?id=${id}`, { method: "DELETE" })
          router.push("/")
        }}
      >
        Eliminar
      </button>
    </div>
  )
}