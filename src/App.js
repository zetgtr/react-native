import { Provider } from "react-redux";
// import { PersistGate } from "redux-persist/integration/react";
import Router from "./Router/Router.jsx";
import { store } from "./Store/index.jsx";

export default function App() {
  return (
    <Provider store={store}>
      {/* <PersistGate loading={null} persistor={persistor}> */}
      <Router></Router>
      {/* </PersistGate> */}
    </Provider>
  );
}
