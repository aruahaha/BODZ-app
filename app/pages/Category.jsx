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
import { Link, router, Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const Category = () => {
    const route = useRoute();
    const { colors } = useTheme();
    const { category } = route.params;
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    function numberWithCommas(x) {
        return x?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const handleBack = () => {
        router.replace("/(tabs)/Home");
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
            // <View className="flex-row flex-wrap justify-center gap-6 mt-0 mb-4 ">
            //     <View >
            //         <Skeleton w="140" h="160" rounded="xl" className="mb-4" />
            //         <Skeleton.Text />
            //     </View>
            //     <View >
            //         <Skeleton w="140" h="160" rounded="xl" className="mb-4" />
            //         <Skeleton.Text />
            //     </View>
            //     <View >
            //         <Skeleton w="140" h="160" rounded="xl" className="mb-4" />
            //         <Skeleton.Text />
            //     </View>
            //     <View >
            //         <Skeleton w="140" h="160" rounded="xl" className="mb-4" />
            //         <Skeleton.Text />
            //     </View>
            //     <View >
            //         <Skeleton w="140" h="160" rounded="xl" className="mb-4" />
            //         <Skeleton.Text />
            //     </View>
            //     <View >
            //         <Skeleton w="140" h="160" rounded="xl" className="mb-4" />
            //         <Skeleton.Text />
            //     </View>
            // </View>
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

                }}
            />
            <ScrollView>
                <View className="flex-row flex-wrap justify-center gap-5 mt-0 mb-10">
                    {data?.map((item, i) => (
                        <Link href={{ pathname: '/pages/ItemDetail', params: { itemId: JSON.stringify(item.ASIN) } }} className='' key={i}>
                            <View className="p-0">
                                <View className='py-3 px-2 h-70 rounded-xl shadow-md shadow-slate-600' style={{ backgroundColor: colors.itemCardColor }}>
                                    <Image
                                        source={{
                                            uri: item?.Images?.Primary?.Large?.URL,
                                        }}
                                        className="w-36 h-32 mt-8"
                                        style={{ objectFit: 'contain', borderRadius: 12 }}
                                    />

                                    {item?.Offers?.Listings[0]?.Price?.Savings?.Percentage !== undefined && (
                                        <View style={{ backgroundColor: colors.itemCardInfoColor }} className="rounded-lg p-2 top-2 absolute left-2">
                                            <Text
                                                className="font-bold"
                                                style={{ color: colors.primary, fontFamily: "Lexend" }}
                                            >
                                                {item?.Offers?.Listings[0]?.Price?.Savings?.Percentage}% OFF
                                            </Text>
                                        </View>
                                    )}

                                    <View style={{ backgroundColor: colors.itemCardInfoColor }} className="rounded-lg mt-2">
                                        <View className="w-32 p-2 ">
                                            <Text className="text-md mb-1 font-bold" style={{ fontFamily: 'Lexend', color: colors.primary }} numberOfLines={1}>
                                                {item?.ItemInfo?.Title?.DisplayValue.split(/[,\s\n-]+/)
                                                    .slice(0, 4)
                                                    .join(' ')}
                                            </Text>
                                            {item?.Offers?.Listings[0]?.Price?.DisplayAmount ? (
                                                <Text style={{ fontFamily: 'Rubik', color: colors.priceColor }} className="text-lg" >
                                                    ₹{numberWithCommas(item?.Offers?.Listings[0]?.Price?.Amount)}
                                                </Text>
                                            ) : (

                                                <Text style={{ fontFamily: 'Lexend' }} className="text-green-500 ">---</Text>
                                            )}
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </Link>
                    ))}
                </View>
            </ScrollView>
            {/* Render your data here */}
        </View>
    );
};

export default Category;
