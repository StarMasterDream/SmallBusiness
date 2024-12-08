import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const Tab = createMaterialTopTabNavigator();

function ScreenA() {
  return (
    <View style={styles.screen}>
      <Text>Screen A</Text>
    </View>
  );
}

function ScreenB() {
  return (
    <View style={styles.screen}>
      <Text>Screen B</Text>
    </View>
  );
}

export default function TopTabsScreen() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: "#6200ee" },
        tabBarLabelStyle: { color: "#fff" },
        tabBarIndicatorStyle: { backgroundColor: "#ff9800" },
      }}
    >
      <Tab.Screen name="ScreenA" component={ScreenA} options={{ title: "Tab A" }} />
      <Tab.Screen name="ScreenB" component={ScreenB} options={{ title: "Tab B" }} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
