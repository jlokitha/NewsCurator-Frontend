import React from 'react';
import {FlatList, TouchableOpacity, Text} from 'react-native';

interface ScrollableCategoriesProps {
    onCategorySelect: (category: string) => void;
    selectedCategory: string;
    setSelectedCategory: (category: string) => void;
}

const categories = [
    'All',
    'Technology',
    'Science',
    'Business',
    'Health',
    'Environment',
    'Politics',
    'Sports',
    'Entertainment'
];

const ScrollableCategories: React.FC<ScrollableCategoriesProps> = ({
                                                                       onCategorySelect,
                                                                       selectedCategory,
                                                                       setSelectedCategory,
                                                                   }) => (
    <FlatList
        className="mb-3.5 max-h-10 min-h-10"
        data={categories}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item}
        renderItem={({item}) => (
            <TouchableOpacity
                onPress={() => {
                    setSelectedCategory(item);
                    onCategorySelect(item);
                }}
                className={`mr-2 px-4 py-2 rounded-full ${
                    selectedCategory === item ? 'bg-primary' : 'bg-background-light'
                }`}
            >
                <Text
                    className={`${selectedCategory === item ? 'text-white font-medium' : 'text-gray-400'} min-h-10 max-h-10`}>
                    {item}
                </Text>
            </TouchableOpacity>
        )}
    />
);

export default ScrollableCategories;
