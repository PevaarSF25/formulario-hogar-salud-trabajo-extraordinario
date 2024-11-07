import React, { useState } from 'react';
import { Moon, Sun, Plus } from 'lucide-react'
import './index.css';
import pevaar from './assets/pevaar.svg';

interface Trabajador {
  nombre: string
  cargo: string
  concepto: string
  area: string
  fechaInicio: string
  fechaFinal: string
  horaInicio: string
  horaFin: string
}

interface Solicitud {
  correoLider: string,
  cargoLider: string,
  nombreLider: string,
  areaLider: string,
  fechaSolicitud: string,
  workers: Trabajador[]
}

export const Form = () => {
  const [trabajadores, setTrabajadores] = useState<Trabajador[]>([{
    nombre: '', cargo: '', concepto: '', area: '',
    fechaInicio: '', fechaFinal: '', horaInicio: '', horaFin: ''
  }])
  const [darkMode, setDarkMode] = useState(false)
  const [solicitud, setSolicitud] = useState<Solicitud>({
    correoLider: '', cargoLider: '', nombreLider: '', areaLider: '', fechaSolicitud: '', workers: []
  })

  const addWorker = () => {
    setTrabajadores([...trabajadores, {
      nombre: '', cargo: '', concepto: '', area: '',
      fechaInicio: '', fechaFinal: '', horaInicio: '', horaFin: ''
    }])
  }

  const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    const newTrabajadores = [...trabajadores]
    newTrabajadores[index] = { ...newTrabajadores[index], [name]: value }
    setTrabajadores(newTrabajadores)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    // Crear el objeto de solicitud final incluyendo los trabajadores
    const solicitudFinal = {
      ...solicitud,
      workers: trabajadores
    }

    console.log(solicitudFinal)

    try {
      const response = await fetch('https://prod-167.westus.logic.azure.com:443/workflows/0f18679311694f50ac511fe57d48c66d/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=vGargXJT6YvtobAmYOr-pmpLAcqlwYXC-Zj6090xHCc', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(solicitudFinal)
      })

      console.log('Status de la respuesta:', response.status)
      
      if (response.ok || response.status === 202) {
        const data = await response.json()
        console.log('Respuesta exitosa:', data)
        alert('Formulario enviado con éxito')
      } else {
        console.error('Error en la respuesta:', response.statusText)
        alert('Error al enviar el formulario')
      }
    } catch (error) {
      console.error('Error al enviar la solicitud:', error)
      alert('Error al enviar el formulario')
    }
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="bg-gray-100 dark:bg-gray-900 min-h-screen transition-colors duration-300">
        <div className="container mx-auto pb-8 px-4">
          <img src={pevaar} alt="logo" className="img-fluid w-40 py-8 mx-auto" />
          <div className="max-w-3xl px-8 py-2 mx-auto light:bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden transition-colors duration-300">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Formulario de Trabajo Extraordinario</h1>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 transition-colors duration-300"
                aria-label="Toggle dark mode"
              >
                {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
            </div>
            <form className="p-6 space-y-8" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="cargoLider" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Correo del lider
                </label>
                <input
                  type="email"
                  id="correoLider"
                  name="correoLider"
                  value={solicitud.correoLider}
                  onChange={(e) => setSolicitud({ ...solicitud, correoLider: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-300"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="lider" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Nombre del líder o responsable
                  </label>
                  <input
                    type="text"
                    id="nombreLider"
                    name="nombreLider"
                    value={solicitud.nombreLider}
                    onChange={(e) => setSolicitud({ ...solicitud, nombreLider: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-300"
                  />
                </div>
                <div>
                  <label htmlFor="cargoLider" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Cargo del líder
                  </label>
                  <input
                    type="text"
                    id="cargoLider"
                    name="cargoLider"
                    value={solicitud.cargoLider}
                    onChange={(e) => setSolicitud({ ...solicitud, cargoLider: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-300"
                  />
                </div>
                <div>
                  <label htmlFor="areaLider" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Área líder
                  </label>
                  <input
                    type="text"
                    id="areaLider"
                    name="areaLider"
                    value={solicitud.areaLider}
                    onChange={(e) => setSolicitud({ ...solicitud, areaLider: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-300"
                  />
                </div>
                <div>
                  <label htmlFor="fechaSolicitud" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Fecha de la solicitud
                  </label>
                  <input
                    type="date"
                    id="fechaSolicitud"
                    name="fechaSolicitud"
                    value={solicitud.fechaSolicitud}
                    onChange={(e) => setSolicitud({ ...solicitud, fechaSolicitud: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-300"
                  />
                </div>
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700 my-8"></div>

              {trabajadores.map((trabajador, index) => (
                <div key={index} className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-md space-y-6 transition-colors duration-300">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Trabajador {index + 1}</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor={`nombre-${index}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Nombre
                      </label>
                      <input
                        type="text"
                        id={`nombre-${index}`}
                        name="nombre"
                        value={trabajador.nombre}
                        onChange={(e) => handleChange(index, e)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-600 text-gray-900 dark:text-white transition-colors duration-300"
                      />
                    </div>
                    <div>
                      <label htmlFor={`cargo-${index}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Cargo
                      </label>
                      <input
                        type="text"
                        id={`cargo-${index}`}
                        name="cargo"
                        value={trabajador.cargo}
                        onChange={(e) => handleChange(index, e)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-600 text-gray-900 dark:text-white transition-colors duration-300"
                      />
                    </div>
                    <div>
                      <label htmlFor={`concepto-${index}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Concepto
                      </label>
                      <input
                        type="text"
                        id={`concepto-${index}`}
                        name="concepto"
                        value={trabajador.concepto}
                        onChange={(e) => handleChange(index, e)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-600 text-gray-900 dark:text-white transition-colors duration-300"
                      />
                    </div>
                    <div>
                      <label htmlFor={`area-${index}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Área
                      </label>
                      <input
                        type="text"
                        id={`area-${index}`}
                        name="area"
                        value={trabajador.area}
                        onChange={(e) => handleChange(index, e)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-600 text-gray-900 dark:text-white transition-colors duration-300"
                      />
                    </div>
                    <div>
                      <label htmlFor={`fechaInicio-${index}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Fecha de inicio
                      </label>
                      <input
                        type="date"
                        id={`fechaInicio-${index}`}
                        name="fechaInicio"
                        value={trabajador.fechaInicio}
                        onChange={(e) => handleChange(index, e)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-600 text-gray-900 dark:text-white transition-colors duration-300"
                      />
                    </div>
                    <div>
                      <label htmlFor={`fechaFinal-${index}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Fecha final
                      </label>
                      <input
                        type="date"
                        id={`fechaFinal-${index}`}
                        name="fechaFinal"
                        value={trabajador.fechaFinal}
                        onChange={(e) => handleChange(index, e)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-600 text-gray-900 dark:text-white transition-colors duration-300"
                      />
                    </div>
                    <div>
                      <label htmlFor={`horaInicio-${index}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Hora de comienzo
                      </label>
                      <input
                        type="time"
                        id={`horaInicio-${index}`}
                        name="horaInicio"
                        value={trabajador.horaInicio}
                        onChange={(e) => handleChange(index, e)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-600 text-gray-900 dark:text-white transition-colors duration-300"
                      />
                    </div>
                    <div>
                      <label htmlFor={`horaFin-${index}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Hora de finalización
                      </label>
                      <input
                        type="time"
                        id={`horaFin-${index}`}
                        name="horaFin"
                        value={trabajador.horaFin}
                        onChange={(e) => handleChange(index, e)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-600 text-gray-900 dark:text-white transition-colors duration-300"
                      />
                    </div>
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={addWorker}
                className="mx-auto flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-offset-gray-800 transition-colors duration-300"
              >
                <Plus className="h-5 w-5 mr-2" />
                Agregar otro trabajador
              </button>

              <div>
                <label htmlFor="firmaLider" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Firma del líder
                </label>
                <input
                  type="text"
                  id="firmaLider"
                  name="firmaLider"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-300"
                />
              </div>

              <button
                type="submit"
                className="w-full px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-offset-gray-800 transition-colors duration-300"
              >
                Enviar formulario
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Form;
