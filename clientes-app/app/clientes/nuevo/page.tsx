"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"

//Funcion para guardar lo que el usuario escribe 
export default function NuevoCliente() {
  const [nombre, setNombre] = useState("")
  const [email, setEmail] = useState("")
  const [telefono, setTelefono] = useState("")
  const router = useRouter()

  //Se ejecuta cuando se envia al formulario 
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    //Enviar datos al backend 
    const res = await fetch("/api/clientes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, email, telefono }),
    })
    if (res.ok) router.push("/")
    else alert("Error al crear cliente")
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Nuevo Cliente</h1>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Nombre"
          value={nombre}
          onChange={e => setNombre(e.target.value)}
          required
        />
        <input
          placeholder="Email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          placeholder="Teléfono"
          value={telefono}
          onChange={e => setTelefono(e.target.value)}
        />
        <button type="submit">Guardar</button>
      </form>
    </div>
  )
}
