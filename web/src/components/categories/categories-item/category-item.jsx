import { Link } from 'react-router-dom';
import './category-item.css';

function CategoryItem({ category }) {
    if (!category) {
      return <div>Loading...</div>;
    }
  
    return (
      <div className="card categoria-item">
        <div className="card-body text-center">
          <h5 className="card-title mb-1 fw-light text-break">
            <Link to={`/categorias/${category.id}`}>{category.nombre}</Link>
          </h5>
        </div>
      </div>
    );
  }
  
  export default CategoryItem;