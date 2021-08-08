import axios from "axios";

const API = axios.create({
  baseURL: "https://memories-mern-tutorial-kshitij.herokuapp.com"
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  return req;
});

export const fetchPosts = () => API.get("/posts");

export const createPost = (newPost) => API.post("/posts", newPost);

// Our patch request will recieve an post id and updated data of new post, which will be later updated
export const updatePost = (postId, updatedPost) =>
  API.patch(`/posts/${postId}`, updatedPost);

// Delete Request
export const deletePost = (postId) => API.delete(`/posts/${postId}`);

// patch request
export const incrementLikeCounter = (postId) =>
  API.patch(`/posts/${postId}/likePost`);

// authentication routes
export const signIn = (formData) => API.post("/users/signin", formData);

export const signup = (formData) => {
  API.post("/users/signup", formData);
};
