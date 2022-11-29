import { SET_ALL_PUSH_ACTION } from "./constants";

const initialState = {
  pushs: {},
  pushKeys: [],
};

export const pushReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ALL_PUSH_ACTION: {
      return {
        ...state,
        pushs: action.payload.pushs,
        pushKeys: action.payload.key
      };
    }
    default:
      return state;
  }
};
