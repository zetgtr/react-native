import React from "react";
import messaging from "@react-native-firebase/messaging";
import Router from "./src/Router/Router.jsx";
import { store } from "./src/Store/index.jsx";
import { Provider } from "react-redux";
import PushNotification from "react-native-push-notification";
import { StatusBar } from "react-native";

export default function App() {
  // const getPushData = async (massage) => {
  //   PushNotification.localNotification({
  //     message: massage.notification.body,
  //     title: massage.notification.title,
  //     when: massage.sentTime,
  //     group: massage.notification.android.imageUrl,
  //     largeIconUrl: massage.notification.android.imageUrl,
  //     channelId: "channel-id",
  //   })

  // };


  // messaging().onMessage(getPushData);
  // messaging().setBackgroundMessageHandler(getPushData);


  // const getToken = async () => {
  //   const token = await messaging().getToken();
  // };

  // useEffect(() => {
  //   getToken();
  // }, []);

  return (
    <Provider store={store}>
        <StatusBar
          animated={true}
          backgroundColor="#FFFFFF"
          barStyle={'dark-content'} />
        <Router></Router>
    </Provider>

  );
}
