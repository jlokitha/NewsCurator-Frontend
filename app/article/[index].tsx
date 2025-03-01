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
    const user = useSelector((state: RootState) => state.userReducer.user);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        const foundArticle = news[Number(index.index)];

        if (foundArticle) {
            setArticle(foundArticle);
            setIsBookmarked(foundArticle.isBookmarked || false);
        }

        setLoading(false);
    }, [index]);

    const toggleBookmark = () => {
        if (!article) return;

        const sourceName = typeof article.source === 'string' ? article.source : article.source.name;
        const data = {
            source: sourceName,
            author: article.author,
            title: article.title,
            description: article.description,
            url: article.url,
            urlToImage: article.urlToImage,
            publishedAt: article.publishedAt,
            content: article.content,
        };

        if (isBookmarked) {
            dispatch(deleteNews({ userId: Number(user.id), newsId: article.id!, index: Number(index.index) }));
        } else {
            dispatch(saveNews({ userId: Number(user.id), news: data, index: Number(index.index) }));
        }

        setIsBookmarked(!isBookmarked);
    };

    const shareArticle = async () => {
        if (!article) return;

        try {
            await Share.share({
                message: `Check out this article: ${article.title} - ${article.url}`,
                url: article.url,
                title: article.title,
            });
        } catch (error) {
            console.error('Error sharing article:', error);
        }
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