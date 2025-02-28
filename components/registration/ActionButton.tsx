import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { ArrowRight } from 'lucide-react-native';

interface ActionButtonProps {
    onPress: () => void;
    title: string;
}

const ActionButton: React.FC<ActionButtonProps> = ({ onPress, title }) => {
    return (
        <TouchableOpacity onPress={onPress} className="bg-primary rounded-xl py-4 mt-6">
            <View className="flex-row items-center justify-center">
                <Text className="text-white font-semibold text-lg mr-2">{title}</Text>
                <ArrowRight size={20} color="white" />
            </View>
        </TouchableOpacity>
    );
};

export default ActionButton;