import React from "react";
import { View, Text, ActivityIndicator } from "react-native";

const LoadingView = ({ theme }: { theme: string }) => (
  <View
    style={{
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme === "dark" ? "#1E1E1E" : "#FFFFFF",
    }}
  >
    <ActivityIndicator
      size="large"
      color={theme === "dark" ? "#fff" : "#000"}
    />
    <Text style={{ color: theme === "dark" ? "#fff" : "#000" }}>
      Загрузка данных...
    </Text>
  </View>
);

export default LoadingView;
