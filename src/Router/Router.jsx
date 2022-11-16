import { Button, StyleSheet, View } from "react-native";

const Router = () => {
  const onPressLearnMore = () => {
    console.log(23);
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
