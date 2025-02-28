import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';

interface AuthFooterProps {
    message: string;
    linkText: string;
    linkHref: string;
}

const AuthFooter: React.FC<AuthFooterProps> = ({ message, linkText, linkHref }) => {
    return (
        <View className="flex-row justify-center mt-12">
            <Text className="text-gray-400">{message} </Text>
            <Link href={linkHref} asChild>
                <TouchableOpacity>
                    <Text className="text-primary-light font-semibold">{linkText}</Text>
                </TouchableOpacity>
            </Link>
        </View>
    );
};

export default AuthFooter;