import React, { useEffect, useState } from "react";
import { listCategorias } from "../../../../services/api-services";
import CategoryItem from "../category-item";
import "./categories-list.css";

function CategoriesList() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    listCategorias()
      .then((data) => {
        setCategories(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching categories:", err);
        setError("No pudimos cargar las categorías");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="categories-loading">Cargando categorías...</div>;
  }

  if (error) {
    return <div className="categories-error">{error}</div>;
  }

  if (!categories || categories.length === 0) {
    return <div className="categories-empty">No hay categorías disponibles</div>;
  }

  return (
    <div className="categories-container">
      <div className="categories-grid">
        {categories.map((category) => (
          <CategoryItem 
            key={category._id} 
            category={{
              id: category._id,
              nombre: category.name
            }} 
          />
        ))}
      </div>
    </div>
  );
}

export default CategoriesList;