import { createStore, combineReducers } from "redux";
import { posterReducer } from "./poster/reduser";

import { persistStore } from "redux-persist";
import { authReducer } from "./auth/reduser";
import { profileReducer } from "./profile/reduser";
import { pushReducer } from "./push/reduser";

const rootReducer = combineReducers({
  poster: posterReducer,
  auth: authReducer,
  profile: profileReducer,
  push: pushReducer
});

export const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export const persistor = persistStore(store);
