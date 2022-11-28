import { useEffect, useState } from "react";
import { Image, Text, View } from "react-native";
import PushNotification from "react-native-push-notification";
import Svg, { Path } from "react-native-svg";
import { useSelector } from "react-redux";
import { Link } from "react-router-native";
import { ROUTER } from "../../Router/constants";
import { authSelector } from "../../Store/auth/selector";
import style from "./menu.scss";

const Menu = ({ count, activeProfile, activeAfish, activeNotifications }) => {
  const { auth } = useSelector(authSelector);
  const [pushs, setPushs] = useState([]);
  // PushNotification.getDeliveredNotifications((notifcations) => {
  //   setPushs(notifcations);
  // });

  return (
    <View style={style.container}>
      <Link underlayColor to={ROUTER.HOME}>
        <>
          <Svg
            style={style.svg}
            viewBox="0 -200 500 800"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <Path
              d="M224 32H64C46.3 32 32 46.3 32 64v64c0 17.7 14.3 32 32 32H441.4c4.2 0 8.3-1.7 11.3-4.7l48-48c6.2-6.2 6.2-16.4 0-22.6l-48-48c-3-3-7.1-4.7-11.3-4.7H288c0-17.7-14.3-32-32-32s-32 14.3-32 32zM480 256c0-17.7-14.3-32-32-32H288V192H224v32H70.6c-4.2 0-8.3 1.7-11.3 4.7l-48 48c-6.2 6.2-6.2 16.4 0 22.6l48 48c3 3 7.1 4.7 11.3 4.7H448c17.7 0 32-14.3 32-32V256zM288 480V384H224v96c0 17.7 14.3 32 32 32s32-14.3 32-32z"
              stroke={!activeAfish ? "#808080" : "#3c52a6"}
              strokeWidth={30}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
          <Text style={!activeAfish ? style.menuText : style.menuTextActive}>
            Афиша
          </Text>
        </>
      </Link>
      <Link underlayColor to={ROUTER.PUSH}>
        <View style={style.itemContainer}>
          <Svg
            style={style.svg}
            viewBox="0 -200 500 800"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <Path
              d="M224 0c-17.7 0-32 14.3-32 32V51.2C119 66 64 130.6 64 208v18.8c0 47-17.3 92.4-48.5 127.6l-7.4 8.3c-8.4 9.4-10.4 22.9-5.3 34.4S19.4 416 32 416H416c12.6 0 24-7.4 29.2-18.9s3.1-25-5.3-34.4l-7.4-8.3C401.3 319.2 384 273.9 384 226.8V208c0-77.4-55-142-128-156.8V32c0-17.7-14.3-32-32-32zm45.3 493.3c12-12 18.7-28.3 18.7-45.3H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7z"
              stroke={!activeNotifications ? "#808080" : "#3c52a6"}
              strokeWidth={30}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
          <Text
            style={!activeNotifications ? style.menuText : style.menuTextActive}
          >
            Уведомления
          </Text>
          {pushs.length > 0 && (
            <View style={style.count}>
              <Text
                style={{
                  color: "#fff",
                  fontSize: 8,
                  alignItems: "center",
                  width: "100%",
                  textAlign: "center",
                }}
              >
                {pushs.length}
              </Text>
            </View>
          )}
        </View>
      </Link>
      <Link underlayColor to={auth ? ROUTER.PROFILE : ROUTER.AUTH}>
        <>
          <Svg
            style={style.svg}
            viewBox="0 -200 500 800"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <Path
              d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0S96 57.3 96 128s57.3 128 128 128zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"
              stroke={!activeProfile ? "#808080" : "#3c52a6"}
              strokeWidth={30}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
          <Text style={!activeProfile ? style.menuText : style.menuTextActive}>
            Профиль
          </Text>
        </>
      </Link>
    </View>
  );
};

export default Menu;
