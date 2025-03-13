import { useEffect, useState } from "react";
import PageLayout  from "../components/layouts/page-layout/page-layout";
import { useAuthContext } from "../contexts/auth-context";
import HistoriaItem from "../components/stories/story-item/story-item";
import * as PatatapadApi from "../services/api-services";
import StoryItem from "../components/stories/story-item/story-item";

function ProfilePage() {
  const { user } = useAuthContext();
  const [historiasEscritas, setHistoriasEscritas] = useState([]);
  const [historiasLeidas, setHistoriasLeidas] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    console.log(user);
    if (user && user.id) {
      PatatapadApi.getHistoriasEscritas(user.id)
        .then(setHistoriasEscritas)
        .catch(console.error);

      PatatapadApi.getHistoriasLeidas(user.id)
        .then(setHistoriasLeidas)
        .catch(console.error);

      setIsLoading(false);
    } else {
      console.error("User ID is undefined");
      setIsLoading(false);
    }
  }, [user]);

  if (isLoading) {
    return (
      <PageLayout>
        <h3 className="fw-light text-center mt-5">Cargando perfil...</h3>
      </PageLayout>
    );
  }
  if (!user) {
    return (
      <PageLayout>
        <h3 className="fw-light text-center mt-5">Debes iniciar sesión para ver tu perfil</h3>
      </PageLayout>
    );
  }

  if (!user) {
    return (
      <PageLayout>
        <h3 className="fw-light text-center mt-5">Debes iniciar sesión para ver tu perfil</h3>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <h2 className="fw-bold mt-5">Mi perfil</h2>

      <h4 className="fw-light mt-4">Mis historias</h4>
      <div className="d-flex overflow-auto gap-3">
        {historiasEscritas.map(story => (
          <StoryItem key={story.id} story={story} />
        ))}
      </div>

      <h4 className="fw-light mt-4">Historial de lectura</h4>
      <div className="d-flex overflow-auto gap-3">
        {historiasLeidas.map(story => (
          <StoryItem key={story.id} story={story} />
        ))}
      </div>
    </PageLayout>
  );
}

export default ProfilePage;
