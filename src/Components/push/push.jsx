import { useEffect, useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";
import PushNotification from "react-native-push-notification";
import style from "./push.scss";

const Push = ({
  setTitle,
  setActiveAfish,
  setActiveNotifications,
  setActiveProfile,
}) => {
  const [pushs, setPushs] = useState([]);
//   PushNotification.getDeliveredNotifications((notifcations) => {
//     setPushs(notifcations);
//   });
  useEffect(() => {
    setActiveAfish(false);
    setActiveProfile(false);
    setActiveNotifications(true);
    setTitle("Уведомления");
  }, []);
  return (
    <>
      {pushs.length > 0 ?<ScrollView style={style.scroll}>
        { pushs.map((push, index) => {
          return (
            <View key={index} style={style.container}>
              <View style={style.item}>
                <View style={style.wrapper}>
                  <View style={style.itemText}>
                    <View style={{}}>
                      <Text style={style.subtitle}>
                        {push.title}
                      </Text>
                      <Text style={style.title}>{push.body}</Text>
                    </View>
                    {/* <Text style={style.date}>{poster.startsAt}</Text> */}
                  </View>
                  <View style={style.itemImgContainer}>
                    <Image
                      style={style.itemImg}
                      source={{
                        uri: push.group,
                      }}
                    />
                  </View>
                </View>
              </View>
            </View>
          );
        }) }
      </ScrollView> : <View style={style.nonePush}><Text>Уведомления отсутствуют</Text></View>}
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
