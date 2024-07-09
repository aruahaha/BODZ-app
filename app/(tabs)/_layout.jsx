import { Tabs } from "expo-router";
import React from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Text } from "react-native";
import { Fontisto } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';

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
        name="Home"
        options={{
          tabBarLabel: ({ focused }) =>
            focused ? (
              <Text className="text-white text-[12px] mb-2" style={{ fontFamily: "Lexend" }}>Home</Text>
            ) : null,
          tabBarStyle: {
            height: 70,
          },
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "home" : "home-outline"}
              size={25}
              color={color}
            />
          ),
        }}
      />


      <Tabs.Screen
        name="Deals"
        options={{
          tabBarLabel: ({ focused }) =>
            focused ? (
              <Text className="text-white text-[12px] mb-2" style={{ fontFamily: "Lexend" }}>Deals</Text>
            ) : null,
          tabBarStyle: {
            height: 70,
          },
          tabBarIcon: ({ color, focused }) => (
            <Fontisto name="shopping-sale" size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="Profile"
        options={{
          tabBarLabel: ({ focused }) =>
            focused ? (
              <Text className="text-white text-[12px] mb-2" style={{ fontFamily: "Lexend" }}>Profile</Text>
            ) : null,
          tabBarStyle: {
            height: 70,
          },
          tabBarIcon: ({ color, focused }) => (
            <Octicons name="feed-person" size={24} color={color} />
          ),
        }}
      />

    </Tabs>
  );
}
