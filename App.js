import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import Menu from "./src/Components/menu/menu";
import VideoMain from "./src/Components/video/video";
import Appstyles from "./src/style/App.scss";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { faSquareCheck } from "@fortawesome/free-solid-svg-icons/faSquareCheck";

library.add(fab, faSquareCheck);

export default function App() {
  return (
    <View style={Appstyles.container}>
      <Menu />
      <VideoMain />
      <StatusBar style="auto" />
    </View>
  );
}
