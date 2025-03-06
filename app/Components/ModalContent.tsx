import React, { useState } from "react";
import {
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import styles from "../styles/modalContentStyles";

interface Folder {
  Kod: string;
  GUID: string;
  Name: string;
  isFolder: boolean;
  Data: Folder[];
}

interface ModalContentProps {
  theme: string;
  closeModal: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filteredData: Folder[];
  addToCart: (item: Folder) => void;
  insets: { top: number; bottom: number };
  loading: boolean;
}

const ModalContent: React.FC<ModalContentProps> = ({
  theme,
  closeModal,
  searchQuery,
  setSearchQuery,
  filteredData,
  addToCart,
  insets,
  loading,
}) => {
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>(
    {}
  );

  const toggleFolder = (folderId: string) => {
    setExpandedFolders((prev) => ({
      ...prev,
      [folderId]: !prev[folderId],
    }));
  };

  const renderItem = ({ item }: { item: Folder }) => {
    if (item.isFolder) {
      const isExpanded = expandedFolders[item.GUID] || false;

      return (
        <View>
          <TouchableOpacity onPress={() => toggleFolder(item.GUID)}>
            <Text
              style={[
                styles.textItemFolder,
                theme === "dark" && styles.textItemDarkFolder,
                { marginBottom: isExpanded ? 0 : 12 },
              ]}
            >
              {item.Name} {isExpanded ? "▼" : "▶"}
            </Text>
          </TouchableOpacity>

          {isExpanded && (
            <View style={styles.nestedContainer}>
              <FlatList
                data={item.Data}
                keyExtractor={(subItem) => subItem.GUID}
                renderItem={renderItem}
                ListEmptyComponent={
                  <Text
                    style={[
                      styles.emptyText,
                      theme === "dark" && styles.emptyTextDark,
                    ]}
                  >
                    Пустая папка
                  </Text>
                }
              />
            </View>
          )}
        </View>
      );
    }

    return (
      <TouchableOpacity
        onPress={() => {
          addToCart(item);
          closeModal();
        }}
      >
        <Text
          style={[
            styles.textItem,
            theme === "dark" && styles.textItemDark,
          ]}
        >
          {item.Name}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View
        style={[
          styles.modalContainer,
          theme === "dark" && styles.modalBackgroundDark,
          {
            paddingTop: insets.top + 16,
            paddingBottom: insets.bottom + 16,
            paddingHorizontal: 16,
          },
        ]}
      >
        <TextInput
          style={[
            styles.searchInput,
            theme === "dark" && styles.inputDark,
          ]}
          placeholder="Поиск..."
          placeholderTextColor={theme === "dark" ? "#ccc" : "#888"}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />

        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator
              size="large"
              color={theme === "dark" ? "#fff" : "#000"}
            />
          </View>
        ) : (
          <FlatList
            data={filteredData}
            keyExtractor={(item) => item.GUID}
            renderItem={renderItem}
            ListEmptyComponent={
              <Text
                style={[
                  styles.emptyText,
                  theme === "dark" && styles.emptyTextDark,
                  { textAlign: "center", marginTop: 20 },
                ]}
              >
                Нет данных
              </Text>
            }
            keyboardShouldPersistTaps="handled"
            initialNumToRender={10}
            maxToRenderPerBatch={10}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        )}

        <TouchableOpacity
          style={[
            styles.closeButtonLight,
            theme === "dark" && styles.closeButtonDark,
          ]}
          onPress={closeModal}
        >
          <Text style={styles.closeButtonText}>Закрыть</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ModalContent;
