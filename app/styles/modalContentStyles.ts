import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  modalBackgroundDark: {
    backgroundColor: "#1E1E1E",
  },
  DataTitle: {
    fontSize: 20,
    fontWeight: "bold" as const,
    marginBottom: 16,
  },
  DataTitleDark: {
    color: "#FFF",
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
  closeButtonLight: {
    marginTop: 16,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    backgroundColor: "#6200EE",
  },
  closeButtonDark: {
    backgroundColor: "#333",
  },
  backButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold" as const,
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
  folderItem: {
    fontSize: 16,
    fontWeight: "bold" as const,
    color: "#333",
    paddingVertical: 8,
  },
  folderItemDark: {
    color: "#fff",
  },
  nestedContainer: {
    paddingLeft: 16,
  },
  emptyText: {
    color: "#888",
    fontStyle: "italic" as const,
    paddingLeft: 16,
  },
  emptyTextDark: {
    color: "#666",
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold" as const,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  offlineBanner: {
    backgroundColor: "#FFCC00",
    padding: 5,
    marginBottom: 5,
    alignItems: "center",
    borderRadius: 12,
  },
  offlineBannerText: {
    color: "#000",
    fontWeight: "bold",
  },
});

export default styles;
