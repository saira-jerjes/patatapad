import { useEffect, useState } from "react";
import CategoryItem from "../category-item";
import * as PatatapadApi from "../../../../services/api-services";
import "./categories-list.css"

function CategoriaList({ className = "" }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    PatatapadApi.listCategorias()
      .then((data) => setCategories(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className={`d-flex flex-wrap gap-3 ${className}`}>
      {categories.map((categoria) => (
        <CategoryItem key={categoria.id} category={categoria} />
      ))}
    </div>
  );
}

export default CategoriaList;
