import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet, Platform } from "react-native";


import ItemRow from "./ItemRow";
import { RemoteData } from "../../utils/types";

const ListItem = ({ item, theme }: { item: RemoteData; theme: string }) => {
  const [showAllRows, setShowAllRows] = useState(false);

  const toggleRows = () => {
    setShowAllRows((prev) => !prev);
  };

  return (
    <TouchableOpacity style={styles.container} onPress={toggleRows}>
      <View
        style={theme === "dark" ? [styles.card, styles.cardDark] : styles.card}
      >
        <ItemRow
          label="Number"
          value={item.Number}
          theme={theme}
          showAllRows={showAllRows}
        />
        <ItemRow
          label="Organization"
          value={item.Organization}
          theme={theme}
          showAllRows={showAllRows}
        />
        {showAllRows && (
          <>
            <ItemRow
              label="Storage"
              value={item.Storage}
              theme={theme}
              showAllRows={showAllRows}
            />
            <ItemRow
              label="Counterparty"
              value={item.Counterparty}
              theme={theme}
              showAllRows={showAllRows}
            />
            <ItemRow
              label="TTN"
              value={item.TTN}
              theme={theme}
              showAllRows={showAllRows}
            />
            <ItemRow
              label="DateTime"
              value={new Date(item.DateTime).toLocaleString()}
              theme={theme}
              showAllRows={showAllRows}
            />
            <ItemRow
              label="Summ"
              value={item.Summ.toString()}
              theme={theme}
              showAllRows={showAllRows}
            />
            <ItemRow
              label="Currency"
              value={item.Currency}
              theme={theme}
              showAllRows={showAllRows}
            />
            <ItemRow
              label="User"
              value={item.User || "Не указан"}
              theme={theme}
              showAllRows={showAllRows}
            />
          </>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

export default ListItem;
