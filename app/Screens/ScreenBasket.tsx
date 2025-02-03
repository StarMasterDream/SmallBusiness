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
}

function ScreenBasket({ theme }: { theme: string }) {
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
      try {
        const response = await fetch("http://192.168.1.10:8080/1c/hs/trade/Goods");
        if (!response.ok) {
          throw new Error(`Ошибка HTTP: ${response.status}`);
        }
        const result = await response.json();

        //console.log("Данные из API:", result);
        //console.log("Тип данных в ScreenBasket.tsx:", typeof response.json());
        
        const groupsData: Folder[] = result.map((item: any) => ({
          Kod: item.Kod,
          GUID: item.GUID,
          Name: item.Name,
          isFolder: item.isFolder,
          Data: item.Data?.map((subgroup: any) => ({
            Kod: subgroup.Kod,
            GUID: subgroup.GUID,
            Name: subgroup.Name,
            isFolder: subgroup.isFolder,
            Data: subgroup.Data || [],
          })) || [],
        }));
  
        setData(groupsData);
      } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
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

  const addToCart = (item: string) => {
    setCartItems((prev: CartItemType[]) => {
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
          keyExtractor={(cartItem) => cartItem.item}
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
      <SaleFloatingButton onPress={() => alert("Данная Функция в разработке")} />
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
          <ModalContent
            theme={theme}
            closeModal={closeModal}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            filteredData={filteredData}
            addToCart={addToCart}
            insets={insets}
          />
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}

export default ScreenBasket;
