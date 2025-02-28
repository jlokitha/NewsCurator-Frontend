import React from 'react';
import { View, Text } from 'react-native';

const DiscoverHeader: React.FC = () => (
    <View className="pt-4 pb-2">
        <Text className="text-white text-3xl font-bold">Discover</Text>
        <Text className="text-gray-400 text-base">Get the latest news from around the world</Text>
    </View>
);

export default DiscoverHeader;
