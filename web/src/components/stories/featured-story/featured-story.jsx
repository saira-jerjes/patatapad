import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listHistoriasDestacadas } from "../../../services/api-services";
import "./featured-story.css";

function HistoriasDestacadas({ max = 3 }) {
  const [featuredStories, setFeaturedStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    listHistoriasDestacadas(max)
      .then((data) => {
        setFeaturedStories(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching featured stories:", err);
        setError("No pudimos cargar las historias destacadas");
        setLoading(false);
      });
  }, [max]);

  if (loading) {
    return <div className="featured-loading">Cargando historias destacadas...</div>;
  }

  if (error) {
    return <div className="featured-error">{error}</div>;
  }

  if (!featuredStories || featuredStories.length === 0) {
    return <div className="featured-empty">No hay historias destacadas disponibles</div>;
  }

  return (
    <div className="featured-stories-container">
      <div className="featured-stories-grid">
        {featuredStories.map((story) => (
          <Link 
            key={story._id} 
            to={`/historias/${story._id}`}
            className="featured-story-item"
          >
            <div className="featured-story-image">
              {story.imageUrl ? (
                <img src={story.imageUrl} alt={story.title} />
              ) : (
                <div className="featured-placeholder-image">
                  <span>{story.title?.charAt(0) || "H"}</span>
                </div>
              )}
            </div>
            <div className="featured-story-content">
              <h3>{story.title}</h3>
              <p className="featured-story-excerpt">
                {story.content?.substring(0, 100)}
                {story.content?.length > 100 ? "..." : ""}
              </p>
              {story.author && (
                <p className="featured-story-author">
                  Por: {story.author.name || story.author.email || "Anónimo"}
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default HistoriasDestacadas;