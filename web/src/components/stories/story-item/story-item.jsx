import { Link } from "react-router-dom";
import "./story-item.css";

function StoryItem({ story }) {
  if (!story) {
    return <div>Error: No se encontró la historia</div>;
  }

  return (
    <div className="card historia-item" style={{ width: "18rem" }}>
      <div className="card-body">
        <h5 className="card-title mb-1 fw-light text-break">
          <Link to={`/historias/${story.id}`}>{story.titulo}</Link>
        </h5>
        <h6 className="card-subtitle mb-2 text-muted">
          {story.autor} - {story.fecha}
        </h6>
        <p className="card-text">{story.sinopsis}</p>
        <Link to={`/storys/${story.id}`} className="btn btn-primary">
          Ver historia
        </Link>
      </div>
    </div>
  );
}

export default StoryItem;
