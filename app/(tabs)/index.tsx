import React, {useEffect, useState} from 'react';
import {View, ActivityIndicator} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../store/store';
import {getNews, getNewsByKeywords} from '../../reducers/newsReducer';
import {News} from '../../model/News';
import NoArticle from "../../components/home/ui/NoArticle";
import DiscoverHeader from "../../components/home/ui/DiscoverHeader";
import ScrollableCategories from "../../components/home/ui/ScrollableCategories";
import NewsList from "../../components/home/ui/NewsList";
import SearchBar from "../../components/home/ui/SearchBar";

export default function HomeScreen() {
    const [searchQuery, setSearchQuery] = useState('');
    const [page, setPage] = useState(1);
    const [currentQuery, setCurrentQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('All');

    const articles = useSelector((state: RootState) => state.newsReducer);
    const dispatch = useDispatch<AppDispatch>();

    const scrollToTopTrigger = page === 1;

    useEffect(() => {
        setLoading(true);
        dispatch(getNews(1)).then(() => setLoading(false));
    }, [dispatch]);

    const handleSearchSubmit = () => {
        if (searchQuery.trim() !== '') {
            setPage(1);
            setSelectedCategory('All');
            setCurrentQuery(searchQuery);
            dispatch(getNewsByKeywords({keywords: searchQuery, page: 1}));
        }
    };

    const handleCategorySelect = (category: string) => {
        setPage(1);
        setCurrentQuery(category);
        setSearchQuery('');
        setSelectedCategory(category);
        if (category === 'All') {
            dispatch(getNews(1));
        } else {
            dispatch(getNewsByKeywords({keywords: category, page: 1}));
        }
    };

    const handleLoadMore = () => {
        if (!loadingMore) {
            setLoadingMore(true);
            const nextPage = page + 1;
            setPage(nextPage);
            const loadMoreAction =
                currentQuery.trim() !== ''
                    ? getNewsByKeywords({keywords: currentQuery, page: nextPage})
                    : getNews(nextPage);
            dispatch(loadMoreAction as any).finally(() => setLoadingMore(false));
        }
    };

    const onRefresh = () => {
        setRefreshing(true);
        setPage(1);
        if (currentQuery.trim() !== '') {
            dispatch(getNewsByKeywords({keywords: currentQuery, page: 1}));
        } else {
            dispatch(getNews(1));
        }
        setTimeout(() => setRefreshing(false), 1500);
    };

    const toggleBookmark = (news: News) => {
        // TODO: implement bookmark logic
    };

    const goToArticleDetail = (news: News) => {
        // TODO: implement navigation to article details
    };

    return (
        <SafeAreaView className="flex-1 bg-background">
            <View className="flex-1 px-4">
                <DiscoverHeader/>
                <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} onSubmit={handleSearchSubmit}/>
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
                        onBookmarkToggle={toggleBookmark}
                        scrollToTopTrigger={scrollToTopTrigger}
                    />
                )}
            </View>
        </SafeAreaView>
    );
}
