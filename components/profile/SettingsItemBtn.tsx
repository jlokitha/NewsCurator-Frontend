import React from 'react';
import { View, Text, Pressable, Switch } from 'react-native';
import { ChevronRight } from 'lucide-react-native';

interface SettingsItemProps {
    icon: React.ReactNode;
    title: string;
    value?: string;
    onPress: () => void;
    toggle?: boolean;
    isToggled?: boolean;
    showBorder?: boolean;
}

const SettingsItemBtn: React.FC<SettingsItemProps> = ({
    icon,
    title,
    value,
    onPress,
    toggle = false,
    isToggled = false,
    showBorder = true
}) => {
    return (
        <Pressable
            className={`flex-row items-center py-4 ${showBorder ? 'border-b border-gray-800' : ''}`}
            onPress={onPress}
            disabled={toggle}
            style={({ pressed }) => ({
                opacity: pressed ? 0.7 : 1,
                transform: [{ scale: pressed ? 0.98 : 1 }],
            })}
        >
            <View className="w-10 items-center">
                {icon}
            </View>
            <View className="flex-1 ml-3">
                <Text className="text-white text-base font-medium">{title}</Text>
                {value && <Text className="text-gray-400 text-sm mt-1">{value}</Text>}
            </View>
            {toggle ? (
                <Switch
                    trackColor={{ false: "#374151", true: "#7C3AED" }}
                    thumbColor={isToggled ? "#A78BFA" : "#6B7280"}
                    ios_backgroundColor="#374151"
                    onValueChange={onPress}
                    value={isToggled}
                />
            ) : (
                <ChevronRight size={20} color="#6B7280" />
            )}
        </Pressable>
    );
};

export default SettingsItemBtn;