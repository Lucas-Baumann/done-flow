import React from "react";
import { Text, View } from "../../components/Themed";

export default function TabOneScreen() {

  return (
    <View style={{backgroundColor: "#87caeb", flex: 1, justifyContent: 'center' }}>
      <Text style={{textAlign: 'center', fontSize: 30, fontWeight: 'bold'}}>Futuro calendario</Text>
      <Text style={{textAlign: 'center', fontSize: 15}}>* Setar uma data de conclusão de tarefas</Text>
      <Text style={{textAlign: 'center', fontSize: 15}}>* Aba de tarefas apenas mostra tarefas do dia</Text>
      <Text style={{textAlign: 'center', fontSize: 15}}>* Filtro de categorias na tela de tarefas</Text>
      <Text style={{textAlign: 'center', fontSize: 15}}>* Calendario com mes e ano</Text>
      <Text style={{textAlign: 'center', fontSize: 15}}>* Cor referente a categoria da tarefo no dia em que foi cadastrada</Text>
      <View lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
    </View>
  );
}
