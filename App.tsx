import { StyleSheet, Text, View } from "react-native";
import { ProductViewSectionList } from "./src/Screen/Main";

export default function App() {
  return (
    <View style={styles.container}>
      <ProductViewSectionList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
