import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { router } from "expo-router";

export default function ProfileScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileHeader}>
        <Image
          source={require('../../assets/images/adaptive-icon.png')}
          style={styles.profileImage}
        />
        <Text style={styles.name}>Ян Греку</Text>
        <TouchableOpacity style={styles.photoButton} onPress={() => router.push("/(Authorization)/login")}>
          <Ionicons name="exit" size={16} color="red" />
          <Text style={styles.exitButtonText}>Выйти</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.settingsSection}>
        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="person-outline" size={24} color="#FF2D55" />
          <Text style={styles.menuText}>Мой профиль</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.lastMenuItem} onPress={() => router.push("/settings")}>
          <MaterialIcons name="settings" size={24} color="#FF9500" />
          <Text style={styles.menuText}>Настройки</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 30,
    backgroundColor: '#FFF',
    marginBottom: 10,
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
    color: 'red',
    marginLeft: 5,
  },
  settingsSection: {
    backgroundColor: '#FFF',
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
    borderBottomColor: '#E5E5EA',
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
