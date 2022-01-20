import { useState, useEffect } from 'react';
import Cliente from '../components/Cliente';

const Inicio = () => {

  const [clientes, setClientes] = useState([])

  useEffect(() => {
    const obtenerClientesAPI = async () => {
      try {
        const url = import.meta.env.VITE_API_URL
        const respuesta = await fetch(url)
        const resultado = await respuesta.json()
        setClientes(resultado)
      } catch (error) {
        console.log(error)
      }
    }

    obtenerClientesAPI()

  }, [])

  const handleEliminar = async id => {
    const confirmar = confirm('¿Deseas Eliminar este Cliente?')

    if(confirmar) {
      try {
        const url = `${import.meta.env.VITE_API_URL}/clientes/${id}`
        const respuesta = await fetch(url, {
          method: 'DELETE'
        })

        await respuesta.json()

        const arrayClientes = clientes.filter( cliente => cliente.id !== id)
        setClientes(arrayClientes)

      } catch (error) {
        console.log(error)
      }
      
    }

  }


  return (


      <>
          <h1 className='font-black text-4xl '>Clientes</h1>
          <p className='mt-10'>Administra tus clientes</p>

          <table className='bg-white w-full mt-5 table-auto shadow'>
            <thead className='bg-yellow-300 '>
                <tr>
                  <th className='p-2'>Nombre</th>
                  <th className='p-2'>Contacto</th>
                  <th className='p-2'>Empresa</th>
                  <th className='p-2'>Acciones</th>
                </tr>
            </thead>

            <tbody>
                {clientes.map( cliente => (
                  <Cliente 
                    key={cliente.id}
                    cliente={cliente}
                    handleEliminar={handleEliminar}
                  />
                ))}
            </tbody>

          </table>

      
      </>
  )
}

export default Inicio;