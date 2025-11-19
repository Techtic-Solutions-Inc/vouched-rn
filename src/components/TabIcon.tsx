import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View } from "react-native";
import { TabIconProps } from "../types/tab";

export const TabIcon: React.FC<TabIconProps> = ({
  name,
  color,
  focused,
  size = 24,
}) => {
  const getIconName = () => {
    switch (name) {
      case "home":
        return focused ? "calendar" : "calendar-outline";
      case "matches":
        return focused ? "heart" : "heart-outline";
      case "profile":
        return focused ? "person" : "person-outline";
      default:
        return "circle-outline";
    }
  };

  return (
    <View style={styles.container}>
      <Ionicons name={getIconName() as any} size={size} color={color} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
});
