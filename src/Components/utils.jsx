import { Image } from "react-native";

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
      const tmp = widthImg - 10;
      index = poster.classImg;
      styleImg[index] = {
        width: tmp,
        height: tmp + tmp * ((height - width) / width),
        borderRadius: 5,
        objectFit: "scale-down",
      };
      setStyleImg(styleImg);
      if (posters.length - 1 == i) setLoading(false);
    });
  });
};
