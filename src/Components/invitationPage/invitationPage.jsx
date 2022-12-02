import { faTicketAlt } from "@fortawesome/fontawesome-free-solid";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useState } from "react";
import { Text, View, TouchableHighlight } from "react-native";
import { useSelector } from "react-redux";
import { setInvie } from "../../API/api";
import { posterSelector } from "../../Store/poster/selector";
import { Famaly } from "../family/family";
import style from "./style.scss";

export const InvitationPage = () => {
  const [members, setMembers] = useState({});
  const [error, setError] = useState("");
  const [ids, setIds] = useState("");
  const { poster } = useSelector(posterSelector);
  const onChengeInvitation = () => {
    setInvie(ids, poster, setError, setMembers);
  };
  return (
    <>
      <View style={style.containerScroll}>
        <View style={style.container}>
          <View>
            <Text style={{ marginTop: 5 }}>Получить приглашение на:</Text>
            <Text style={style.title}>«{poster.title}»</Text>
          </View>
          <Text style={style.subtitle}>КТО ПОЙДЁТ?</Text>
          <Text style={{ fontSize: 10, marginTop: 5, marginBottom: 5 }}>
            Пожалуйста, отметьте, на кого оформить приглашение.
          </Text>
        </View>
        {error && (
          <Text
            style={{
              backgroundColor: "#de0000",
              padding: 10,
              borderRadius: "5",
              overflow: "hidden",
              color: "#fff",
              width: "90%",
              textAlign: "center",
              fontSize: 10,
            }}
          >
            {error}
          </Text>
        )}
        <Famaly
          invitation={true}
          members={members}
          ids={ids}
          setIds={setIds}
          setMembers={setMembers}
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
