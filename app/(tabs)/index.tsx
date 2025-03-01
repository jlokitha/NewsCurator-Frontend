import React, {useEffect, useState} from 'react';
import {View, ActivityIndicator} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../store/store';
import {deleteNews, getBookmarkedNews, getNews, getNewsByKeywords, saveNews} from '../../reducers/newsReducer';
import {News} from '../../model/News';
import NoArticle from "../../components/home/ui/NoArticle";
import ScrollableCategories from "../../components/home/ui/ScrollableCategories";
import NewsList from "../../components/home/ui/NewsList";

import SearchBar from "../../components/home/ui/SearchBar";
import {useFocusEffect, useRouter} from "expo-router";
import PageHeader from "../../components/home/ui/PageHeader";

export default function HomeScreen() {
    const [searchQuery, setSearchQuery] = useState('');
    const [page, setPage] = useState(1);
    const [currentQuery, setCurrentQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('All');

    const articles = useSelector((state: RootState) => state.newsReducer.news);
    const user = useSelector((state: RootState) => state.userReducer.user);
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();

    const scrollToTopTrigger = page === 1;

    useFocusEffect(
        React.useCallback(() => {
            console.log('HomeScreen useFocusEffect');
            setLoading(true);
            dispatch(getNews({page: 1, userId: Number(user.id)})).then(() => setLoading(false));
            return () => {
                console.log('Cleanup useFocusEffect');
            };
        }, [])
    );


    const handleSearchSubmit = () => {
        if (searchQuery.trim() !== '') {
            setPage(1);
            setSelectedCategory('All');
            setCurrentQuery(searchQuery);
            dispatch(getNewsByKeywords({keywords: searchQuery, page: 1, userId: Number(user.id)}));
        }
    };

    const handleClear = () => {
        setSearchQuery('');
        setLoading(true);
        dispatch(getNews({page: 1, userId: Number(user.id)})).then(() => setLoading(false));
    }

    const handleCategorySelect = (category: string) => {
        setPage(1);
        setCurrentQuery(category);
        setSearchQuery('');
        setSelectedCategory(category);
        if (category === 'All') {
            dispatch(getNews({page: 1, userId: Number(user.id)}));
        } else {
            dispatch(getNewsByKeywords({keywords: category, page: 1, userId: Number(user.id)}));
        }
    };

    const handleLoadMore = () => {
        if (!loadingMore) {
            setLoadingMore(true);
            const nextPage = page + 1;
            setPage(nextPage);
            const loadMoreAction =
                currentQuery.trim() !== ''
                    ? getNewsByKeywords({keywords: currentQuery, page: nextPage, userId: Number(user.id)})
                    : getNews({page: nextPage, userId: Number(user.id)});
            dispatch(loadMoreAction as any).finally(() => setLoadingMore(false));
        }
    };

    const onRefresh = () => {
        setRefreshing(true);
        setPage(1);
        if (currentQuery.trim() !== '') {
            dispatch(getNewsByKeywords({keywords: currentQuery, page: 1, userId: Number(user.id)}));
        } else {
            dispatch(getNews({page: 1, userId: Number(user.id)}));
        }
        setTimeout(() => setRefreshing(false), 1500);
    };

    const handleBookmark = (news: News, index: number) => {
        const data = {
            source: news.source.name,
            author: news.author,
            title: news.title,
            description: news.description,
            url: news.url,
            urlToImage: news.urlToImage,
            publishedAt: news.publishedAt,
            content: news.content,
        }
        if (news.isBookmarked) {
            dispatch(deleteNews({ userId: Number(user.id), newsId: news.id!, index: `news-${index}` }));
        } else {
            dispatch(saveNews({ userId: Number(user.id), news: data, index: `news-${index}` }));
        }
    };

    const goToArticleDetail = (index: number) => {
        router.push(`/article/news-${index}`);
    };

    return (
        <SafeAreaView className="flex-1 bg-background">
            <View className="flex-1 px-4">
                <PageHeader
                    title={'Discover'}
                    subtitle={'Get the latest news from around the world'}
                />
                <SearchBar
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    onSubmit={handleSearchSubmit}
                    onClear={handleClear}
                />
                <ScrollableCategories
                    onCategorySelect={handleCategorySelect}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                />
                {loading ? (
                    <View className="flex-1 justify-center items-center">
                        <ActivityIndicator size="large" color="#8B5CF6"/>
                    </View>
                ) : articles.length === 0 ? (
                    <NoArticle/>
                ) : (
                    <NewsList
                        articles={articles}
                        loadingMore={loadingMore}
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        onLoadMore={handleLoadMore}
                        onArticlePress={goToArticleDetail}
                        onBookmarkToggle={handleBookmark}
                        scrollToTopTrigger={scrollToTopTrigger}
                    />
                )}
            </View>
        </SafeAreaView>
    );
}
