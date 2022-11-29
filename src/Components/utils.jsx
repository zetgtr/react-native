import { Image } from "react-native";
import { setAllPushAction } from "../Store/push/actions";
import database from "@react-native-firebase/database";
import auth from "@react-native-firebase/auth";

export const imgPoster = (
  posters,
  widthImg,
  setStyleImg,
  styleImg,
  setLoading
) => {
  let index = "";
  posters?.map((poster, i) => {
    Image.getSize(poster.photo, (width, height) => {
      const tmp = widthImg - 2.5;
      index = poster.classImg;
      styleImg[index] = {
        width: widthImg,
        height: tmp + tmp * ((height - width) / width),
        borderRadius: 5,
        borderWidth: 5,
        borderColor: "#FFF",
        margin: 0,
        marginLeft: 10,
        flex: 2.5,
      };
      setStyleImg(styleImg);
      if (posters.length - 1 == i) setLoading(false);
    });
  });
};

export const userValidation = (user, auth, poster) => {
  let invates = false;
  if (poster.limitation != 0 || auth) {
    if (user?.valid) {
      invates = true;
    }
  }
  return invates;
};

export const getPushFirebase = async (dispatch) => {
  await database()
    .ref("token")
    .child(auth().currentUser.uid)
    .child("massage")
    .on("value", (snapshot) => {
        dispatch(setAllPushAction({"key": Object.values(snapshot)[0].childKeys, "pushs": Object.values(snapshot)[0].value}));
    });
};