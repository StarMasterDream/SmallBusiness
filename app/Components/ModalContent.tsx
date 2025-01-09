import React, { useState } from "react";
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

interface Group {
  Kod: string;
  GUID: string;
  Name: string;
  itGroup: boolean;
  Groups: Group[];
}

interface ModalContentProps {
  theme: string;
  closeModal: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filteredData: Group[];
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
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);

  const renderGroup = (group: Group) => {
    // Если группа содержит товары, отобразить их
    if (!group.itGroup) {
      return (
        <TouchableOpacity
          onPress={() => {
            addToCart(group.Name);
            closeModal();
          }}
        >
          <Text
            style={
              theme === "dark" ? [styles.textItem, styles.textItemDark] : styles.textItem
            }
          >
            {group.Name}
          </Text>
        </TouchableOpacity>
      );
    }

    // Если группа имеет подгруппы, отобразить их как отдельные группы
    return (
      <View>
        <Text
          style={theme === "dark" ? [styles.textItem, styles.textItemDark] : styles.textItem}
        >
          {group.Name}
        </Text>
        {group.Groups.length > 0 && (
          <FlatList
            data={group.Groups}
            keyExtractor={(item) => item.Kod}
            renderItem={({ item }) => renderGroup(item)}
            keyboardShouldPersistTaps="handled"
            initialNumToRender={10}
            maxToRenderPerBatch={10}
          />
        )}
      </View>
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
          theme === "dark" ? styles.modalBackgroundDark : null,
          {
            paddingTop: insets.top + 16,
            paddingBottom: insets.bottom + 16,
            paddingHorizontal: 16,
          },
        ]}
      >
        <TextInput
          style={theme === "dark" ? [styles.searchInput, styles.inputDark] : styles.searchInput}
          placeholder="Поиск..."
          placeholderTextColor={theme === "dark" ? "#ccc" : "#888"}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />

        {selectedGroup ? (
          <View>
            <TouchableOpacity onPress={() => setSelectedGroup(null)}>
              <Text
                style={theme === "dark" ? [styles.textItem, styles.textItemDark] : styles.textItem}
              >
                Назад
              </Text>
            </TouchableOpacity>
            {renderGroup(selectedGroup)}
          </View>
        ) : (
          <FlatList
            style={{ flex: 1 }}
            data={filteredData}
            keyExtractor={(item) => item.Kod}
            renderItem={({ item }) => {
              return item.itGroup ? (
                <TouchableOpacity onPress={() => setSelectedGroup(item)}>
                  <Text
                    style={theme === "dark" ? [styles.textItem, styles.textItemDark] : styles.textItem}
                  >
                    {item.Name}
                  </Text>
                </TouchableOpacity>
              ) : null;
            }}
            keyboardShouldPersistTaps="handled"
            initialNumToRender={10}
            maxToRenderPerBatch={10}
          />
        )}

        <TouchableOpacity
          style={[
            styles.closeButton,
            theme === "dark" ? styles.closeButtonDark : styles.closeButtonLight,
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
