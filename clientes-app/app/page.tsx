async function getClientes() {
  const res = await fetch("http://localhost:3000/api/clientes", {
    cache: "no-store",
  });

  return res.json();
}

export default async function Home() {
  const clientes = await getClientes();

  return (
    <div style={{ padding: "20px" }}>
      <h1>Lista de Clientes</h1>

      <ul>
        {clientes.map((cliente: any) => (
          <li key={cliente.id}>
            {cliente.nombre} - {cliente.email} - {cliente.telefono}
          </li>
        ))}
      </ul>
    </div>
  );
}
