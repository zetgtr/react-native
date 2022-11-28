import React, { useEffect } from "react";
import messaging from "@react-native-firebase/messaging";
import Router from "./src/Router/Router.jsx";
import { store } from "./src/Store/index.jsx";
import { Provider } from "react-redux";
import PushNotification from "react-native-push-notification";

export default function App() {
  const getPushData = async (massage) => {
    console.log('====================================');
    console.log(massage);
    console.log('====================================');
    PushNotification.localNotification({
      message: massage.notification.body,
      title: massage.notification.title,
      when: massage.sentTime,
      channelId: "channel-id",
    });
  };

  messaging().onMessage(getPushData);
  messaging().setBackgroundMessageHandler(getPushData);

  const getToken = async () => {
    const token = await messaging().getToken();
  };

  useEffect(() => {
    getToken();
  }, []);

  return (
    <Provider store={store}>
      <Router></Router>
    </Provider>
  );
}
