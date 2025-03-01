import {
    View,
    Text,
    ScrollView,
    Animated,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
    LogOut,
} from 'lucide-react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../store/store";
import React, {useRef, useEffect} from 'react';
import {getBookmarkedNews} from "../../reducers/newsReducer";
import {logoutUser} from "../../reducers/userReducer";
import {useFocusEffect, useRouter} from "expo-router";
import ProfileHeader from "../../components/profile/ProfileHeader";
import StatsCard from "../../components/profile/StatsCard";
import SettingsItemBtn from "../../components/profile/SettingsItemBtn";
import SettingItem from "../../components/profile/SettingItem";

export default function ProfileScreen() {
    const user = useSelector((state: RootState) => state.userReducer.user);
    const bookmarks = useSelector((state: RootState) => state.newsReducer.bookmarked);

    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();

    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(20)).current;
    const scaleAnim = useRef(new Animated.Value(0.95)).current;

    useEffect(() => {
        console.log('ProfileScreen useEffect');
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 800,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 800,
                useNativeDriver: true,
            }),
            Animated.timing(scaleAnim, {
                toValue: 1,
                duration: 800,
                useNativeDriver: true,
            })
        ]).start();
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            console.log('ProfileScreen useFocusEffect');
            dispatch(getBookmarkedNews(user.id));
            return () => {
                console.log('Cleanup useFocusEffect');
            };
        }, [])
    );

    // Sign out handler
    const handleSignOut = () => {
        dispatch(logoutUser());
        router.replace('/signIn');
    };

    return (
        <SafeAreaView className="flex-1 bg-background">
            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                <LinearGradient
                    colors={['rgba(139, 92, 246, 0.4)', 'rgba(17, 24, 39, 0)']}
                    start={{x: 0.5, y: 0}}
                    end={{x: 0.5, y: 1}}
                    className="px-6 pt-8 pb-12"
                >
                    <Animated.View
                        style={{
                            opacity: fadeAnim,
                            transform: [
                                {translateY: slideAnim},
                                {scale: scaleAnim}
                            ]
                        }}
                    >
                        <ProfileHeader user={user}/>
                        <StatsCard bookmarks={bookmarks.length}/>
                    </Animated.View>
                </LinearGradient>

                <SettingItem title="Account" fadeAnim={fadeAnim} slideAnim={slideAnim}>
                    <SettingsItemBtn
                        icon={<LogOut size={20} color="#EF4444" />}
                        title="Sign Out"
                        onPress={handleSignOut}
                        showBorder={false}
                    />
                </SettingItem>

                {/* App Version */}
                <Animated.View
                    className="py-8 items-center"
                    style={{
                        opacity: fadeAnim
                    }}
                >
                    <View className="bg-background-light/40 px-5 py-2 rounded-full"
                          style={{
                              borderWidth: 1,
                              borderColor: "rgba(55, 65, 81, 0.2)"
                          }}
                    >
                        <Text className="text-gray-400 text-xs">NewsCurator v1.0.0</Text>
                    </View>
                </Animated.View>
            </ScrollView>
        </SafeAreaView>
    );
}