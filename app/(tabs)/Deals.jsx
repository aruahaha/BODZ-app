import {
    View,
    Text,
    Image,
    FlatList,
    ActivityIndicator
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link, Stack } from "expo-router";
import { useTheme } from "@react-navigation/native";

import { Feather } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";


const Deals = () => {
    const { colors } = useTheme();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [scrollToTop, setScrollToTop] = useState(true);
    const [isFetching, setIsFetching] = useState(false);
    const flatListRef = useRef();

    function numberWithCommas(x) {
        return x?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const fetchItems = async (page) => {
        if (isFetching) return;
        setIsFetching(true);
        setLoading(true);
        try {
            const res = await axios.get(
                `https://bodz-server.vercel.app/api/getItems?page=${page}`
            );
            const newItems = res?.data?.items?.ItemsResult?.Items || [];
            if (page === 1) {
                setData(newItems);
            } else {
                setData((prevData) => [...prevData, ...newItems]);
            }
            setHasMore(newItems.length > 0);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
            setRefreshing(false);
            setIsFetching(false);
        }
    };

    useEffect(() => {
        fetchItems(currentPage);
    }, [currentPage]);

    const onRefresh = () => {
        setRefreshing(true);
        setCurrentPage(1);
        fetchItems(1);
    };

    const handleScroll = (event) => {
        const { contentOffset } = event.nativeEvent;
        setScrollToTop(contentOffset.y === 0);
    };

    const toTop = () => {
        flatListRef.current.scrollToOffset({ offset: 0 });
        setCurrentPage(1);
        fetchItems(1);
    };

    const handleLoadMore = () => {
        if (!loading && hasMore) {
            setCurrentPage((prevPage) => prevPage + 1);
        }
    };

    const renderItem = ({ item, i }) => (
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
    );

    const renderFooter = () => {
        if (!loading) return null;
        return (
            <View className="p-20 mb-20">
                <ActivityIndicator size="large" color={colors.text} />
            </View>
        );
    };

    return (
        <View style={{ flex: 1 }}>
            <Stack.Screen
                options={{
                    headerShown: false,
                    headerTitle: "",
                    headerShadowVisible: false,
                    headerStyle: { backgroundColor: colors.background },
                }}
            />
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item, index) => `${item.ASIN}-${index}`}
                onEndReached={handleLoadMore}

                ListFooterComponent={renderFooter}
                contentContainerStyle={{ paddingBottom: 20 }}
                ListHeaderComponent={() => (
                    <View style={{ marginTop: 40, paddingHorizontal: 20 }}>
                        <Text
                            style={{ fontSize: 24, fontFamily: "Lexend", color: colors.text }}
                        >
                            Deals
                        </Text>
                    </View>
                )}
                numColumns={2}
                onScroll={handleScroll}
                columnWrapperStyle={{ alignSelf: "center", marginTop: 20, gap: 10 }}
                key={(numColumns) => numColumns}
                ref={flatListRef}
            />
            {!scrollToTop && (
                <Animatable.View
                    onStartShouldSetResponder={toTop}
                    className="absolute bottom-[90px] right-5 rounded-full p-5 ml-5 flex-row items-center"
                    style={{ backgroundColor: colors.tabBarBgColor }}
                    animation="lightSpeedIn"
                    duration={500}
                    delay={200}
                >
                    <Feather name="chevron-up" size={24} color="white" />
                </Animatable.View>
            )}
            {scrollToTop && (
                <Animatable.View
                    onStartShouldSetResponder={toTop}
                    className="absolute bottom-[90px] right-5 rounded-full p-5 ml-5 flex-row items-center"
                    style={{ backgroundColor: colors.tabBarBgColor }}
                    animation="lightSpeedOut"
                    duration={500}
                >
                    <Feather name="chevron-up" size={24} color="white" />
                </Animatable.View>
            )}
        </View>
    );
};

export default Deals;
