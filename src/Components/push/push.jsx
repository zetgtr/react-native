import { useEffect, useState } from "react";
import { Alert, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import style from "./push.scss";
import { useSelector } from "react-redux";
import { pushSelector } from "../../Store/push/selector";
import PushNotification from "react-native-push-notification";
import { getPoster } from "../../API/api";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-native";
import { loadingPosterAction } from "../../Store/poster/actions";
import { ROUTER } from "../../Router/constants";

const Push = ({
  setTitle,
  setActiveAfish,
  setActiveNotifications,
  setActiveProfile,
  setLogout
}) => {
  const [newPushs, setNewPushs] = useState([]);
  const { pushs, pushKeys } = useSelector(pushSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onChengeEvent = (event) => {
    dispatch(loadingPosterAction(true))
    navigate(ROUTER.POSTER);
    getPoster(event, dispatch, navigate, Alert);
  };

  useEffect(() => {
    setLogout(false);
    PushNotification.getDeliveredNotifications((notifcations) => {
      setNewPushs(notifcations);
    });
    PushNotification.removeAllDeliveredNotifications();
    setActiveAfish(false);
    setActiveProfile(false);
    setActiveNotifications(true);
    setTitle("Уведомления");
  }, []);
  return (
    <>
      {pushKeys?.length > 0 ? (
        <ScrollView style={style.scroll}>
          {pushKeys
            ?.slice(0)
            .reverse()
            .map((key) => {
              return (
                <TouchableOpacity
                  key={key}
                  onPress={() => {
                    onChengeEvent(pushs[key]?.data?.event);
                  }}
                >
                  <View style={style.container}>
                    <View style={style.item}>
                      <View style={style.wrapper}>
                        <View style={style.itemText}>
                          <View>
                            <Text style={style.subtitle}>
                              {pushs[key]?.notification?.title}
                            </Text>
                            <Text style={style.title}>
                              {pushs[key]?.notification?.body}
                            </Text>
                          </View>
                          <Text style={style.date}>
                            {pushs[key]?.data.date}
                          </Text>
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
                </TouchableOpacity>
              );
            })}
        </ScrollView>
      ) : (
        <View style={style.nonePush}>
          <Text style={{color: "#808080"}}>Уведомления отсутствуют!</Text>
        </View>
      )}
    </>
  );
};

export default Push;
