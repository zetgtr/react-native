const initialState = {
  showName: false,
  name: "",
};

export const posterReducer = (state = initialState, action) => {
  console.log(action.type);
  return state;
};
