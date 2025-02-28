import {View, Text} from "react-native";
import React from "react";

const NoArticle: React.FC = () => (
    <View className="flex-1 justify-center items-center">
        <Text className="text-white text-lg">No articles found</Text>
        <Text className="text-gray-400 mt-2">Try a different search term</Text>
    </View>
);

export default NoArticle;