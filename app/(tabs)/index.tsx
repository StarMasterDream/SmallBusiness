import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  FlatList,
  Button,
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
        tabBarStyle: { backgroundColor: theme === "light" ? "#6200ee" : "#333" },
        tabBarLabelStyle: { color: "#fff" },
        tabBarIndicatorStyle: { backgroundColor: "#ff9800" },
    };

  return (
    <SafeAreaView style={{ flex: 1 }}>
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

interface ScreenProps {
  data: string[];
  theme: string;
}

function ScreenCheque({ data, theme }: ScreenProps) {
    const textStyle = {
        color: theme === "light" ? "#000" : "#fff",
        fontSize: 16,
        marginBottom: 8,
    };

  return (
    <FlatList
      data={data}
      keyExtractor={(item, index) => index.toString()}
      contentContainerStyle={{ paddingBottom: 20 }}
      renderItem={({ item }) => <Text style={textStyle}>{item}</Text>}
    />
  );
}

function ScreenBasket({ data, theme }: ScreenProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const closeModal = () => {
    setModalVisible(false);
    setSearchQuery("");
  };

  const filteredData = data.filter((item) =>
    item.toLowerCase().includes(searchQuery.toLowerCase())
  );

    const styles = StyleSheet.create({
        wrapper: {
            flex: 1,
            backgroundColor: theme === "light" ? "#ffffff" : "#000000",
        },
        floatingButton: {
            position: "absolute",
            width: 60,
            height: 60,
            borderRadius: 30,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: theme === "light" ? "#ff9800" : "#4caf50",
            right: 30,
            bottom: 30,
        },
        floatingButtonText: {
            color: "#fff",
            fontSize: 24,
            fontWeight: "bold",
        },
        modalContainer: {
            flex: 1,
            padding: 20,
            backgroundColor: theme === "light" ? "#ffffff" : "#1c1c1c",
        },
        searchInput: {
            height: 50,
            borderWidth: 1,
            borderColor: theme === "light" ? "#ccc" : "#555",
            marginBottom: 10,
            paddingHorizontal: 10,
            borderRadius: 5,
            color: theme === "light" ? "#000000" : "#ffffff",
            backgroundColor: theme === "light" ? "#f9f9f9" : "#333",
        },
        textItem: {
            fontSize: 16,
            marginBottom: 8,
            color: theme === "light" ? "#000000" : "#ffffff",
        },
    });

  return (
    <View style={styles.wrapper}>
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => (
            <Text
                style={{
                    color: theme === "light" ? "#000" : "#fff",
                    fontSize: 16,
                    marginBottom: 8,
                }}
            >
                {item}
            </Text>
        )}
      />

      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.floatingButtonText}>+</Text>
      </TouchableOpacity>

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
            placeholderTextColor={theme === "light" ? "#aaa" : "#888"}
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
