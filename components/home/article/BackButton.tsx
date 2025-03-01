import React from 'react';
import { TouchableOpacity } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import { useRouter } from 'expo-router';

const BackButton: React.FC = () => {
    const router = useRouter();

    return (
        <TouchableOpacity
            className="absolute top-4 left-4 w-10 h-10 rounded-full bg-black/50 justify-center items-center"
            onPress={() => router.back()}
        >
            <ArrowLeft size={20} color="white" />
        </TouchableOpacity>
    );
};

export default BackButton;