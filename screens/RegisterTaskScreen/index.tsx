import {
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Modal,
  Pressable,
  TextInput,
} from "react-native";
import { Text, View } from "../../components/Themed";
import { styles } from "./style";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import ExpoCheckbox from "expo-checkbox/build/ExpoCheckbox";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Dropdown } from "react-native-element-dropdown";
import {
  initDatabase,
  addTask as addTaskDB,
  getTask,
  Task,
  deleteTask as deleteTaskDB,
  completeTask as completeTaskDB,
  editTask as editTaskDB,
  Categories,
  getCategories,
} from "../../database/database";
import { useFocusEffect } from "@react-navigation/native";
import ScreenTemplate from "../TemplateScreen";
import { sharedStyles } from "../../styles/shared";

type ItemComponentProps = {
  item: Task;
  deleteTask: (id: number) => void;
  completeTask: (id: number, completed: boolean) => void;
  setSelectedItemId: React.Dispatch<React.SetStateAction<number | undefined>>;
};

function ItemComponent({
  item,
  deleteTask,
  completeTask,
  setSelectedItemId,
}: ItemComponentProps) {
  const addDate = new Date(item.addDate).toLocaleString("pt-BR", {});
  const restoreDate = item.restoreDate
    ? new Date(item.restoreDate).toLocaleString("pt-BR", {})
    : null;
  const editDate = item.editDate
    ? new Date(item.editDate).toLocaleString("pt-BR", {})
    : null;

  return (
    <SafeAreaView>
      <View style={styles.FlatListContainer}>
        <View style={styles.FlatListRowContainer}>
          <View style={styles.FlatListTextContainer}>
            <Text style={styles.TextFlatList}>{item.text}</Text>
            <Text>Adicionado em {addDate}</Text>
            {editDate && <Text> Editado em {editDate}</Text>}
            {restoreDate && <Text> Restaurado em {restoreDate}</Text>}
          </View>
          <View>
            <View style={styles.FlatListButtonContainer}>
              <Pressable
                style={styles.CheckboxContainer}
                onPress={() => completeTask(item.id, !item.completed)}
              >
                <View pointerEvents="none">
                  <ExpoCheckbox
                    style={styles.Checkbox}
                    value={item.completed}
                    onValueChange={() => {}}
                  />
                </View>
              </Pressable>

              <Pressable
                style={styles.DeleteButton}
                onPress={() => deleteTask(item.id)}
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
            {item.categoryName && (
              <View
                style={[
                  styles.category,
                  { backgroundColor: item.categoryColor ?? "#cccccc" },
                ]}
              >
                <Text style={styles.categoryText}>{item.categoryName}</Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default function TabTwoScreen() {
  const [items, setItems] = useState<Task[]>([]);
  const [data, setData] = useState<Categories[]>([]);

  const filteredItems = useMemo(
    () => items.filter((item) => !item.deletedTask),
    [items],
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

  const [text, setText] = useState("");
  const [textedit, setTextEdit] = useState("");
  const [Value, setValue] = useState<number | null>(null);
  const [ValueEdit, setValueEdit] = useState<number | null>(null);

  useFocusEffect(
    useCallback(() => {
      initDatabase().then(() => getTask().then((tasks) => setItems(tasks)));
    }, []),
  );

  useFocusEffect(
    useCallback(() => {
      getCategories().then((tasks) => setData(tasks));
    }, []),
  );

  //Adicionar tarefa
  async function addTask() {
    if (text !== "") {
      await addTaskDB(text, Value);
      const tasks = await getTask();
      setItems(tasks);
      setText("");
      setValue(null);
    } else {
      Alert.alert("Digite uma tarefa");
    }
  }

  //Deletar tarefa
  const deleteTask = useCallback(async (id: number) => {
    await deleteTaskDB(id);
    const Tasks = await getTask();
    setItems(Tasks);
  }, []);

  //Tarefa completa
  const completeTask = useCallback(async (id: number, completed: boolean) => {
    completeTaskDB(id, completed);
    const Tasks = await getTask();
    setItems(Tasks);
  }, []);

  //Editar tarefa
  const editTask = useCallback(
    async (id: number, text: string, ValueEdit: number | null) => {
      await editTaskDB(id, text, ValueEdit);
      const Tasks = await getTask();
      setItems(Tasks);
      setValueEdit(null);
    },
    [textedit, ValueEdit],
  );

  return (
    <ScreenTemplate
      title={"Cadastro"}
      tabs={[
        {
          label: "Tarefas",
          content: (
            <View style={{flex: 1,}}>
              <Text style={styles.TextTabs}>Adicione sua tarefa</Text>
              <View style={styles.addContainer}>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.TextInput}
                    value={text}
                    onChangeText={setText}
                    placeholder="Nome da tarefa..."
                  />

                  <Dropdown
                    style={styles.dropdown}
                    data={data}
                    onChange={(item) => {
                      setValue(item.id);
                    }}
                    search
                    placeholder="Selecione a categoria"
                    searchPlaceholder="Buscar"
                    labelField="text"
                    valueField="id"
                    value={Value}
                    renderRightIcon={() => (
                      <Ionicons color="black" name="caret-down" size={20} />
                    )}
                  ></Dropdown>
                </View>

                <Pressable style={styles.AddButton} onPress={addTask}>
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
                data={filteredItems}
                extraData={items}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <ItemComponent
                    item={item}
                    deleteTask={deleteTask}
                    completeTask={completeTask}
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
                        <View style={styles.inputContainer}>
                          <Text style={styles.Text}> Edite sua tarefa</Text>
                          <TextInput
                            style={styles.TextInput}
                            value={textedit}
                            onChangeText={setTextEdit}
                            placeholder="Nome da tarefa..."
                          />
                          <Dropdown
                            style={styles.dropdown}
                            data={data}
                            onChange={(item) => {
                              setValueEdit(item.id);
                            }}
                            search
                            placeholder="Selecione a categoria"
                            searchPlaceholder="Buscar"
                            labelField="text"
                            valueField="id"
                            value={ValueEdit}
                            renderRightIcon={() => (
                              <Ionicons
                                color="black"
                                name="caret-down"
                                size={20}
                              />
                            )}
                          ></Dropdown>
                        </View>
                        <View style={styles.ModalButtonContainer}>
                          <Pressable
                            style={styles.modaladdButton}
                            onPress={() => {
                              editTask(selectedItem.id, textedit, ValueEdit);
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
          ),
        },
        // {
        //   label: "Historico",
        //   content: (

        //   ),
        // }
      ]}
    />
  );
}
