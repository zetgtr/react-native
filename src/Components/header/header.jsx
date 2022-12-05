import { BackHandler, Image, Text, TouchableOpacity, View } from "react-native";
import style from "./header.scss";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigate } from "react-router-native";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { exitAuth } from "../../API/api";
import { useDispatch, useSelector } from "react-redux";
import { authSelector } from "../../Store/auth/selector";
import { useEffect } from "react";
import { ROUTER } from "../../Router/constants";
import { faCircleQuestion } from "@fortawesome/free-regular-svg-icons";

const Header = ({
  title,
  logout,
  setTitle,
  setActiveAfish,
  setActiveNotifications,
  setActiveProfile,
}) => {
  const navigate = useNavigate();
  const dicpatch = useDispatch();
  const { auth } = useSelector(authSelector);
  const onChengeRules = () => {
    setTitle("Правила");
    setActiveAfish(false);
    setActiveNotifications(false)
    setActiveProfile(false)
    navigate(ROUTER.RULES);
  };
  const onChengeExit = () => {
    exitAuth(dicpatch, navigate);
  };
  const backAction = () => {
    navigate(-1);
    return true;
  };
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  return (
    <View style={style.container}>
      <View style={style.box}>
        <Image
          style={style.img}
          source={require("../../../img/logotype.png")}
        />
      </View>
      {!logout && (
        <TouchableOpacity onPress={() => onChengeRules()} style={style.link}>
          <View style={style.boxBack}>
            <FontAwesomeIcon style={style.icon} icon={faCircleQuestion} />
          </View>
        </TouchableOpacity>
      )}
      <View style={style.boxText}>
        <Text style={style.text}>{title}</Text>
      </View>

      {auth && logout && (
        <TouchableOpacity
          style={[{ color: "", position: "absolute", top: 15, right: 22 }]}
          onPress={() => {
            onChengeExit();
          }}
        >
          <View>
            <FontAwesomeIcon
              size={20}
              icon={faRightFromBracket}
              style={{ color: "#3c52a6" }}
            />
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Header;
