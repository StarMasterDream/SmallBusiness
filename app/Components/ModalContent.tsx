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
  const [selectedGroup, setSelectedGroup] = useState<Folder | null>(null);

  const emptyData: Folder = {
    Kod: '0',
    Name: 'Нет данных',
    isFolder: false,
    Data: [],
    GUID: 'placeholder'
  };  

  const renderGroup = (group: Folder) => {
    if (!group.isFolder) {
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
  
    return (
      <View style={{ flex: 1 }}>
        <Text
          style={theme === "dark" ? [styles.DataTitle, styles.DataTitleDark] : styles.DataTitle}
        >
          {group.Name}
        </Text>
        {group.Data.length > 0 && (
          <FlatList
            style={{ flex: 1 }}
            data={group.Data}
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
          <View style={{ flex: 1 }}>
            {renderGroup(selectedGroup)}
            <TouchableOpacity onPress={() => setSelectedGroup(null)}
              style={theme === "dark" ? [styles.backBatoon, styles.backBatoonDark] : styles.backBatoon}
              >
              <Text
                
                style={styles.backButtonText}
              >
                Назад
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
          <FlatList
  style={{ flex: 1 }}
  data={filteredData.length > 0 ? filteredData : [emptyData]}
  keyExtractor={(item) => item.GUID}
  renderItem={({ item }) => {
    if (item.Kod === '0') {
      return (
        <Text style={theme === "dark" ? [styles.textItem, styles.textItemDark] : styles.textItem}>
          {item.Name}
        </Text>
      );
    }

    return item.isFolder ? (
      <TouchableOpacity onPress={() => setSelectedGroup(item)}>
        <Text
          style={theme === "dark" ? [styles.textItemFolder, styles.textItemDarkFolder] : styles.textItem}
        >
          {item.Name}
        </Text>
      </TouchableOpacity>
    ) : (
      <TouchableOpacity
        onPress={() => {
          addToCart(item.Name);
          closeModal();
        }}
      >
        <Text
          style={theme === "dark" ? [styles.textItem, styles.textItemDark] : styles.textItem}
        >
          {item.Name}
        </Text>
      </TouchableOpacity>
    );
  }}
  keyboardShouldPersistTaps="handled"
  initialNumToRender={10}
  maxToRenderPerBatch={10}
/>

                  <TouchableOpacity
          style={[
            styles.closeButtonLight,
            theme === "dark" ? styles.closeButtonDark : styles.closeButtonLight,
          ]}
          onPress={closeModal}
        >
          <Text style={styles.closeButtonText}>Закрыть</Text>
        </TouchableOpacity>
          </>
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

export default ModalContent;
