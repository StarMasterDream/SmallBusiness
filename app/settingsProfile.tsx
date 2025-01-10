import React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { useTheme } from './theme-context';

const UnderConstructionScreen = () => {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, theme === 'dark' && styles.darkContainer]}>
      <StatusBar barStyle={theme === 'dark' ? 'light-content' : 'dark-content'} />
      <Text style={[styles.text, theme === 'dark' && styles.darkText]}>
        Экран в разработке
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  darkContainer: {
    backgroundColor: '#333',
  },
  text: {
    fontSize: 20,
    color: '#000',
  },
  darkText: {
    color: '#fff',
  },
});

export default UnderConstructionScreen;
