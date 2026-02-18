"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"

// Definir el tipo de cliente 
type Cliente = {
  id: number
  nombre: string
  email: string
  telefono?: string
  estado?: string
  fecha_creacion?: string
}

export default function Home() {
  const [clientes, setClientes] = useState<Cliente[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState("")

  useEffect(() => {
  const fetchClientes = async () => {
    try {
      const res = await fetch("/api/clientes")       // Llamada a la API
      const data = await res.json()                  // Convertir a JSON
      console.log("Datos recibidos de la API:", data) // Ver qué devuelve

      if (Array.isArray(data)) {
        setClientes(data)
      } else {
        console.error("La API no devolvió un array:", data)
        setError("No se pudieron cargar los clientes")
        setClientes([])
      }
    } catch (err) {
      console.error("Error fetch clientes:", err)
      setError("Error al cargar clientes")
      setClientes([])
    } finally {
      setLoading(false)
    }
  }

  fetchClientes()
}, [])


  // Filtrar por el nombre o email
  const clientesFiltrados = clientes.filter(c =>
    (c.nombre ?? "").toLowerCase().includes(search.toLowerCase()) ||
    (c.email ?? "").toLowerCase().includes(search.toLowerCase())
  )

  if (loading) return <p>Cargando clientes...</p>
  if (error) return <p style={{ color: "red" }}>{error}</p>

  return (
    <div style={{ padding: "20px" }}>
      <h1>Listado de Clientes</h1>
      <input
        type="text"
        placeholder="Buscar por nombre o email"
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{ marginBottom: "10px", padding: "5px", width: "300px" }}
      />
      <Link href="/clientes/nuevo">
        <button style={{ marginBottom: "10px", marginLeft: "10px" }}>
          Nuevo Cliente
        </button>
      </Link>

      {clientesFiltrados.length === 0 ? (
        <p>No se encontraron clientes</p>
      ) : (
        <ul>
          {clientesFiltrados.map(c => (
            <li key={c.id} style={{ marginBottom: "5px" }}>
              {c.nombre} - {c.email} - {c.estado ?? "activo"} -{" "}
              {c.fecha_creacion ?? ""}
              <Link href={`/clientes/editar/${c.id}`}>
                <button style={{ marginLeft: "10px" }}>Editar</button>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
