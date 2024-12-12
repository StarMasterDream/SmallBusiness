import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useTheme } from "../theme-context";

export default function Profile() {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme === "light" ? "#ffffff" : "#000000",
    },
    text: {
      color: theme === "light" ? "#000000" : "#ffffff",
      fontSize: 16,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Это профиль</Text>
      <Button title="Выйти" onPress={() => console.log('Logout pressed')} />
    </View>
  );
}
