import { FETCH_PROFILE, PROFILE_LOADING } from "./types";
import API from "../../config/api";

export const fetchProfile = token => dispatch => {
  dispatch(setProfileLoading());
  API.get("/api/profile", {
    headers: {
      Authorization: token
    }
  })
    .then(response => {
      dispatch({
        type: FETCH_PROFILE,
        payload: response.data
      });
    })
    .catch(err => {
      dispatch({
        type: FETCH_PROFILE,
        payload: {}
      });
    });
};

export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};
