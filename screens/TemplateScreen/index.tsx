import React, { useState } from "react";
import { Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text } from "../../components/Themed";

type Tab = {
  label: string;
  content: React.ReactNode;
};

type Props = {
  tabs: Tab[];
};

export default function ScreenTemplate({ tabs }: Props) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#87caeb" }}>
      <View style={{ flex: 1, backgroundColor: "#87caeb" }}>
        {tabs.length > 1 && (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                marginBottom: 10,
                backgroundColor: "#87caeb",
              }}
            >
              {tabs.map((tab, index) => (
                <Pressable
                  key={index}
                  onPress={() => setActiveTab(index)}
                  style={{
                    padding: 10,
                    marginHorizontal: 4,
                    borderRadius: 8,
                    backgroundColor:
                      activeTab === index ? "#3e54cf" : "#3e54cf",
                  }}
                >
                  <Text style={{ color: "#fff", }}>{tab.label}</Text>
                </Pressable>
              ))}
            </View>
        )}
        <View style={{ flex: 1, backgroundColor: "#87caeb" }}>
          {tabs[activeTab].content}
        </View>
      </View>
    </SafeAreaView>
  );
}
