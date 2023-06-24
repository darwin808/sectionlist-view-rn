import React, { useEffect, useRef, useState } from "react";
import { FlatList, Pressable, SectionList, Text, View } from "react-native";
import { DummyComp } from "./constant";

const MyHeaderComp = ({ data, onPress, currentIndex }: any) => {
  data = [
    { id: 4, name: "About" },
    { id: 5, name: "Fund Considerations" },
    { id: 6, name: "Portfolio Allocation" },
    { id: 7, name: "Risks" },
    { id: 8, name: "Documents" },
  ];
  return (
    <View>
      <FlatList
        style={{ backgroundColor: "#fff" }}
        data={data}
        horizontal={true}
        renderItem={({ item, index }) => {
          const isActive = currentIndex === index + 3 ? true : false;
          console.log(currentIndex, item.id);
          return (
            <Pressable
              onPress={() => {
                onPress(index + 3);
              }}
              style={{
                width: 100,
                height: 100,
                backgroundColor: "#fff",
                margin: 10,
              }}
            >
              <Text
                style={{
                  color: isActive ? "#333333" : "gray",
                  textAlign: "center",
                }}
              >
                {item.name}
              </Text>
            </Pressable>
          );
        }}
        keyExtractor={(item, i) => {
          return JSON.stringify(i);
        }}
      />
    </View>
  );
};

const MySectionList = () => {
  const STICKY_HEADER_INDEX = 2;
  const [currentIndex, setcurrentIndex] = useState(0);
  const sectionListRef = useRef(null);
  const showStickyHeader = currentIndex >= STICKY_HEADER_INDEX + 1;

  const gotoSection = (index) => {
    console.log(index, 999999999999);
    const sectionList = sectionListRef.current;
    sectionList.scrollToLocation({
      animated: true,
      itemIndex: 1,
      viewOffset: 0,
      sectionIndex: index,
    });
  };

  const SECTIONS = [
    {
      title: "Grap",
      index: 1,
      data: [<DummyComp ht={200} bgColor="yellow" txt={"grap"} />],
    },
    {
      title: "CAlc",
      index: 2,
      data: [<DummyComp ht={200} bgColor="red" txt={"calc"} />],
    },
    {
      title: "Tabs",
      index: 3,
      data: [
        showStickyHeader ? (
          <View style={{ backgroundColor: "orange" }}></View>
        ) : (
          <MyHeaderComp
            currentIndex={currentIndex}
            onPress={(e) => gotoSection(e)}
          />
        ),
      ],
    },
    {
      title: "About",
      index: 4,
      data: [<DummyComp ht={300} bgColor="aqua" txt={"about"} />],
    },
    {
      title: "Fund consi",
      index: 5,
      data: [<DummyComp ht={300} bgColor="brown" txt={"FUnds"} />],
    },
    {
      title: "Portfolio",
      index: 6,
      data: [<DummyComp ht={900} bgColor="#ff992" txt={"Portfolio"} />],
    },
    {
      title: "RIsks",
      index: 7,
      data: [<DummyComp ht={900} bgColor="#ff992" txt={"risks"} />],
    },
    {
      title: "Document",
      index: 8,
      data: [<DummyComp ht={900} bgColor="#ff992" txt={"docs"} />],
    },
  ];
  return (
    <View style={{ flex: 1, width: "100%" }}>
      {showStickyHeader && (
        <MyHeaderComp
          currentIndex={currentIndex}
          onPress={(e) => gotoSection(e)}
        />
      )}
      <SectionList
        ref={sectionListRef}
        onViewableItemsChanged={({ viewableItems }) => {
          if (viewableItems[0]) {
            const currentIndex = viewableItems[0].section.index;
            setcurrentIndex(currentIndex);
          }
        }}
        viewabilityConfig={{
          minimumViewTime: 10,
          itemVisiblePercentThreshold: 10,
        }}
        // keyExtractor={({ key, props }) => {
        //   return JSON.stringify(Math.random() * 5);
        // }}
        sections={SECTIONS}
        renderItem={({ item }) => {
          return <View>{item}</View>;
        }}
      />
    </View>
  );
};

export default MySectionList;
