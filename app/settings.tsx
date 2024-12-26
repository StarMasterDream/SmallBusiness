import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Appearance } from 'react-native';
import { useTheme } from './theme-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SettingsScreen() {
  const { theme, toggleTheme } = useTheme();
  const [selectedTheme, setSelectedTheme] = useState('Automatic');

  // Загрузка сохранённой темы при монтировании компонента
  useEffect(() => {
    const initializeTheme = async () => {
      try {
        const storedTheme = await AsyncStorage.getItem('theme');

        if (storedTheme) {
          setSelectedTheme(storedTheme);

          // Применить сохранённую тему, если она отличается от текущей
          if (storedTheme === 'Light' && theme !== 'light') {
            toggleTheme(); // Переключаем на светлую тему
          } else if (storedTheme === 'Dark' && theme !== 'dark') {
            toggleTheme(); // Переключаем на тёмную тему
          }
        } else {
          // Установка темы "Automatic" по умолчанию
          const systemTheme = Appearance.getColorScheme();
          setSelectedTheme('Automatic');

          if (systemTheme !== theme) {
            toggleTheme(); // Синхронизируем с системной темой
          }

          await AsyncStorage.setItem('theme', 'Automatic');
        }
      } catch (error) {
        console.error('Failed to load saved theme:', error);
      }
    };

    initializeTheme();
  }, []);

  const themes = [
    { name: 'Automatic', icon: '◑' },
    { name: 'Light', icon: '☀' },
    { name: 'Dark', icon: '☾' },
  ];

  const handleThemeChange = async (newTheme: string) => {
    try {
      if (newTheme === 'Automatic') {
        const systemTheme = Appearance.getColorScheme();
        setSelectedTheme(newTheme);

        if (systemTheme !== theme) {
          toggleTheme();
        }

        await AsyncStorage.setItem('theme', 'Automatic');
      } else {
        const isDark = newTheme === 'Dark';
        const currentIsDark = theme === 'dark';

        if (isDark !== currentIsDark) {
          toggleTheme();
        }

        setSelectedTheme(newTheme);
        await AsyncStorage.setItem('theme', newTheme);
      }
    } catch (error) {
      console.error('Failed to save selected theme:', error);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme === 'light' ? '#F9F9F9' : '#1c1c1c' }]}>
      <Text style={[styles.subtitle, { color: theme === 'light' ? '#000' : '#fff' }]}>Theme</Text>
      <View style={[styles.optionsContainer, { backgroundColor: theme === 'light' ? '#FFF' : '#333' }]}>
        {themes.map((t) => (
          <TouchableOpacity
            key={t.name}
            style={[styles.option, { borderBottomColor: theme === 'light' ? '#ddd' : '#555' }]}
            onPress={() => handleThemeChange(t.name)}
          >
            <Text style={[styles.icon, { color: theme === 'light' ? '#000' : '#fff' }]}>{t.icon}</Text>
            <Text style={[styles.optionText, { color: theme === 'light' ? '#000' : '#fff' }]}>{t.name}</Text>
            <View style={[styles.radio, { borderColor: theme === 'light' ? '#333' : '#fff' }]}>
              {selectedTheme === t.name && (
                <View style={[styles.radioInner, { backgroundColor: theme === 'light' ? '#333' : '#fff' }]} />
              )}
            </View>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={[styles.note, { color: theme === 'light' ? '#888' : '#ddd' }]}>
        Automatic is only supported on operating systems that allow you to
        control the system-wide color scheme.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  optionsContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
  },
  optionText: {
    flex: 1,
    fontSize: 16,
  },
  icon: {
    fontSize: 18,
    marginRight: 10,
  },
  radio: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioInner: {
    height: 10,
    width: 10,
    borderRadius: 5,
  },
  note: {
    fontSize: 14,
    marginTop: 20,
  },
});
