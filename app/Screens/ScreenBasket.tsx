import React, { useState, useMemo, useEffect } from "react";
import {
  View,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Alert,
  RefreshControl
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
import { loadData, saveCache, loadCache, clearCache} from "../../utils/storage";
import NetInfo from "@react-native-community/netinfo";

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
  const [isOffline, setIsOffline] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const insets = useSafeAreaInsets();

  const closeModal = () => {
    setModalVisible(false);
    setSearchQuery("");
  };

  // Функция загрузки данных с проверкой подключения
  const fetchGoodsData = async () => {
    setLoading(true);
    try {
      const netState = await NetInfo.fetch();
      if (!netState.isConnected) {
        setIsOffline(true);
        const cachedData = await loadCache("goodsData");
        setData(cachedData || []);
        Alert.alert("⚠️Оффлайн режим⚠️", "Отсутствует интернет. Используются кэшированные данные.");
      } else {
        setIsOffline(false);
        const userData = await loadData("user");
        if (!userData) throw new Error("User not logged in");

        const authString = `${userData.email}:${userData.password}`;
        const encoded = base64.encode(authString);

        //const controller = new AbortController();
        //const timeoutId = setTimeout(() => controller.abort(), 10000);

        const response = await fetch(
          "https://desktop-mitlv5m.starmasterdream.keenetic.link/1C/hs/trade/Goods",
          {
            method: "GET",
            headers: { Authorization: encoded },
           //signal: controller.signal,
          }
        );
        //clearTimeout(timeoutId);

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
        await clearCache("goodsData");
        await saveCache("goodsData", groupsData);
      }
    } catch (error) {
      // Обработка ошибки при недоступности сервера
      setIsOffline(true);
      const cachedData = await loadCache("goodsData");
      setData(cachedData || []);
      Alert.alert("⚠️Оффлайн режим⚠️", "Нет доступа к серверу. Используются кэшированные данные.");
      //console.error("Ошибка при загрузке данных:", error);
    } finally {
      setLoading(false);
    }
  };

  // Обработчик обновления (pull-to-refresh)
  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchGoodsData();
    setRefreshing(false);
  };

  // Подписка на изменение статуса сети
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsOffline(!state.isConnected);
    });
    return () => unsubscribe();
  }, []);

  // Первоначальная загрузка данных
  useEffect(() => {
    fetchGoodsData();
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
            isOffline={isOffline}         // передаем флаг оффлайн
            refreshing={refreshing}         // состояние обновления
            onRefresh={handleRefresh}       // функция обновления
          />
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}

export default ScreenBasket;