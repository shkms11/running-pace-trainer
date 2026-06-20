import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from "react-native";

import AppHeader from "../components/AppHeader";
import GoalPaceInput from "../components/GoalPaceInput";
import StatusFooter from "../components/StatusFooter";

export default function HomeScreen() {
  const [unit, setUnit] = useState<"km" | "mi">("km");

  const [minutes, setMinutes] = useState(5);
  const [seconds, setSeconds] = useState(0);

  const [gpsStatus, setGpsStatus] = useState<
    "ready" | "searching" | "active" | "error"
  >("ready");

  const toggleUnit = () => {
    setUnit((prev) => (prev === "km" ? "mi" : "km"));
  };

  const goalLabel = `${minutes}:${seconds.toString().padStart(2, "0")} / ${unit}`;

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER (contains title already) */}
      <AppHeader unit={unit} onToggleUnit={toggleUnit} />

      {/* MAIN CONTENT */}
      <View style={styles.content}>
        {/* GOAL INPUT */}
        <GoalPaceInput
          minutes={minutes}
          seconds={seconds}
          onMinutesChange={setMinutes}
          onSecondsChange={setSeconds}
        />

        {/* GOAL PREVIEW */}
        <View style={styles.previewCard}>
          <Text style={styles.previewLabel}>CURRENT GOAL</Text>
          <Text style={styles.previewValue}>{goalLabel}</Text>
        </View>

        {/* STATS */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>0</Text>
            <Text style={styles.statLabel}>Runs</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statValue}>0.00</Text>
            <Text style={styles.statLabel}>{unit === "km" ? "Km" : "Mi"}</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statValue}>--</Text>
            <Text style={styles.statLabel}>Best Pace</Text>
          </View>
        </View>

        {/* START BUTTON */}
        <TouchableOpacity style={styles.startButton}>
          <Text style={styles.startText}>START RUN</Text>
        </TouchableOpacity>
      </View>

      {/* FOOTER */}
      <StatusFooter status={gpsStatus} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0A0A0A",
  },

  content: {
    flex: 1,
    padding: 20,
  },

  previewCard: {
    backgroundColor: "#161616",
    padding: 16,
    borderRadius: 16,
    marginTop: 20,
  },

  previewLabel: {
    color: "#777",
    fontSize: 12,
    letterSpacing: 1,
  },

  previewValue: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "700",
    marginTop: 6,
  },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },

  statCard: {
    flex: 1,
    backgroundColor: "#161616",
    marginHorizontal: 4,
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
  },

  statValue: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
  },

  statLabel: {
    color: "#777",
    fontSize: 12,
    marginTop: 4,
  },

  startButton: {
    backgroundColor: "#C8F135",
    padding: 18,
    borderRadius: 16,
    marginTop: 30,
    alignItems: "center",
  },

  startText: {
    color: "#000",
    fontWeight: "800",
    letterSpacing: 1,
  },
});
