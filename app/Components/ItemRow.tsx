import React from "react";
import { View, Text } from "react-native";

const ItemRow = ({
  label,
  value,
  theme,
  showAllRows,
}: {
  label: string;
  value: string | number;
  theme: string;
  showAllRows: boolean;
}) => (
  <View style={{ flexDirection: "row", marginBottom: 4, maxWidth: "100%" }}>
    <Text
      style={{
        fontWeight: "bold",
        marginRight: 8,
        color: theme === "dark" ? "#fff" : "#000",
      }}
    >
      {label}:
    </Text>
    <Text
      style={{
        color: theme === "dark" ? "#fff" : "#000",
        flexShrink: 1,
      }}
      numberOfLines={showAllRows ? 0 : 1}
      ellipsizeMode="tail"
    >
      {value}
    </Text>
  </View>
);

export default ItemRow;
