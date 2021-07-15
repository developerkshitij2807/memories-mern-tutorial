/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */

// posts reducer
export default (posts = [], action) => {
  switch (action.type) {
    case "FETCH_POSTS":
      return action.payload;
    case "CREATE_POST":
      return [...posts, action.payload];
    default:
      return posts;
  }
};
