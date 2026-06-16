import React from "react";
import { Text, View } from "../../components/Themed";
import { Calendar } from "react-native-calendars";
import { styles } from "../RegisterTaskScreen/style";

export default function TabOneScreen() {
  const INITIAL_DATE = '15-06-2026';

  return (
    <View style={{backgroundColor: "#87caeb", flex: 1, justifyContent: 'center' }}>
      <View>
        <Text> Verifique suas tarefas por data</Text>
        <Calendar
          testID=''
          enableSwipeMonths
          current={INITIAL_DATE}
        />
      </View>
    </View>
  );
}
