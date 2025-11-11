import React, { useEffect, useState } from 'react';
import { Moon, Sun, Plus } from 'lucide-react'
import './index.css';
import pevaar from './assets/pevaar.svg';
import { Trabajador, Solicitud } from './types/types';
import TrabajadorForm from './TrabajadorForm';
import MessageSubmited from './components/MessageSubmited';

interface FormProps {
  connectionUrl: string;
}

export const Form: React.FC<FormProps> = ({ connectionUrl }: FormProps) => {
  const [indexTrabajadores, setIndexTrabajadores] = useState<number>(0);
  const [solicitud, setSolicitud] = useState<Solicitud>({
    correoLider: '', cargoLider: '', nombreLider: '', areaLider: '', fechaSolicitud: '', workers: []
  })
  const [trabajadores, setTrabajadores] = useState<Trabajador[]>([{
    id: 0, nombre: '', cargo: '', concepto: '', area: '',
    fechaInicio: '', fechaFinal: '', horaInicio: '', horaFin: ''
  }])
  const [darkMode, setDarkMode] = useState(false)
  const [submited, setSubmited] = useState(false)

  useEffect(()=> {
    console.log(connectionUrl);
  },)

  const addWorker = () => {
    setIndexTrabajadores(indexTrabajadores + 1);
    setTrabajadores([...trabajadores, {
      id: indexTrabajadores, nombre: '', cargo: '', concepto: '', area: '',
      fechaInicio: '', fechaFinal: '', horaInicio: '', horaFin: ''
    }])
  }

  const duplicateWorker = (pTrabajador: Trabajador) => {
    setIndexTrabajadores(indexTrabajadores + 1);
    setTrabajadores([...trabajadores, {
      id: indexTrabajadores, nombre: pTrabajador.nombre, cargo: pTrabajador.cargo, concepto: pTrabajador.concepto, area: pTrabajador.area,
      fechaInicio: pTrabajador.fechaInicio, fechaFinal: pTrabajador.fechaFinal, horaInicio: pTrabajador.horaInicio, horaFin: pTrabajador.horaFin
    }])
  }

  const deleteWorker = (_index: number) => {
    setIndexTrabajadores(indexTrabajadores - 1);
    const newTrabajadores = [...trabajadores].filter((_, index) => _index !== index);
    setTrabajadores(newTrabajadores);
  }

  const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    const newTrabajadores = [...trabajadores]
    newTrabajadores[index] = { ...newTrabajadores[index], [name]: value }
    setTrabajadores(newTrabajadores)
  }

  const limpiarFormulario = () => {
    setTrabajadores([{
      id: 0, nombre: '', cargo: '', concepto: '', area: '',
      fechaInicio: '', fechaFinal: '', horaInicio: '', horaFin: ''
    }])
    setSolicitud({
      correoLider: '', cargoLider: '', nombreLider: '', areaLider: '', fechaSolicitud: '', workers: []
    })
  }

  const iniciarNuevaSolicitud = () => {
    setSubmited(false);
    limpiarFormulario();
    window.location.reload()
  }

  const cancelarSolicitud = () => {
    window.location.href = '/cancel';
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()


    const formatTimeTo12Hour = (time: string) => {
      const [hour, minute] = time.split(':');
      const formattedHour = parseInt(hour) % 12 || 12;
      const ampm = parseInt(hour) >= 12 ? 'PM' : 'AM';
      return `${formattedHour}:${minute} ${ampm}`;
    }
    // Crear el objeto de solicitud final incluyendo los trabajadores
    const solicitudFinal = {
      ...solicitud,
      workers: trabajadores.map((trabajador, p_index) => ({
        ...trabajador,
        id: p_index + 1,
        horaInicio: formatTimeTo12Hour(trabajador.horaInicio),
        horaFin: trabajador.horaFin ? formatTimeTo12Hour(trabajador.horaFin) : 'Pendiente'
      }))
    }


    const response = await fetch(connectionUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(solicitudFinal)
    })

    if (response.ok || response.statusText == 'Accepted' || response.status == 202) {
      console.log('Respuesta exitosa')
      setSubmited(true);
    } else {
      console.error('Error en la respuesta:', response.statusText)
    }
  }

  return (
    <div className={`min-h-screen relative ${darkMode ? 'dark' : ''}`}>
      <div className="bg-gray-100 dark:bg-gray-900 min-h-screen transition-colors duration-300">
        <div className="container mx-auto pb-8 px-4">
          <img src={pevaar} alt="logo" className="img-fluid w-40 py-8 mx-auto" />
          <div className="max-w-3xl px-8 py-2 mx-auto light:bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden transition-colors duration-300">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Formulario de Trabajo Extraordinario</h1>
              <button
                    onClick={cancelarSolicitud}
                    className="mr-50 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-all duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    Cancelar solicitud
                  </button>
<button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 transition-colors duration-300"
                aria-label="Toggle dark mode"
              >
                {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
            </div>
            {
              submited ? <MessageSubmited iniciarNuevaSolicitud={iniciarNuevaSolicitud} /> :
                (
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
                      <TrabajadorForm
                        key={index}
                        trabajador={trabajador}
                        index={index}
                        handleChange={handleChange}
                        deleteWorker={deleteWorker}
                        duplicateWorker={duplicateWorker}
                      />
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
                )
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Form;
