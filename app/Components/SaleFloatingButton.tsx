import React from "react";
import { TouchableOpacity, Text } from "react-native";
import styles from "../styles/saleFloatingButtonStyles";

interface SaleFloatingButtonProps {
  onPress: () => void;
}

const SaleFloatingButton: React.FC<SaleFloatingButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.floatingButton} onPress={onPress}>
      <Text style={{ color: "#fff", fontSize: 24 }}>продажа</Text>
    </TouchableOpacity>
  );
};

export default SaleFloatingButton;
