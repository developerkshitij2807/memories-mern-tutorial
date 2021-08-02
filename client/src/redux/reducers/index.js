import { combineReducers } from "redux";

import posts from "./posts";
import auth from "./auth";

// This is the root reducer where all the reducers present for the application combine.
export default combineReducers({ posts, auth });
