import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface ItemRowProps {
  label: string;
  value: string | number;
  theme: string;
  showAllRows?: boolean;
}

const ItemRow: React.FC<ItemRowProps> = ({
  label,
  value,
  theme,
  showAllRows = true,
}) => (
  <View style={styles.rowContainer}>
    <Text
      style={[
        styles.label,
        { color: theme === "dark" ? "#FFFFFF" : "#000000" }
      ]}
    >
      {label}:
    </Text>
    <Text
      style={[
        styles.value,
        { color: theme === "dark" ? "#CCCCCC" : "#333333" }
      ]}
      numberOfLines={showAllRows ? 0 : 1}
      ellipsizeMode="tail"
    >
      {value}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: "row",
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  label: {
    fontWeight: "600",
    width: 120,
    fontSize: 16,
  },
  value: {
    flex: 1,
    fontSize: 16,
  },
});

export default ItemRow;
