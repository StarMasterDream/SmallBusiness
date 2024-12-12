import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { useRouter } from 'expo-router';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleRegister = async () => {
    if (!email || !password) {
      Alert.alert('Ошибка', 'Введите все данные.');
      return;
    }
  
    try {
      // Сохраняем данные в SecureStore
      await SecureStore.setItemAsync('user', JSON.stringify({ email, password }));
      console.log("User data saved:", { email, password }); // Для отладки
      Alert.alert('Успешно', 'Регистрация завершена!');
      router.push('/login'); // Переход на страницу авторизации
    } catch (error) {
      console.error('Register Error:', error);
      Alert.alert('Ошибка', 'Не удалось сохранить данные.');
    }
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Регистрация</Text>
      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Пароль"
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Зарегистрироваться" onPress={handleRegister} />
      <Button title="Назад к Входу" onPress={() => router.push('/login')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 16 },
  title: { fontSize: 24, marginBottom: 16, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 8, marginBottom: 16, borderRadius: 8 },
});

export default Register;