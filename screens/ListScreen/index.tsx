import React, { useCallback, useMemo, useState } from "react";
import { View, Text } from "../../components/Themed";
import {
  CalendarProvider,
  ExpandableCalendar,
  AgendaList,
  LocaleConfig,
} from "react-native-calendars";
import { getTaskCalendar, Task } from "../../database/database";
import { useFocusEffect } from "@react-navigation/native";

LocaleConfig.locales['pt-br'] = {
  monthNames: ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
  monthNamesShort: ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'],
  dayNames: ['Domingo','Segunda-feira','Terça-feira','Quarta-feira','Quinta-feira','Sexta-feira','Sábado'],
  dayNamesShort: ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'],
  today: 'Hoje',
};
LocaleConfig.defaultLocale = 'pt-br';

const TODAY = new Date().toISOString().split("T")[0];

export default function TabOneScreen() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useFocusEffect(
    useCallback(() => {
      getTaskCalendar().then(setTasks);
    }, []),
  );

  const markedDates = useMemo(() => {
    const marks: Record<string, any> = {};
    
    tasks.forEach(task => {
      if (!task.startDate || !task.endDate) return;
      const color = task.categoryColor ?? '#3e54cf';

      let current = new Date(task.startDate);
      const end = new Date (task.endDate);

      while (current <= end) {
        const dateStr = current.toISOString().split("T")[0];
        if (!marks[dateStr]) marks[dateStr] = { periods: []};
        marks[dateStr].periods.push({
          startingDay: dateStr === task.startDate,
          endingDay: dateStr === task.endDate,
          color,
        });
        current.setDate(current.getDate() + 1);
      }
    });

    return marks;
  }, [tasks]);

    const agendaItems = useMemo(() => {
    const grouped: Record<string, Task[]> = {};

    tasks.forEach(task => {
      if (!task.startDate || !task.endDate) return;

      let current = new Date(task.startDate);
      const end = new Date(task.endDate);

      while (current <= end) {
        const dateStr = current.toISOString().split('T')[0];
        if (!grouped[dateStr]) grouped[dateStr] = [];
        if (!grouped[dateStr].find(t => t.id === task.id)) {
          grouped[dateStr].push(task);
        }
        current.setDate(current.getDate() + 1);
      }
    });

    return Object.keys(grouped)
      .sort()
      .map(date => ({ title: date, data: grouped[date] }));
  }, [tasks]);


    return (
    <CalendarProvider date={TODAY} showTodayButton>
      <ExpandableCalendar
        markingType="multi-period"
        markedDates={markedDates}
        calendarStyle={{ paddingBottom: 40 }}
      />
      <AgendaList
        sections={agendaItems}
        renderItem={({ item }: { item: Task }) => (
          <View style={{ padding: 12, marginHorizontal: 16, marginVertical: 4, borderRadius: 8, backgroundColor: "#fff" }}>
            <Text style={{ fontWeight: "bold" }}>{item.text}</Text>
            {item.categoryName && (
              <Text style={{ color: item.categoryColor ?? "#666", marginTop: 4 }}>
                {item.categoryName}
              </Text>
            )}
          </View>
        )}
        renderSectionHeader={(dateString) => {
          const date = new Date(dateString + 'T12:00:00');
          const formatted = date.toLocaleDateString('pt-BR', {
            weekday: 'long',
            day: '2-digit',
            month: 'long',
          });
          return (
            <View style={{ padding: 8, backgroundColor: '#87caeb' }}>
              <Text style={{ fontWeight: 'bold', textTransform: 'capitalize' }}>{formatted}</Text>
            </View>
          );
        }}
      />
    </CalendarProvider>
  );
}
