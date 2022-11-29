import React, { useEffect } from "react";
import messaging from "@react-native-firebase/messaging";
import Router from "./src/Router/Router.jsx";
import { store } from "./src/Store/index.jsx";
import { Provider } from "react-redux";
import PushNotification from "react-native-push-notification";
import { StatusBar } from "react-native";
import database, { firebase } from "@react-native-firebase/database";
import auth from "@react-native-firebase/auth";

export default function App() {
  const getPushData = (massage) => {
    console.log(massage);
    const id = auth().currentUser.uid;
    const app = firebase.app();
    database(app).ref("token").child(id).child("massage").push(massage);
    PushNotification.localNotification({
      message: massage.notification.body,
      title: massage.notification.title,
      when: massage.sentTime,
      group: massage.notification.android.imageUrl,
      largeIconUrl: massage.notification.android.imageUrl,
      channelId: "channel-id",
    });
  };

  messaging().onMessage(getPushData);
  messaging().setBackgroundMessageHandler(getPushData);

  useEffect(() => {
    auth()
      .signInAnonymously()
      .then(() => {
        console.log("User signed in anonymously");
      })
      .catch((error) => {
        if (error.code === "auth/operation-not-allowed") {
          console.log("Enable anonymous in your firebase console.");
        }

        console.error(error);
      });
  }, []);

  // const getToken = async () => {
  //   const token = await messaging().getToken();
  // };

  // async check

  // useEffect(() => {
  // messaging().hasPermission()
  // getToken();
  // }, []);

  return (
    <Provider store={store}>
      <StatusBar
        animated={true}
        backgroundColor="#FFFFFF"
        barStyle={"dark-content"}
      />
      <Router></Router>
    </Provider>
  );
}
