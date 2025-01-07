import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface EmptyBasketProps {
  theme: string;
}

const EmptyBasket: React.FC<EmptyBasketProps> = ({ theme }) => {
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme === "dark" ? "#1E1E1E" : "#F5F5F5" },
      ]}
    >
      <Text
        style={[
          styles.text,
          { color: theme === "dark" ? "#FFF" : "#999" },
        ]}
      >
        Корзина пуста
      </Text>
    </View>
  );
};

export default EmptyBasket;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    fontStyle: "italic",
  },
});
