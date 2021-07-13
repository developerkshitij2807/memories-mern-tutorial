import * as api from "../../api";

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
