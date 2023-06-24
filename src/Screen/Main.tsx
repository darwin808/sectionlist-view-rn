//************ PAGE STRUCTURE ************** */
/*
---------------------------------------------
| Section 4 | Section 5 | ...... | Section 8 | <======= 
---------------------------------------------         ||
*********************************************         ||
|                  SECTION 1                 |        ||
*********************************************         || This will be Sticky Header
*********************************************         ||
|                  SECTION 2                 |        ||
*********************************************         ||
*********************************************         ||
|                  SECTION 3                 | <======= 
*********************************************
*********************************************
|                  SECTION 4                 |
*********************************************
*********************************************
|                  SECTION 5                 |
*********************************************
*********************************************
|                  SECTION 6                 |
*********************************************
*********************************************
|                  SECTION 7                 |
*********************************************
*********************************************
|                  SECTION 8                 |
*********************************************
*/

import React, { useEffect, useRef, useState } from "react";
import {
  FlatList,
  Pressable,
  SectionList,
  Text,
  View,
  Dimensions,
} from "react-native";
// remove this with actual component
import { DummyComp } from "./constant";

interface TabHeaderProps {
  onPress: (index: number) => void;
  currentIndex: number;
}
interface TabHeaderProps {
  onPress: (index: number) => void;
  currentIndex: number;
}

interface TabItem {
  id: number;
  name: string;
}

const containerWidth = Dimensions.get("window").width;
const TAB_HEIGHT = 60;
const STICKY_HEADER_INDEX = 3;
const TAB_ITEM_START = 4;

const TabHeader: React.FC<TabHeaderProps> = ({ onPress, currentIndex }) => {
  const flatListRef = useRef<FlatList<any>>(null);

  const data: TabItem[] = [
    { id: 4, name: "About" },
    { id: 5, name: "Fund Considerations" },
    { id: 6, name: "Portfolio Allocation" },
    { id: 7, name: "Risks" },
    { id: 8, name: "Documents" },
  ];

  const scrollToIndex = (index: number) => {
    flatListRef.current?.scrollToIndex({
      index,
      animated: true,
      viewPosition: 0.5,
    });
  };

  const scrollToActiveTab = () => {
    // tabitme starts at 4
    const activeIndex = currentIndex - TAB_ITEM_START;
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
        getItemLayout={(_, index) => ({
          length: containerWidth / 3,
          offset: (containerWidth / 3) * index,
          index,
        })}
        renderItem={({ item, index }) => {
          const isActive = currentIndex === index + 4;
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
        keyExtractor={(_item, i) => JSON.stringify(i)}
        snapToOffsets={data.map((_, index) => (containerWidth / 3) * index)}
        decelerationRate="fast"
        onScrollToIndexFailed={() => {}}
      />
    </View>
  );
};

const FastScrollBtn = ({ onPress }: any) => {
  return (
    <Pressable
      onPress={onPress}
      style={{
        position: "absolute",
        right: 0,
        bottom: 100,
        height: 50,
        width: 50,
        backgroundColor: "aqua",
      }}
    >
      <Text>Click me</Text>
    </Pressable>
  );
};

const Main = () => {
  const [currentIndex, setcurrentIndex] = useState(0);
  const sectionListRef = useRef(null);
  const showStickyHeader = currentIndex >= STICKY_HEADER_INDEX;

  // main function for going to each section in this screenk
  const gotoSection = (index: number) => {
    //  range is 1 to 8
    if (index >= 1 && index <= 8) {
      const sectionList = sectionListRef.current;
      sectionList.scrollToLocation({
        animated: true,
        itemIndex: 1,
        viewOffset: 0,
        sectionIndex: index,
      });
    } else {
      console.error("Invalid section index. It must be between 1 and 8.");
    }
  };

  // Define sections for the SectionList
  const SECTIONS = [
    // Section 1 - Grap
    {
      title: "Grap",
      index: 1,
      data: [<DummyComp ht={200} bgColor="yellow" txt={"grap"} />],
    },
    // Section 2 - CAlc
    {
      title: "CAlc",
      index: 2,
      data: [<DummyComp ht={200} bgColor="red" txt={"calc"} />],
    },
    // Section 3 - Tabs or Sticky Header
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
    // Section 4 - About
    {
      title: "About",
      index: 4,
      data: [<DummyComp ht={300} bgColor="aqua" txt={"about"} />],
    },
    // Section 5 - Fund Considerations
    {
      title: "Fund consi",
      index: 5,
      data: [<DummyComp ht={300} bgColor="brown" txt={"FUnds"} />],
    },
    // Section 6 - Portfolio Allocation
    {
      title: "Portfolio",
      index: 6,
      data: [<DummyComp ht={900} bgColor="#fff992" txt={"Portfolio"} />],
    },
    // Section 7 - Risks
    {
      title: "RIsks",
      index: 7,
      data: [<DummyComp ht={900} bgColor="#696969" txt={"risks"} />],
    },
    // Section 8 - Documents
    {
      title: "Document",
      index: 8,
      data: [<DummyComp ht={900} bgColor="#f9f8" txt={"docs"} />],
    },
  ];

  return (
    <View style={{ flex: 1, width: "100%" }}>
      {/* HEADER SECTION */}
      {/* Render the TabHeader component as the sticky header if the condition is met */}
      {showStickyHeader && (
        <TabHeader
          currentIndex={currentIndex}
          onPress={(e) => gotoSection(e)}
        />
      )}

      {/* BODY */}
      {/* Render the SectionList */}
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
        sections={SECTIONS}
        renderItem={({ item }) => {
          return <View>{item}</View>;
        }}
      />

      {/* FOOTER SECTION */}
      {/* Render the FastScrollBtn component if the currentIndex is less than 8 */}
      {currentIndex < 8 && (
        <FastScrollBtn
          onPress={() => {
            if (currentIndex <= 3) {
              gotoSection(3);
            } else {
              currentIndex < 8 && gotoSection(currentIndex);
            }
          }}
        />
      )}
    </View>
  );
};
export const ProductViewSectionList = React.memo(Main);
