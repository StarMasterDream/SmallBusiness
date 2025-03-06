import React, { useState, useMemo, useEffect } from "react";
import {
  View,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Modal from "react-native-modal";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import CartItem from "../components/CartItem";
import FloatingButton from "../components/FloatingButton";
import SaleFloatingButton from "../components/SaleFloatingButton";
import ModalContent from "../components/ModalContent";
import EmptyBasket from "../components/EmptyBasket";
import styles from "../styles/screenBasketStyles";
import base64 from "base-64";
import { loadData } from "../../utils/storage";

interface Folder {
  Kod: string;
  GUID: string;
  Name: string;
  isFolder: boolean;
  Data: Folder[];
}

interface CartItemType {
  item: string;
  quantity: number;
  expanded: boolean;
  GUID: string;
  price?: number;
}

function ScreenBasket({ theme }: { theme: string }) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Folder[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const insets = useSafeAreaInsets();

  const closeModal = () => {
    setModalVisible(false);
    setSearchQuery("");
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Загружаем данные пользователя
        const userData = await loadData("user");
        if (!userData) throw new Error("User not logged in");

        // Формируем авторизационную строку
        const authString = `${userData.email}:${userData.password}`;
        const encoded = base64.encode(authString);

        const response = await fetch(
          "https://desktop-mitlv5m.starmasterdream.keenetic.link/1C/hs/trade/Goods",
          {
            method: "GET",
            headers: { Authorization: encoded },
          }
        );

        if (!response.ok) {
          throw new Error(`Ошибка HTTP: ${response.status}`);
        }

        const result = await response.json();
        const groupsData = result.map((item: any) => ({
          Kod: item.Kod,
          GUID: item.GUID,
          Name: item.Name,
          isFolder: item.isFolder,
          Data:
            item.Data?.map((subgroup: any) => ({
              Kod: subgroup.Kod,
              GUID: subgroup.GUID,
              Name: subgroup.Name,
              isFolder: subgroup.isFolder,
              Data: subgroup.Data || [],
            })) || [],
        }));

        setData(groupsData);
      } catch (error) {
        console.error("Ошибка при загрузке данных в Modal:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const flattenGroups = (groups: Folder[]): Folder[] => {
    return groups.reduce<Folder[]>((acc, group) => {
      if (group.isFolder) {
        acc.push(group);
        if (group.Data.length > 0) {
          acc.push(...flattenGroups(group.Data));
        }
      } else {
        acc.push(group);
      }
      return acc;
    }, []);
  };

  const filteredData = useMemo(
    () =>
      data.length > 0
        ? flattenGroups(data).filter((group) =>
            group.Name.toLowerCase().includes(searchQuery.toLowerCase())
          )
        : [],
    [data, searchQuery]
  );

  const addToCart = (folder: Folder) => {
    setCartItems((prev: CartItemType[]) => {
      const existingItem = prev.find(
        (cartItem) => cartItem.GUID === folder.GUID
      );
      if (existingItem) {
        return prev.map((cartItem) =>
          cartItem.GUID === folder.GUID
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [
          ...prev,
          { item: folder.Name, quantity: 1, expanded: false, GUID: folder.GUID },
        ];
      }
    });
  };

  const updateQuantity = (item: string, change: number) => {
    setCartItems((prev: CartItemType[]) =>
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
    setCartItems((prev: CartItemType[]) =>
      prev.map((cartItem) =>
        cartItem.item === item
          ? { ...cartItem, expanded: !cartItem.expanded }
          : cartItem
      )
    );
  };

  return (
    <View style={{ flex: 1 }}>
      {cartItems.length === 0 ? (
        <EmptyBasket theme={theme} />
      ) : (
        <FlatList
          style={[
            styles.flatListContainer,
            theme === "dark" && styles.flatListContainerDark,
          ]}
          contentContainerStyle={{ paddingBottom: 20 }}
          data={cartItems}
          keyExtractor={(cartItem) => cartItem.GUID}
          renderItem={({ item }) => (
            <CartItem
              item={item}
              theme={theme}
              toggleText={toggleText}
              updateQuantity={updateQuantity}
            />
          )}
        />
      )}
      <FloatingButton onPress={() => setModalVisible(true)} />
      <SaleFloatingButton
        onPress={() => alert("Данная Функция в разработке")}
      />
      <Modal isVisible={modalVisible} style={styles.modalWrapper}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <ModalContent
            theme={theme}
            closeModal={closeModal}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            filteredData={filteredData}
            addToCart={addToCart}
            insets={insets}
            loading={loading}
          />
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}

export default ScreenBasket;
