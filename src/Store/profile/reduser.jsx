import { SET_ALL_PROFILE_ACTION } from "./constants";

const initialState = {
  invites: [],
  loading: true,
};

export const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ALL_PROFILE_ACTION: {
      let invites = action.payload;
      return {
        ...state,
        invites,
        loading: false,
      };
    }
    default:
      return state;
  }
};