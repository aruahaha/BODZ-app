import { View, Text, Image, ScrollView, ActivityIndicator } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';
import { useTheme } from '@react-navigation/native';
import { Skeleton } from 'native-base';

const ItemsCard = ({ data, loading }) => {
    const { colors } = useTheme()
    return (
        <View className="gap-10 mb-10 justify-center">
            {loading ?
                <View className="flex-row mt-2">
                    <View className="mr-2">
                        <Skeleton h="160" w="130" rounded="xl" className="mb-4" />
                        <Skeleton.Text />
                    </View>
                    <View className="mr-2">
                        <Skeleton h="160" w="130" rounded="xl" className="mb-4" />
                        <Skeleton.Text />
                    </View>
                    <View className="mr-2">
                        <Skeleton h="160" w="130" rounded="xl" className="mb-4" />
                        <Skeleton.Text />
                    </View>
                </View>
                :
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>

                    {data?.map((item, i) => (

                        <Link href={{ pathname: '/pages/ItemDetail', params: { itemId: JSON.stringify(item.ASIN) } }} className='mr-2' key={i}>
                            <View>
                                <View className='py-4 px-2 rounded-2xl bg-white '>
                                    <Image
                                        source={{
                                            uri: item?.Images?.Primary?.Large?.URL,
                                        }}
                                        className="w-32 h-32 p-4"
                                        style={{ objectFit: 'contain', borderRadius: 12 }}
                                    />

                                </View>
                                <View className="w-32 mt-2">
                                    <Text className="text-sm font-bold" style={{ fontFamily: 'Lexend', color: colors.text }}>
                                        {item?.ItemInfo?.Title?.DisplayValue.split(/[,\s\n-]+/)
                                            .slice(0, 6)
                                            .join(' ')}
                                    </Text>
                                    {item?.Offers?.Listings[0]?.Price?.DisplayAmount ? (
                                        <Text style={{ fontFamily: 'Lexend', color: colors.priceColor }}  >
                                            {item?.Offers?.Listings[0]?.Price?.DisplayAmount}
                                        </Text>
                                    ) : (

                                        <Text style={{ fontFamily: 'Lexend' }} className="text-green-500 ">---</Text>
                                    )}

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
