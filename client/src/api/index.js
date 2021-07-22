import axios from "axios";

const url = "https://memories-mern-tutorial-kshitij.herokuapp.com/posts";

export const fetchPosts = () => axios.get(url);

export const createPost = (newPost) => axios.post(url, newPost);

// Our patch request will recieve an post id and updated data of new post, which will be later updated
export const updatePost = (postId, updatedPost) =>
  axios.patch(`${url}/${postId}`, updatedPost);

// Delete Request
export const deletePost = (postId) => axios.delete(`${url}/${postId}`);

// patch request
export const incrementLikeCounter = (postId) =>
  axios.patch(`${url}/${postId}/likePost`);
