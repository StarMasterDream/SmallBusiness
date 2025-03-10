import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import * as FileSystem from 'expo-file-system';

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

// Для кэширования данных приложения с использованием expo-file-system
export const saveCache = async (key: string, value: any) => {
  try {
    if (Platform.OS === 'web') {
      localStorage.setItem(key, JSON.stringify(value));
    } else {
      const path = `${FileSystem.documentDirectory}${key}.json`;
      await FileSystem.writeAsStringAsync(path, JSON.stringify(value), {
        encoding: FileSystem.EncodingType.UTF8,
      });
    }
  } catch (e) {
    console.log('Ошибка сохранения кэша:', e, key);
  }
};

export const loadCache = async (key: string) => {
  try {
    if (Platform.OS === 'web') {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : null;
    } else {
      const path = `${FileSystem.documentDirectory}${key}.json`;
      const fileInfo = await FileSystem.getInfoAsync(path);
      if (!fileInfo.exists) {
        return null;
      }
      const stored = await FileSystem.readAsStringAsync(path, {
        encoding: FileSystem.EncodingType.UTF8,
      });
      return JSON.parse(stored);
    }
  } catch (e) {
    console.log('Ошибка при загрузке кэша:', e);
    return null;
  }
};

export const clearCache = async (key: string) => {
  try {
    if (Platform.OS === 'web') {
      localStorage.removeItem(key);
    } else {
      const path = `${FileSystem.documentDirectory}${key}.json`;
      const fileInfo = await FileSystem.getInfoAsync(path);
      if (fileInfo.exists) {
        await FileSystem.deleteAsync(path);
      }
    }
  } catch (e) {
    console.log('Ошибка при очистке кэша:', e);
  }
};
