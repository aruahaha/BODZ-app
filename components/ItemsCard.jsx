import { View, Text, Image, ScrollView, ActivityIndicator } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';
import { useTheme } from '@react-navigation/native';
import { Skeleton } from 'native-base';

const ItemsCard = ({ data, loading }) => {

    function numberWithCommas(x) {
        return x?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const { colors } = useTheme()
    return (
        <View className="gap-10 mb-10 justify-center">
            {loading ?
                <View className="flex-row mt-4">
                    <View className="mr-2">
                        <Skeleton h="180" w="150" rounded="xl" className="mb-4" startColor={colors.loadingColor} />
                        <Skeleton.Text />
                    </View>
                    <View className="mr-2">
                        <Skeleton h="180" w="150" rounded="xl" className="mb-4" startColor={colors.loadingColor} />
                        <Skeleton.Text />
                    </View>
                    <View className="mr-2">
                        <Skeleton h="180" w="150" rounded="xl" className="mb-4" startColor={colors.loadingColor} />
                        <Skeleton.Text />
                    </View>
                </View>
                :
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} className="">

                    {data?.map((item, i) => (

                        <Link href={{ pathname: '/pages/ItemDetail', params: { itemId: JSON.stringify(item.ASIN) } }} className='pr-2 py-4' key={i}>
                            <View>
                                <View className='py-3 px-2 rounded-xl shadow-md shadow-slate-600' style={{ backgroundColor: colors.itemCardColor }}>
                                    <Image
                                        source={{
                                            uri: item?.Images?.Primary?.Large?.URL,
                                        }}
                                        className="w-40 h-32 mt-8"
                                        style={{ objectFit: 'contain', borderRadius: 12 }}
                                    />
                                    <View style={{ backgroundColor: colors.itemCardInfoColor }} className="rounded-lg p-2 top-2 absolute left-2">
                                        <Text
                                            className="font-bold"
                                            style={{ color: colors.primary, fontFamily: "Lexend" }}
                                        >
                                            {item?.Offers?.Listings[0]?.Price?.Savings?.Percentage}% OFF
                                        </Text>
                                    </View>
                                    <View style={{ backgroundColor: colors.itemCardInfoColor }} className="rounded-lg mt-2">
                                        <View className="w-32 p-2 ">
                                            <Text className="text-md mb-1 font-bold" style={{ fontFamily: 'Lexend', color: colors.primary }} numberOfLines={1}>
                                                {item?.ItemInfo?.Title?.DisplayValue.split(/[,\s\n-]+/)
                                                    .slice(0, 4)
                                                    .join(' ')}
                                            </Text>
                                            {item?.Offers?.Listings[0]?.Price?.DisplayAmount ? (
                                                <Text style={{ fontFamily: 'Rubik', color: colors.priceColor }} numberOfLines={1} >
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
                </ScrollView>
            }
        </View>
    );
};

export default ItemsCard;
