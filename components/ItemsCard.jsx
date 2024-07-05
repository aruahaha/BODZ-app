import { View, Text, Image, ScrollView } from 'react-native';
import React from 'react';

const ItemsCard = ({ data }) => {
    return (
        <View className="gap-5 mb-10 justify-center">
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                {data?.map((item, i) => (
                    <View
                        key={i}
                        className="p-2 rounded-2xl bg-white mr-2 "
                    >
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
                ))}
            </ScrollView>
        </View>
    );
};

export default ItemsCard;
