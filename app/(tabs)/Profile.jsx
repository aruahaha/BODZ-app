import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { useTheme } from "@react-navigation/native";
import { Stack } from "expo-router";
import { Image } from "native-base";
import { supabase } from "../../lib/supabaseClient";

const Profile = () => {
  const { colors } = useTheme();
  const [user, setUser] = useState(null);
  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getSession();
      setUser(data?.session?.user?.user_metadata);
    };
    getUser();
  }, []);
  return (
    <View>
      <Stack.Screen
        options={{
          headerShown: false,
          headerTitle: "",
          headerShadowVisible: false,
          headerStyle: { backgroundColor: colors.background },
        }}
      />
      <View className="h-32 w-32 absolute z-10 top-14 right-4">
        <Image
          source={require("../../assets/images/defaultProfile.png")}
          alt="pfp"
          className="h-32"
        />
      </View>
      <View className="bg-[#ffbe7a] h-2/5 px-6 pt-8 justify-center">
        <Text className="text-black text-2xl font-bold">Hey, {user?.name}</Text>
        <Text className="text-black text-md">{user?.email}</Text>
      </View>
    </View>
  );
};

export default Profile;
