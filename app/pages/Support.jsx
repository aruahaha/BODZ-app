import { View, Text, Pressable, Linking } from "react-native";
import React from "react";
import { useTheme } from "@react-navigation/native";
import { Stack } from "expo-router";
import { FontAwesome5 } from "@expo/vector-icons";

const Support = () => {
  const { colors } = useTheme();
  return (
    <View>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "Support",
          headerTitleAlign: "center",
          headerShadowVisible: false,
          headerStyle: { backgroundColor: colors.background },
        }}
      />
      <View className="px-3 my-2 gap-2">
        <View className="bg-black rounded-lg p-4">
          <Text style={{ color: colors.text }} className="text-lg">
            Should you have any questions about the app, advertising, or any
            other concerns, feel free to get in touch with us at
            help.bodz@gmail.com
          </Text>
        </View>
        <View className="bg-black rounded-lg p-4">
          <Text style={{ color: colors.text }} className="text-xl mb-3">
            Follow us on
          </Text>
          <View className="flex-row gap-6">
            <Pressable
              onPress={() =>
                Linking.openURL(
                  "https://www.facebook.com/people/Online-Offers-Dealz/61555187057187/"
                )
              }
            >
              <FontAwesome5 name="facebook" size={24} color={colors.text} />
            </Pressable>
            <Pressable>
              <FontAwesome5 name="telegram" size={24} color={colors.text} />
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Support;
