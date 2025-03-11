import React, { useEffect } from "react";
import { ActivityIndicator, View, StyleSheet } from "react-native";
import * as SecureStore from "expo-secure-store";
import { useRouter } from "expo-router";

const Loading = () => {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await SecureStore.getItemAsync("user");
        if (user) {
          router.replace("/");
        } else {
          router.replace("./authorization/login");
        }
      } catch (error) {
        console.error("Error checking auth status:", error);
        router.replace("./authorization/login");
      }
    };

    checkAuth();
  }, [router]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Loading;
