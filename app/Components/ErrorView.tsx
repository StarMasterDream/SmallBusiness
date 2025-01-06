import React from "react";
import { View, Text, Button } from "react-native";

const ErrorView = ({ error, onRetry }: { error: string; onRetry: () => void }) => (
  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <Text style={{ color: "red" }}>{error}</Text>
    <Button title="Повторить" onPress={onRetry} />
  </View>
);

export default ErrorView;
