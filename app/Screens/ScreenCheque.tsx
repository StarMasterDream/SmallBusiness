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
      const response = await axios.get<RemoteData[]>(
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

  if (loading) return <LoadingView theme={theme} />;
  if (error) return <ErrorView error={error} onRetry={fetchData} />;

  return (
    <FlatList
      style={{ flex: 1, backgroundColor: theme === "dark" ? "#1E1E1E" : "#FFFFFF" }}
      contentContainerStyle={{ paddingBottom: 20 }}
      data={remoteData}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => <ListItem item={item} theme={theme} />}
      initialNumToRender={10}
      maxToRenderPerBatch={10}
    />
  );
};

export default ScreenCheque;