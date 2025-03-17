// import React, { useEffect, useState } from "react";
import CategoriesList from "../components/categories/categories-item/categories-list/categories-list";
import { Link } from "react-router-dom";
// import { listCategorias, listHistoriasDestacadas } from "../services/api-services";
import "./homepage.css";


function HomePage() {

  // const [categories, setCategories] = useState([]);
  

  // useEffect(() => {

  //   listCategorias()
  //     .then((response) => {
  //       setCategories(response);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching categories:", error);
  //     });



  return (
  <div>
    <div className="homepage">
      <div className="homepage-content">
        <h4>¡Recién Llegado!</h4>
        <h1>LA VIDA DESPUÉS DE TI</h1>
        <p>La nueva historia del mes! Elegido por vosotros con más de 4.2 estrellas y 10,000 lecturas.</p>
        <div className="button-container">
        <Link to="/stories/67d74f36ab0f8f42e343bac0" className="button-primary">Ver historia</Link>
        </div>
      </div>
    </div>

    <div className="home-sections">
    <section className="categories-section mt-5">
        <h3 className="section-name">Piérdete en nuestras categorías</h3>
        <h5 className="subsection-name">NI UN MINUTO QUE PERDER</h5>
        <CategoriesList />
      </section>

    <section className="mojate-section">
        <h3 className="section-name">¿Lo tuyo es escribir?</h3>
        <p>Quizás eres el próximo Shakespeare, ¡pruébate!</p>
        <div className="button-container">
          <Link to="/register" className="button-primary">MÓJATE CON NOSOTROS</Link>
        </div>
      </section>

      <section className="featured-stories">
        <h3 className="section-name mt-5">Historias del mes</h3>
        <h5 className="subsection-name">ATREVETE A DESCUBIR ALGO NUEVO</h5>

      </section>
      </div>
  </div>
  );
}

export default HomePage;
