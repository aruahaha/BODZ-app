import { useTheme } from "@react-navigation/native";
import axios from "axios";
import { Stack } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  ImageBackground,
  ScrollView,
  Text,
  View,
} from "react-native";
import AnimatedHeader from "../../components/AnimatedHeader";
import CategoryCard from "../../components/categoryCard";
import ItemsCard from "../../components/ItemsCard";
import { supabase } from "../../lib/supabaseClient";

export default function Home() {
  const [menuVisible, setMenuVisible] = useState(false);
  const { colors } = useTheme();
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`https://bodz-server.vercel.app/api/getItems`)
      .then((res) => {
        setData(res?.data?.items?.ItemsResult?.Items);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const handleLogOut = async () => {
    const { error } = await supabase.auth.signOut();
    setMenuVisible(!menuVisible);
  };

  const scrollY = new Animated.Value(0);
  const diffClamp = Animated.diffClamp(scrollY, 0, 65);
  const translateY = diffClamp.interpolate({
    inputRange: [0, 65],
    outputRange: [0, -65],
  });

  return (
    <View className="flex-1 bg-[#ffbe7a]">
      <Stack.Screen
        options={{
          headerShown: false,
          headerTitle: "BODZ",
          headerTitleStyle: {
            color: colors.text,
            fontSize: 25,
          },
          headerStyle: {
            backgroundColor: colors.header,
            height: 90,
            transform: [{ translateY: translateY }],
          },
        }}
      />

      <ScrollView
        className=""
        onScroll={(e) => {
          scrollY.setValue(e.nativeEvent.contentOffset.y);
        }}
      >
        <Animated.View
          style={{
            transform: [{ translateY: translateY }],
          }}
        >
          <AnimatedHeader toggleMenu={toggleMenu} handleLogOut={handleLogOut} />
          <ImageBackground
            source={require("../../assets/images/HomePageImg.png")}
            style={{ height: 350 }}
          />
        </Animated.View>
        <View
          className="px-5 py-10 rounded-t-3xl"
          style={{ backgroundColor: colors.cardBackground }}
        >
          <Text
            className="text-2xl mb-5 "
            style={{ fontFamily: "Lexend", color: colors.text }}
          >
            Latest Deals
          </Text>

          <ItemsCard data={data} loading={loading} />

          <CategoryCard />
        </View>
      </ScrollView>
    </View>
  );
}
