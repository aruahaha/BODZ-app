import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { Link, Stack } from "expo-router";
import { Icon, Input } from "native-base";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  AppState,
  Pressable,
  Text,
  View,
} from "react-native";
import { supabase } from "../../lib/supabaseClient";

AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

export default function Auth() {
  const [show, setShow] = React.useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { colors } = useTheme();

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    setLoading(false);
  }

  return (
    <View className="h-full pt-14 " style={{ backgroundColor: colors.login }}>
      <Stack.Screen options={{ headerShown: false }} />
      <View className="  pb-8 justify-between  rounded-xl px-5 h-full">
        <View>
          <Text
            className=" text-2xl text-center mt-5"
            style={{ color: colors.text }}
          >
            Welcome!
          </Text>
          <Text
            className="text-gray-600 text-lmd text-center mt-3 mb-3"
            style={{ color: colors.text }}
          >
            Please sign in to your account
          </Text>
          <View className="">
            <Text
              className="text-xl text-white mb-2 mt-5"
              style={{ color: colors.text }}
            >
              Email
            </Text>
            <Input
              label="Email"
              InputLeftElement={
                <Icon
                  as={<MaterialIcons name="person" />}
                  size={5}
                  ml="5"
                  color="muted.400"
                />
              }
              color={colors.text}
              onChangeText={(text) => setEmail(text)}
              value={email}
              rounded="20px"
              padding="4"
              borderWidth="0"
              backgroundColor={colors.loginInput}
              placeholder="email@address.com"
              autoCapitalize={"none"}
              cursorColor={colors.text}
            />
          </View>
          <View>
            <Text
              className="text-xl text-white mb-2 mt-2"
              style={{ color: colors.text }}
            >
              Password
            </Text>
            <Input
              label="Password"
              type={show ? "text" : "password"}
              InputRightElement={
                <Pressable onPress={() => setShow(!show)}>
                  <Icon
                    as={
                      <MaterialIcons
                        name={show ? "visibility" : "visibility-off"}
                      />
                    }
                    size={5}
                    mr="5"
                    color="muted.400"
                  />
                </Pressable>
              }
              color={colors.text}
              rounded="20px"
              padding="4"
              onChangeText={(text) => setPassword(text)}
              value={password}
              borderWidth="0"
              backgroundColor={colors.loginInput}
              placeholder="Password"
              autoCapitalize={"none"}
              cursorColor={colors.text}
            />
          </View>
        </View>
        <View>
          {loading ? (
            <ActivityIndicator
              color={colors.text}
              className="pt-10"
              size={25}
            />
          ) : (
            <>
              <View className="mt-3 ">
                <Pressable
                  className="bg-cardColor px-3 py-5 rounded-[20px] items-center"
                  disabled={loading}
                  onPress={() => signInWithEmail()}
                >
                  <Text className="text-lg text-white">Sign In</Text>
                </Pressable>
              </View>
              <View className="mt-5 items-center">
                <Text className="text-md" style={{ color: colors.text }}>
                  Don't have an account?{" "}
                  <Link href="/signUp" className="text-blue-400">
                    Sign up
                  </Link>
                </Text>
              </View>
            </>
          )}
        </View>
      </View>
    </View>
  );
}
