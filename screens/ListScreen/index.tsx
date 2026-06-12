import React from "react";
import { Text, View } from "../../components/Themed";
import { styles } from "./style";

export default function TabOneScreen() {

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Futuro calendario</Text>
      <View lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
    </View>
  );
}
