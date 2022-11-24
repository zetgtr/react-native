import { faTicketAlt } from "@fortawesome/fontawesome-free-solid";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useState } from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import { setInvie } from "../../API/api";
import { Famaly } from "../family/family";
import style from "./style.scss";

export const InvitationPage = ({ poster }) => {
  const [members, setMembers] = useState({});
  const [error, setError] = useState("");
  const onChengeInvitation = () => {
    setInvie(members["ids"], poster, setError, setMembers);
  };
  return (
    <>
      <View style={style.containerScroll}>
        <View style={style.container}>
          <Text>{error}</Text>
          <Text>Получить приглашение на: «{poster.title}» </Text>
          <Text>КТО ПОЙДЁТ?</Text>
          <Text>Пожалуйста, отметьте, на кого оформить приглашение.</Text>
        </View>
        <Famaly
          invitation={true}
          members={members}
          setMembers={setMembers}
          poster={poster}
        />
      </View>
      <TouchableHighlight
        style={style.invitationButton}
        underlayColor="#3c52a6"
        onPress={() => onChengeInvitation()}
      >
        <>
          <FontAwesomeIcon
            size={15}
            style={style.fontAwesomeIcon}
            icon={faTicketAlt}
          />
          <Text style={style.textInvitation}> ПОЛУЧИТЬ ПРИГЛАШЕНИЕ </Text>
        </>
      </TouchableHighlight>
    </>
  );
};
