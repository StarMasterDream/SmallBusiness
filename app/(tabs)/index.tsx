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
  StatusBar,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useTheme } from "../theme-context";
import axios from "axios";

const Tab = createMaterialTopTabNavigator();

const generateData = () =>
  Array.from({ length: 50 }, (_, index) => `Пример данных ${index + 1}`);

export default function Index() {
  const [data] = useState(generateData());
  const { theme} = useTheme();
  const isLightTheme = theme === 'light';
  const statusBarStyle = isLightTheme ? 'dark-content' : 'light-content';
  const statusBarBackgroundColor = isLightTheme ? '#F2F2F7' : '#1C1C1E';

  useEffect(() => {
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
    <>
    <StatusBar
            barStyle={statusBarStyle}
            backgroundColor={statusBarBackgroundColor}
          />
      <SafeAreaView 
        style={[styles.container, { backgroundColor: statusBarBackgroundColor }]} 
        edges={['top', 'left', 'right']}
      >
      <Tab.Navigator screenOptions={tabStyles}>
        <Tab.Screen name="Корзина">
          {() => <ScreenBasket data={data} theme={theme} />}
        </Tab.Screen>
        <Tab.Screen name="Чеки">
          {() => <ScreenCheque data={data} theme={theme} />}
        </Tab.Screen>
      </Tab.Navigator>
    </SafeAreaView>
    </>
  );
}

function ScreenCheque({ data, theme }: { data: string[]; theme: string }) {
  const [remoteData, setRemoteData] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(
        "https://65c29882f7e6ea59682b8fcd.mockapi.io/v1/hs/trade/ReceiptOfGoods/Authorization"
      );
      setRemoteData(response.data.map((item: any) => item.Number)); // Пример: берем только поле `Number`
    } catch (err) {
      setError("Ошибка загрузки данных. Попробуйте снова.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const textStyle =
    theme === "dark"
      ? [styles.textItem, styles.textItemDark]
      : styles.textItem;

  const containerStyle =
    theme === "dark"
      ? [styles.flatListContainer, styles.flatListContainerDark]
      : styles.flatListContainer;

  if (loading) {
    return (
      <View style={[containerStyle, { justifyContent: "center", alignItems: "center" }]}>
        <ActivityIndicator size="large" color={theme === "dark" ? "#fff" : "#000"} />
        <Text style={textStyle}>Загрузка данных...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[containerStyle, { justifyContent: "center", alignItems: "center" }]}>
        <Text style={[textStyle, { color: "red" }]}>{error}</Text>
        <Button title="Повторить" onPress={fetchData} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        style={containerStyle}
        contentContainerStyle={{
          paddingBottom: 20,
        }}
        data={remoteData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Text style={textStyle}>{item}</Text>
        )}
        keyboardShouldPersistTaps="handled"
      />
    </View>
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

  const containerStyle =
    theme === "dark"
      ? [styles.flatListContainer, styles.flatListContainerDark]
      : styles.flatListContainer;

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        style={containerStyle}
        contentContainerStyle={{
          paddingBottom: 20,
        }}
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
        keyboardShouldPersistTaps="handled"
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
        <SafeAreaView
          style={[
            styles.modalContainer,
            theme === "dark" ? styles.modalBackgroundDark : null,
          ]}
        >
          <TextInput
            style={theme === "dark" ? [styles.searchInput, styles.inputDark] : styles.searchInput}
            placeholder="Поиск..."
            placeholderTextColor={theme === "dark" ? "#ccc" : "#888"}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <FlatList
            style={containerStyle}
            contentContainerStyle={{
              paddingBottom: 20,
            }}
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
            keyboardShouldPersistTaps="handled"
          />
          <Button title="Закрыть" onPress={closeModal} />
        </SafeAreaView>
      </Modal>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
    borderRadius: 12,
    backgroundColor: "#F9F9F9",
    fontSize: 16,
    color: "#333",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  inputDark: {
    borderColor: "#555",
    backgroundColor: "#2C2C2C",
    color: "#FFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
  },
  textItem: {
    fontSize: 16,
    margin: 12,
    padding: 15,
    backgroundColor: "#F9F9F9",
    color: "#333",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  textItemDark: {
    backgroundColor: "#2C2C2C",
    color: "#FFF",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 2,
  },
  flatListContainer: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "#FFFFFF",
  },
  flatListContainerDark: {
    backgroundColor: "#1E1E1E",
  },
  tabBarStyle: {
    backgroundColor: "#6200ee",
    height: Platform.OS === "ios" ? 60 : 50,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  tabBarStyleDark: {
    backgroundColor: "#333",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
  },
  tabBarLabelStyle: {
    color: "#fff",
    fontSize: 14,
  },
  tabBarIndicatorStyle: {
    backgroundColor: "#ff9800",
    height: 3,
    borderRadius: 2,
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
