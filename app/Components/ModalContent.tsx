import React from "react";
import {
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import styles from "../styles/modalContentStyles";

interface ModalContentProps {
  theme: string;
  closeModal: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filteredData: string[];
  addToCart: (item: string) => void;
  insets: { top: number; bottom: number };
}

const ModalContent: React.FC<ModalContentProps> = ({
  theme,
  closeModal,
  searchQuery,
  setSearchQuery,
  filteredData,
  addToCart,
  insets,
}) => {
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View
        style={[
          styles.modalContainer,
          theme === "dark" ? styles.modalBackgroundDark : null,
          {
            paddingTop: insets.top + 16,
            paddingBottom: insets.bottom + 16,
            paddingHorizontal: 16,
          },
        ]}
      >
        <TextInput
          style={
            theme === "dark"
              ? [styles.searchInput, styles.inputDark]
              : styles.searchInput
          }
          placeholder="Поиск..."
          placeholderTextColor={theme === "dark" ? "#ccc" : "#888"}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <FlatList
          style={{ flex: 1 }}
          data={filteredData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                addToCart(item);
                closeModal();
              }}
            >
              <Text
                style={
                  theme === "dark"
                    ? [styles.textItem, styles.textItemDark]
                    : styles.textItem
                }
              >
                {item}
              </Text>
            </TouchableOpacity>
          )}
          keyboardShouldPersistTaps="handled"
          initialNumToRender={10}
          maxToRenderPerBatch={10}
        />
        <TouchableOpacity
          style={[
            styles.closeButton,
            theme === "dark"
              ? styles.closeButtonDark
              : styles.closeButtonLight,
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
