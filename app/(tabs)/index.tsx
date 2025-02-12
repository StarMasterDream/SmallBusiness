import React, { useEffect, useState } from "react";
import { StyleSheet, Platform, StatusBar, View, ActivityIndicator, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useTheme } from "../theme-context";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import ScreenCheque from "../screens/ScreenCheque";
import ScreenBasket from "../screens/ScreenBasket";
import { useProfile } from "../components/profile-context";

const Tab = createMaterialTopTabNavigator();

export default function Index() {
  const { theme } = useTheme();
  const router = useRouter();
  const { setProfileData } = useProfile();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isLightTheme = theme === "light";

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const storedUser = await SecureStore.getItemAsync('user');
        
        if (!storedUser) {
          router.replace('../(authorization)/login');
          return;
        }
  
        const { authData } = JSON.parse(storedUser);
        
        // Можно добавить дополнительную проверку токена/сессии
        if (!authData?.Authorized) {
          throw new Error('Session expired');
        }
  
        setProfileData(authData);
        
      } catch (error) {
        console.error('Auth check error:', error);
        await SecureStore.deleteItemAsync('user');
        router.replace('../(authorization)/login');
      } finally {
        setLoading(false); // Важно: обновляем состояние загрузки
      }
    };
  
    checkAuth();
  }, []);

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

  if (loading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: statusBarBackgroundColor }]}>
        <ActivityIndicator size="large" color={isLightTheme ? "#000" : "#fff"} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.errorContainer, { backgroundColor: statusBarBackgroundColor }]}>
        <Text style={{ color: isLightTheme ? "#000" : "#fff", fontSize: 18 }}>
          Ошибка: {error}
        </Text>
      </View>
    );
  }

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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
});
