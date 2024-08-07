import { Tabs } from "expo-router";
import React from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Text } from "react-native";
import { Fontisto } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import TabBar from "../../components/TabBar"

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.dark.tint,
        tabBarInactiveTintColor: Colors.dark.icon,
        headerShown: false,
      }}
      tabBar={props => <TabBar {...props} />}
    >
      <Tabs.Screen
        name="Home"
        options={{
          title: "Home"
        }}
      />

      <Tabs.Screen
        name="Deals"
        options={{
          title: "Deals"
        }}
      />

      <Tabs.Screen
        name="Profile"
        options={{
          title: "Profile"
        }}
      />

    </Tabs>
  );
}
