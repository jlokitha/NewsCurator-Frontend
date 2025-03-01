import {News} from "../model/News";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import api from "../api/api";
import {isEqual} from 'lodash';

const initialState: { news: News[], bookmarked: News[] } = { news: [], bookmarked: [] };

export const saveNews = createAsyncThunk(
    "news/saveNews",
    async ({userId, news, index}: { userId: number, news: any, index: number }) => {
        try {
            const response = await api.post(`/news/${userId}`, news);
            return {news: response.data, index};
        } catch (err) {
            console.log('Error', err);
            return news;
        }
    }
);

export const deleteNews = createAsyncThunk(
    "news/deleteNews",
    async ({userId, newsId, index}: { userId: number, newsId: number, index: number }) => {
        try {
            await api.delete(`/news/${userId}/${newsId}`);
            return { newsId, index };
        } catch (err) {
            console.log('Error', err);
            return { newsId, index };
        }
    }
);

export const getNews = createAsyncThunk(
    "news/getNews",
    async ({page, userId}: { page: number, userId: number }) => {
        try {
            const response = await api.get(`/news/${userId}/${page}`);
            return {data: response.data, page: page};
        } catch (err) {
            console.log('Error', err);
            return [];
        }
    }
);

export const getNewsByKeywords = createAsyncThunk(
    "news/getNewsByKeywords",
    async ({keywords, page, userId}: { keywords: string, page: number, userId: number }) => {
        try {
            const response = await api.get(`/news/keyword/${keywords}/${userId}/${page}`);
            return {data: response.data, page: page};
        } catch (err) {
            console.log('Error', err);
            return [];
        }
    }
);

const newsReducer = createSlice({
    name: "news",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(saveNews.fulfilled, (state, action) => {
                const {news, index} = action.payload;
                if (index !== -1 && index < state.news.length) {
                    state.news[index] = news;
                } else {
                    state.news.push(news);
                }
            });
        builder
            .addCase(deleteNews.fulfilled, (state, action) => {
                const {newsId, index} = action.payload;
                state.bookmarked = state.bookmarked.filter(news => news.id !== newsId);
                state.news[index].isBookmarked = false;
            });
        builder.addCase(getNews.fulfilled, (state, action) => {
            const {data, page} = action.payload;
            if (page === 1) {
                state.news = data;
            } else {
                const newArticles = data.filter((newArticle: News) =>
                    !state.news.some(existingArticle => isEqual(existingArticle, newArticle))
                );
                state.news = [...state.news, ...newArticles];
            }
        });
        builder.addCase(getNewsByKeywords.fulfilled, (state, action) => {
            const {data, page} = action.payload;
            if (page === 1) {
                state.news = data;
            } else {
                const newArticles = data.filter((newArticle: News) =>
                    !state.news.some(existingArticle => isEqual(existingArticle, newArticle))
                );
                state.news = [...state.news, ...newArticles];
            }
        });
    }
});

export default newsReducer.reducer;
