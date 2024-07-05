import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { Stack } from "expo-router";
import { Icon, Input } from "native-base";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  AppState,
  Pressable,
  Text,
  View
} from "react-native";
import { supabase } from "../../lib/supabaseClient";
import * as WebBrowser from "expo-web-browser"
import * as Google from "expo-auth-session/providers/google"

WebBrowser.maybeCompleteAuthSession()

AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

export default function Auth() {
  const [accessToken, setAccessToken] = useState(null)
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_ID,
    androidClientId: process.env.EXPO_PUBLIC_GOOGLE_ANDROID_ID
  })
  const [show, setShow] = React.useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { colors } = useTheme()

  useEffect(() => {
    if (response?.type === "success") {
      setAccessToken(response.authentication.accessToken);
      accessToken && fetchUserInfo()
    }
  }, [response, accessToken])

  async function fetchUserInfo() {
    let response = await fetch("https://www.googleapis.com/userinfo/v2/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
  }

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    setLoading(false);
  }

  async function signUpWithEmail() {
    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    const addUser = async () => {
      const { data, err } = await supabase
        .from("User Data")
        .insert([{ email: email }]);
    };

    if (error) Alert.alert(error.message);
    if (!session) {
      addUser();
      Alert.alert("Please check your inbox for email verification!");
    }
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
            <ActivityIndicator color="white" className="pt-10" size={25} />
          ) : (
            <>
              <View className="">
                <Pressable
                  className="bg-cardColor px-3 py-5 rounded-[20px] items-center"
                  disabled={loading}
                  onPress={() => {
                    promptAsync()
                  }}
                >
                  <Text
                    className="text-lg text-white"

                  >
                    Google
                  </Text>
                </Pressable>
              </View>
              <View className="mt-3 ">
                <Pressable
                  className="bg-cardColor px-3 py-5 rounded-[20px] items-center"
                  disabled={loading}
                  onPress={() => signInWithEmail()}
                >
                  <Text
                    className="text-lg text-white"

                  >
                    Sign In
                  </Text>
                </Pressable>
              </View>
              <View className="mt-3">
                <Pressable
                  className="bg-green-600 px-3 py-5 rounded-[20px] items-center"
                  disabled={loading}
                  onPress={() => signUpWithEmail()}
                >
                  <Text
                    className="text-lg text-white"

                  >
                    Sign Up
                  </Text>
                </Pressable>
              </View>
            </>
          )}
        </View>
      </View>
    </View>
  );
}
