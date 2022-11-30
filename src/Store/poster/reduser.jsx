import { SET_POSTER_ACTION, SET_ALL_POSTER_ACTION, LOADING_POSTER_ACTION } from "./constants";

const initialState = {
  posters: [],
  poster: {},
  loading: true,
  loadingPoster: false,
};

export const posterReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_POSTER_ACTION: {
      return {
        ...state,
        loadingPoster: action.payload
      }
    }
    case SET_POSTER_ACTION: {
      return {
        ...state,
        poster: action.payload,
      };
    }
    case SET_ALL_POSTER_ACTION: {
      let posters = action.payload;
      return {
        ...state,
        posters,
        loading: false,
      };
    }
    default:
      return state;
  }
};
