import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Appearance } from 'react-native';
import { useTheme } from './theme-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function SettingsScreen() {
  const { theme, toggleTheme } = useTheme();
  const [selectedTheme, setSelectedTheme] = useState('Автоматически');

  useEffect(() => {
    const initializeTheme = async () => {
      try {
        const storedTheme = await AsyncStorage.getItem('theme');

        if (storedTheme) {
          if (storedTheme === 'Автоматически') {
            setSelectedTheme('Автоматически');
            const systemTheme = Appearance.getColorScheme();
            if (systemTheme && systemTheme !== theme) {
              toggleTheme();
            }
          } else {
            setSelectedTheme(storedTheme === 'Светлая' ? 'Светлая' : 'Тёмная');
            if (storedTheme === 'Светлая' && theme !== 'light') {
              toggleTheme();
            } else if (storedTheme === 'Тёмная' && theme !== 'dark') {
              toggleTheme();
            }
          }
        } else {
          const systemTheme = Appearance.getColorScheme();
          setSelectedTheme('Автоматически');
          if (systemTheme && systemTheme !== theme) {
            toggleTheme();
          }
          await AsyncStorage.setItem('theme', 'Автоматически');
        }
      } catch (error) {
        console.error('Не удалось загрузить тему:', error);
      }
    };

    initializeTheme();
  }, [theme, toggleTheme]);

  const themes = [
    { name: 'Автоматически', icon: 'adjust' },
    { name: 'Светлая', icon: 'sun-o' },
    { name: 'Тёмная', icon: 'moon-o' },
  ];

  const handleThemeChange = async (newTheme: string) => {
    try {
      if (newTheme === 'Автоматически') {
        const systemTheme = Appearance.getColorScheme();
        setSelectedTheme(newTheme);
        if (systemTheme !== theme) {
          toggleTheme();
        }
        await AsyncStorage.setItem('theme', 'Автоматически');
      } else {
        const isDark = newTheme === 'Тёмная';
        const currentIsDark = theme === 'dark';
        if (isDark !== currentIsDark) {
          toggleTheme();
        }
        setSelectedTheme(newTheme);
        await AsyncStorage.setItem('theme', newTheme === 'Светлая' ? 'Светлая' : 'Тёмная');
      }
    } catch (error) {
      console.error('Не удалось сохранить выбранную тему:', error);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme === 'light' ? '#F9F9F9' : '#1c1c1c' }]}>
      <Text style={[styles.subtitle, { color: theme === 'light' ? '#000' : '#fff' }]}>Тема</Text>
      <View style={[styles.optionsContainer, { backgroundColor: theme === 'light' ? '#FFF' : '#333' }]}>
        {themes.map((t, index) => (
          <TouchableOpacity
            key={t.name}
            style={[
              styles.option,
              {
                borderBottomWidth: index === themes.length - 1 ? 0 : 1,
                borderBottomColor: theme === 'light' ? '#ddd' : '#555',
              },
            ]}
            onPress={() => handleThemeChange(t.name)}
          >
            <Icon name={t.icon} size={20} color={theme === 'light' ? '#000' : '#fff'} style={styles.icon} />
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
        Автоматическая тема поддерживается только на операционных системах, которые позволяют управлять цветовой схемой всей системы.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'left',
  },
  optionsContainer: {
    borderRadius: 12,
    marginBottom: 20,
    paddingVertical: 8,
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
  },
  icon: {
    marginRight: 15,
  },
  radio: {
    height: 22,
    width: 22,
    borderRadius: 11,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioInner: {
    height: 12,
    width: 12,
    borderRadius: 6,
  },
  note: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 20,
    color: '#888',
    lineHeight: 20,
  },
});
