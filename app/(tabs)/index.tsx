import React, { useState, useEffect, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  Button,
  Platform,
  StatusBar,
  ActivityIndicator,
  KeyboardAvoidingView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useTheme } from "../theme-context";
import axios from "axios";
import Modal from "react-native-modal";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ScreenCheque from "../Screens/ScreenCheque";
import ScreenBasket from "../Screens/ScreenBasket";

const Tab = createMaterialTopTabNavigator();
const generateData = () =>
  Array.from({ length: 5000 }, (_, index) => `Пример данных ${index + 1} обьект`);

export default function Index() {
   const [data] = useState(generateData());
    const { theme } = useTheme();
    const isLightTheme = theme === "light";
    const statusBarStyle = isLightTheme ? "dark-content" : "light-content";
    const statusBarBackgroundColor = isLightTheme ? "#F2F2F7" : "#1C1C1E";
  
    const tabStyles = {
      tabBarStyle: {
        backgroundColor: theme === "light" ? "#6200ee" : "#333",
        height: Platform.OS === "ios" ? 60 : 50,
      },
      tabBarLabelStyle: { color: "#fff" },
      tabBarIndicatorStyle: { backgroundColor: "#ff9800" },
    };
  return (
    <>
      <StatusBar barStyle={statusBarStyle} backgroundColor={statusBarBackgroundColor} />
      <SafeAreaView style={[styles.container, { backgroundColor: statusBarBackgroundColor }]} edges={["top", "left", "right"]}>
        <Tab.Navigator screenOptions={tabStyles}>
          <Tab.Screen name="Корзина">
            {() => <ScreenBasket data={data} theme={theme} />}
          </Tab.Screen>
          <Tab.Screen name="Чеки">
            {() => <ScreenCheque theme={theme} />}
          </Tab.Screen>
        </Tab.Navigator>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
