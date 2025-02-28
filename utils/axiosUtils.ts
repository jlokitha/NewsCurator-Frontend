import {refreshToken} from "../reducers/userReducer";
import {useAppDispatch} from "../store/hooks";
import * as SecureStore from 'expo-secure-store';

export const useRefreshToken = async () => {
    const refresh_token = await SecureStore.getItemAsync('refresh_token') || '';
    console.log('Refresh token', refresh_token);
    return async () => {
        useAppDispatch()(refreshToken(refresh_token));
    };
}

export const useAccessToken = async () => {
    const token = await SecureStore.getItemAsync('access_token')
    console.log('Access token', token);
    return token;
}