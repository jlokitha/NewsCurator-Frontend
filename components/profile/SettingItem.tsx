import React from 'react';
import { View, Text, Animated } from 'react-native';
import { Sparkles } from 'lucide-react-native';

interface SettingItemProps {
    title: string;
    children: React.ReactNode;
    fadeAnim: Animated.Value;
    slideAnim: Animated.Value;
}

const SettingItem: React.FC<SettingItemProps> = ({ title, children, fadeAnim, slideAnim }) => {
    return (
        <Animated.View
            className="px-6 py-4 -mt-6"
            style={{
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }]
            }}
        >
            <View className="flex-row items-center mb-4">
                <Sparkles size={16} color="#A78BFA" className="mr-2" />
                <Text className="text-gray-300 text-sm uppercase font-medium">{title}</Text>
            </View>

            <View className="bg-background-light rounded-2xl overflow-hidden mb-6"
                  style={{
                      shadowColor: "#000",
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.1,
                      shadowRadius: 4,
                      elevation: 3,
                      borderWidth: 1,
                      borderColor: "rgba(55, 65, 81, 0.3)"
                  }}
            >
                <View className="p-4">
                    {children}
                </View>
            </View>
        </Animated.View>
    );
};

export default SettingItem;