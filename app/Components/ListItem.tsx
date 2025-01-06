import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import ItemRow from "./ItemRow";
import { RemoteData } from "./types";


const ListItem = ({ item, theme }: { item: RemoteData; theme: string }) => {
  const [showAllRows, setShowAllRows] = useState(false);

  const toggleRows = () => {
    setShowAllRows((prev) => !prev);
  };

  return (
    <TouchableOpacity style={styles.container} onPress={toggleRows}>
      <View style={ theme === "dark" ? [styles.card, styles.cardDark] : styles.card }>
        <ItemRow label="Number" value={item.Number} theme={theme} showAllRows={showAllRows} />
        <ItemRow label="Organization" value={item.Organization} theme={theme} showAllRows={showAllRows} />
        {showAllRows && (
          <>
            <ItemRow label="Storage" value={item.Storage} theme={theme} showAllRows={showAllRows} />
            <ItemRow label="Counterparty" value={item.Counterparty} theme={theme} showAllRows={showAllRows} />
            <ItemRow label="TTN" value={item.TTN} theme={theme} showAllRows={showAllRows} />
            <ItemRow label="DateTime" value={new Date(item.DateTime).toLocaleDateString()} theme={theme} showAllRows={showAllRows} />
            <ItemRow label="Summ" value={item.Summ} theme={theme} showAllRows={showAllRows} />
            <ItemRow label="Currency" value={item.Curency} theme={theme} showAllRows={showAllRows} />
            <ItemRow label="User" value={item.User} theme={theme} showAllRows={showAllRows} />
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
  },
  cardDark: {
    backgroundColor: "#2C2C2C",
    borderColor: "#555",
    shadowOpacity: 0.4,
    shadowRadius: 4,
  },
});

export default ListItem;
