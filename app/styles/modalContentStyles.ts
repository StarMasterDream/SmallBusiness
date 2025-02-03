import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: "#FFFFFF",
  },
  modalBackgroundDark: {
    backgroundColor: "#1E1E1E",
  },
  DataTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  DataTitleDark: {
    color: "#FFF"
  },
  backBatoon: {
    marginTop: 16,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#6200EE",
    borderRadius: 8,
    alignItems: "center",
  },
  backBatoonDark: {
    backgroundColor: "#333",
  },
  backButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  searchInput: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 10,
    paddingHorizontal: 15,
    borderRadius: 12,
    backgroundColor: "#F9F9F9",
    fontSize: 16,
    color: "#333",
  },
  inputDark: {
    borderColor: "#555",
    backgroundColor: "#2C2C2C",
    color: "#FFF",
  },
  textItemFolder: {
    fontSize: 16,
    margin: 12,
    padding: 15,
    backgroundColor: "#FF9800",
    color: "#333",
    borderRadius: 12,
  },
  textItemDarkFolder: {
    backgroundColor: "#FF9800",
    color: "#FFF",
  },
  textItem: {
    fontSize: 16,
    margin: 12,
    padding: 15,
    backgroundColor: "#F9F9F9",
    color: "#333",
    borderRadius: 12,
  },
  textItemDark: {
    backgroundColor: "#2C2C2C",
    color: "#FFF",
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  closeButtonDark: {
    backgroundColor: "#333",
  },
  closeButtonLight: {
    marginTop: 16,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    backgroundColor: "#6200EE",
  },
});

export default styles;
