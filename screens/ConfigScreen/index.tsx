import React, { useCallback, useEffect, useMemo, useState } from "react";
import { View, Text } from "../../components/Themed";
import { styles } from "./style";
import {
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Modal,
  Pressable,
  SafeAreaView,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  addCategories as addCategoriesDB,
  getCategories,
  Categories,
  editCategories as editCategoriesDB,
  deleteCategories as deleteCategoriesDB,
} from "../../database/database";
import { useFocusEffect } from "@react-navigation/native";

const PRESET_COLORS = ['#e74c3c', '#e67e22', '#f1c40f', '#2ecc71', '#3498db', '#9b59b6', '#1abc9c', '#e91e63'];

type ItemComponentProps = {
  item: Categories;
  deleteCategories: (id: number) => void;
  setSelectedItemId: React.Dispatch<React.SetStateAction<number | undefined>>;
};

function ItemComponent({
  item,
  deleteCategories,
  setSelectedItemId,
}: ItemComponentProps) {
  return (
    <SafeAreaView>
      <View style={styles.FlatListContainer}>
        <View style={styles.FlatListRowContainer}>
          <View style={styles.FlatListTextContainer}>
            <Text style={styles.TextFlatList}>{item.text}</Text>
          </View>
          <View style={styles.FlatListButtonContainer}>
            <Pressable
              style={styles.DeleteButton}
              onPress={() => deleteCategories(item.id)}
            >
              <Ionicons
                name="trash-outline"
                size={18}
                color="#ffffff"
                style={{ alignSelf: "center" }}
              />
            </Pressable>
            <Pressable
              style={styles.EditButton}
              onPress={() => setSelectedItemId(item.id)}
            >
              <Ionicons
                name="create-outline"
                size={18}
                color="#ffffff"
                style={{ alignSelf: "center" }}
              />
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default function ConfigTab() {
  const [items, setItems] = useState<Categories[]>([]);
  const [text, setText] = useState("");
  const [textedit, setTextEdit] = useState("");
  const [selectedColor, setSelectedColor] = useState('#3498db');
  const [selectedEditColor, setSelectedEditColor] = useState('#3498db');
  const [colorPickerVisible, setColorPickerVisible] = useState(false);
  const [colorEditPickerVisible, setColorEditPickerVisible] = useState(false);

  useFocusEffect(
    useCallback(() => {
      getCategories().then((tasks) => setItems(tasks));
    }, []),
  );

  const [selectedItemId, setSelectedItemId] = useState<number>();

  const selectedItem = useMemo(
    () =>
      selectedItemId != null
        ? items.find((item) => item.id === selectedItemId)
        : undefined,
    [selectedItemId],
  );
  const modalVisible = useMemo(() => selectedItem != null, [selectedItem]);

  useEffect(() => {
    if (selectedItem) setSelectedEditColor(selectedItem.color ?? '#3498db');
  }, [selectedItem]);

  async function addCategories() {
    if (text !== "") {
      await addCategoriesDB(text, selectedColor);
      const categories = await getCategories();
      setItems(categories);
      setText("");
    } else {
      Alert.alert("Digite uma categoria");
    }
  }

  const deleteCategories = useCallback(async (id: number) => {
    await deleteCategoriesDB(id);
    const categories = await getCategories();
    setItems(categories);
  }, []);

  const editCategories = useCallback(
    async (id: number, text: string) => {
      await editCategoriesDB(id, text, selectedEditColor);
      const Tasks = await getCategories();
      setItems(Tasks);
      setTextEdit("");
    },
    [textedit, selectedEditColor],
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}> Configuração de categorias</Text>
      <View style={styles.addContainer}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.TextInput}
            value={text}
            onChangeText={setText}
            placeholder="Nome da categoria..."
          />
        </View>
          <Pressable
            style={{ width: 40, height: 40, borderRadius: 8, backgroundColor: selectedColor, borderWidth: 1, borderColor: '#ccc' }}
            onPress={() => setColorPickerVisible(!colorPickerVisible)}
          />
          {colorPickerVisible && (
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, padding: 8, backgroundColor: '#fff', borderRadius: 8, position: 'absolute', top: 50, zIndex: 10 }}>
              {PRESET_COLORS.map(c => (
                <Pressable
                  key={c}
                  style={{
                    width: 30, height: 30, borderRadius: 15,
                    backgroundColor: c,
                    borderWidth: selectedColor === c ? 3 : 0,
                    borderColor: '#000',
                  }}
                  onPress={() => { setSelectedColor(c); setColorPickerVisible(false); }}
                />
              ))}
            </View>
          )}
        <Pressable style={styles.AddButton} onPress={addCategories}>
          <Ionicons
            name="add"
            size={60}
            color="#ffffff"
            style={{ alignSelf: "center" }}
          />
        </Pressable>
      </View>

      <FlatList
        style={styles.Flatlist}
        contentContainerStyle={{ gap: 6 }}
        data={items}
        extraData={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ItemComponent
            item={item}
            deleteCategories={deleteCategories}
            setSelectedItemId={setSelectedItemId}
          />
        )}
      />
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setSelectedItemId(undefined)}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
            <View style={styles.ModalView}>
              <View style={styles.Modal}>
                <Text style={styles.Text}> Edite sua categoria</Text>
                <TextInput
                  style={styles.TextInput}
                  value={textedit}
                  onChangeText={setTextEdit}
                  placeholder="Nome da categoria..."
                />
                <Pressable
                  style={{ width: 40, height: 40, borderRadius: 8, backgroundColor: selectedEditColor, borderWidth: 1, borderColor: '#ccc', marginVertical: 8 }}
                  onPress={() => setColorEditPickerVisible(!colorEditPickerVisible)}
                />
                {colorEditPickerVisible && (
                  <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, padding: 8, backgroundColor: '#f0f0f0', borderRadius: 8 }}>
                    {PRESET_COLORS.map(c => (
                      <Pressable
                        key={c}
                        style={{
                          width: 30, height: 30, borderRadius: 15,
                          backgroundColor: c,
                          borderWidth: selectedEditColor === c ? 3 : 0,
                          borderColor: '#000',
                        }}
                        onPress={() => { setSelectedEditColor(c); setColorEditPickerVisible(false); }}
                      />
                    ))}
                  </View>
                )}
                <View style={styles.ModalButtonContainer}>
                  <Pressable
                    style={styles.AddButton}
                    onPress={() => {
                      editCategories(selectedItem.id, textedit);
                      setSelectedItemId(undefined);
                    }}
                  >
                    <Text style={styles.TextButton}> Editar </Text>
                  </Pressable>

                  <Pressable
                    style={styles.CancelButton}
                    onPress={() => setSelectedItemId(undefined)}
                  >
                    <Text style={styles.TextButton}> Cancelar </Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </Modal>
    </View>
  );
}
