import CategoriaList from "../components/categories/categories-item/categories-list/categories-list";
import PageLayout from "../components/layouts/page-layout/page-layout";
import HistoriasDestacadas from "../components/stories/featured-story/featured-story";
import { Link } from "react-router-dom";
import "./homepage.css";

function HomePage() {
  return (
    <div className="homepage">
      <div className="homepage-content">
        <h3>¡Recién Llegado!</h3>
        <h1>LA VIDA DESPUÉS DE TI</h1>
        <p>La nueva historia del mes! Elegido por vosotros con más de 4.2 estrellas y 10,000 lecturas.</p>
        <div className="button-container">
        <Link to="/featured-story" className="button-primary">Ver historia</Link>
        <Link to="/novedades" className="button-secondary">Historias del mes</Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
