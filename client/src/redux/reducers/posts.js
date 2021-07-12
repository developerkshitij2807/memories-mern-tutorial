/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */

// posts reducer
export default (posts = [], action) => {
  switch (action.type) {
    case "FETCH_POSTS":
      return posts;
    case "CREATE_POST":
      return posts;
    default:
      return posts;
  }
};
