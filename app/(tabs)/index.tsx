import React, { useState } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Modal, 
  TextInput, 
  FlatList, 
  Button 
} from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const Tab = createMaterialTopTabNavigator();

// Генерация пробных данных
const generateData = () => Array.from({ length: 50 }, (_, index) => `Пример данных ${index + 1}`);

export default function TopTabsScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [data] = useState(generateData());

  const onButtonPress = () => setModalVisible(true);

  const closeModal = () => {
    setModalVisible(false);
    setSearchQuery('');
  };

  // Фильтрация данных по поисковому запросу
  const filteredData = data.filter(item => 
    item.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.wrapper}>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: { backgroundColor: "#6200ee" },
          tabBarLabelStyle: { color: "#fff" },
          tabBarIndicatorStyle: { backgroundColor: "#ff9800" },
        }}
      >
        <Tab.Screen name="ScreenA">
          {() => <Screen data={data} />}
        </Tab.Screen>
        <Tab.Screen name="ScreenB">
          {() => <Screen data={data} />}
        </Tab.Screen>
      </Tab.Navigator>

      {/* Кнопка вызова модального окна */}
      <TouchableOpacity style={styles.floatingButton} onPress={onButtonPress}>
        <Text style={styles.floatingButtonText}>+</Text>
      </TouchableOpacity>

      {/* Модальное окно */}
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Введите запрос для поиска..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <FlatList
            data={filteredData}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <Text style={styles.textItem}>{item}</Text>
            )}
          />
          <Button title="Закрыть" onPress={closeModal} />
        </View>
      </Modal>
    </View>
  );
}

// Интерфейс для пропсов компонента Screen
interface ScreenProps {
  data: string[];
}

function Screen({ data }: ScreenProps) {
  return (
    <FlatList
      data={data}
      keyExtractor={(item, index) => index.toString()}
      contentContainerStyle={styles.scrollContainer}
      renderItem={({ item }) => (
        <Text style={styles.textItem}>{item}</Text>
      )}
    />
  );
}




const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  floatingButton: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ff9800',
    right: 30,
    bottom: 30,
  },
  floatingButtonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    padding: 20,
  },
  searchInput: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  textItem: {
    fontSize: 16,
    marginBottom: 8,
  },
});
