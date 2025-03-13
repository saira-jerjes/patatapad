import Navbar from "./components/navbar/navbar";
import { Route, Routes } from "react-router-dom";
import {
  HomePage,
  CategoriasPage,
  NovedadesPage,
  AutoresPage,
  HistoriaDetallePage,
  LoginPage,
  RegisterPage,
  ProfilePage
} from "./pages";
// import { PrivateRoute } from "./guards";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/categorias" element={<CategoriasPage />} />
        <Route path="/novedades" element={<NovedadesPage />} />
        <Route path="/autores" element={<AutoresPage />} />
        <Route path="/historias/:id" element={<HistoriaDetallePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </>
  );
}

export default App;
