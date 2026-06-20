import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

type Props = {
  unit: "km" | "mi";
  onToggleUnit: () => void;
};

export default function AppHeader({ unit, onToggleUnit }: Props) {
  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>Pace Trainer</Text>

      {/* Right controls */}
      <View style={styles.right}>
        <Pressable onPress={onToggleUnit} style={styles.button}>
          <Text style={styles.buttonText}>
            {unit === "km" ? "km → mi" : "mi → km"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },

  title: {
    color: "#C8F135",
    fontSize: 22,
    fontWeight: "800",
    letterSpacing: 0.5,
  },

  right: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  button: {
    backgroundColor: "#161616",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#2A2A2A",
  },

  buttonText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
});
