import { Image, Text, TouchableOpacity, View } from "react-native";
import { ROUTER } from "../../Router/constants";
import style from "./header.scss";
import { faArrowLeft } from "@fortawesome/fontawesome-free-solid";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Link, useNavigate } from "react-router-native";

const Header = ({ title, back }) => {
  const navigate = useNavigate();
  const onChengeBack = () => {
    navigate(-1);
  };
  return (
    <View style={style.container}>
      <View style={style.box}>
        <Image
          style={style.img}
          source={require("../../../img/logotype.png")}
        />
      </View>
      {back ? (
        <TouchableOpacity onPress={() => onChengeBack()} style={style.link}>
          <View style={style.boxBack}>
            <FontAwesomeIcon style={style.icon} icon={faArrowLeft} />
            <Text style={style.textBack}>{title}</Text>
          </View>
        </TouchableOpacity>
      ) : (
        <View style={style.boxText}>
          <Text style={style.text}>{title}</Text>
        </View>
      )}
    </View>
  );
};

export default Header;
