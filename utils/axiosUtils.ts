import * as SecureStore from 'expo-secure-store';

export const useAccessToken = async () => {
    return await SecureStore.getItemAsync('access_token');
}