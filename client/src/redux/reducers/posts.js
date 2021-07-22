// posts reducer
import * as constants from "../actions/ActionTypes";

// eslint-disable-next-line import/no-anonymous-default-export
export default (posts = [], action) => {
  switch (action.type) {
    case constants.UPDATE_POST:
    case constants.INCREMENT_LIKE_COUNT:
      return posts.map((post) =>
        post._id === action.payload ? action.payload : post
      );
    case constants.CREATE_POST:
      return [...posts, action.payload];
    case constants.FETCH_POSTS:
      return action.payload;
    case constants.DELETE_POST:
      return posts.filter((post) => post._id !== action.payload);
    default:
      return posts;
  }
};
