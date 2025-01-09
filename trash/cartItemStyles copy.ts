import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  cartItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
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
    padding: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    backgroundColor: "#F0F0F0",
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
