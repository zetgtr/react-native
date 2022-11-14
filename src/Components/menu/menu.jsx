import { Image, View } from "react-native";
import style from "./menu.scss";
const Menu = () => (
  <View style={style.container}>
    <View style={style.box}>
      <Image style={style.img} source={require("../../../img/logotype.png")} />
    </View>
  </View>
);

export default Menu;
