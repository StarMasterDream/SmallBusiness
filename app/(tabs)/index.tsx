import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  FlatList,
  Button,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useTheme } from "../theme-context";

const Tab = createMaterialTopTabNavigator();

const generateData = () =>
  Array.from({ length: 50 }, (_, index) => `Пример данных ${index + 1}`);

export default function Index() {
  const [data] = useState(generateData());
  const { theme } = useTheme();

  const tabStyles = {
    tabBarStyle: {
      backgroundColor: theme === "light" ? "#6200ee" : "#333",
      height: Platform.OS === "ios" ? 60 : 50,
    },
    tabBarLabelStyle: { color: "#fff" },
    tabBarIndicatorStyle: { backgroundColor: "#ff9800" },
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <Tab.Navigator screenOptions={tabStyles}>
        <Tab.Screen name="Корзина">
          {() => <ScreenBasket data={data} theme={theme} />}
        </Tab.Screen>
        <Tab.Screen name="Чеки">
          {() => <ScreenCheque data={data} theme={theme} />}
        </Tab.Screen>
      </Tab.Navigator>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  floatingButton: {
    position: "absolute",
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF9800",
    right: 20,
    bottom: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  modalContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: "#FFFFFF",
  },
  searchInput: {
    height: 50,
    borderWidth: 1,
    borderColor: "#aaa",
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  textItem: {
    fontSize: 16,
    marginBottom: 8,
    color: "#333",
  },
  textItemDark: {
    color: "#fff",
  },
  modalBackgroundDark: {
    backgroundColor: "#444",
  },
  inputDark: {
    borderColor: "#555",
    color: "#fff",
  },
});

function ScreenCheque({ data, theme }: { data: string[]; theme: string }) {
  const textStyle = theme === "dark" ? [styles.textItem, styles.textItemDark] : styles.textItem;

  return (
    <FlatList
      style={{ flex: 1 }}
      data={data}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => <Text style={textStyle}>{item}</Text>}
    />
  );
}

function ScreenBasket({ data, theme }: { data: string[]; theme: string }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const closeModal = () => {
    setModalVisible(false);
    setSearchQuery("");
  };

  const filteredData = useMemo(
    () => data.filter((item) => item.toLowerCase().includes(searchQuery.toLowerCase())),
    [data, searchQuery]
  );

  const modalStyles = theme === "dark" ? [styles.modalContainer, styles.modalBackgroundDark] : styles.modalContainer;
  const inputStyles = theme === "dark" ? [styles.searchInput, styles.inputDark] : styles.searchInput;

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        style={{ flex: 1 }}
        data={filteredData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Text style={theme === "dark" ? [styles.textItem, styles.textItemDark] : styles.textItem}>{item}</Text>
        )}
      />

      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={{ color: "#fff", fontSize: 24 }}>+</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <SafeAreaView style={modalStyles}>
          <TextInput
            style={inputStyles}
            placeholder="Поиск..."
            placeholderTextColor={theme === "dark" ? "#ccc" : "#888"}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <FlatList
            style={{ flex: 1 }}
            data={filteredData}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <Text style={theme === "dark" ? [styles.textItem, styles.textItemDark] : styles.textItem}>{item}</Text>
            )}
          />
          <Button title="Закрыть" onPress={closeModal} />
        </SafeAreaView>
      </Modal>
    </View>
  );
}
