import { useState } from "react";
import { Image, Text, View } from "react-native";
import style from "./header.scss";

const Header = () => {
  const [title, setTitle] = useState("Афиша мероприятий");
  return (
    <View style={style.container}>
      <View style={style.box}>
        <Image
          style={style.img}
          source={require("../../../img/logotype.png")}
        />
      </View>
      <View style={style.boxText}>
        <Text style={style.text}>{title}</Text>
      </View>
    </View>
  );
};

export default Header;
