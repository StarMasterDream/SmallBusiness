import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import base64 from "base-64";
import { Alert } from "react-native";
import NetInfo from "@react-native-community/netinfo";
import { loadData, saveCache, loadCache, clearCache, getTotalCacheSize } from "./storage";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface RemoteData {
  GUID: string;
  Number: string;
  Organization: string;
  Storage: string;
  Counterparty: string;
  TTN: string;
  DateTime: string;
  Summ: number;
  Currency: string;
  User: string;
}

interface EspenseDocumentContextProps {
  remoteData: RemoteData[];
  loading: boolean;
  error: string | null;
  refreshData: () => void;
  isOffline: boolean;
}

export const EspenseDocumentContext = createContext<EspenseDocumentContextProps>({
  remoteData: [],
  loading: false,
  error: null,
  refreshData: () => {},
  isOffline: false,
});

export const EspenseDocumentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [remoteData, setRemoteData] = useState<RemoteData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isOffline, setIsOffline] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const netState = await NetInfo.fetch();
      if (!netState.isConnected) {
        setIsOffline(true);
        let cachedData = await loadCache("remoteDataEspenseDocument");
        if (!cachedData) cachedData = [];
        setRemoteData(cachedData);
        Alert.alert(
          "⚠️Оффлайн режим⚠️",
          "Отсутствует интернет. Используются кэшированные данные."
        );
      } else {
        setIsOffline(false);
        const userData = await loadData("user");
        if (!userData) {
          setError("Нет данных пользователя");
          return;
        }
        const authString = `${userData.email}:${userData.password}`;
        const encoded = base64.encode(authString);
        try {
          const response = await axios.get(
            "https://desktop-mitlv5m.starmasterdream.keenetic.link/1C/hs/trade/ReceiptOfGoods",
            {
              headers: { Authorization: encoded },
              timeout: 10000,
            }
          );
          if (Array.isArray(response.data)) {
            setRemoteData(response.data);

            const totalSizeMB = (await getTotalCacheSize()) / 1024 / 1024;
            console.log("Total storage usage:", isNaN(totalSizeMB) ? 0 : totalSizeMB.toFixed(2), "MB");
            const dataString = JSON.stringify(response.data);
            console.log("Реальный размер данных:", dataString.length / 1024 / 1024, "MB");

            const allKeys = await AsyncStorage.getAllKeys();
            console.log("Все ключи в хранилище:", allKeys);
            
            //await clearCache("remoteDataReceiptDocument");
            await clearCache("remoteDataEspenseDocument");
            await saveCache("remoteDataEspenseDocument", response.data);
          } else {
            throw new Error("Ожидается массив данных");
          }
        } catch (serverErr: any) {
          let cachedData = await loadCache("remoteDataEspenseDocument");
          if (!cachedData) cachedData = [];
          setRemoteData(cachedData);
          setIsOffline(true);
          Alert.alert(
            "⚠️Оффлайн режим⚠️",
            "Нет доступа к серверу. Используются кэшированные данные."
          );
        }
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (remoteData.length === 0) {
      fetchData();
    }
  }, []);

  return (
    <EspenseDocumentContext.Provider
      value={{ remoteData, loading, error, refreshData: fetchData, isOffline }}
    >
      {children}
    </EspenseDocumentContext.Provider>
  );
};
