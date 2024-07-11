// components/CategoryCard.js

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Link } from 'expo-router';
import { useTheme } from '@react-navigation/native';

const categories = [
    { label: 'Smartphones', name: "Smartphones", imgUrl: "https://m.media-amazon.com/images/I/31KxpX7Xk7L._SL500_.jpg" },
    { label: 'Laptops', name: "Laptops", imgUrl: "https://m.media-amazon.com/images/I/51+U6oOCx4L._SL500_.jpg" },
    { label: 'Earphones', name: "In-Ear Headphones", imgUrl: "https://m.media-amazon.com/images/I/31riIuaxjmL._SL500_.jpg" },
    { label: 'Smart Watches', name: "Smart Watches", imgUrl: "https://m.media-amazon.com/images/I/41Hr4Mn6pCL._SL500_.jpg" },
    // Add more categories as needed
];

const CategoryCard = () => {
    const { colors } = useTheme()
    return (
        <View>
            <View className="mb-5">
                <Text style={{ fontFamily: "Lexend", color: colors.text }} className="text-2xl">Category</Text>
            </View>
            <View className="flex-row flex-wrap gap-5 justify-center mb-20">
                {categories.map((category) => (
                    <Link
                        key={category.name}
                        href={{ pathname: '/pages/Category', params: { category: JSON.stringify(category.name) } }}
                    >
                        <View className="bg-white p-2 rounded-lg items-center shadow-xl shadow-slate-600">

                            <Image
                                source={{ uri: category?.imgUrl }}
                                className="h-32 w-[140px] mb-2"
                            />
                            <Text className="text-[15px] w-32 text-center" style={{ fontFamily: "Lexend" }}>{category.label}</Text>
                        </View>
                    </Link>
                ))}
            </View>
        </View>
    );
};

export default CategoryCard;
