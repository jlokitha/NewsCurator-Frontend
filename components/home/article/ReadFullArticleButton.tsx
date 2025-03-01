import React from 'react';
import { TouchableOpacity, Text, Linking } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';

interface ReadFullArticleButtonProps {
    url: string;
    sourceName: string;
}

const ReadFullArticleButton: React.FC<ReadFullArticleButtonProps> = ({ url, sourceName }) => (
    <TouchableOpacity
        className="bg-background-light rounded-xl p-4 flex-row items-center justify-between"
        onPress={() => {
            Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
        }}
    >
        <Text className="text-white font-medium">Read full article on {sourceName || 'Unknown Source'}</Text>
        <ArrowLeft size={20} color="#A78BFA" style={{ transform: [{ rotate: '180deg' }] }} />
    </TouchableOpacity>
);

export default ReadFullArticleButton;