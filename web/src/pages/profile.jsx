// import { useEffect, useState } from "react";
import PageLayout  from "../components/layouts/page-layout/page-layout";
import { useAuthContext } from "../contexts/auth-context";
import HistoriaItem from "../components/stories/story-item/story-item";
import * as PatatapadApi from "../services/api-services";

function MePage() {
  const { user } = useAuthContext();
  // const [historiasEscritas, setHistoriasEscritas] = useState([]);
  // const [historiasLeidas, setHistoriasLeidas] = useState([]);

  // useEffect(() => {
  //   if (user) {
  //     PatatapadApi.getHistoriasEscritas(user.id)
  //       .then(setHistoriasEscritas)
  //       .catch(console.error);
      
  //     PatatapadApi.getHistoriasLeidas(user.id)
  //       .then(setHistoriasLeidas)
  //       .catch(console.error);
  //   }
  // }, [user]);

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
        {/* {historiasEscritas.map(historia => (
          <HistoriaItem key={historia.id} historia={historia} />
        ))} */}
      </div>

      <h4 className="fw-light mt-4">Historial de lectura</h4>
      <div className="d-flex overflow-auto gap-3">
        {/* {historiasLeidas.map(historia => (
          <HistoriaItem key={historia.id} historia={historia} />
        ))} */}
      </div>
    </PageLayout>
  );
}

export default MePage;
