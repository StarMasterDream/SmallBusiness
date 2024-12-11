import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import * as SecureStore from 'expo-secure-store'
import { router } from 'expo-router';


const handleLogout = async () => {
  await SecureStore.deleteItemAsync('user');
  router.push('/login'); // Возврат на страницу авторизации
};

export default function Index() {
  return (
    <View style={styles.container}>
      <Text>Это профиль</Text>
      <Button title="Выйти" onPress={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
});
