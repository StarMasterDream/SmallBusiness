import React from "react";
import { TouchableOpacity, Text } from "react-native";
import styles from "../styles/floatingButtonStyles";

interface FloatingButtonProps {
  onPress: () => void;
}

const FloatingButton: React.FC<FloatingButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.floatingButton} onPress={onPress}>
      <Text style={{ color: "#fff", fontSize: 24 }}>+</Text>
    </TouchableOpacity>
  );
};

export default FloatingButton;
