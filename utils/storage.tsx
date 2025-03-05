import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Для чувствительных данных (авторизация)
export const storeData = async (key: string, value: any) => {
  if (Platform.OS === 'web') {
    localStorage.setItem(key, JSON.stringify(value));
  } else {
    await SecureStore.setItemAsync(key, JSON.stringify(value));
  }
};

export const loadData = async (key: string) => {
  if (Platform.OS === 'web') {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : null;
  } else {
    const stored = await SecureStore.getItemAsync(key);
    return stored ? JSON.parse(stored) : null;
  }
};

export const removeData = async (key: string) => {
  if (Platform.OS === 'web') {
    localStorage.removeItem(key);
  } else {
    await SecureStore.deleteItemAsync(key);
  }
};

// Для кэширования данных приложения
export const saveCache = async (key: string, value: any) => {
  try {
    if (Platform.OS === 'web') {
      localStorage.setItem(key, JSON.stringify(value));
    } else {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    }
  } catch (e) {
    console.log('Error saving cache:', e);
  }
};

export const loadCache = async (key: string) => {
  try {
    if (Platform.OS === 'web') {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : null;
    } else {
      const stored = await AsyncStorage.getItem(key);
      return stored ? JSON.parse(stored) : null;
    }
  } catch (e) {
    console.log('Error loading cache:', e);
    return null;
  }
};