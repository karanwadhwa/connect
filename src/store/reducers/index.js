import { combineReducers } from "redux";
import AuthReducer from "./AuthReducer";
import PostsReducer from "./PostsReducer";
import ProfileReducer from "./ProfileReducer";

export default combineReducers({
  auth: AuthReducer,
  posts: PostsReducer,
  profile: ProfileReducer
});
