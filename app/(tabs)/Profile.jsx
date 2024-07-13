import { View, Text, ScrollView, Pressable, Modal, } from "react-native";
import React, { useEffect, useState } from "react";
import { useTheme } from "@react-navigation/native";
import { Link, Stack } from "expo-router";
import { Image } from "native-base";
import { supabase } from "../../lib/supabaseClient";
import { AntDesign, FontAwesome5, Ionicons, Octicons } from "@expo/vector-icons";

const Profile = () => {
  const { colors } = useTheme();
  const [user, setUser] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getSession();
      setUser(data?.session?.user?.user_metadata);
    };
    getUser();
  }, []);

  const handleLogOut = async () => {
    await supabase.auth.signOut();
    setModalVisible(false);
  };

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
      <View className="bg-[#ffbe7a] h-36 justify-center ">
        <View className="h-32 w-full absolute z-10 items-center top-16">
          <Image
            source={require("../../assets/images/defaultProfile.png")}
            alt="pfp"
            className="h-32 w-32"
          />
        </View>
      </View>

      <ScrollView className="mt-16 h-full">
        <View className="items-center gap-2 mb-5">
          <Text className=" text-2xl font-bold" style={{ color: colors.text, fontFamily: "Lexend" }}>{user?.name}</Text>
          <View className="">
            <Text className="text-md" style={{ color: colors.text, fontFamily: "Lexend" }}>{user?.email}</Text>
          </View>
        </View>

        <View className="p-4 rounded-xl  mx-10" style={{ backgroundColor: colors.secondary }}>
          <View className="gap-10">
            <Pressable className="flex-row  pt-5">
              <Ionicons name="bag-check" size={24} color={colors.text} />
              <Text className=" text-lg ml-3" style={{ color: colors.text, fontFamily: "Poppins" }}>
                Wishlist
              </Text>
            </Pressable>
            <Pressable className="flex-row  ">
              <Octicons name="pencil" size={24} color={colors.text} />
              <Text className="text-lg ml-3" style={{ color: colors.text, fontFamily: "Poppins" }}>
                Edit Profile
              </Text>
            </Pressable>
            <Link href="/pages/Support">
              <View className="flex-row  ">
                <FontAwesome5 name="headset" size={24} color={colors.text} />
                <Text className="text-lg ml-3" style={{ color: colors.text, fontFamily: "Poppins" }}>
                  Support
                </Text>
              </View>
            </Link>
            <Pressable onPress={() => setModalVisible(true)} className="flex-row  pb-5">
              <AntDesign name="logout" size={24} color="red" />
              <Text className="text-red-500 text-lg ml-3" style={{ fontFamily: "Poppins" }}>
                Log Out
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
          <View className="bg-white p-5 rounded-2xl w-80">
            <Text className="text-lg font-bold mb-4" style={{ fontFamily: "Poppins" }}>
              Are you sure you want to log out?
            </Text>
            <View className="flex-row justify-between">
              <Pressable onPress={handleLogOut} className="bg-red-500 px-10 py-3 rounded-2xl">
                <Text className="text-white text-lg" style={{ fontFamily: "Poppins" }}>Yes</Text>
              </Pressable>
              <Pressable onPress={() => setModalVisible(false)} className="bg-gray-300 px-10 py-3 rounded-2xl">
                <Text className="text-lg" style={{ fontFamily: "Poppins" }}>No</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Profile;
