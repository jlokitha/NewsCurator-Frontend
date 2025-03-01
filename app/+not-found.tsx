import { Link, Stack } from 'expo-router';
import { Text, View } from 'react-native';

export default function NotFoundScreen() {
    return (
        <>
            <View className="flex-1 items-center justify-center p-5 bg-background">
                <Text className="text-2xl font-semibold text-white">This screen doesn't exist.</Text>
                <Link href="/" asChild>
                    <Text className="mt-4 py-4 text-primary-light font-bold">Go to home screen!</Text>
                </Link>
            </View>
        </>
    );
}