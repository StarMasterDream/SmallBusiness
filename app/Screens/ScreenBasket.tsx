import React, { useState, useEffect, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  Button,
  Platform,
  StatusBar,
  ActivityIndicator,
  KeyboardAvoidingView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useTheme } from "../theme-context";
import axios from "axios";
import Modal from "react-native-modal";
import { useSafeAreaInsets } from "react-native-safe-area-context";

function ScreenBasket({ data, theme }: { data: string[]; theme: string }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [cartItems, setCartItems] = useState<{
    item: string;
    quantity: number;
    expanded: boolean;
  }[]>([]);

  const insets = useSafeAreaInsets();

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

  const addToCart = (item: string) => {
    setCartItems((prev) => {
      const existingItem = prev.find((cartItem) => cartItem.item === item);
      if (existingItem) {
        return prev.map((cartItem) =>
          cartItem.item === item
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prev, { item, quantity: 1, expanded: false }];
      }
    });
  };

  const updateQuantity = (item: string, change: number) => {
    setCartItems((prev) =>
      prev
        .map((cartItem) =>
          cartItem.item === item
            ? { ...cartItem, quantity: cartItem.quantity + change }
            : cartItem
        )
        .filter((cartItem) => cartItem.quantity > 0)
    );
  };

  const toggleText = (item: string) => {
    setCartItems((prev) =>
      prev.map((cartItem) =>
        cartItem.item === item
          ? { ...cartItem, expanded: !cartItem.expanded }
          : cartItem
      )
    );
  };

  const containerStyle =
    theme === "dark"
      ? [styles.flatListContainer, styles.flatListContainerDark]
      : styles.flatListContainer;

  return (
    <View style={{ flex: 1 }}>
      {cartItems.length === 0 ? (
        <View
          style={[
            styles.emptyBasketContainer,
            { backgroundColor: theme === "dark" ? "#1E1E1E" : "#F5F5F5" },
          ]}
        >
          <Text
            style={[
              styles.emptyBasketText,
              { color: theme === "dark" ? "#FFF" : "#999" },
            ]}
          >
            Корзина пуста
          </Text>
        </View>
      ) : (
        <FlatList
          style={containerStyle}
          contentContainerStyle={{ paddingBottom: 20 }}
          data={cartItems}
          keyExtractor={(cartItem) => cartItem.item}
          renderItem={({ item }) => (
            <View style={styles.cartItem}>
              <TouchableOpacity
                style={styles.textContainer}
                onPress={() => toggleText(item.item)}
              >
                <Text
                  style={
                    theme === "dark"
                      ? [styles.textItem, styles.textItemDark]
                      : styles.textItem
                  }
                  numberOfLines={item.expanded ? undefined : 1}
                  ellipsizeMode={item.expanded ? undefined : "tail"}
                >
                  {item.item}
                </Text>
              </TouchableOpacity>
              <View style={styles.quantityControls}>
              <View style={{ alignItems: "center" }}>
  <Text
    style={
      theme === "dark"
        ? [styles.quantityLabel, styles.quantityTextDark]
        : styles.quantityLabel
    }
  >
    Количество
  </Text>
  <View style={styles.quantityControls}>
    <TouchableOpacity
      onPress={() => updateQuantity(item.item, -1)}
      style={styles.quantityButton}
    >
      <Text style={styles.quantityButtonText}>-</Text>
    </TouchableOpacity>
    <Text
      style={
        theme === "dark"
          ? [styles.quantityText, styles.quantityTextDark]
          : styles.quantityText
      }
    >
      {item.quantity}
    </Text>
    <TouchableOpacity
      onPress={() => updateQuantity(item.item, 1)}
      style={styles.quantityButton}
    >
      <Text style={styles.quantityButtonText}>+</Text>
    </TouchableOpacity>
  </View>
</View>

</View>
            </View>
          )}
        />
      )}
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={{ color: "#fff", fontSize: 24 }}>+</Text>
      </TouchableOpacity>
      <Modal
        isVisible={modalVisible}
        onSwipeComplete={closeModal}
        swipeDirection="down"
        style={styles.modalWrapper}
      >
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <View
            style={[
              styles.modalContainer,
              theme === "dark" ? styles.modalBackgroundDark : null,
              {
                paddingTop: insets.top + 16,
                paddingBottom: insets.bottom + 16,
                paddingHorizontal: 16,
              },
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
              style={{ flex: 1 }}
              data={filteredData}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    addToCart(item);
                    closeModal();
                  }}
                >
                  <Text
                    style={
                      theme === "dark"
                        ? [styles.textItem, styles.textItemDark]
                        : styles.textItem
                    }
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              )}
              keyboardShouldPersistTaps="handled"
              initialNumToRender={10}
              maxToRenderPerBatch={10}
            />
            <TouchableOpacity
              style={[
                styles.closeButton,
                theme === "dark"
                  ? styles.closeButtonDark
                  : styles.closeButtonLight,
              ]}
              onPress={closeModal}
            >
              <Text style={styles.closeButtonText}>Закрыть</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}

export default ScreenBasket;

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    textContainer: {
      flex: 1,
      marginRight: 10,
    },
    card: {
      backgroundColor: "#FFF",
      borderRadius: 8,
      padding: 16,
      marginBottom: 10,
      elevation: 2,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
    },
    cardDark: {
      backgroundColor: "#2C2C2C",
      borderColor: "#555",
      shadowColor: "#000",
      shadowOpacity: 0.4,
      shadowRadius: 4,
    },
    quantityLabel: {
      fontSize: 14,
      fontWeight: "bold",
      color: "#333",
      marginBottom: 4,
    },
    modalWrapper: {
      margin: 0,
      justifyContent: "flex-end",
    },
    modalContainer: {
      flex: 1,
      padding: 16,
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
    },
    textItemDark: {
      backgroundColor: "#2C2C2C",
      color: "#FFF",
      shadowOpacity: 0.4,
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
    centered: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    closeButton: {
      marginTop: 16,
      paddingVertical: 10,
      paddingHorizontal: 20,
      backgroundColor: "#FF9800",
      borderRadius: 8,
      alignItems: "center",
    },
    closeButtonText: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "bold",
    },
    closeButtonDark: {
      backgroundColor: "#333",
    },
    closeButtonLight: {
      backgroundColor: "#6200EE",
    },
    emptyBasketContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    emptyBasketText: {
      fontSize: 18,
      fontStyle: "italic",
    },  
    cartItem: {
      flexDirection: "row",
      alignItems: "center",
    },
    quantityControls: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      minWidth: 100,
      maxWidth: 150,
    },
    quantityButton: {
      backgroundColor: "#FF9800",
      borderRadius: 8,
      paddingHorizontal: 12,
      paddingVertical: 8,
    },
    quantityButtonText: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "bold",
      textAlign: "center",
    },
    quantityText: {
      fontSize: 16,
      fontWeight: "bold",
      color: "#333",
      marginHorizontal: 8,
      textAlign: "center",
      minWidth: 24,
    },
    quantityTextDark: {
      color: "#FFF",
    },
    floatingButton: {
      position: "absolute",
      bottom: 20,
      right: 20,
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: "#FF9800",
      justifyContent: "center",
      alignItems: "center",
      elevation: 5,
    },  
  });