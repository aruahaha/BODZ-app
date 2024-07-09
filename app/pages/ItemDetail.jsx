import {
  View,
  Text,
  Image,
  ScrollView,
  Pressable,
  Linking,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useIsFocused, useRoute, useTheme } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Link, router, Stack } from "expo-router";
import { Skeleton } from "native-base";

const ItemDetail = () => {
  const route = useRoute();
  const { item } = route.params;
  const { colors } = useTheme();
  const parsedItem = JSON.parse(item);
  const isFocused = useIsFocused();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [item]);

  return (
    <View className="">
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "",
          headerShadowVisible: false,
          headerStyle: { backgroundColor: colors.background },
        }}
      />
      {loading ? (
        <View className="px-4 ">
          <Skeleton rounded="md" h="150" marginBottom={2} />
          <View className="mt-2">
            <Skeleton size="5" w="20" rounded="full" className="mb-4" />
            <Skeleton.Text lines={5} />
          </View>
        </View>
      ) : (
        <View className="h-full">
          <View className="h-[91%]">
            <ScrollView className="px-4">
              <View className="w-full items-center bg-white rounded-lg px-2 py-4">
                <Image
                  source={{ uri: parsedItem?.Images?.Primary?.Large?.URL }}
                  className="w-52 h-52 "
                  style={{ objectFit: "contain" }}
                />
              </View>
              <View className="">
                <View
                  className="mb-3 mt-2   rounded-lg p-2"
                  style={{ backgroundColor: colors.header }}
                >
                  <Text
                    className="text-lg text-center"
                    style={{ color: colors.text, fontFamily: "Lexend" }}
                  >
                    {parsedItem?.ItemInfo?.Title?.DisplayValue.split(
                      /[,\s\n-]+/
                    )
                      .slice(0, 10)
                      .join(" ")}
                  </Text>
                </View>
                <View
                  className=" rounded-lg p-2 mb-5"
                  style={{ backgroundColor: colors.header }}
                >
                  <Text
                    style={{ color: colors.text, fontFamily: "Lexend" }}
                    className="text-lg"
                  >
                    Description
                  </Text>
                  <Text
                    className="text-sm mt-2 "
                    style={{ color: colors.text, fontFamily: "Poppins" }}
                  >
                    {parsedItem?.ItemInfo?.Features?.DisplayValues.join(", ")}
                  </Text>
                </View>
              </View>
            </ScrollView>
          </View>
          <View className=" absolute bottom-2 w-full px-4">
            <View
              className="flex-row justify-between rounded-xl px-3"
              style={{ backgroundColor: colors.buyNowColor }}
            >
              {parsedItem?.Offers ? (
                parsedItem?.Offers?.Listings?.map((itemPrice, index) => (
                  <View key={index} className=" ">
                    <Text
                      className="text-xl mt-2 "
                      style={{ color: colors.header, fontFamily: "Poppins" }}
                    >
                      {parsedItem?.Offers?.Listings[0]?.Price?.DisplayAmount}
                    </Text>
                    <View className="flex-row gap-2">
                      <Text
                        className="line-through opacity-50"
                        style={{ color: colors.header, fontFamily: "Poppins" }}
                      >
                        {itemPrice?.SavingBasis?.DisplayAmount}
                      </Text>
                      <Text
                        className="font-bold"
                        style={{ color: colors.priceColor }}
                      >
                        (-{itemPrice?.Price?.Savings?.Percentage}%)
                      </Text>
                    </View>
                  </View>
                ))
              ) : (
                <View className="w-40 justify-center">
                  <Text style={{ color: colors.header, fontFamily: "Poppins" }}>
                    Please check the price on Amazon
                  </Text>
                </View>
              )}
              <Pressable
                className="py-2 px-5 rounded-lg mt-2 items-center mb-2"
                style={{ backgroundColor: colors.header }}
                onPress={() => Linking.openURL(parsedItem?.DetailPageURL)}
              >
                <Text
                  className="text-lg"
                  style={{ color: colors.text, fontFamily: "Poppins" }}
                >
                  Buy Now
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default ItemDetail;
