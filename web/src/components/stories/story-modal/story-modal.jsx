import { useState } from "react";
import "./story-modal.css";

function StoryModal({ onClose, onSave }) {
  const [title, setTitle] = useState("");
  const [extract, setExtract] = useState("");
  const [content, setContent] = useState("");
  const [categories, setCategories] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const storyData = { title, extract, content }
    console.log(storyData); 
    onSave(storyData); 
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h3>Crear Nueva Historia</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Título</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Extracto</label>
            <input
              type="text"
              value={extract}
              onChange={(e) => setExtract(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Contenido</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Categorías (separadas por comas)</label>
            <input
              type="text"
              value={categories}
              onChange={(e) => setCategories(e.target.value)}
              required
            />
          </div>

          <div className="modal-actions">
            <button type="submit" className="btn btn-primary rounded-pill">
              Guardar
            </button>
            <button
              type="button"
              className="btn btn-secondary rounded-pill"
              onClick={onClose}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default StoryModal;
