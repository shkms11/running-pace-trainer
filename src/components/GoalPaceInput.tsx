import React, { useRef } from "react";
import { View, Text, StyleSheet, FlatList, Dimensions } from "react-native";

const ITEM_HEIGHT = 50;

type Props = {
  minutes: number;
  seconds: number;
  onMinutesChange: (v: number) => void;
  onSecondsChange: (v: number) => void;
};

const minutesData = Array.from({ length: 21 }, (_, i) => i); // 0–20 min
const secondsData = Array.from({ length: 60 }, (_, i) => i); // 0–59 sec

export default function GoalPaceInput({
  minutes,
  seconds,
  onMinutesChange,
  onSecondsChange,
}: Props) {
  const minRef = useRef<FlatList>(null);
  const secRef = useRef<FlatList>(null);

  const onScrollEnd = (e: any, type: "min" | "sec") => {
    const index = Math.round(e.nativeEvent.contentOffset.y / ITEM_HEIGHT);

    if (type === "min") onMinutesChange(minutesData[index]);
    else onSecondsChange(secondsData[index]);
  };

  const renderItem = (item: number, selected: number) => {
    const isActive = item === selected;

    return (
      <View style={styles.item}>
        <Text style={[styles.text, isActive && styles.activeText]}>
          {item.toString().padStart(2, "0")}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Goal Pace</Text>

      <View style={styles.row}>
        {/* MINUTES WHEEL */}
        <FlatList
          ref={minRef}
          data={minutesData}
          keyExtractor={(i) => i.toString()}
          showsVerticalScrollIndicator={false}
          snapToInterval={ITEM_HEIGHT}
          decelerationRate="fast"
          onMomentumScrollEnd={(e) => onScrollEnd(e, "min")}
          contentContainerStyle={{ paddingVertical: ITEM_HEIGHT }}
          style={styles.wheel}
          renderItem={({ item }) => renderItem(item, minutes)}
          initialScrollIndex={minutes}
          getItemLayout={(_, index) => ({
            length: ITEM_HEIGHT,
            offset: ITEM_HEIGHT * index,
            index,
          })}
        />

        <Text style={styles.colon}>:</Text>

        {/* SECONDS WHEEL */}
        <FlatList
          ref={secRef}
          data={secondsData}
          keyExtractor={(i) => i.toString()}
          showsVerticalScrollIndicator={false}
          snapToInterval={ITEM_HEIGHT}
          decelerationRate="fast"
          onMomentumScrollEnd={(e) => onScrollEnd(e, "sec")}
          contentContainerStyle={{ paddingVertical: ITEM_HEIGHT }}
          style={styles.wheel}
          renderItem={({ item }) => renderItem(item, seconds)}
          initialScrollIndex={seconds}
          getItemLayout={(_, index) => ({
            length: ITEM_HEIGHT,
            offset: ITEM_HEIGHT * index,
            index,
          })}
        />

        <Text style={styles.unit}>/ km</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#161616",
    borderRadius: 18,
    padding: 16,
  },

  label: {
    color: "#777",
    fontSize: 12,
    letterSpacing: 1,
    marginBottom: 12,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  wheel: {
    height: ITEM_HEIGHT * 3,
    width: 80,
  },

  item: {
    height: ITEM_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
  },

  text: {
    color: "#555",
    fontSize: 28,
    fontWeight: "600",
  },

  activeText: {
    color: "#C8F135",
    fontSize: 34,
    fontWeight: "800",
  },

  colon: {
    color: "#fff",
    fontSize: 30,
    marginHorizontal: 10,
    fontWeight: "700",
  },

  unit: {
    color: "#C8F135",
    marginLeft: 10,
    fontSize: 16,
    fontWeight: "600",
  },
});
