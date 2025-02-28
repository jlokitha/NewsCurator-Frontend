import { News } from "../model/News";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api/api";
import { AxiosError } from "axios";
import { isEqual } from 'lodash';

const initialState: News[] = [];

export const getNews = createAsyncThunk(
    "news/getNews",
    async (page: number) => {
        try {
            const response = await api.get('/news/' + page);
            return { data: response.data, page: page };
        } catch (err) {
            const error = err as AxiosError;
            console.error(error);
            return [];
        }
    }
);

export const getNewsByKeywords = createAsyncThunk(
    "news/getNewsByKeywords",
    async ({ keywords, page }: { keywords: string, page: number }) => {
        try {
            const response = await api.get(`/news/keyword/${keywords}`, { params: { page } });
            return { data: response.data, page: page };
        } catch (err) {
            const error = err as AxiosError;
            console.error(error);
            return [];
        }
    }
);

const newsReducer = createSlice({
    name: "news",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getNews.fulfilled, (state, action) => {
            const { data, page } = action.payload;
            if (page === 1) {
                return data;
            } else {
                console.log('1')
                const newArticles = data.filter((newArticle: News) =>
                    !state.some(existingArticle => isEqual(existingArticle, newArticle))
                );
                return [...state, ...newArticles];
            }
        });
        builder.addCase(getNewsByKeywords.fulfilled, (state, action) => {
            const { data, page } = action.payload;
            if (page === 1) {
                return data;
            } else {
                console.log('2')
                const newArticles = data.filter((newArticle: News) =>
                    !state.some(existingArticle => isEqual(existingArticle, newArticle))
                );
                return [...state, ...newArticles];
            }
        });
    }
});

export default newsReducer.reducer;
