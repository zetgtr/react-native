import { faSignInAlt } from "@fortawesome/fontawesome-free-solid";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigate } from "react-router-native";
import { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  View,
  Linking,
  TouchableHighlight,
} from "react-native";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getAuth, signIn } from "../../API/api";
import { authSelector } from "../../Store/auth/selector";
import style from "./auth.scss";
import { ActivityIndicator } from "@react-native-material/core";

export const Auth = ({
  setBack,
  setTitle,
  setActiveAfish,
  setActiveNotifications,
  setActiveProfile,
}) => {
  const [login, onChangeLogin] = useState(null);
  const [password, onChangePassword] = useState(null);
  const [render, setRender] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { auth } = useSelector(authSelector);
  const onPressAuth = () => {
    setLoading(true);
    signIn(login, password, setError, dispatch, navigate, setLoading);
  };
  // const onLayoutGetHigth = (height) => {
  //   style.container = {
  //     ...style.container,
  //     height,
  //   };
  //   setRender(!render);
  // };
  const onRestorePassword = () => {
    const url = "https://mo-strelna.ru/auth/recovery/";
    Linking.openURL(url).catch((err) =>
      console.error("An error occurred", err)
    );
  };
  const onRegistration = () => {
    const url = "https://mo-strelna.ru/auth/create/";
    Linking.openURL(url).catch((err) =>
      console.error("An error occurred", err)
    );
  };
  useEffect(() => {
    setActiveAfish(false);
    setActiveProfile(true);
    setActiveNotifications(false);
    setTitle("Авторизация");
    setBack(false);
    getAuth(dispatch, navigate);
    setRender(!render);
  }, []);
  return (
    <>
      {auth ? (
        <></>
      ) : (
        // <ScrollView
        // onLayout={(e) => onLayoutGetHigth(e.nativeEvent.layout.height)}
        //   style={style.containerScroll}
        // >
        <View style={style.container}>
          <View style={style.box}>
            {loading ? (
              <ActivityIndicator size="large" color="#4f68c8" />
            ) : (
              <>
                <View style={style.imgContainer}>
                  <Image
                    style={style.img}
                    source={require("../../../img/logotype.png")}
                  />
                </View>
                {error && (
                  <Text
                    style={{
                      backgroundColor: "#de0000",
                      padding: 10,
                      borderRadius: "5",
                      overflow: "hidden",
                      color: "#fff",
                      width: "100%",
                      textAlign: "center",
                      fontSize: 10,
                    }}
                  >
                    {error}
                  </Text>
                )}
                <TextInput
                  autoComplete={"name"}
                  style={styles.input}
                  onChangeText={onChangeLogin}
                  value={login}
                  placeholder="Логин или Email"
                />
                <TextInput
                  autoComplete={"password"}
                  style={styles.input}
                  onChangeText={onChangePassword}
                  value={password}
                  placeholder="Пароль"
                  secureTextEntry={true}
                />
                <TouchableHighlight
                  underlayColor="#f7ca27"
                  onPress={() => onPressAuth()}
                  style={style.buttonBlue}
                >
                  <>
                    <FontAwesomeIcon
                      icon={faSignInAlt}
                      style={[style.iconButton, style.iconButtonBlue]}
                    />
                    <Text style={{ color: "#fff", marginTop: 2 }}>Войти</Text>
                  </>
                </TouchableHighlight>

                <TouchableOpacity
                  style={style.buttonReg}
                  onPress={() => onRegistration()}
                >
                  <Text>Регистрация</Text>
                </TouchableOpacity>
                <TouchableOpacity style={style.restore} onPress={() => onRestorePassword()}>
                  <Text style={{ color: "#3c52a6", marginTop: 0 }}>
                    Восстановление пароля
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
        // </ScrollView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 48,
    width: "100%",
    margin: 8,
    borderWidth: 1,
    padding: 10,
    borderColor: "#ced4da",
    // color: '#808080'
  },
});
