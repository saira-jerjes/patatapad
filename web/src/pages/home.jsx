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
          <a href="/historia" className="button-primary">Ver historia</a>
          <a href="/historias-del-mes" className="button-secondary">Historias del mes</a>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
