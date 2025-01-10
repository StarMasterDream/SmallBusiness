import React, { useEffect } from "react";
import { StyleSheet, Platform, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useTheme } from "../theme-context";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import ScreenCheque from "../screens/ScreenCheque";
import ScreenBasket from "../screens/ScreenBasket";

const Tab = createMaterialTopTabNavigator();

export default function Index() {
  const { theme } = useTheme();
  const router = useRouter();
  const isLightTheme = theme === "light";

  useEffect(() => {
    const checkAuth = async () => {
      const user = await SecureStore.getItemAsync("user");
      if (!user) {
        router.push("../(authorization)/login");
      }
    };
    checkAuth();
  }, [router]);

  const statusBarStyle = isLightTheme ? "dark-content" : "light-content";
  const statusBarBackgroundColor = isLightTheme ? "#F2F2F7" : "#1C1C1E";

  const tabStyles = {
    tabBarStyle: {
      backgroundColor: isLightTheme ? "#6200ee" : "#333",
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
            {() => <ScreenBasket theme={theme} />}
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
