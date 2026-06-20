import React from "react";
import { View, Text, StyleSheet } from "react-native";

type Props = {
  status: "ready" | "searching" | "active" | "error";
};

export default function StatusFooter({ status }: Props) {
  const getContent = () => {
    switch (status) {
      case "ready":
        return { text: "Ready to start run", color: "#777" };

      case "searching":
        return { text: "Searching for GPS signal...", color: "#ff8c00" };

      case "active":
        return { text: "GPS active", color: "#c8f135" };

      case "error":
        return {
          text: "GPS not available — enable location",
          color: "#ff4d4d",
        };
    }
  };

  const { text, color } = getContent();

  return (
    <View style={[styles.container, { borderTopColor: color }]}>
      <Text style={[styles.text, { color }]}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,

    paddingVertical: 12,
    paddingHorizontal: 16,

    backgroundColor: "#0A0A0A",
    borderTopWidth: 1,
  },

  text: {
    fontSize: 12,
    fontWeight: "600",
    textAlign: "center",
    letterSpacing: 0.5,
  },
});
