import React from 'react';
import { View, Text } from 'react-native';

interface AuthHeaderProps {
    title: string;
    subtitle: string;
}

const AuthHeader: React.FC<AuthHeaderProps> = ({ title, subtitle }) => {
    return (
        <View className="mt-16 mb-8">
            <Text className="text-4xl font-bold text-white mb-2 text-center">{title}</Text>
            <Text className="text-lg text-gray-400 text-center">{subtitle}</Text>
        </View>
    );
};

export default AuthHeader;