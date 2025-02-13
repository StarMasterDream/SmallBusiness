import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';

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
