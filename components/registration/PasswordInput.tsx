import React, {useState} from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Lock, Eye, EyeOff } from 'lucide-react-native';

interface PasswordInputProps {
    password: string;
    setPassword: (password: string) => void;
    passwordError: string;
}

const PasswordInput: React.FC<PasswordInputProps> = ({ password, setPassword, passwordError }) => {
    const [showPassword, setShowPassword] = useState(false);
    return (
        <View>
            <View className="flex-row items-center border-b border-gray-700 py-3">
                <Lock size={20} color="#A78BFA" />
                <TextInput
                    className="flex-1 text-white text-base ml-2"
                    placeholder="Password"
                    placeholderTextColor="#6B7280"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    {showPassword ? (
                        <EyeOff size={20} color="#6B7280" />
                    ) : (
                        <Eye size={20} color="#6B7280" />
                    )}
                </TouchableOpacity>
            </View>
            {passwordError ? <Text className="text-red-500 mt-1">{passwordError}</Text> : null}
        </View>
    );
};

export default PasswordInput;