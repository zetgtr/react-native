import { SET_POSTER_ACTION, SET_ALL_POSTER_ACTION } from "./constants";

const initialState = {
  posters: [],
  poster: {},
  loading: true,
};

export const posterReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_POSTER_ACTION: {
      // console.log(action.payload);
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
