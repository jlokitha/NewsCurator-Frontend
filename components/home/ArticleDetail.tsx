import {Stack} from "expo-router";
import {Image, ScrollView, Text, View} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import {Calendar, Clock} from "lucide-react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import React from "react";
import {News} from "../../model/News";
import {timeAgo} from "../../utils/timeUtil";
import ReadFullArticleButton from "./article/ReadFullArticleButton";
import BackButton from "./article/BackButton";
import BookmarkButton from "./article/BookmarkButton";

interface ArticleDetailProps {
    article: News
    toggleBookmark: () => void
}

export const ArticleDetail: React.FC<ArticleDetailProps> = ({article, toggleBookmark}) => (
    <SafeAreaView className="flex-1 bg-background">
        <Stack.Screen options={{headerShown: false}}/>

        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
            {/* Header Image */}
            <View className="relative">
                {article.urlToImage ? (
                    <Image
                        source={{uri: article.urlToImage}}
                        className="w-full h-64"
                        style={{resizeMode: 'cover'}}
                    />
                ) : (
                    <View className="w-full h-64 bg-gray-700 justify-center items-center">
                        <Text className="text-gray-400">No Image Available</Text>
                    </View>
                )}

                {/* Gradient overlay */}
                <LinearGradient
                    colors={['rgba(0,0,0,0.7)', 'transparent']}
                    style={{position: 'absolute', top: 0, left: 0, right: 0, height: 100}}
                />

                {/*Back button */}
                <BackButton/>

                {/* Action buttons */}
                <BookmarkButton isBookmarked={article.isBookmarked} toggleBookmark={toggleBookmark}/>
            </View>

            {/* Article Content */}
            <View className="p-4">
                {/* Title and metadata */}
                <Text className="text-white text-2xl font-bold mb-3">{article.title}</Text>

                <View className="flex-row items-center mb-4">
                    <Text className="text-primary-light font-medium">
                        {article.source.name}
                    </Text>
                    <View className="w-1 h-1 rounded-full bg-gray-500 mx-2"/>
                    <View className="flex-row items-center">
                        <Clock size={14} color="#9CA3AF" className="mr-1"/>
                        <Text className="text-gray-400 text-sm">{timeAgo(article.publishedAt)}</Text>
                    </View>
                </View>

                {/* Description */}
                {article.description && (
                    <Text className="text-gray-200 text-lg mb-4 leading-relaxed">
                        {article.description}
                    </Text>
                )}

                {/* Divider */}
                <View className="h-px bg-gray-700 my-4"/>

                {/* Full content */}
                <Text className="text-gray-300 text-base leading-relaxed mb-6">
                    {article.content}
                </Text>

                {/* Publication date */}
                <View className="flex-row items-center mt-2 mb-6">
                    <Calendar size={16} color="#9CA3AF" className="mr-2"/>
                    <Text className="text-gray-400">Published
                        on {new Date(article.publishedAt).toLocaleDateString()}</Text>
                </View>

                {/* Source link */}
                <ReadFullArticleButton
                    url={article.url}
                    sourceName={article.source.name || 'Unknown Source'}
                />
            </View>
        </ScrollView>
    </SafeAreaView>
);