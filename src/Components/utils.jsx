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


export const userValidation = (user,auth,poster) => {
  let invates = false;
  if(poster.limitation != 0 || auth){
    if(user.valid){
      if(poster.forCitizens == 1){
        if(user.citizen)
        {
          invates = true;
        }
      }else{
        invates = true;
      }
    }  
  }
  return invates
}