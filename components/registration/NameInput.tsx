import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { User } from 'lucide-react-native';

interface NameInputProps {
    username: string;
    setUsername: (username: string) => void;
    nameError: string;
}

const NameInput: React.FC<NameInputProps> = ({ username, setUsername, nameError }) => {
    return (
        <View>
            <View className="flex-row items-center border-b border-gray-700 py-3">
                <User size={20} color="#A78BFA" />
                <TextInput
                    className="flex-1 text-white text-base ml-2"
                    placeholder="Full Name"
                    placeholderTextColor="#6B7280"
                    value={username}
                    onChangeText={setUsername}
                    autoCapitalize="words"
                />
            </View>
            {nameError ? <Text className="text-red-500 mt-1">{nameError}</Text> : null}
        </View>
    );
};

export default NameInput;