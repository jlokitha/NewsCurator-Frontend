import React from 'react';
import {View, TextInput, TouchableOpacity, Text} from 'react-native';
import {Search} from 'lucide-react-native';

interface SearchBarProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    onSubmit: () => void;
    onClear: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({searchQuery, setSearchQuery, onSubmit, onClear}) => (
    <View className="my-4">
        <View className="flex-row items-center bg-background-light px-4 py-3">
            <Search size={20} color="#6B7280"/>
            <TextInput
                className="flex-1 text-white text-base ml-2"
                placeholder="Search for news..."
                placeholderTextColor="#6B7280"
                value={searchQuery}
                onChangeText={setSearchQuery}
                onSubmitEditing={onSubmit}
            />
            {searchQuery.length > 0 && (
                <TouchableOpacity onPress={() => onClear()}>
                    <Text className="text-gray-400">Clear</Text>
                </TouchableOpacity>
            )}
        </View>
    </View>
);

export default SearchBar;
