import Navbar from "../components/navbar/navbar";
import CategoriesList from "../components/categories/categories-item/categories-list/categories-list";
import './categories.css'

function CategoriasPage() {
  return (
    <div className="container-cat">
      <Navbar />
      <CategoriesList />
    </div>
  );
}

export default CategoriasPage;
