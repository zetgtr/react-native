import { Image } from "react-native";

export const infoImg = (url) => {
  img = new Image();
  img.onload = function () {
    console.log(this.width, this.height);
  };

  img.src = url;
};
