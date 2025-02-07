import React, { useState, useEffect } from "react";
import { FlatList } from "react-native";
import axios from "axios";
import ListItem from "../components/ListItem";
import LoadingView from "../components/LoadingView";
import ErrorView from "../components/ErrorView";
import { RemoteData } from "../components/types";

const ScreenCheque = ({ theme }: { theme: string }) => {
  const [remoteData, setRemoteData] = useState<RemoteData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.get(
        "http://DESKTOP-MITLV5M:8080/1c/hs/trade/ReceiptOfGoods",
        {
          headers: {
            'Authorization': 'd2ViOndlYg==',
            'content-type': 'application/json'
          }
        }
      );
  
      if (Array.isArray(response.data)) {
        setRemoteData(response.data);
      } else {
        throw new Error("Ошибка формата данных: ожидается массив, а получено что-то другое");
      }
    } catch (err) {
      console.error("Ошибка при загрузке Чеки:", err);
      setError("Ошибка загрузки данных. Попробуйте снова.");
      if (axios.isAxiosError(err)) {
        console.log('Status:', err.response?.status);
        console.log('Headers:', err.response?.headers);
        console.log('Server response:', err.response?.data);
      }
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <LoadingView theme={theme} />;
  if (error) return <ErrorView error={error} onRetry={fetchData} />;

  return (
    <FlatList
      style={{ flex: 1, backgroundColor: theme === "dark" ? "#1E1E1E" : "#FFFFFF" }}
      contentContainerStyle={{ paddingBottom: 20 }}
      data={remoteData ?? []}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => <ListItem item={item} theme={theme} />}
      initialNumToRender={10}
      maxToRenderPerBatch={10}
    />
  );
};

export default ScreenCheque;
