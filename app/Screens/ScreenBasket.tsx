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
import ModalContent from "../components/ModalContent";
import EmptyBasket from "../components/EmptyBasket";
import styles from "../styles/screenBasketStyles";

interface Group {
  Kod: string;
  GUID: string;
  Name: string;
  itGroup: boolean;
  Groups: Group[];
}

interface CartItemType {
  item: string;
  quantity: number;
  expanded: boolean;
}

function ScreenBasket({ theme }: { theme: string }) {
  const [data, setData] = useState<Group[]>([]);
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
        const response = await fetch("https://677e75f694bde1c1252bfdd0.mockapi.io/api/v2/catalog");
        const result = await response.json();
  
        const groupsData: Group[] = result.map((item: any) => ({
          Kod: item.Kod,
          GUID: item.GUID,
          Name: item.Name,
          itGroup: item.itGroup,
          Groups: item.Groups.map((subgroup: any) => ({
            Kod: subgroup.Kod,
            GUID: subgroup.GUID,
            Name: subgroup.Name,
            itGroup: subgroup.itGroup,
            Groups: subgroup.Groups,  // Рекурсивно сохраняем подгруппы
          })),
        }));
  
        setData(groupsData);
      } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
      }
    };
  
    fetchData();
  }, []);
  
  const flattenGroups = (groups: Group[]): Group[] => {
    return groups.reduce<Group[]>((acc, group) => {
      if (group.itGroup) {
        acc.push(group);
        if (group.Groups.length > 0) {
          acc.push(...flattenGroups(group.Groups)); // Рекурсивно добавляем вложенные группы
        }
      } else {
        acc.push(group);
      }
      return acc;
    }, []);
  };

  const filteredData = useMemo(
    () =>
      flattenGroups(data).filter(
        (group) =>
          group.Name.toLowerCase().includes(searchQuery.toLowerCase())  // Фильтруем по Name
      ),
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
