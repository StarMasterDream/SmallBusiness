import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  flatListContainer: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "#FFFFFF",
  },
  flatListContainerDark: {
    backgroundColor: "#1E1E1E",
  },
  modalWrapper: {
    margin: 0,
    justifyContent: "flex-end",
  },
  emptyBasketContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyBasketText: {
    fontSize: 18,
    fontStyle: "italic",
  },
});

export default styles;
