import {Tabs} from 'expo-router';
import {Bookmark, Home, User} from 'lucide-react-native';

export default function TabLayout() {

    return (
        <Tabs screenOptions={{headerShown: false}}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarIcon: ({size, color}) => (
                        <Home size={size} color={color}/>
                    ),
                }}
            />
        </Tabs>
    );
}