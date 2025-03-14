import { Link } from "react-router-dom";
import "./story-item.css";

function StoryItem({ story }) {
  if (!story) {
    return <div>Error: No se encontró la historia</div>;
  }

  return (
    <div className="card historia-item" style={{ width: "18rem" }}>
      <img
        src={story.coverImage || "../default-cover.png"}  
        alt={story.title}
        className="card-img-top"
        style={{ height: "180px", objectFit: "cover" }}  
      />
      <div className="card-body">
        <h5 className="card-title mb-1 fw-light text-break">
          <Link to={`/historias/${story._id}`}>{story.title}</Link>
        </h5>
        <p className="card-text">{story.extract}</p>
        <Link to={`/stories/${story._id}`} className="btn btn-primary rounded-pill">
          Ver historia
        </Link>
      </div>
    </div>
  );
}

export default StoryItem;
