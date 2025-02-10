import React, { useState, useEffect } from "react";
import { FlatList, RefreshControl } from "react-native";
import axios from "axios";
import ListItem from "../components/ListItem";
import LoadingView from "../components/LoadingView";
import ErrorView from "../components/ErrorView";
import { RemoteData } from "../components/types";

const ScreenCheque = ({ theme }: { theme: string }) => {
  const [remoteData, setRemoteData] = useState<RemoteData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async (isRefreshing?: boolean) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.get(
        "http://DESKTOP-MITLV5M:8080/1C/hs/trade/ReceiptOfGoods",
        {
          headers: {
            Authorization: 'd2ViOndlYg=='
          }
        }
      );
  
      if (Array.isArray(response.data)) {
        setRemoteData(response.data);
      } else {
        throw new Error("Ошибка формата данных: ожидается массив");
      }
    } catch (err) {
      console.error("Ошибка при загрузке данных Чеки:", err);
      setError("Ошибка загрузки данных. Попробуйте снова.");
      if (axios.isAxiosError(err)) {
        console.log('Status in ScreenCheque:', err.response?.status);
        console.log('Headers in ScreenCheque:', err.response?.headers);
        console.log('Server in response:', err.response?.data);
      }
    } finally {
      if (!isRefreshing) setLoading(false);
      setRefreshing(false);
    }
  };
  
  useEffect(() => {
    fetchData();
  }, []);

  if (loading && remoteData.length === 0) return <LoadingView theme={theme} />;
  if (error && remoteData.length === 0) return <ErrorView error={error} theme={theme} onRetry={fetchData} />
  ;

  const handleRefresh = () => {
    setRefreshing(true);
    fetchData(true);
  };

  return (
    <FlatList
      style={{ flex: 1, backgroundColor: theme === "dark" ? "#1E1E1E" : "#FFFFFF" }}
      contentContainerStyle={{ paddingBottom: 20 }}
      data={remoteData ?? []}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => <ListItem item={item} theme={theme} />}
      initialNumToRender={10}
      maxToRenderPerBatch={10}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={handleRefresh}
          tintColor={theme === "dark" ? "#fff" : "#000"}
        />
      }
    />
  );
};

export default ScreenCheque;