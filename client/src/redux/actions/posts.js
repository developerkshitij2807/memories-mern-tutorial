import * as api from "../../api/index";

//Action Creators

// this method of allowing 'async(dispatch)' is possible through the use of redux thunk
export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchPosts();
    dispatch({ type: "FETCH_POSTS", payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const createPost = (newPost) => async (dispatch) => {
  try {
    api.createPost(newPost);
    dispatch({ type: "CREATE_POST", payload: newPost });
  } catch (error) {
    console.log(error.message);
  }
};
