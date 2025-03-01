import axios from "axios";
import * as SecureStore from "expo-secure-store";

export const refreshTokenCall = async (): Promise<string> => {
    console.log('Refreshing token...');
    const refreshToken = (await SecureStore.getItemAsync("refresh_token")) || "";
    if (!refreshToken) {
        throw new Error("No refresh token available");
    }
    try {
        const response = await axios.post(
            "http://192.168.43.254:5000/api/v1/auth/refresh-token",
            null,
            {
                headers: {
                    Authorization: `Bearer ${refreshToken}`,
                },
            }
        );
        const newToken = response.data.accessToken;
        console.log("New token acquired:", newToken);
        await SecureStore.setItemAsync("access_token", newToken);
        return newToken;
    } catch (error) {
        console.error("Failed to refresh token", error);
        throw error;
    }
};
