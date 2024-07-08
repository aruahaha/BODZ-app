import { Tabs } from "expo-router";
import React from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Text } from "react-native";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.dark.tint,
        tabBarInactiveTintColor: Colors.dark.icon,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: ({ focused }) =>
            focused ? (
              <Text className="text-white text-[12px] mb-2">Home</Text>
            ) : null,
          tabBarStyle: {
            height: 70,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
          },
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "home" : "home-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="item"
        options={{
          tabBarButton: () => null,
          tabBarStyle: {
            height: 0,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
          },
        }}
      />
      <Tabs.Screen
        name="category"
        options={{
          tabBarButton: () => null,
          tabBarStyle: {
            height: 0,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
          },
        }}
      />
    </Tabs>
  );
}
