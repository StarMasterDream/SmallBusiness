import React from "react";
import { StyleSheet, SafeAreaView, View, Platform } from "react-native";
import { useLocalSearchParams } from "expo-router";

import ItemRow from "./components/ItemRowEspenseDocument";

const getStringParam = (param: string | string[]): string => {
  return Array.isArray(param) ? param[0] : param || "";
};

export default function Full_Item() {
  const params = useLocalSearchParams();
  const theme = getStringParam(params.theme);

  return (
    <View
      style={
        theme === "dark"
          ? [styles.container, styles.containerDark]
          : styles.container
      }
    >
      <SafeAreaView
        style={theme === "dark" ? [styles.card, styles.cardDark] : styles.card}
      >
        <ItemRow
          label="Number"
          value={getStringParam(params.Number)}
          theme={theme}
        />
        <ItemRow
          label="Organization"
          value={getStringParam(params.Organization)}
          theme={theme}
        />
        <ItemRow
          label="Storage"
          value={getStringParam(params.Storage)}
          theme={theme}
        />
        <ItemRow
          label="Counterparty"
          value={getStringParam(params.Counterparty)}
          theme={theme}
        />
        <ItemRow label="TTN" value={getStringParam(params.TTN)} theme={theme} />
        <ItemRow
          label="DateTime"
          value={new Date(getStringParam(params.DateTime)).toLocaleString()}
          theme={theme}
        />
        <ItemRow
          label="Summ"
          value={`${parseFloat(getStringParam(params.Summ)) || 0} ${getStringParam(params.Currency)}`}
          theme={theme}
        />
        <ItemRow
          label="User"
          value={getStringParam(params.User) || "Не указан"}
          theme={theme}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  containerDark: {
    backgroundColor: "#1E1E1E",
  },
  card: {
    backgroundColor: "#FFF",
    borderRadius: 8,
    padding: 16,
    margin: 10,
    elevation: 2,
    ...(Platform.OS === "web"
      ? {
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.4)",
        }
      : {
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.4,
          shadowRadius: 4,
        }),
  },
  cardDark: {
    backgroundColor: "#2C2C2C",
    borderColor: "#555",
  },
});
