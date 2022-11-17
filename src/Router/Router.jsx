import { Button, StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { getAllPostersAction } from "../Store/poster/actions";
import { posterSelector } from "../Store/poster/selector";

const Router = () => {
  const dicpatch = useDispatch();
  const posters = useSelector(posterSelector);
  
  const onPressLearnMore = () => {

     dicpatch(getAllPostersAction())
     console.log('====================================');
     console.log(posters);
     console.log('====================================');
  };
  return (
    <View style={style.container}>
      <Button
        onPress={onPressLearnMore}
        title="Получить данные"
        color="#841584"
      />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 100,
  },
});

export default Router;
