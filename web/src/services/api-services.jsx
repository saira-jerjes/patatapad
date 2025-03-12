import axios from "axios";

const http = axios.create({
  baseURL: "http://localhost:3000/api/patatapad/",
  withCredentials: true,
});

http.interceptors.response.use(
  (response) => response.data,
  (error) => {
    return Promise.reject(error);
  }
);

const profile = () => http.get("/users/me");
const register = (user) =>
  http.post("/users", user, {
    headers: { "Content-Type": "application/json" }
  });

const login = (user) => http.post("/sessions", user);

const getStories = (id) => http.get(`/stories/${id}`);
const listStories = () => http.get("/stories");
const listHistoriasDestacadas = (max) => http.get(`/stories/featured?max=${max}`);
const deleteStory = (id) => http.delete(`/stories/${id}`);

const listCategorias = () => http.get("/stories/categories");

const getHistoriasEscritas = (userId) => http.get(`/users/${userId}/historias-escritas`);
const getHistoriasLeidas = (userId) => http.get(`/users/${userId}/historias-leidas`);

export { login, getStories, listStories, listHistoriasDestacadas, deleteStory, register, profile, listCategorias, getHistoriasEscritas, getHistoriasLeidas };
