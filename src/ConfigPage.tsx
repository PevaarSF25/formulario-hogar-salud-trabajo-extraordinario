import { useEffect, useState } from "react";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import pevaar from './assets/pevaar.svg';
import { jsonEsquema}  from './assets/squema.ts';

const ConfigPage = () => {
  const [url, setUrl] = useState<string>("");
  const [generatedUrl, setGeneratedUrl] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setGeneratedUrl(null);
    setSubmitted(false);
    setError(null);
  }, []);

  const generarEnlace = () => {
    try {
      if(url === "" || url === null) setError('Url no valida');
      const encodedUrl = encodeURIComponent(url);
      const link = `https://formulario-trabajo-extraordinario-zpp4.vercel.app/?connectionUrl=${encodedUrl}`;
      setGeneratedUrl(link);
      console.log(link);
      setSubmitted(true);
      setUrl("");
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  const copyToClipboard = () => {
    if (generatedUrl) {
      navigator.clipboard.writeText(generatedUrl);
    }
  };

  const generarNuevoFormulario = () => {
    setGeneratedUrl(null);
    setSubmitted(false);
    setError(null);
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
              Configuración del Formulario
            </h1>
            <p className="text-gray-700 dark:text-gray-300 text-lg mb-6">
              Configura la URL de conexión para el flujo de Power Automate.
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
                  URL de conexión
                </label>
                <input
                  type="text"
                  required
                  id="connectionUrl"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-300"
                  placeholder="https://prod-162.westus.logic.azure.com:441/workflows...etc"
                />
              </div>
              <button
                onClick={generarEnlace}
                disabled={!url}
                className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Generar formulario
              </button>
            </div>
  
            {submitted && generatedUrl && (
              <div className="p-6 mt-8 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg">
                <div className="flex justify-between items-center mb-8">
                  <button
                    onClick={generarNuevoFormulario}
                    className="px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-all duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    Crear nuevo formulario
                  </button>
                  <button
                    onClick={copyToClipboard}
                    className="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-all duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    Copiar URL
                  </button>
                  <a
                    href={generatedUrl}
                    target="_blank"

                    className="px-6 py-3 bg-sky-700 text-white font-semibold rounded-lg hover:bg-green-600 transition-all duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    Ir al formulario
                  </a>
                </div>
  
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Datos Generados:
                </h2>
                <div className="bg-gray-200 dark:bg-gray-700 rounded-lg p-4 mb-6">
                  <p className="text-gray-800 dark:text-white font-medium mb-2">
                    URL del Formulario
                  </p>
                  <a
                    href={generatedUrl}
                    className="text-blue-600 dark:text-blue-400 underline text-sm font-semibold break-all"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {generatedUrl}
                  </a>
                </div>
  
                <div className="mt-6">
                  <SyntaxHighlighter language="json" style={materialDark} className="rounded-md shadow-md">
                    {JSON.stringify(jsonEsquema, null, 2)}
                  </SyntaxHighlighter>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
  
};

export default ConfigPage;