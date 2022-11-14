import * as React from "react";
import { Video, AVPlaybackStatus } from "expo-av";
import { View, Button } from "react-native";
import style from "./video.scss";

const VideoMain = () => {
  const video = React.useRef(null);
  React.useEffect(() => {
    video.current.playAsync();
  });
  return (
    <View>
      <Video
        ref={video}
        style={style.video}
        source={{
          uri: "https://mo-strelna.ru/infusions/slider_panel/images/strelna-panaram-cut.mp4",
        }}
        resizeMode="contain"
        isLooping
      />
    </View>
  );
};

export default VideoMain;
