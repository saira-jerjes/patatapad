import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PageLayout from "../components/layouts/page-layout/page-layout";
import * as PatatapadApi from "../services/api-services";
import "./story-detail.css";

function HistoriaDetallePage() {
  const { id } = useParams();
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      setLoading(true);
      PatatapadApi.getStories(id)
        .then((data) => {
          setStory(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching story details:", err);
          setError("No pudimos cargar la historia. Por favor, inténtalo de nuevo.");
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) {
    return (
      <PageLayout>
        <div className="container mt-5">
          <h3 className="fw-light text-center">Cargando historia...</h3>
        </div>
      </PageLayout>
    );
  }

  if (error) {
    return (
      <PageLayout>
        <div className="container mt-5">
          <h3 className="fw-light text-center text-danger">{error}</h3>
        </div>
      </PageLayout>
    );
  }

  if (!story) {
    return (
      <PageLayout>
        <div className="container mt-5">
          <h3 className="fw-light text-center">Historia no encontrada</h3>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="story-detail-container container mt-5">
        <div className="story-header">
          <h1 className="story-title">{story.title}</h1>
        </div>

        <div className="story-content mt-4">
          <div className="story-image-container mb-4">
            {story.imageUrl && (
              <img src={story.imageUrl} alt={story.title} className="story-image img-fluid rounded" />
            )}
          </div>
          
          <div className="story-description">
            <p>{story.content}</p>
          </div>

          {story.categories && story.categories.length > 0 && (
            <div className="story-categories mt-3">
              <h5>Categorías:</h5>
              <div className="categories-list">
                {story.categories.map((category, index) => (
                  <a key={index} href={`/categorias/${category._id}`} className="category-tag">
                    {category.name}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
}

export default HistoriaDetallePage;