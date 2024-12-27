import React, { useState, useEffect, useMemo } from "react";
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
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    // Логика для синхронизации темы при загрузке, если потребуется
  }, [theme]);

  const tabStyles = {
    tabBarStyle: {
      backgroundColor: theme === "light" ? "#6200ee" : "#333",
      height: Platform.OS === "ios" ? 60 : 50,
    },
    tabBarLabelStyle: { color: "#fff" },
    tabBarIndicatorStyle: { backgroundColor: "#ff9800" },
  };

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top", "left", "right"]}>
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

function ScreenCheque({ data, theme }: { data: string[]; theme: string }) {
  const textStyle =
    theme === "dark"
      ? [styles.textItem, styles.textItemDark]
      : styles.textItem;

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
    () =>
      data.filter((item) =>
        item.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [data, searchQuery]
  );

  const modalStyles =
    theme === "dark"
      ? [styles.modalContainer, styles.modalBackgroundDark]
      : styles.modalContainer;

  const inputStyles =
    theme === "dark"
      ? [styles.searchInput, styles.inputDark]
      : styles.searchInput;

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        style={{ flex: 1 }}
        data={filteredData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Text
            style={
              theme === "dark"
                ? [styles.textItem, styles.textItemDark]
                : styles.textItem
            }
          >
            {item}
          </Text>
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
              <Text
                style={
                  theme === "dark"
                    ? [styles.textItem, styles.textItemDark]
                    : styles.textItem
                }
              >
                {item}
              </Text>
            )}
          />
          <Button title="Закрыть" onPress={closeModal} />
        </SafeAreaView>
      </Modal>
    </View>
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
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 6,
  },
  modalContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: "#FFFFFF",
  },
  modalBackgroundDark: {
    backgroundColor: "#1E1E1E",
  },
  searchInput: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    backgroundColor: "#F9F9F9",
    fontSize: 16,
    color: "#333",
  },
  inputDark: {
    borderColor: "#555",
    backgroundColor: "#2C2C2C",
    color: "#FFF",
  },
  textItem: {
    fontSize: 16,
    marginBottom: 12,
    padding: 10,
    backgroundColor: "#F2F2F2",
    color: "#333",
    borderRadius: 8,
  },
  textItemDark: {
    backgroundColor: "#333",
    color: "#FFF",
  },
  tabBarStyle: {
    backgroundColor: "#6200ee",
    height: Platform.OS === "ios" ? 60 : 50,
  },
  tabBarStyleDark: {
    backgroundColor: "#333",
  },
  tabBarLabelStyle: {
    color: "#fff",
    fontSize: 14,
  },
  tabBarIndicatorStyle: {
    backgroundColor: "#ff9800",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 24,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  modalTitleDark: {
    color: "#FFF",
  },
});
