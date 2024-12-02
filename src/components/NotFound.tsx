import React from "react";
import { useNavigate } from "react-router-dom";
import pevaar from '../assets/pevaar.svg';


const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative">
      <div className="bg-gray-100 dark:bg-gray-900 min-h-screen transition-colors duration-300">
        <div className="container mx-auto pb-8 px-4">
          <img src={pevaar} alt="logo" className="img-fluid w-40 py-8 mx-auto" />

          <div className="max-w-3xl px-8 py-12 mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden transition-colors duration-300">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Página no encontrada
            </h1>
            <p className="text-gray-700 dark:text-gray-300 text-lg mb-6">
              Lo sentimos, no hemos podido encontrar el formulario que buscabas. Por favor, verifica el enlace o contacta con soporte.
            </p>
            <button
              onClick={() => navigate("/config")} style={{ marginTop: "20px", padding: "10px 20px" }}
              className="px-6 py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors duration-300"
            >
              Volver al inicio
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};



export default NotFound;