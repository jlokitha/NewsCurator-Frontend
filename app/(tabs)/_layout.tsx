import {Tabs} from 'expo-router';
import {Bookmark, Home, User} from 'lucide-react-native';

export default function TabLayout() {

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: '#111827',
                    borderTopColor: '#374151',
                },
                tabBarActiveTintColor: '#8B5CF6',
                tabBarInactiveTintColor: '#6B7280',
            }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarIcon: ({size, color}) => (
                        <Home size={size} color={color}/>
                    ),
                }}
            />
            <Tabs.Screen
                name="bookmarks"
                options={{
                    title: 'Bookmarks',
                    tabBarIcon: ({color, size}) => <Bookmark size={size} color={color}/>,
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    tabBarIcon: ({color, size}) => <User size={size} color={color}/>,
                }}
            />
        </Tabs>
    );
}