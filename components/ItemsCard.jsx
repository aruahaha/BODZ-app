import { View, Text, Image, ScrollView, ActivityIndicator } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';
import { useTheme } from '@react-navigation/native';

const ItemsCard = ({ data, loading }) => {
    const { colors } = useTheme()
    return (
        <View className="gap-5 mb-10 justify-center">
            {loading ?
                <View className="mt-2">
                    <ActivityIndicator color={colors.text} size="large" />
                </View>
                :
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    {data?.map((item, i) => (
                        <Link href="" className='p-2 rounded-2xl bg-white mr-2 ' key={i}>
                            <View>
                                <Image
                                    source={{
                                        uri: item?.Images?.Primary?.Large?.URL,
                                    }}
                                    className="w-32 h-32"
                                    style={{ objectFit: 'contain', borderRadius: 12 }}
                                />
                                <View className="px-2 w-32 mt-2">
                                    <Text className="text-sm font-bold" style={{ fontFamily: 'Lexend' }}>
                                        {item?.ItemInfo?.Title?.DisplayValue.split(/[,\s\n-]+/)
                                            .slice(0, 6)
                                            .join(' ')}
                                    </Text>
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
