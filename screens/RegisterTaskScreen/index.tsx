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
  getAllActiveTasks,
  Task,
  deleteTask as deleteTaskDB,
  completeTask as completeTaskDB,
  editTask as editTaskDB,
  Categories,
  getCategories,
  permanentDeleteTask,
  restoreTask as restoreTaskDB,
  getDeletedTask,
} from "../../database/database";
import { useFocusEffect } from "@react-navigation/native";
import ScreenTemplate from "../TemplateScreen";
import { Calendar } from "react-native-calendars";

const formatDatePtBR = (dateStr: string) =>
  new Date(dateStr + 'T12:00:00').toLocaleDateString('pt-BR');

type ItemComponentProps = {
  item: Task;
  deleteTask: (id: number) => void;
  completeTask: (id: number, completed: boolean) => void;
  setSelectedItemId: React.Dispatch<React.SetStateAction<number | undefined>>;
};

type ItemDeleteComponentProps = {
  item: Task;
  permanentDeleteTask: (id: number) => void;
  restoreTaskDB: (id: number) => void;
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
    <View>
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
    </View>
  );
}

function ItemDeleteComponent({
  item,
  permanentDeleteTask,
  restoreTaskDB,
}: ItemDeleteComponentProps) {
  const deleteDate = item.deletedTask
    ? new Date(item.deletedTask).toLocaleString("pt-BR", {})
    : null;
  return (
    <View>
      <View style={styles.FlatListContainer}>
        <View style={styles.FlatListRowContainer}>
          <View style={styles.FlatListTextContainer}>
            <Text style={styles.TextFlatList}>{item.text}</Text>
            <Text>Deletado em {deleteDate}</Text>
          </View>
          <View style={styles.FlatListButtonContainer}>
            <Pressable
              style={styles.DeleteButton}
              onPress={() => permanentDeleteTask(item.id)}
            >
              <Ionicons
                name="ban"
                size={18}
                color="#ffffff"
                style={{ alignSelf: "center" }}
              />
            </Pressable>
            <Pressable
              style={styles.EditButton}
              onPress={() => restoreTaskDB(item.id)}
            >
              <Ionicons
                name="refresh"
                size={18}
                color="#ffffff"
                style={{ alignSelf: "center" }}
              />
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}

export default function TabTwoScreen() {
  const [items, setItems] = useState<Task[]>([]);
  const [deleteItems, setDeleteItems] = useState<Task[]>([]);
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
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [startDateEdit, setStartDateEdit] = useState<string | null>(null);
  const [endDateEdit, setEndDateEdit] = useState<string | null>(null);
  const [calendarVisible, setCalendarVisible] = useState<
    "none" | "startAdd" | "endAdd" | "startEdit" | "endEdit"
  >("none");

  useFocusEffect(
    useCallback(() => {
      initDatabase().then(() => getAllActiveTasks().then((tasks) => setItems(tasks)));
    }, []),
  );

  useFocusEffect(
    useCallback(() => {
      getCategories().then((tasks) => setData(tasks));
    }, []),
  );

  useFocusEffect(
    useCallback(() => {
      getDeletedTask().then((tasks) => setDeleteItems(tasks));
    }, []),
  );

  useEffect(() => {
    if (selectedItem) {
      setStartDateEdit(selectedItem.startDate);
      setEndDateEdit(selectedItem.endDate);
    }
  }, [selectedItem]);

  //Adicionar tarefa
  async function addTask() {
    if (text !== "") {
      await addTaskDB(text, Value, startDate, endDate);
      const tasks = await getAllActiveTasks();
      setItems(tasks);
      setText("");
      setValue(null);
      setStartDate(null);
      setEndDate(null);
    } else {
      Alert.alert("Digite uma tarefa");
    }
  }

  //Deletar tarefa
  const deleteTask = useCallback(async (id: number) => {
    await deleteTaskDB(id);
    const Tasks = await getAllActiveTasks();
    setItems(Tasks);
    const task = await getDeletedTask();
    setDeleteItems(task);
  }, []);

  //Tarefa completa
  const completeTask = useCallback(async (id: number, completed: boolean) => {
    completeTaskDB(id, completed);
    const Tasks = await getAllActiveTasks();
    setItems(Tasks);
  }, []);

  //Editar tarefa
  const editTask = useCallback(
    async (
      id: number,
      text: string,
      ValueEdit: number | null,
      startDateEdit: string | null,
      endDateEdit: string | null,
    ) => {
      await editTaskDB(id, text, ValueEdit, startDateEdit, endDateEdit);
      const Tasks = await getAllActiveTasks();
      setItems(Tasks);
      setValueEdit(null);
    },
    [textedit, ValueEdit],
  );

  //Deletar tarefa permanente
  const permanentDelete = useCallback(async (id: number) => {
    await permanentDeleteTask(id);
    const Task = await getDeletedTask();
    setDeleteItems(Task);
  }, []);

  //Restaurar tarefa deletada
  const restoreTask = useCallback(async (id: number) => {
    restoreTaskDB(id);
    const Task = await getDeletedTask();
    setDeleteItems(Task);
    const task = await getAllActiveTasks();
    setItems(task);
  }, []);

  return (
    <ScreenTemplate
      tabs={[
        {
          label: "Tarefas",
          content: (
            <View style={{ flex: 1, backgroundColor: "#87caeb" }}>
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
                  <View style={styles.DateContainer}>
                    <Pressable
                      onPress={() => setCalendarVisible("startAdd")}
                      style={styles.DateButton}
                    >
                      <Text style={styles.Text}>
                        {startDate
                          ? `início: ${formatDatePtBR(startDate)}`
                          : " Selecionar data início"}
                      </Text>
                    </Pressable>

                    <Pressable
                      onPress={() => setCalendarVisible("endAdd")}
                      style={styles.DateButton}
                    >
                      <Text style={styles.Text}>
                        {endDate
                          ? `Fim: ${formatDatePtBR(endDate)}`
                          : " Selecionar data \n fim"}
                      </Text>
                    </Pressable>
                  </View>
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
                        <View>
                          <Pressable
                            onPress={() => setCalendarVisible("startEdit")}
                            style={styles.DateButton}
                          >
                            <Text style={styles.Text}>
                              {startDateEdit
                                ? `início: ${formatDatePtBR(startDateEdit)}`
                                : " Selecionar data início"}
                            </Text>
                          </Pressable>

                          <Pressable
                            onPress={() => setCalendarVisible("endEdit")}
                            style={styles.DateButton}
                          >
                            <Text style={styles.Text}>
                              {endDateEdit
                                ? `Fim: ${formatDatePtBR(endDateEdit)}`
                                : " Selecionar data \n fim"}
                            </Text>
                          </Pressable>
                        </View>
                        <View style={styles.ModalButtonContainer}>
                          <Pressable
                            style={styles.modaladdButton}
                            onPress={() => {
                              if (selectedItem) {
                                editTask(
                                  selectedItem.id,
                                  textedit,
                                  ValueEdit,
                                  startDateEdit,
                                  endDateEdit,
                                );
                                setSelectedItemId(undefined);
                              }
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
              <Modal
                visible={calendarVisible !== "none"}
                transparent
                animationType="fade"
              >
                <View style={styles.ModalView}>
                  <Calendar
                    style={styles.CalendarModal}
                    theme={{
                      calendarBackground: "#ffffff",
                      todayTextColor: "#1100ff",
                      arrowColor: "#1100ff",
                      monthTextColor: "#1100ff",
                      textDayFontFamily: "monospace",
                      textMonthFontFamily: "monospace",
                      textDayHeaderFontFamily: "monospace",
                      textMonthFontWeight: "bold",
                      textDayFontWeight: "300",
                      textDayHeaderFontWeight: "300",
                      textDayFontSize: 25,
                      textMonthFontSize: 25,
                      textDayHeaderFontSize: 15,
                    }}
                    enableSwipeMonths={true}
                    onDayPress={(day) => {
                      if (calendarVisible === "startAdd")
                        setStartDate(day.dateString);
                      if (calendarVisible === "endAdd")
                        setEndDate(day.dateString);
                      if (calendarVisible === "startEdit")
                        setStartDateEdit(day.dateString);
                      if (calendarVisible === "endEdit")
                        setEndDateEdit(day.dateString);
                      setCalendarVisible("none");
                    }}
                  />
                </View>
              </Modal>
            </View>
          ),
        },
        {
          label: "Historico",
          content: (
            <View>
              <Text style={styles.TextTabs}>Historico de tarefas</Text>
              <FlatList
                style={styles.Flatlist}
                contentContainerStyle={{ gap: 6 }}
                data={deleteItems}
                extraData={deleteItems}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <ItemDeleteComponent
                    item={item}
                    permanentDeleteTask={permanentDelete}
                    restoreTaskDB={restoreTask}
                  />
                )}
              />
            </View>
          ),
        },
      ]}
    />
  );
}
