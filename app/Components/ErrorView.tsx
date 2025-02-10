import React from "react";
import { View, Text, Button } from "react-native";

interface ErrorViewProps {
  error: string;
  theme: string;
  onRetry: () => void;
}

const ErrorView: React.FC<ErrorViewProps> = ({ error, theme, onRetry }) => (
  <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: theme === "dark" ? "#1E1E1E" : "#FFFFFF" }}>
    <Text style={{ color: "red" }}>{error}</Text>
    <Button title="Повторить" onPress={onRetry} />
  </View>
);

export default ErrorView;
