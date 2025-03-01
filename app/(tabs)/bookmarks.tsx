import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useFocusEffect, useRouter} from 'expo-router';
import {useDispatch, useSelector} from 'react-redux';
import {BookmarkCheck} from 'lucide-react-native';
import PageHeader from "../../components/home/ui/PageHeader";
import {deleteNews, getBookmarkedNews} from '../../reducers/newsReducer';
import {News} from '../../model/News';
import {RootState, AppDispatch} from '../../store/store';
import NewsList from "../../components/home/ui/NewsList";

export default function BookmarksScreen() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();

    const bookmarkedArticles = useSelector((state: RootState) => state.newsReducer.bookmarked);
    const user = useSelector((state: RootState) => state.userReducer.user);

    useFocusEffect(
        React.useCallback(() => {
            console.log('BookmarkScreen useFocusEffect');
            setLoading(true);
            dispatch(getBookmarkedNews(user.id)).then(() => setLoading(false));
            return () => {
                console.log('Cleanup useFocusEffect');
            };
        }, [])
    );

    const goToArticleDetail = (index: number) => {
        router.push(`/article/bookmark-${index}`);
    };

    const handleBookmark = (news: News, index: number) => {
        dispatch(deleteNews({ userId: Number(user.id), newsId: news.id!, index: `bookmark-${index}` }));
    };

    return (
        <SafeAreaView className="flex-1 bg-background">
            <View className="flex-1 px-4">
                {/* Header */}
                <PageHeader
                    title={'Bookmarks'}
                    subtitle={'Your saved articles'}
                />

                {/* Bookmarked Articles */}
                {loading ? (
                    <View className="flex-1 justify-center items-center">
                        <ActivityIndicator size="large" color="#8B5CF6"/>
                    </View>
                ) : bookmarkedArticles.length === 0 ? (
                    <View className="flex-1 justify-center items-center p-4">
                        <BookmarkCheck size={64} color="#6B7280"/>
                        <Text className="text-white text-xl mt-4 text-center">No bookmarks yet</Text>
                        <Text className="text-gray-400 mt-2 text-center">
                            Articles you bookmark will appear here
                        </Text>
                        <TouchableOpacity
                            className="mt-6 bg-primary px-6 py-3 rounded-xl"
                            onPress={() => router.push('/(tabs)')}
                        >
                            <Text className="text-white font-medium">Discover Articles</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <NewsList
                        articles={bookmarkedArticles}
                        loadingMore={false}
                        refreshing={false}
                        onRefresh={() => {}}
                        onLoadMore={() => {}}
                        onArticlePress={goToArticleDetail}
                        onBookmarkToggle={handleBookmark}
                        scrollToTopTrigger={false}
                    />
                )}
            </View>
        </SafeAreaView>
    );
}