import {router, Stack} from "expo-router";
import {Text, TouchableOpacity, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import React from "react";

export const ArticleNotFound = () => {
    return (
        <>
            <SafeAreaView className="flex-1 bg-background">
                <Stack.Screen options={{ headerShown: false }} />
                <View className="flex-1 justify-center items-center p-4">
                    <Text className="text-white text-xl text-center">Article not found</Text>
                    <TouchableOpacity
                        className="mt-4 bg-primary px-6 py-3 rounded-xl"
                        onPress={() => router.back()}
                    >
                        <Text className="text-white font-medium">Go Back</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </>
    );
};