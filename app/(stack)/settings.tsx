import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function SettingsScreen() {
  const [selectedTheme, setSelectedTheme] = useState('Automatic');

  const themes = [
    { name: 'Automatic', icon: '◑' },
    { name: 'Light', icon: '☀' },
    { name: 'Dark', icon: '☾' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <Text style={styles.subtitle}>Theme</Text>

      <View style={styles.optionsContainer}>
        {themes.map((theme) => (
          <TouchableOpacity
            key={theme.name}
            style={styles.option}
            onPress={() => setSelectedTheme(theme.name)}
          >
            <Text style={styles.icon}>{theme.icon}</Text>
            <Text style={styles.optionText}>{theme.name}</Text>
            <View style={styles.radio}>
              {selectedTheme === theme.name && <View style={styles.radioInner} />}
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.note}>
        Automatic is only supported on operating systems that allow you to
        control the system-wide color scheme.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
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
    backgroundColor: '#FFF',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
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
    borderColor: '#333',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioInner: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: '#333',
  },
  note: {
    fontSize: 14,
    color: '#888',
    marginTop: 20,
  },
});
