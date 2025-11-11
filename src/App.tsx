import './App.css'
import Form from './Form'
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import ConfigPage from "./ConfigPage";
import NotFound from './components/NotFound';
import CancelPage from './CancelPage';


const ProtectedForm: React.FC = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const connectionUrl = searchParams.get("connectionUrl");
  const decodedUrl = connectionUrl ? decodeURIComponent(connectionUrl) : '';

  if (!connectionUrl || decodedUrl == '') {
    return <Navigate to="/not-found" />;
  }

  return <Form connectionUrl={decodedUrl} />;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta para la página de configuración del administrador */}
        <Route path="/config" element={<ConfigPage />} />

        <Route path="/cancel" element={<CancelPage />} />

        <Route path="/" element={<ProtectedForm />} />

        {/* Ruta para el formulario que verá el usuario final */}
        <Route path="/not-found" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App
