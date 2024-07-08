import { Entypo, Ionicons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import { router } from 'expo-router';
import { Menu } from 'native-base';
import React, { useEffect, useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


const AnimatedHeader = ({ toggleMenu, handleLogOut }) => {
    const { colors } = useTheme();

    return (
        <SafeAreaView >
            <View className="py-2 flex-row justify-between items-center px-5 bg-[#ffbe7a]">
                <View>
                    <Text className=" text-3xl" style={{ color: "#191919", fontFamily: "Lexend" }}>BODZ</Text>
                </View>
                <View>
                    <View className="">
                        <View className="flex-row">
                            <Ionicons
                                name="notifications"
                                size={25}
                                color="#191919"
                            />
                            <Menu
                                w="150"
                                trigger={(triggerProps) => {
                                    return (
                                        <Pressable
                                            accessibilityLabel="More options menu"
                                            {...triggerProps}
                                            className="ml-3"
                                        >
                                            <Entypo
                                                name="dots-three-vertical"
                                                size={25}
                                                color="#191919"
                                            />
                                        </Pressable>
                                    );
                                }}
                                placement="bottom right"
                            >
                                <Menu.Item onPress={() => router.push("/")}>
                                    Profile
                                </Menu.Item>
                                <Menu.Item onPress={() => router.push("/Expenses")}>
                                    Support
                                </Menu.Item>
                                <Menu.Item onPress={handleLogOut}>
                                    <Text className="text-red-400">Log out</Text>
                                </Menu.Item>
                            </Menu>
                            <Pressable onPress={() => toggleMenu()}>
                                {/* Additional Pressable */}
                            </Pressable>
                        </View>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default AnimatedHeader;
