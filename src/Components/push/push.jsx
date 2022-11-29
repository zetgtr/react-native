import { useEffect, useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";
import PushNotification from "react-native-push-notification";
import messaging from "@react-native-firebase/messaging";
import style from "./push.scss";
import database from "@react-native-firebase/database";
import auth from "@react-native-firebase/auth";
import { date } from "../../API/utils";

const Push = ({
  setTitle,
  setActiveAfish,
  setActiveNotifications,
  setActiveProfile,
}) => {
  // const [newPushs, setNewPushs] = useState([]);
  const [pushs, setPushs] = useState([]);
  const [keys, setKeys] = useState()
  const [idUser] = useState(auth().currentUser.uid);


  // PushNotification.getDeliveredNotifications((notifcations) => {
  //   setNewPushs(notifcations);
  // });

  const getPushFirebase = async () => {
    await database()
      .ref("token")
      .child(idUser)
      .child("massage")
      .on("value", (snapshot) => {
        setPushs([]);
          setKeys(Object.values(snapshot)[0].childKeys);
          setPushs(Object.values(snapshot)[0].value)
      });
  };
  useEffect(() => {
    getPushFirebase();
    setActiveAfish(false);
    setActiveProfile(false);
    setActiveNotifications(true);
    setTitle("Уведомления");
    messaging()
      .getInitialNotification()
      .then((message) => {
        console.log(message);
      });
  }, []);
  return (
    <>
      {keys?.length > 0 ? (
        <ScrollView style={style.scroll}>
          {keys?.slice(0).reverse().map((key) => {
              return (
                <View key={key} style={style.container}>
                  <View style={style.item}>
                    <View style={style.wrapper}>
                      <View style={style.itemText}>
                        <View style={{}}>
                          <Text style={style.subtitle}>
                            {pushs[key]?.notification?.title}
                          </Text>
                          <Text style={style.title}>
                            {pushs[key]?.notification?.body}
                          </Text>
                        </View>
                        <Text style={style.date}>{pushs[key]?.data.date}</Text>
                      </View>
                      <View style={style.itemImgContainer}>
                        <Image
                          style={style.itemImg}
                          source={{
                            uri: pushs[key]?.notification.android?.imageUrl,
                          }}
                        />
                      </View>
                    </View>
                  </View>
                </View>
              );
          })}
        </ScrollView>
      ) : (
        <View style={style.nonePush}>
          <Text>Уведомления отсутствуют</Text>
        </View>
      )}
    </>
  );
  // return(

  //     <>
  //     <ScrollView
  //         style={style.scroll}
  //     >
  //         <View style={style.container}>
  //             <View style={style.item}>
  //                 <View style={style.wrapper}>
  //                     <View style={style.itemText}>
  //                         <View style={{}}>
  //                             <Text style={style.subtitle}>
  //                                 Появилось новое мероприятие
  //                             </Text>
  //                             <Text style={style.title}>
  //                                 КИНОЛЕКТОРИЙ ВО ЛЬВОВСКОМ ДВОРЦЕ. «НЕЗАВИСИМЫЕ»
  //                             </Text>
  //                         </View>
  //                         <Text style={style.date}>
  //                             12.04.2000
  //                         </Text>
  //                     </View>
  //                     <View style={style.itemImgContainer}>
  //                         <Image
  //                             style={style.itemImg}
  //                             source={
  //                                 require('./../../../img/1668771371.jpg')
  //                             }
  //                         />
  //                     </View>
  //                 </View>
  //             </View>
  //         </View>
  //     </ScrollView>
  //   </>
  // );
};

export default Push;
