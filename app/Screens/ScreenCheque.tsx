import React, { useState, useEffect, useMemo } from "react";
import { 
  FlatList, 
  RefreshControl, 
  TextInput, 
  View, 
  StyleSheet,
  Text,
  Alert
} from "react-native";
import axios from "axios";
import ListItem from "../components/ListItem";
import LoadingView from "../components/LoadingView";
import ErrorView from "../components/ErrorView";
import { RemoteData } from "../../utils/types";
import base64 from 'base-64';
import { loadData, removeData, saveCache, loadCache, clearCache } from '../../utils/storage';
import { useRouter } from "expo-router";
import NetInfo from "@react-native-community/netinfo";

const ScreenCheque = ({ theme }: { theme: string }) => {
  const [remoteData, setRemoteData] = useState<RemoteData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isOffline, setIsOffline] = useState(false);
  const router = useRouter();

  const filteredData = useMemo(() => {
    if (!searchQuery) return remoteData;
    
    const lowerQuery = searchQuery.toLowerCase();
    return remoteData.filter(item => {
      return Object.entries(item).some(([key, value]) => {
        if (value === null || value === undefined) return false;
        return String(value).toLowerCase().includes(lowerQuery);
      });
    });
  }, [remoteData, searchQuery]);

  const fetchData = async (isRefreshing?: boolean) => {
    setLoading(true);
    setError(null);
    try {
      const netState = await NetInfo.fetch();
      if (!netState.isConnected) {
        setIsOffline(true);
        let cachedData = await loadCache("remoteData"); // Используем loadCache
        if (!cachedData) {
          cachedData = [];
        }
        setRemoteData(cachedData);
        Alert.alert("⚠️Оффлайн режим⚠️", "Отсутствует интернет. Используются кэшированные данные.");
      } else {
        setIsOffline(false);
        const userData = await loadData('user');
        if (!userData) {
          router.replace('/(authorization)/login');
          return;
        }
        const authString = `${userData.email}:${userData.password}`;
        const encoded = base64.encode(authString);

        try {
          const response = await axios.get(
            "https://desktop-mitlv5m.starmasterdream.keenetic.link/1C/hs/trade/ReceiptOfGoods",
            {
              headers: { Authorization: encoded },
              timeout: 10000
            }
          );
          if (Array.isArray(response.data)) {
            setRemoteData(response.data);
            await clearCache("remoteData");
            await saveCache("remoteData", response.data); // Используем saveCache
          } else {
            throw new Error("Ожидается массив данных");
          }
        } catch (serverErr: any) {
          let cachedData = await loadCache("remoteData"); // Используем loadCache
          if (!cachedData) {
            cachedData = [];
          }
          setRemoteData(cachedData);
          setIsOffline(true);
          Alert.alert("⚠️Оффлайн режим⚠️", "Нет доступа к серверу. Используются кэшированные данные.");
        }
      }
    } catch (err: any) {
      // ... обработка ошибок
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
    // Подписка на изменения статуса подключения
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsOffline(!state.isConnected);
    });
    return () => unsubscribe();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchData(true);
  };

  if (loading && remoteData.length === 0) return <LoadingView theme={theme} />;
  if (error && remoteData.length === 0) return <ErrorView error={error} theme={theme} onRetry={fetchData} />;

  return (
    <View style={{ flex: 1, backgroundColor: theme === "dark" ? "#1E1E1E" : "#FFFFFF" }}>
      {isOffline && (
        <View style={styles.offlineBanner}>
          <Text style={styles.offlineBannerText}>Оффлайн режим</Text>
        </View>
      )}
      <TextInput
        placeholder="Поиск по всем полям..."
        placeholderTextColor={theme === "dark" ? "#888" : "#666"}
        style={[
          styles.searchInput,
          {
            backgroundColor: theme === "dark" ? "#2C2C2C" : "#FFF",
            color: theme === "dark" ? "#FFF" : "#000",
            borderColor: theme === "dark" ? "#444" : "#CCC"
          }
        ]}
        value={searchQuery}
        onChangeText={setSearchQuery}
        clearButtonMode="while-editing"
      />

      <FlatList
        style={{ backgroundColor: theme === "dark" ? "#1E1E1E" : "#FFFFFF" }}
        contentContainerStyle={{ flexGrow: 1 }}
        data={filteredData}
        keyExtractor={(item) => item.GUID}
        renderItem={({ item }) => <ListItem item={item} theme={theme} />}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={{ color: theme === "dark" ? "#FFF" : "#000" }}>
              {searchQuery ? "Ничего не найдено" : "Нет данных"}
            </Text>
          </View>
        }
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={[theme === "dark" ? "#fff" : "#000"]}
            progressBackgroundColor={theme === "dark" ? "#1E1E1E" : "#FFF"}
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchInput: {
    height: 40,
    margin: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    borderWidth: 1,
    fontSize: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  offlineBanner: {
    backgroundColor: "#FFCC00",
    padding: 10,
    alignItems: "center",
  },
  offlineBannerText: {
    color: "#000",
    fontWeight: "bold",
  },
});

export default ScreenCheque;
