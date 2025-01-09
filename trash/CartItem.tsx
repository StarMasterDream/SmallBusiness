import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "../app/styles/cartItemStyles";

interface CartItemProps {
  item: {
    item: string;
    quantity: number;
    expanded: boolean;
    price?: number; // Добавлено поле цены
  };
  theme: string;
  toggleText: (item: string) => void;
  updateQuantity: (item: string, change: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, theme, toggleText, updateQuantity }) => {
  const totalPrice = item.price ? item.price * item.quantity : 0; // Общая стоимость

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
          {item.item} {item.price ? `(${item.price} ₽)` : ""}
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
      <Text
        style={
          theme === "dark"
            ? [styles.totalPrice, styles.totalPriceDark]
            : styles.totalPrice
        }
      >
        {totalPrice > 0 ? `${totalPrice} ₽` : ""}
      </Text>
    </View>
  );
};

export default CartItem;
