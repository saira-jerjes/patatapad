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
const register = (user) => http.post("/users", user);
const login = (user) => http.post("/sessions", user);


const getStories = (id) => http.get(`/stories/${id}`);

const deleteStory = (id) => http.delete(`/stories/${id}`);

export { login, getStories, deleteStory, register, profile };

// tengo que enlistar stories