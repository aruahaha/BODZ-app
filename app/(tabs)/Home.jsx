import { useTheme } from "@react-navigation/native";
import axios from "axios";
import { Stack } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Animated,
  ImageBackground,
  RefreshControl,
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
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`https://bodz-server.vercel.app/api/getItems`);
      setData(res?.data?.items?.ItemsResult?.Items);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchItems();
  };

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const handleLogOut = async () => {
    await supabase.auth.signOut();
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
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
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
            className="text-2xl  "
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
