import React, { use, useCallback, useState } from "react";
import { Text, View } from "../../components/Themed";
import { styles } from "./style";
import {
  getDeletedTask,
  restoreTask as restoreTaskDB,
  permanentDeleteTask,
  Task,
} from "../../database/database";
import { FlatList, Pressable, SafeAreaView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";

type ItemComponentProps = {
  item: Task;
  permanentDelete: (id: number) => void;
  restoreTask: (id: number) => void;
};

function ItemComponent({
  item,
  permanentDelete,
  restoreTask,
}: ItemComponentProps) {
  const deleteDate = item.deletedTask
    ? new Date(item.deletedTask).toLocaleString("pt-BR", {})
    : null;
  return (
    <SafeAreaView>
      <View style={styles.FlatListContainer}>
        <View style={styles.FlatListRowContainer}>
          <View style={styles.FlatListTextContainer}>
            <Text style={styles.TextFlatList}>{item.text}</Text>
            <Text>Deletado em {deleteDate}</Text>
          </View>
          <View style={styles.FlatListButtonContainer}>
            <Pressable
              style={styles.DeleteButton}
              onPress={() => permanentDelete(item.id)}
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
              onPress={() => restoreTask(item.id)}
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
    </SafeAreaView>
  );
}
export default function TabOneScreen() {
  const [items, setItems] = useState<Task[]>([]);

  useFocusEffect(
    useCallback(() => {
      getDeletedTask().then((tasks) => setItems(tasks));
    }, []),
  );

  const permanentDelete = useCallback(async (id: number) => {
    await permanentDeleteTask(id);
    const Tasks = await getDeletedTask();
    setItems(Tasks);
  }, []);

  const restoreTask = useCallback(async (id: number) => {
    restoreTaskDB(id);
    const Tasks = await getDeletedTask();
    setItems(Tasks);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Historico de tarefas</Text>
      <View lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <FlatList
        style={styles.Flatlist}
        contentContainerStyle={{ gap: 6 }}
        data={items}
        extraData={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ItemComponent
            item={item}
            permanentDelete={permanentDelete}
            restoreTask={restoreTask}
          />
        )}
      />
    </View>
  );
}
