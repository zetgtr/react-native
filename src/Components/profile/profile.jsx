import { Text, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";
import { exitAuth } from "../../API/api";
import style from "./profile.scss";

export const ProFile = () => {
  const dispatch = useDispatch();
  const onChengeExit = () => {
    exitAuth(dispatch);
  };
  return (
    <View>
      <TouchableOpacity style={style.buttonExit} onPress={() => onChengeExit()}>
        <Text>Выйти</Text>
      </TouchableOpacity>
    </View>
  );
};
