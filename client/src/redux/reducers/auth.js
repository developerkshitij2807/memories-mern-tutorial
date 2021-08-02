import * as constants from "../actions/ActionTypes";
// eslint-disable-next-line import/no-anonymous-default-export
export default (state = { authData: null }, action) => {
  switch (action.type) {
    case constants.AUTH:
      // this is done to set a local storage, so that if we refresh, we will not logout automatically...
      localStorage.setItem("profile", JSON.stringify({ ...action.data }));
      return { ...state, authData: action.data };
    case constants.LOGOUT:
      localStorage.clear();
      return { ...state, authData: null };
    default:
      return state;
  }
};
