import { GET_AUTH_ACTION, SET_AUTH_ACTION } from "./constants";

const initialState = {
  auth: false,
  login: "",
  password: "",
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTH_ACTION: {
      return {
        ...state,
        auth: action.payload.auth,
        login: action.payload.login,
        password: action.payload.password
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
