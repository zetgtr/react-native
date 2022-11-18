import { Provider } from "react-redux";
// import { PersistGate } from "redux-persist/integration/react";
import Router from "./src/Router/Router.jsx";
import { store } from "./src/Store/index.jsx";
import Menu from "./src/Components/menu/menu.jsx";

export default function App() {
  return (
    <Provider store={store}>
      {/* <PersistGate loading={null} persistor={persistor}> */}
      <Router></Router>
      {/* </PersistGate> */}
    </Provider>
  );
}
