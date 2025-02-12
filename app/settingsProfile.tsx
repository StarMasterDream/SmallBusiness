import React from 'react';
import { View, Text, StyleSheet, StatusBar, ScrollView } from 'react-native';
import { useTheme } from './theme-context';
import { useProfile } from './components/profile-context';

const InfoRow = ({ label, value }: { label: string; value: string }) => {
  const { theme } = useTheme();
  
  return (
    <View style={styles.infoRow}>
      <Text style={[styles.label, theme === 'dark' && styles.darkText]}>
        {label}:
      </Text>
      <Text 
        style={[styles.value, theme === 'dark' && styles.darkText]}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {value || 'Не указано'}
      </Text>
    </View>
  );
};

const SettingsProfileScreen = () => {
  const { theme } = useTheme();
  const { profileData } = useProfile();

  return (
    <ScrollView 
      style={[styles.container, theme === 'dark' && styles.darkContainer]}
      contentContainerStyle={styles.contentContainer}
    >
      <StatusBar barStyle={theme === 'dark' ? 'light-content' : 'dark-content'} />
      
      <View style={[styles.section, theme === 'dark' && styles.sectionDark]}>
        <Text style={[styles.sectionTitle, theme === 'dark' && styles.darkText]}>
          Профиль пользователя
        </Text>
        
        {profileData ? (
          <>
            <InfoRow label="ФИО" value={profileData.User} />
            <InfoRow label="Организация" value={profileData.Organization} />
            <InfoRow label="User GUID" value={profileData.UserGUID} />
            <InfoRow label="Organization GUID" value={profileData.OrganizationGUID} />
          </>
        ) : (
          <Text style={[styles.errorText, theme === 'dark' && styles.darkText]}>
            Данные профиля не загружены
          </Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  darkContainer: {
    backgroundColor: '#1a1a1a',
  },
  contentContainer: {
    padding: 16,
  },
  section: {
    marginBottom: 24,
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  sectionDark: {
    backgroundColor: '#2C2C2E',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
    color: '#333',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  label: {
    flex: 1,
    fontSize: 14,
    color: '#666',
    marginRight: 4,
  },
  value: {
    flex: 2,
    fontSize: 14,
    color: '#000',
    textAlign: 'right',
  },
  darkText: {
    color: '#fff',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    padding: 20,
  },
});

export default SettingsProfileScreen;