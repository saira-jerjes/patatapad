import { useEffect, useState } from "react";
import PageLayout from "../components/layouts/page-layout/page-layout";
import { useAuthContext } from "../contexts/auth-context";
import * as PatatapadApi from "../services/api-services";
import StoryItem from "../components/stories/story-item/story-item";
import StoryModal from "../components/stories/story-modal/story-modal";
import "./profile.css"

function ProfilePage() {
  const { user } = useAuthContext();
  const [writtenStories, setWrittenStories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (user && user.id) {
      PatatapadApi.getWrittenStories(user.id)
        .then(setWrittenStories)
        .catch(console.error);

      setIsLoading(false);
    } else {
      console.error("User ID is undefined");
      setIsLoading(false);
    }
  }, [user]);

  const handleCreateStory = (newStory) => {
    if (!user) {
      console.error("El usuario no está autenticado");
      return;
    }

    const storyData = {
      ...newStory,
      categories: [],
      author: user.id,
    };

    PatatapadApi.createStory(storyData)
      .then((story) => {
        setWrittenStories((prevStories) => [story, ...prevStories]);
        setShowModal(false);
      })
      .catch(console.error);
  };

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
  return (
    
      <div className="profile-background">
        <h2 className="title mt-5">Mi perfil</h2>

        <div className="d-flex justify-content-between align-items-center mt-4">
          <h4 className="fw-light">Mis historias</h4>
          <button className="btn btn-primary rounded-pill story" onClick={() => setShowModal(true)}>
            + Crear historia
          </button>
        </div>

        <div className="d-flex overflow-auto gap-3 mt-3 ">
          {writtenStories.map((story, index) => (
            <StoryItem className="story-card" key={story.id || index} story={story} />
          ))}
        </div>

        {showModal && <StoryModal onClose={() => setShowModal(false)} onSave={handleCreateStory} />}
      </div>
   
  );
}


export default ProfilePage;
