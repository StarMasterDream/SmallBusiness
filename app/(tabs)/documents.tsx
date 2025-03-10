import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, StatusBar, Platform } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from "expo-router";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../theme-context';

export default function ScreenDocuments() {
  const router = useRouter();
  const { theme } = useTheme();

  const isLightTheme = theme === 'light';
  const statusBarStyle = isLightTheme ? 'dark-content' : 'light-content';
  const statusBarBackgroundColor = isLightTheme ? '#F2F2F7' : '#1C1C1E';

  return (
    <>
      <StatusBar
        barStyle={statusBarStyle}
        backgroundColor={statusBarBackgroundColor}
      />

      <SafeAreaView style={[styles.container, { backgroundColor: statusBarBackgroundColor }]}>
        <ScrollView>
          <View style={[styles.settingsSection, { backgroundColor: isLightTheme ? '#FFF' : '#2C2C2E' }]}>
            <TouchableOpacity
              style={[styles.menuItem, { borderBottomColor: isLightTheme ? '#E5E5EA' : '#555' }]}
              onPress={() => router.push("/receiptDocument")}
            >
              <Ionicons name="document" size={24} color="#FF9500" />
              <Text style={[styles.menuText, { color: isLightTheme ? '#000' : '#FFF' }]}>Приход</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.lastMenuItem, { borderBottomColor: isLightTheme ? '#E5E5EA' : '#555' }]}
              onPress={() => router.push("/espenseDocument")}
            >
              <Ionicons name="document" size={24} color="#FF9500" />
              <Text style={[styles.menuText, { color: isLightTheme ? '#000' : '#FFF' }]}>Расход</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  settingsSection: {
    borderRadius: 10,
    marginHorizontal: 10,
    paddingVertical: 5,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
  },
  menuText: {
    fontSize: 16,
    marginLeft: 15,
    flex: 1,
  },
  lastMenuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 0,
  },
});
