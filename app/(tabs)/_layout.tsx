import { TabIcon } from "@/src/components/TabIcon";
import { COLORS } from "@/src/constants/colors";
import fonts from "@/src/constants/fonts";
import { fontSize } from "@/src/constants/fontSize";
import { size } from "@/src/utils/size";
import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TabLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          position: "absolute",
          bottom: Platform.OS === "ios" ? 0 : size.verticalScale(10),
          left: 0,
          right: 0,
          height: size.verticalScale(60) + insets.bottom,
          paddingBottom: insets.bottom,
          paddingTop: size.verticalScale(8),
          backgroundColor: COLORS.white,
          borderTopWidth: 1,
          borderTopColor: COLORS.border,
          elevation: Platform.OS === "android" ? 8 : 0,
          shadowColor: COLORS.black,
          shadowOffset: {
            width: 0,
            height: -2,
          },
          shadowOpacity: 0.1,
          shadowRadius: 8,
        },
        tabBarActiveTintColor: COLORS.primaryButton,
        tabBarInactiveTintColor: COLORS.lightGray,
        tabBarLabelStyle: {
          fontSize: fontSize.light,
          fontFamily: fonts.Medium,
          marginTop: size.verticalScale(4),
        },
        tabBarIconStyle: {
          marginTop: size.verticalScale(4),
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Events",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="home" color={color} focused={focused} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="matches"
        options={{
          title: "Matches",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="matches" color={color} focused={focused} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="profile" color={color} focused={focused} size={24} />
          ),
        }}
      />
    </Tabs>
  );
}
