import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from "expo-router";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../theme-context';

export default function ProfileScreen() {
  const router = useRouter();
  const { theme } = useTheme();

  const isLightTheme = theme === 'light';
  const statusBarStyle = isLightTheme ? 'dark-content' : 'light-content';
  const statusBarBackgroundColor = isLightTheme ? '#F2F2F7' : '#1C1C1E';

  useEffect(() => {
  }, [theme]);

  return (
    <>
      <StatusBar
        barStyle={statusBarStyle}
        backgroundColor={statusBarBackgroundColor}
      />

      <SafeAreaView style={[styles.container, { backgroundColor: statusBarBackgroundColor }]}>
        <ScrollView>
          <View style={[styles.profileHeader, { backgroundColor: isLightTheme ? '#FFF' : '#2C2C2E' }]}>
            <Image
              source={require('../../assets/images/adaptive-icon.png')}
              style={styles.profileImage}
            />
            <Text style={[styles.name, { color: isLightTheme ? '#000' : '#FFF' }]}>Ян Греку</Text>
            <TouchableOpacity style={styles.photoButton} onPress={() => router.replace("/login")}>
              <Text style={[styles.exitButtonText, { color: 'red' }]}>Выйти</Text>
              <Ionicons name="exit" size={16} color="red" />
            </TouchableOpacity>
          </View>

          <View style={[styles.settingsSection, { backgroundColor: isLightTheme ? '#FFF' : '#2C2C2E' }]}>
            <TouchableOpacity
            style={[styles.menuItem, { borderBottomColor: isLightTheme ? '#E5E5EA' : '#555' }]}
            onPress={() => router.push("/settingsProfile")}
            >
              <Ionicons name="person-outline" size={24} color="#FF2D55" />
              <Text style={[styles.menuText, { color: isLightTheme ? '#000' : '#FFF' }]}>Мой профиль</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.lastMenuItem, { borderBottomColor: isLightTheme ? '#E5E5EA' : '#555' }]}
              onPress={() => router.push("/settings")}
            >
              <MaterialIcons name="settings" size={24} color="#FF9500" />
              <Text style={[styles.menuText, { color: isLightTheme ? '#000' : '#FFF' }]}>Настройки</Text>
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
  },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 20,
    marginBottom: 10,
    paddingHorizontal: 15,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  photoButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  exitButtonText: {
    margin: 10,
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
