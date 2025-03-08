import { useEffect, useState } from "react";
import HistoriaItem from "../story-item/story-item";
import * as PatatapadApi from "../../../services/api-services";
import "./featured-story.css"

function HistoriasDestacadas({ max = 2 }) {
  const [historias, setStories] = useState([]);

  useEffect(() => {
    PatatapadApi.listHistoriasDestacadas(max)
      .then((data) => setStories(data))
      .catch((error) => console.error(error));
  }, [max]);

  return (
    <div className="d-flex overflow-auto gap-3">
      {historias.map((historia) => (
        <HistoriaItem key={historia.id} historia={historia} />
      ))}
    </div>
  );
}

export default HistoriasDestacadas;