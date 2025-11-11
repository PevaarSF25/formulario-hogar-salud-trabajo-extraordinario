import { useEffect, useState } from "react";
import pevaar from './assets/pevaar.svg';

const CancelPage = () => {
  const [url, setUrl] = useState<string>("");

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {

    setError(null);
  }, []);

  const generarEnlace = () => {
    try {
      if(url === "" || url === null) setError('Url no valida');
      const encodedUrl = encodeURIComponent(url);
      const link = `https://formulario-hogar-salud-trabajo-extraordinario.vercel.app/?connectionUrl=${encodedUrl}`;
      console.log(link);
      setUrl("");
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };



  return (
    <div className="min-h-screen relative">
      <div className="bg-gray-100 dark:bg-gray-900 min-h-screen transition-colors duration-300">
        <div className="container mx-auto pb-8 px-4">
          <img
            src={pevaar}
            alt="logo"
            className="w-40 py-8 mx-auto"
          />
          <div className="max-w-3xl px-8 py-8 mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden transition-colors duration-300">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Cancelar solicitud de trabajo extraordinario
            </h1>
            <p className="text-gray-700 dark:text-gray-300 text-lg mb-6">
              A continuacion ingrese el número identificador de la solicitud que desea cancelar. Este numero lo puede encontrar en el correo de aprobación.
            </p>
  
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-6">
                {error}
              </div>
            )}
  
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="connectionUrl"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  ID de la solicitud
                </label>
                <input
                  type="text"
                  required
                  id="connectionUrl"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-300"
                  placeholder="123456789"
                />
              </div>
              <button
                onClick={generarEnlace}
                disabled={!url}
                className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancelar solicitud
              </button>
            </div>
  

          </div>
        </div>
      </div>
    </div>
  );
  
};

export default CancelPage;