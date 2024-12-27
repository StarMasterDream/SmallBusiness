import React from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../theme-context";

export default function TabsNavigator() {
  const { theme } = useTheme();
  const isLightTheme = theme === "light";

  const tabBarStyle = {
    backgroundColor: isLightTheme ? "#FFFFFF" : "#1E1E1E",
  };

  const tabBarLabelStyle = {
    color: isLightTheme ? "#000" : "#FFF",
  };

  const tabBarActiveTintColor = isLightTheme ? "#6200ee" : "#ff9800";
  const tabBarInactiveTintColor = isLightTheme ? "#8E8E93" : "#8E8E93";

  return (
    <Tabs
      screenOptions={{
        tabBarStyle,
        tabBarLabelStyle,
        tabBarActiveTintColor,
        tabBarInactiveTintColor,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Главная",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Профиль",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
