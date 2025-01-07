import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "../styles/cartItemStyles";

interface CartItemProps {
  item: {
    item: string;
    quantity: number;
    expanded: boolean;
  };
  theme: string;
  toggleText: (item: string) => void;
  updateQuantity: (item: string, change: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, theme, toggleText, updateQuantity }) => {
  return (
    <View style={styles.cartItem}>
      <TouchableOpacity
        style={styles.textContainer}
        onPress={() => toggleText(item.item)}
      >
        <Text
          style={
            theme === "dark"
              ? [styles.textItem, styles.textItemDark]
              : styles.textItem
          }
          numberOfLines={item.expanded ? undefined : 1}
          ellipsizeMode={item.expanded ? undefined : "tail"}
        >
          {item.item}
        </Text>
      </TouchableOpacity>
      <View style={styles.quantityControls}>
        <TouchableOpacity
          onPress={() => updateQuantity(item.item, -1)}
          style={styles.quantityButton}
        >
          <Text style={styles.quantityButtonText}>-</Text>
        </TouchableOpacity>
        <Text
          style={
            theme === "dark"
              ? [styles.quantityText, styles.quantityTextDark]
              : styles.quantityText
          }
        >
          {item.quantity}
        </Text>
        <TouchableOpacity
          onPress={() => updateQuantity(item.item, 1)}
          style={styles.quantityButton}
        >
          <Text style={styles.quantityButtonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CartItem;
