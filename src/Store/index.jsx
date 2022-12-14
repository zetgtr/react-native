import { createStore, applyMiddleware, compose, combineReducers } from "redux";
// import { chatsReducer } from "./Chats/reducer";
// import { messagesReducer } from "./Messages/reducer";
import { posterReducer } from "./poster/reduser";

import { persistStore } from "redux-persist";
// import createSagaMiddleware from "redux-saga";
// import { sagaWatcher } from "./sagas/sagas";
// import { fonReducer } from "./Settings/reducer";
// import { authReducer } from "./Auth/reducer";

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// const sagaMiddleware = createSagaMiddleware();

// const persistConfig = {
//   key: "root",
//   storage,
//   whitelist: ["fon"],
// };

const rootReducer = combineReducers({
  poster: posterReducer,
  // chats: chatsReducer,
  // messages: messagesReducer,
  // fon: fonReducer,
  // auth: authReducer,
});

// const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
// sagaMiddleware.run(sagaWatcher);

export const persistor = persistStore(store);
