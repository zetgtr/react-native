import { Provider } from "react-redux";
// import { PersistGate } from "redux-persist/integration/react";
import Router from "./src/Router/Router.jsx";
import { store } from "./src/Store/index.jsx";
import Menu from "./src/Components/menu/menu.jsx";
import {StyleSheet, Text} from 'react-native';
import React, {useState, useEffect} from 'react';
import AnimatedLoader from 'react-native-animated-loader';

export default function App() {

  const [visible, setVisible] = useState(true);

  // useEffect(() => {
  //   setInterval(() => {
  //     setVisible(!visible);
  //   }, 2000);
  // }, []);

  return (
    <Provider store={store}>
      {/* <AnimatedLoader
      visible={visible}
      overlayColor="rgba(255,255,255,1)"
      animationStyle={styles.lottie}
      speed={1}>
      <Text>Мобильное приложение стрельна, версия 1.0</Text>
    </AnimatedLoader> */}
      {/* <PersistGate loading={null} persistor={persistor}> */}
      <Router></Router>
      {/* </PersistGate> */}
    </Provider>
  );
}

const styles = StyleSheet.create({
  lottie: {
    width: 100,
    height: 100,
  },
});
