import React from 'react';
import { View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Bookmark } from 'lucide-react-native';

interface StatsCardProps {
    bookmarks: number;
}

const StatsCard: React.FC<StatsCardProps> = ({ bookmarks }) => {
    return (
        <View className="mt-4">
            <View className="bg-background-light rounded-2xl overflow-hidden"
                  style={{
                      shadowColor: "#000",
                      shadowOffset: { width: 0, height: 4 },
                      shadowOpacity: 0.2,
                      shadowRadius: 8,
                      elevation: 5,
                      borderWidth: 1,
                      borderColor: "rgba(139, 92, 246, 0.2)"
                  }}
            >
                <LinearGradient
                    colors={['rgba(139, 92, 246, 0.15)', 'rgba(17, 24, 39, 0)']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    className="p-5"
                >
                    <View className="flex-row items-center">
                        <View
                            className="w-14 h-14 rounded-full bg-primary/20 items-center justify-center mr-5"
                            style={{
                                borderWidth: 1,
                                borderColor: "rgba(139, 92, 246, 0.3)"
                            }}
                        >
                            <Bookmark size={26} color="#A78BFA" />
                        </View>
                        <View>
                            <Text className="text-white text-3xl font-bold">{bookmarks}</Text>
                            <Text className="text-gray-300 text-sm">Saved Articles</Text>
                        </View>
                    </View>
                </LinearGradient>
            </View>
        </View>
    );
};

export default StatsCard;