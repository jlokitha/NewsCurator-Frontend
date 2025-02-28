import {Provider, useSelector} from 'react-redux';
import {RootState, store} from '../store/store';
import {Stack, useRouter, useSegments} from 'expo-router';
import {useEffect} from 'react';
import "../global.css";

function TabLayout() {
    const {isAuthenticated} = useSelector((state: RootState) => state.userReducer);
    const segments = useSegments();
    const router = useRouter();

    useEffect(() => {
        const inAuthGroup = segments[0] === '(auth)';

        if (!isAuthenticated && !inAuthGroup) {
            router.replace('/signIn');
        } else if (isAuthenticated && inAuthGroup) {
            router.replace('/');
        }
    }, [isAuthenticated, segments]);

    return (
        <Stack>
            <Stack.Screen name='(auth)' options={{headerShown: false}}/>
            <Stack.Screen name='(tabs)' options={{headerShown: false}}/>
        </Stack>
    );
}

export default function RootLayout() {
    return (
        <Provider store={store}>
            <TabLayout/>
        </Provider>
    );
}