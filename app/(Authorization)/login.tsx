import React, { useState } from 'react';
import { Text, TextInput, Button, StyleSheet, Alert, ActivityIndicator, StatusBar } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../theme-context';
import base64 from 'base-64';
import { useProfile } from '../components/profile-context';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { theme } = useTheme();
  const { setProfileData } = useProfile();
  const isLightTheme = theme === 'light';
  const router = useRouter();
  const statusBarStyle = isLightTheme ? 'dark-content' : 'light-content';
  const statusBarBackgroundColor = isLightTheme ? '#F2F2F7' : '#1C1C1E';

  const handleLogin = async () => {
    setLoading(true);
    try {
      const authString = `${email}:${password}`;
      const encoded = base64.encode(authString);

      const response = await fetch('http://DESKTOP-MITLV5M:8080/1C/hs/trade/Login', {
        method: 'GET',
        headers: { 
          'Authorization': encoded
        }
      });

      if (response.status === 401) {
        throw new Error('Неверные учетные данные');
      }

      if (!response.ok) {
        throw new Error(`Ошибка сервера: ${response.status}`);
      }

      const data = await response.json();
      
      if (!data.Authorized) {
        throw new Error('Авторизация не пройдена');
      }

      // Сохраняем данные в SecureStore
      await SecureStore.setItemAsync('user', JSON.stringify({
        email,
        password,
        authData: data
      }));

      // Обновляем контекст профиля
      setProfileData(data);
      
      router.replace('/');
      
    } catch (error) {
      console.error('Login Error:', error);
      Alert.alert('Ошибка', 'Неверные учетные данные или проблемы с соединением');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <StatusBar
            barStyle={statusBarStyle}
            backgroundColor={statusBarBackgroundColor}
          />
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: isLightTheme ? '#FFFFFF' : '#1E1E1E' },
      ]}
    >
      <Text
        style={[styles.title, { color: isLightTheme ? '#000000' : '#FFFFFF' }]}
      >
        Вход
      </Text>
      <TextInput
        placeholder="Email"
        maxLength={50}
        placeholderTextColor={isLightTheme ? '#888888' : '#CCCCCC'}
        style={[
          styles.input,
          {
            backgroundColor: isLightTheme ? '#F9F9F9' : '#2C2C2C',
            color: isLightTheme ? '#000000' : '#FFFFFF',
          },
        ]}
        value={email}
        onChangeText={text => setEmail(text.replace(/\s/g, ''))}
      />
      <TextInput
        placeholder="Пароль"
        maxLength={15}
        placeholderTextColor={isLightTheme ? '#888888' : '#CCCCCC'}
        style={[
          styles.input,
          {
            backgroundColor: isLightTheme ? '#F9F9F9' : '#2C2C2C',
            color: isLightTheme ? '#000000' : '#FFFFFF',
          },
        ]}
        secureTextEntry
        value={password}
        onChangeText={text => setPassword(text.replace(/\s/g, ''))}
      />
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Button title="Войти" onPress={handleLogin} />
      )}

    </SafeAreaView>
    </>
  );
};
// <Button title="Регистрация" onPress={() => router.replace('/register')} />
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 16 },
  title: { fontSize: 24, marginBottom: 16, textAlign: 'center' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 16,
    borderRadius: 8,
  },
});

export default Login;
