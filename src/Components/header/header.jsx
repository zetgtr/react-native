import { BackHandler, Image, Text, TouchableOpacity, View } from "react-native";
import style from "./header.scss";
import { faArrowLeft } from "@fortawesome/fontawesome-free-solid";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigate } from "react-router-native";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { exitAuth, getProfile } from "../../API/api";
import { useDispatch, useSelector } from "react-redux";
import { authSelector } from "../../Store/auth/selector";
import { useEffect } from "react";

const Header = ({ title, back , logout }) => {
  const navigate = useNavigate();
  const dicpatch = useDispatch();
  const { auth } = useSelector(authSelector);
  const onChengeBack = () => {
    navigate(-1);
  };
  const onChengeExit = () => {
    exitAuth(dicpatch, navigate);
  };
   useEffect(() => {
    const backAction = () => {
      navigate(-1)
      return true;
    };

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
      
      {back ? (
        <>
          <View style={style.boxText}>
            <Text style={style.title}>{title}</Text>
          </View>
          <TouchableOpacity onPress={() => onChengeBack()} style={style.link}>
            <View style={style.boxBack}>
              <FontAwesomeIcon style={style.icon} icon={faArrowLeft} />
            </View>
          </TouchableOpacity>
        </>
      ) : (
        <View style={style.boxText}>
          <Text style={style.text}>{title}</Text>
        </View>
      )}
      {auth && logout && (
        <TouchableOpacity  style={[{color: '', position: 'absolute', top: 15, right: 15 }]}
        onPress={() => {
          onChengeExit()
        }}
        >
          <View>
            <FontAwesomeIcon size={20} icon={faRightFromBracket} style={{color: '#3c52a6'}}/>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Header;
