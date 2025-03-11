import { StyleSheet, Platform } from "react-native";

const styles = StyleSheet.create({
  cartItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    ...(Platform.OS === 'web' 
      ? { 
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" 
        } 
      : {
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 2
        }
    ),
  },
  cartItemDark: {
    backgroundColor: "#2C2C2C",
    ...(Platform.OS === 'web' 
      ? { 
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)" 
        } 
      : {
          shadowColor: "#000",
          shadowOpacity: 0.2,
        }
    ),
  },
  textContainer: {
    flex: 1,
    marginRight: 10,
  },
  textItem: {
    fontSize: 16,
    color: "#333",
  },
  textItemDark: {
    color: "#FFF",
  },
  quantityControls: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantityButton: {
    backgroundColor: "#FF9800",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  quantityButtonDark: {
    backgroundColor: "#FF9800",
    borderColor: "#666",
  },
  quantityButtonText: {
    fontSize: 18,
    color: "#333",
  },
  quantityText: {
    fontSize: 16,
    marginHorizontal: 10,
    color: "#333",
  },
  quantityTextDark: {
    color: "#FFF",
  },
  totalPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginLeft: 10,
  },
  totalPriceDark: {
    color: "#FFF",
  },
});

export default styles;
