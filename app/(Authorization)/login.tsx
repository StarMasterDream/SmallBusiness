import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    setLoading(true);
    try {
      const storedUser = await SecureStore.getItemAsync('user');
      if (storedUser) {
        const { email: storedEmail, password: storedPassword } = JSON.parse(storedUser);
  
        if (email === storedEmail && password === storedPassword) {
          router.replace('/');
        } else {
          Alert.alert('Ошибка', 'Неверные данные.');
        }
      } else {
        Alert.alert('Ошибка', 'Пользователь не найден. Зарегистрируйтесь.');
      }
    } catch (error) {
      console.error('Login Error:', error);
      Alert.alert('Ошибка', 'Не удалось выполнить вход.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Вход</Text>
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
        {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
        ) : (
            <Button title="Войти" onPress={handleLogin} />
        )}
        <Button title="Регистрация" onPress={() => router.replace('/register')} />
      </SafeAreaView>
    );
  };

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 16 },
  title: { fontSize: 24, marginBottom: 16, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 8, marginBottom: 16, borderRadius: 8 },
});

export default Login;