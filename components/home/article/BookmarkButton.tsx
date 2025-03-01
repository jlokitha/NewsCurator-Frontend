import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Bookmark, BookmarkCheck} from 'lucide-react-native';

interface BookmarkButtonProps {
    isBookmarked: boolean;
    toggleBookmark: () => void;
}

const BookmarkButton: React.FC<BookmarkButtonProps> = ({isBookmarked, toggleBookmark}) => (
    <View className="absolute top-4 right-4 flex-row">
        <TouchableOpacity
            className="w-10 h-10 rounded-full bg-black/50 justify-center items-center"
            onPress={toggleBookmark}
        >
            {isBookmarked ? (
                <BookmarkCheck size={20} color="#A78BFA"/>
            ) : (
                <Bookmark size={20} color="white"/>
            )}
        </TouchableOpacity>
    </View>
);

export default BookmarkButton;