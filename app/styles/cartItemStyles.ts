import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  cartItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
    marginHorizontal: 10,
  },
  textContainer: {
    flex: 1,
    marginRight: 10,
  },
  textItem: {
    fontSize: 16,
    margin: 12,
    padding: 15,
    backgroundColor: "#F9F9F9",
    color: "#333",
    borderRadius: 12,
    //shadowColor: "#000",
    //shadowOffset: { width: 0, height: 2 },
    //shadowOpacity: 0.1,
    //shadowRadius: 4,
  },
  textItemDark: {
    backgroundColor: "#2C2C2C",
    color: "#FFF",
    //shadowOpacity: 0.4,
  },
  quantityControls: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    minWidth: 100,
    maxWidth: 150,
  },
  quantityButton: {
    backgroundColor: "#FF9800",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  quantityButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  quantityText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginHorizontal: 8,
    textAlign: "center",
    minWidth: 24,
  },
  quantityTextDark: {
    color: "#FFF",
  },
});

export default styles;
