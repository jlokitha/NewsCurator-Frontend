import React, { useState, useEffect } from 'react';
import {
    View,
    TouchableOpacity,
    Share,
    ActivityIndicator,
} from 'react-native';
import {deleteNews, saveNews} from '../../reducers/newsReducer';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft} from 'lucide-react-native';
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../store/store";
import {ArticleDetail} from "../../components/home/ArticleDetail";
import {News} from "../../model/News";
import {ArticleNotFound} from "../../components/article/ArticleNotFound";

export default function ArticleDetailScreen() {
    const router = useRouter();
    const index = useLocalSearchParams();
    const [article, setArticle] = useState<News>();
    const [loading, setLoading] = useState(true);
    const [isBookmarked, setIsBookmarked] = useState(false);

    const news = useSelector((state: RootState) => state.newsReducer.news)
    const bookmarkedArticles = useSelector((state: RootState) => state.newsReducer.bookmarked);
    const user = useSelector((state: RootState) => state.userReducer.user);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        let foundArticle: News | undefined;
        const indexValue = Array.isArray(index.index) ? index.index[0] : index.index;

        if (indexValue.startsWith('news-')) {
            foundArticle = news[Number(indexValue.replace('news-', ''))];
        } else if (indexValue.startsWith('bookmark-')) {
            foundArticle = bookmarkedArticles[Number(indexValue.replace('bookmark-', ''))];
        }

        if (foundArticle) {
            setArticle(foundArticle);
            setIsBookmarked(foundArticle.isBookmarked || false);
        }

        setLoading(false);
    }, [index, news, bookmarkedArticles]);

    const toggleBookmark = () => {
        if (!article) return;

        const data = {
            source: article.source.name,
            author: article.author,
            title: article.title,
            description: article.description,
            url: article.url,
            urlToImage: article.urlToImage,
            publishedAt: article.publishedAt,
            content: article.content,
        };

        const indexValue = Array.isArray(index.index) ? index.index[0] : index.index;

        if (isBookmarked) {
            console.log('Deleting bookmark');
            dispatch(deleteNews({ userId: Number(user.id), newsId: article.id!, index: indexValue }));
        } else {
            console.log('Saving bookmark');
            dispatch(saveNews({ userId: Number(user.id), news: data, index: indexValue }));
        }

        setIsBookmarked(!isBookmarked);
    };

    if (loading) {
        return (
            <SafeAreaView className="flex-1 bg-background">
                <View className="flex-1 justify-center items-center">
                    <ActivityIndicator size="large" color="#8B5CF6" />
                </View>
            </SafeAreaView>
        );
    }

    if (!article) {
        return (
            <ArticleNotFound />
        );
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#000' }}>
            <Stack.Screen
                options={{
                    headerShown: true,
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => router.back()}>
                            <ArrowLeft color="#fff" size={24} />
                        </TouchableOpacity>
                    ),
                    headerTitle: '',
                    headerStyle: { backgroundColor: '#000' },
                }}
            />
            <ArticleDetail
                article={article}
                toggleBookmark={toggleBookmark}
            />
        </SafeAreaView>
    );
}