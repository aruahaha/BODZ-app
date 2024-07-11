import { useRoute, useTheme } from "@react-navigation/native";
import axios from "axios";
import { Stack } from "expo-router";
import { Skeleton } from "native-base";
import React, { useEffect, useState } from "react";
import {
  Image,
  Linking,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";

const ItemDetail = () => {
  const route = useRoute();
  const { itemId } = route.params;
  const { colors } = useTheme();
  const [data, setdata] = useState()
  const [loading, setLoading] = useState(true);

  function numberWithCommas(x) {
    return x?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  useEffect(() => {
    axios
      .get(
        `https://bodz-server.vercel.app/api/getItem/${JSON.parse(
          itemId
        )}`
      )
      .then((res) => {
        setdata(res?.data?.item?.ItemsResult?.Items || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setLoading(false);
      });


    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [itemId]);

  console.log(itemId)

  return (
    <View className="">
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "",
          headerShadowVisible: false,
          headerStyle: { backgroundColor: colors.header },
          headerTintColor: colors.text,
        }}
      />
      {loading ? (
        <View className="px-4 ">
          <Skeleton rounded="md" h="150" marginBottom={2} startColor={colors.loadingColor} />
          <View className="mt-2">
            <Skeleton size="5" w="20" rounded="full" className="mb-4" startColor={colors.loadingColor} />
            <Skeleton.Text lines={5} startColor={colors.loadingColor} />
          </View>
        </View>
      ) : (
        <View className="h-full">
          <View className="h-[91%]">
            <ScrollView className="px-4">
              <View className="w-full items-center bg-white rounded-lg p-5 ">
                <Image
                  source={{ uri: data[0]?.Images?.Primary?.Large?.URL }}
                  className="w-52 h-52 "
                  style={{ objectFit: "contain" }}
                />
              </View>
              <View className="">
                <View
                  className="mb-3 mt-2   rounded-lg p-2"
                // style={{ backgroundColor: colors.header }}
                >
                  <Text
                    className="text-lg "
                    style={{ color: colors.text, fontFamily: "Lexend" }}
                  >
                    {data[0]?.ItemInfo?.Title?.DisplayValue.split(
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
                    {data[0]?.ItemInfo?.Features?.DisplayValues.join(", ")}
                  </Text>
                </View>
              </View>
            </ScrollView>
          </View>
          <View className=" absolute bottom-2 w-full px-4 ">
            <View
              className="flex-row justify-between rounded-xl px-3 h-20 items-center"
              style={{ backgroundColor: colors.buyNowColor }}
            >
              {data[0]?.Offers ? (
                data[0]?.Offers?.Listings?.map((itemPrice, index) => (

                  <View key={index} className=" ">
                    <Text
                      className="text-xl mt-2"
                      style={{ color: colors.header, fontFamily: 'Rubik' }}

                    >
                      ₹{numberWithCommas(data[0]?.Offers?.Listings[0]?.Price?.Amount)}
                    </Text>
                    <View className="flex-row gap-2">
                      <Text
                        className="line-through opacity-50"
                        style={{ color: colors.header, fontFamily: 'Rubik' }}
                      >
                        ₹{numberWithCommas(itemPrice?.SavingBasis?.Amount)}
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
                className=" px-5 rounded-lg mt-2 h-14 justify-center mb-2"
                style={{ backgroundColor: colors.header }}
                onPress={() => Linking.openURL(data[0]?.DetailPageURL)}
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
      )
      }
    </View >
  );
};

export default ItemDetail;
