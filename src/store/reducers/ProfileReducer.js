import { FETCH_PROFILE, PROFILE_LOADING } from "../actions/types";

const inititalState = {
  profileData: null,
  loading: false
};

export default (state = inititalState, action) => {
  switch (action.type) {
    case PROFILE_LOADING: {
      return {
        ...state,
        loading: true
      };
    }
    case FETCH_PROFILE:
      return {
        ...state,
        profileData: action.payload,
        loading: false
      };
    default:
      return state;
  }
};
