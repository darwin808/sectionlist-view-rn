import React, { useEffect, useRef, useState } from "react";
import {
  FlatList,
  Pressable,
  SectionList,
  Text,
  View,
  Dimensions,
} from "react-native";
// remove this
import { DummyComp } from "./constant";

interface TabHeaderProps {
  onPress: (index: number) => void;
  currentIndex: number;
}
const TAB_HEIGHT = 60;
const STICKY_HEADER_INDEX = 2;

const TabHeader = ({ onPress, currentIndex }: TabHeaderProps) => {
  const containerWidth = Dimensions.get("window").width;
  const flatListRef = useRef<FlatList<any>>(null);

  const data = [
    { id: 4, name: "About" },
    { id: 5, name: "Fund Considerations" },
    { id: 6, name: "Portfolio Allocation" },
    { id: 7, name: "Risks" },
    { id: 8, name: "Documents" },
  ];

  const getItemLayout = (_data: any[] | null | undefined, index: number) => ({
    length: Dimensions.get("window").width / 3, // Assuming each item occupies 1/3 of the screen width
    offset: (Dimensions.get("window").width / 3) * index,
    index,
  });

  const scrollToIndex = (index: number) => {
    flatListRef.current?.scrollToIndex({
      index,
      animated: true,
      viewPosition: 0.5,
    });
  };

  const scrollToActiveTab = () => {
    const activeIndex = currentIndex - 4;
    const itemWidth = containerWidth / 3;
    const halfContainerWidth = containerWidth / 2;
    const scrollOffset = itemWidth * activeIndex;
    const scrollToX = scrollOffset - halfContainerWidth + itemWidth / 2;
    flatListRef.current?.scrollToOffset({ offset: scrollToX, animated: true });
  };

  useEffect(() => {
    scrollToActiveTab();
  }, [currentIndex]);

  return (
    <View style={{ height: TAB_HEIGHT }}>
      <FlatList
        ref={flatListRef}
        style={{ backgroundColor: "#fff" }}
        data={data}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        getItemLayout={getItemLayout}
        renderItem={({ item, index }) => {
          const isActive = currentIndex === index + 4 ? true : false;
          return (
            <Pressable
              onPress={() => {
                onPress(index + 3);
                scrollToIndex(index);
              }}
              style={{
                maxWidth: containerWidth,
                backgroundColor: "#fff",
                borderBottomWidth: 3,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginHorizontal: 10,
                borderBottomColor: isActive ? "blue" : "#fff",
              }}
            >
              <Text
                numberOfLines={1}
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
        keyExtractor={(_item, i) => {
          return JSON.stringify(i);
        }}
        snapToOffsets={data.map((_, index) => (containerWidth / 3) * index)}
        decelerationRate="fast"
        onScrollToIndexFailed={() => {}}
      />
    </View>
  );
};

const Main = () => {
  const [currentIndex, setcurrentIndex] = useState(0);
  const sectionListRef = useRef(null);
  const showStickyHeader = currentIndex >= STICKY_HEADER_INDEX + 1;

  const gotoSection = (index) => {
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
          <TabHeader
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
      data: [<DummyComp ht={900} bgColor="#fff992" txt={"Portfolio"} />],
    },
    {
      title: "RIsks",
      index: 7,
      data: [<DummyComp ht={900} bgColor="#696969" txt={"risks"} />],
    },
    {
      title: "Document",
      index: 8,
      data: [<DummyComp ht={900} bgColor="#f9f8" txt={"docs"} />],
    },
  ];
  return (
    <View style={{ flex: 1, width: "100%" }}>
      {showStickyHeader && (
        <TabHeader
          currentIndex={currentIndex}
          onPress={(e) => gotoSection(e)}
        />
      )}
      <SectionList
        ref={sectionListRef}
        scrollEventThrottle={100}
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
        // keyExtractor={({ props }) => {
        //   console.log(props);
        //   // return JSON.stringify(key);
        // }}
        sections={SECTIONS}
        renderItem={({ item }) => {
          return <View>{item}</View>;
        }}
      />
    </View>
  );
};

export const ProductViewSectionList = React.memo(Main);
