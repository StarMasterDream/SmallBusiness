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

const ItemRow = ({ label, value, theme }: { label: string; value: string | number; theme: string }) => (
  <View style={{ flexDirection: "row", marginBottom: 4 }}>
    <Text style={{ fontWeight: "bold", marginRight: 8, color: theme === "dark" ? "#fff" : "#000" }}>{label}:</Text>
    <Text style={{color: theme === "dark" ? "#fff" : "#000" }}>{value}</Text>
  </View>
);

const ListItem = ({ item, theme }: { item: any; theme: string }) => {
  const [showAllRows, setShowAllRows] = useState(false);

  const toggleRows = () => {
    setShowAllRows((prev) => !prev);
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={toggleRows}
    >
      <View style={theme === "dark" ? [styles.card, styles.cardDark] : styles.card}>
        <ItemRow label="Number" value={item.Number} theme={theme} />
        <ItemRow label="Organization" value={item.Organization} theme={theme} />
        {showAllRows && (
          <>
            <ItemRow label="Storage" value={item.Storage} theme={theme} />
            <ItemRow label="Counterparty" value={item.Counterparty} theme={theme} />
            <ItemRow label="TTN" value={item.TTN} theme={theme} />
            <ItemRow label="DateTime" value={new Date(item.DateTime).toLocaleDateString()} theme={theme} />
            <ItemRow label="Summ" value={item.Summ} theme={theme} />
            <ItemRow label="Currency" value={item.Curency} theme={theme} />
            <ItemRow label="User" value={item.User} theme={theme} />
          </>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default function Index() {
  const [data] = useState(generateData());
  const { theme } = useTheme();
  const isLightTheme = theme === "light";
  const statusBarStyle = isLightTheme ? "dark-content" : "light-content";
  const statusBarBackgroundColor = isLightTheme ? "#F2F2F7" : "#1C1C1E";

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
        edges={["top", "left", "right"]}
      >
        <Tab.Navigator screenOptions={tabStyles}>
          <Tab.Screen name="Корзина">
            {() => <ScreenBasket data={data} theme={theme} />}
          </Tab.Screen>
          <Tab.Screen name="Чеки">
            {() => <ScreenCheque theme={theme} />}
          </Tab.Screen>
        </Tab.Navigator>
      </SafeAreaView>
    </>
  );
}

function ScreenCheque({ theme }: { theme: string }) {
  const [remoteData, setRemoteData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(
        "https://65c29882f7e6ea59682b8fcd.mockapi.io/v1/hs/trade/ReceiptOfGoods/Authorization"
      );
      setRemoteData(response.data);
    } catch (err) {
      setError("Ошибка загрузки данных. Попробуйте снова.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const containerStyle =
    theme === "dark"
      ? [styles.flatListContainer, styles.flatListContainerDark]
      : styles.flatListContainer;

  if (loading) {
    return (
      <View
        style={[containerStyle, { justifyContent: "center", alignItems: "center" }]}
      >
        <ActivityIndicator size="large" color={theme === "dark" ? "#fff" : "#000"} />
        <Text style={{ color: theme === "dark" ? "#fff" : "#000" }}>
          Загрузка данных...
        </Text>
      </View>
    );
  }

  if (error) {
    return (
      <View
        style={[containerStyle, { justifyContent: "center", alignItems: "center" }]}
      >
        <Text style={{ color: "red" }}>{error}</Text>
        <Button title="Повторить" onPress={fetchData} />
      </View>
    );
  }

  return (
    <FlatList
      style={containerStyle}
      contentContainerStyle={{
        paddingBottom: 20,
      }}
      data={remoteData}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => <ListItem item={item} theme={theme} />}
      keyboardShouldPersistTaps="handled"
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
            style={
              theme === "dark"
                ? [styles.searchInput, styles.inputDark]
                : styles.searchInput
            }
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
  card: {
    backgroundColor: "#FFF",
    borderRadius: 8,
    padding: 16,
    marginBottom: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  cardDark: {
    borderColor: "#555",
    backgroundColor: "#2C2C2C",
    color: "#FFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    borderRadius: 8,
    padding: 16,
    marginBottom: 10,
    elevation: 2,

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
