import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Bookmark, BookmarkCheck, Clock, Calendar } from 'lucide-react-native';
import {News} from "../../model/News";
import {timeAgo} from "../../utils/timeUtil";
import BookmarkButton from "./article/BookmarkButton";

interface ArticleCardProps {
    news: News;
    onPress: () => void;
    onBookmarkToggle: () => void;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ news, onPress, onBookmarkToggle }) => (
    <TouchableOpacity
        className="mb-4 rounded-xl overflow-hidden bg-background-light"
        style={{ elevation: 3 }}
        onPress={onPress}
    >
        <View>
            {news.urlToImage ? (
                <Image
                    source={{ uri: news.urlToImage }}
                    className="w-full h-48"
                    style={{ resizeMode: 'cover' }}
                />
            ) : (
                <View className="w-full h-48 bg-gray-700 justify-center items-center">
                    <Text className="text-gray-400">No Image Available</Text>
                </View>
            )}

            <BookmarkButton isBookmarked={news.isBookmarked ?? false} toggleBookmark={onBookmarkToggle}/>
        </View>

        <View className="p-4">
            <View className="flex-row items-center mb-2">
                <Text className="text-primary-light font-medium text-sm">
                    {news.source.name}
                </Text>
                <View className="w-1 h-1 rounded-full bg-gray-500 mx-2" />
                <View className="flex-row items-center">
                    <Clock size={12} color="#9CA3AF" />
                    <Text className="text-gray-400 text-xs ml-1">{timeAgo(news.publishedAt)}</Text>
                </View>
            </View>

            <Text className="text-white text-lg font-bold mb-2 leading-tight">{news.title}</Text>

            {news.description && (
                <Text className="text-gray-300 text-sm mb-3" numberOfLines={2}>
                    {news.description}
                </Text>
            )}

            <View className="flex-row items-center justify-between">
                <View className="flex-row items-center">
                    <Calendar size={14} color="#9CA3AF" />
                    <Text className="text-gray-400 text-xs ml-1">
                        {new Date(news.publishedAt).toLocaleDateString()}
                    </Text>
                </View>

                <TouchableOpacity className="flex-row items-center">
                    <Text className="text-primary-light text-sm font-medium mr-1">Read more</Text>
                </TouchableOpacity>
            </View>
        </View>
    </TouchableOpacity>
);

export default ArticleCard;
