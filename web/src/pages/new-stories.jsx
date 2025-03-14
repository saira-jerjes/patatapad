import React, { useState, useEffect } from "react";
import StoryItem from "../components/stories/story-item/story-item";
import PageLayout from "../components/layouts/page-layout/page-layout";
import axios from "axios";
import "./novedades.css";

function NovedadesPage() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await axios.get("/api/patatapad/stories");
        if (Array.isArray(response.data)) {
          setStories(response.data);
        } else {
          setStories([]);
        }
        setLoading(false);
        // eslint-disable-next-line no-unused-vars
      } catch (error) {
        setError("Error al cargar las historias");
        setLoading(false);
      }
    };

    fetchStories();
  }, []);

  return (
    <div className="fondo">
      <div className="content">
        <h1 className="title">Últimas Novedades</h1>
        {loading && <p>Cargando...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        <div className="d-flex overflow-auto gap-3 mt-3">
          {stories.length > 0 ? (
            stories.map((story) => <StoryItem key={story._id} story={story} />)
          ) : (
            <p>No hay historias disponibles.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default NovedadesPage;
