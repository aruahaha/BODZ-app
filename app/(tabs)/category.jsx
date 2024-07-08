import React, { useEffect, useState } from "react";
import {
    View,
    ActivityIndicator,
    Text,
    Pressable,
    Image,
    ScrollView,
} from "react-native";
import axios from "axios";
import { useIsFocused, useRoute, useTheme } from "@react-navigation/native";
import { router, Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const CategoryPage = () => {
    const route = useRoute();
    const { colors } = useTheme();
    const { category } = route.params;
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);


    const handleBack = () => {
        router.push("/(tabs)/");
        setData();
    };

    useEffect(() => {
        axios
            .get(
                `https://bodz-server.vercel.app/api/getItems?category=${JSON.parse(
                    category
                )}`
            )
            .then((res) => {
                setData(res?.data?.items?.ItemsResult?.Items || []);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching data:", err);
                setLoading(false);
            });
    }, [category]);

    if (!data || !category) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" color={colors.text} />
            </View>
        );
    }


    return (
        <View>
            <Stack.Screen
                options={{
                    headerShown: true,
                    headerTitle: JSON.parse(category),
                    headerShadowVisible: false,
                    headerStyle: { backgroundColor: colors.background },
                    headerLeft: () => (
                        <Pressable onPress={() => handleBack()}>
                            <Ionicons
                                name="arrow-back-outline"
                                size={24}
                                color={colors.text}
                                style={{ marginLeft: 20 }}
                            />
                        </Pressable>
                    ),
                }}
            />
            <ScrollView>
                <View className="flex-row flex-wrap justify-center gap-3 mt-0 mb-4 ">
                    {data?.map((item, i) => (
                        <View key={i} className="p-4 bg-white rounded-xl">
                            <Image
                                source={{
                                    uri: item?.Images?.Primary?.Large?.URL,
                                }}
                                className="w-32 h-32"
                                style={{ objectFit: "contain", borderRadius: 12 }}
                            />
                            <View className="px-2 w-32 mt-2">
                                <Text
                                    className="text-sm font-bold"
                                    style={{ fontFamily: "Lexend" }}
                                >
                                    {item?.ItemInfo?.Title?.DisplayValue.split(/[,\s\n-]+/)
                                        .slice(0, 6)
                                        .join(" ")}
                                </Text>
                            </View>
                        </View>
                    ))}
                </View>
            </ScrollView>
            {/* Render your data here */}
        </View>
    );
};

export default CategoryPage;
