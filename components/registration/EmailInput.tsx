import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { Mail } from 'lucide-react-native';

interface EmailInputProps {
    email: string;
    setEmail: (email: string) => void;
    emailError: string;
}

const EmailInput: React.FC<EmailInputProps> = ({ email, setEmail, emailError }) => {
    return (
        <View>
            <View className="flex-row items-center border-b border-gray-700 py-3">
                <Mail size={20} color="#A78BFA" />
                <TextInput
                    className="flex-1 text-white text-base ml-2"
                    placeholder="Email"
                    placeholderTextColor="#6B7280"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
            </View>
            {emailError ? <Text className="text-red-500 mt-1">{emailError}</Text> : null}
        </View>
    );
};

export default EmailInput;