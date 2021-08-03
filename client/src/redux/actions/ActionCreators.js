import * as api from "../../api/index";
import * as constants from "./ActionTypes";

//Action Creators

// this method of allowing 'async(dispatch)' is possible through the use of redux thunk
export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchPosts();
    dispatch({ type: constants.FETCH_POSTS, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const createPost = (newPost) => async (dispatch) => {
  try {
    await api.createPost(newPost);
    dispatch({ type: constants.CREATE_POST, payload: newPost });
  } catch (error) {
    console.log(error);
  }
};

export const updatePost = (postID, updatedPost) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(postID, updatedPost);
    dispatch({ type: constants.UPDATE_POST, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = (postId) => async (disptach) => {
  try {
    await api.deletePost(postId);
    disptach({ type: constants.DELETE_POST, payload: postId });
  } catch (error) {
    console.log(error);
  }
};

export const incrementLikeCounter = (postId) => async (dispatch) => {
  try {
    const { data } = await api.incrementLikeCounter(postId);
    dispatch({ type: constants.INCREMENT_LIKE_COUNT, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const signin = (formData, history) => async (dispatch) => {
  try {
  } catch (error) {}
};
export const signup = (formData, history) => async (dispatch) => {
  try {
  } catch (error) {}
};
