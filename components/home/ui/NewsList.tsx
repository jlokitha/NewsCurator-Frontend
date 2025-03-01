import React, {useEffect, useRef} from 'react';
import {FlatList, RefreshControl, ActivityIndicator} from 'react-native';
import {News} from "../../../model/News";
import ArticleCard from "../ArticleCard";

interface NewsListProps {
    articles: News[];
    loadingMore: boolean;
    refreshing: boolean;
    onRefresh: () => void;
    onLoadMore: () => void;
    onArticlePress: (index: number) => void;
    onBookmarkToggle: (news: News, index: number) => void;
    scrollToTopTrigger: boolean;
}

const NewsList: React.FC<NewsListProps> = ({
                                               articles,
                                               loadingMore,
                                               refreshing,
                                               onRefresh,
                                               onLoadMore,
                                               onArticlePress,
                                               onBookmarkToggle,
                                               scrollToTopTrigger,
                                           }) => {
    const flatListRef = useRef<FlatList>(null);

    useEffect(() => {
        if (scrollToTopTrigger && flatListRef.current) {
            flatListRef.current.scrollToOffset({offset: 0, animated: true});
        }
    }, [scrollToTopTrigger]);

    return (
        <FlatList
            ref={flatListRef}
            data={articles}
            renderItem={({item, index}) => (
                <ArticleCard
                    news={item}
                    onPress={() => onArticlePress(index)}
                    onBookmarkToggle={() => onBookmarkToggle(item, index)}
                />
            )}
            keyExtractor={(_, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: 20}}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#8B5CF6" colors={['#8B5CF6']}/>
            }
            onEndReached={onLoadMore}
            onEndReachedThreshold={0.5}
            ListFooterComponent={loadingMore ? <ActivityIndicator size="small" color="#8B5CF6"/> : null}
        />
    );
};

export default NewsList;
