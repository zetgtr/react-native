import { Text, View, ScrollView } from "react-native";
import { Famaly } from "../family/family";
import style from "./style.scss"

export const InvitationPage = ({poster}) => {

  return (
    <ScrollView style={style.scroll}>
      <View style={style.containerScroll}>
      <View style={style.container}>
        <Text>Получить приглашение на: «{poster.title}» </Text>
        <Text>КТО ПОЙДЁТ?</Text>
        <Text>Пожалуйста, отметьте, на кого оформить приглашение.</Text>
        <Famaly invitation={true}/>
        </View>
      </View>
    </ScrollView>
  );
};
