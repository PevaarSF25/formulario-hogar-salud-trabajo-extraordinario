import { Check } from 'lucide-react'

interface Props {
  iniciarNuevaSolicitud: () => void
}

export const MessageSubmited = ({  }: Props) => {

  return (
    <div className="py-8 flex justify-center items-center flex-col gap-2">
      <Check className='text-green-500 w-10 h-10'/>
      <h3 className='text-2xl text-gray-200'>La respuesta se ha enviado</h3>
      <p className='font-light text-gray-400'>Se ha enviado la peticion a recursos humanos y lideres de area para aprobación.</p>
      <button 
        className='className="w-full mt-5 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-offset-gray-800 transition-colors duration-300"'
        onClick={() => window.location.reload() }
      >
          Enviar otra solicitud
        </button>
    </div>
  )
}

export default MessageSubmited;