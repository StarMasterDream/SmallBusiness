import React, { useContext, useState, useMemo } from "react";
import {
  FlatList,
  RefreshControl,
  TextInput,
  View,
  StyleSheet,
  Text,
} from "react-native";
import { useRouter } from "expo-router";
import { useTheme } from "./theme-context";
import ListItem from "./components/ListItemEspenseDocument";
import LoadingView from "./components/LoadingView";
import ErrorView from "./components/ErrorView";
import { EspenseDocumentContext } from "../utils/EspenseDocumentContext";

const EspenseDocumentScreen = () => {
  const { theme } = useTheme();
  const router = useRouter();
  const { remoteData, loading, error, refreshData, isOffline } = useContext(EspenseDocumentContext);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredData = useMemo(() => {
    if (!searchQuery) return remoteData;
    const lowerQuery = searchQuery.toLowerCase();
    return remoteData.filter((item) =>
      Object.entries(item).some(([key, value]) => {
        if (value === null || value === undefined) return false;
        return String(value).toLowerCase().includes(lowerQuery);
      })
    );
  }, [remoteData, searchQuery]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await refreshData();
    setRefreshing(false);
  };

  if (loading && remoteData.length === 0) return <LoadingView theme={theme} />;
  if (error && remoteData.length === 0)
    return <ErrorView error={error} theme={theme} onRetry={refreshData} />;

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
            borderColor: theme === "dark" ? "#444" : "#CCC",
          },
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

export default EspenseDocumentScreen;
