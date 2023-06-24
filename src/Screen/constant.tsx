import { FlatList, Pressable, SectionList, Text, View } from "react-native";

export const DummyComp = ({
  onPress,
  ht = 300,
  bgColor = "red",
  txt = "",
}: any) => {
  return (
    <Pressable
      onPress={() => {
        onPress();
        console.log(txt);
      }}
      style={{ width: "100%", height: ht, backgroundColor: bgColor }}
    >
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
    </Pressable>
  );
};
