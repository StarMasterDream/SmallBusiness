import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from './theme-context'; // Import useTheme

export default function SettingsScreen() {
  const [selectedTheme, setSelectedTheme] = useState('Automatic');
  const { theme, toggleTheme } = useTheme(); // Используем hook

  const themes = [
    { name: 'Automatic', icon: '◑' },
    { name: 'Light', icon: '☀' },
    { name: 'Dark', icon: '☾' },
  ];

  const handleThemeChange = (newTheme: string) => {
    if (newTheme !== 'Automatic') {
      // Only toggle if the theme is not Automatic
      if (newTheme === 'Light' && theme === 'dark') {
        toggleTheme();
      } else if (newTheme === 'Dark' && theme === 'light') {
        toggleTheme();
      }
    }
    setSelectedTheme(newTheme); // Update selectedTheme state
  };


  return (
    <View style={[styles.container, { backgroundColor: theme === 'light' ? '#F9F9F9' : '#1c1c1c' }]}>
      <Text style={[styles.subtitle, { color: theme === 'light' ? '#000' : '#fff' }]}>Theme</Text>
      <View style={[styles.optionsContainer, { backgroundColor: theme === 'light' ? '#FFF' : '#333' }]}>
        {themes.map((t) => (
          <TouchableOpacity
            key={t.name}
            style={[styles.option, { borderBottomColor: theme === 'light' ? '#ddd' : '#555' }]}
            onPress={() => handleThemeChange(t.name)} // Use t.name
          >
            <Text style={[styles.icon, { color: theme === 'light' ? '#000' : '#fff' }]}>{t.icon}</Text>
            <Text style={[styles.optionText, { color: theme === 'light' ? '#000' : '#fff' }]}>{t.name}</Text>
            <View style={[styles.radio, { borderColor: theme === 'light' ? '#333' : '#fff' }]}>
              {selectedTheme === t.name && ( // Use t.name here too
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