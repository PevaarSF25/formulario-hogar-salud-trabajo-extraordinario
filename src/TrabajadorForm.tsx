import { Minus } from 'lucide-react';
import { Trabajador } from './types/types';

interface Props {
  trabajador: Trabajador;
  index: number;
  handleChange: (index: number, e: React.ChangeEvent<HTMLInputElement>) => void;
  deleteWorker: (_index: number) => void;
  duplicateWorker: (pTrabajador: Trabajador) => void;
}

const TrabajadorForm: React.FC<Props> = ({ trabajador, index, handleChange, deleteWorker, duplicateWorker }) => {
  return (
    <div className="relative bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-md space-y-6 transition-colors duration-300">
      {
        index !== 0 ? 
        <button onClick={() => deleteWorker(index)} className='absolute p-2 top-5 right-5 p-2 rounded-full hover:bg-gray-600 transition-colors duration-300'>
          <Minus className='w-5 h-5 text-gray-300' />
        </button> : ''
      }
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
            required
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
            required
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
            required
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
            required
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
            required
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
            required
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
            required
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
      <div className='d-flex align-items-start'>
        <button onClick={() => duplicateWorker(trabajador)} className='w-150 bg-blue-600 color-white p-2 top-5 right-5 p-2 rounded-full hover:bg-gray-600 transition-colors duration-300'>
          Duplicate
        </button>
      </div>
      </div>
    </div>
  );
};

export default TrabajadorForm;