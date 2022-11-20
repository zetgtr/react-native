import { GET_AUTH_ACTION, SET_AUTH_ACTION } from "./constants";

const initialState = {
  auth: false,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTH_ACTION: {
      return {
        ...state,
        auth: action.payload,
      };
    }
    // case SET_ALL_POSTER_ACTION: {
    //   let posters = action.payload;
    //   return {
    //     ...state,
    //     posters,
    //     loading: false,
    //   };
    // }
    default:
      return state;
  }
};
