import { useState } from "react";
import {
  FlatList,
  Pressable,
  SectionList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export const DummyComp = ({
  onPress,
  ht = 300,
  bgColor = "red",
  txt = "",
}: any) => {
  const [toggle, settoggle] = useState(false);
  return (
    <View style={{ width: "100%", height: ht, backgroundColor: bgColor }}>
      <View style={{ flex: 1 }}>
        <Text
          style={{
            textAlign: "center",
            marginVertical: "auto",
            justifyContent: "center",
            alignItems: "center",
            paddingTop: 50,
          }}
        >
          {txt}
        </Text>
        <TouchableOpacity
          onPress={() => {
            settoggle(!toggle);
          }}
        >
          <Text>Click me</Text>
        </TouchableOpacity>
      </View>
      {toggle && (
        <View style={{ height: ht * 0.5, backgroundColor: "orange" }}>
          <Text>{txt} - child</Text>
        </View>
      )}
    </View>
  );
};
