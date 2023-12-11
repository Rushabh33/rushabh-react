import { saveCredentialsToSession } from "../components/login/login.utils";
import { SERVER_ROUTES } from "../constants";
import { AuthState } from "../context/AuthContext";

const refreshAccessToken = async (authState: AuthState) => {
    const { accessToken, refreshToken } = authState

    if (!refreshToken) {
        throw new Error('No refresh token available');
    }

    try {
        const req = await fetch(`${SERVER_ROUTES.BASE_URL + SERVER_ROUTES.REFRESH}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
            body: JSON.stringify({ accessToken, refreshToken }),
        });

        if (!req.ok) {
            throw new Error('Failed to refresh token');
        }

        const data = await req.json();

        saveCredentialsToSession(data)
        const newToken = data.accessToken as string
        return newToken

    } catch (error) {
        console.error('Error refreshing token:', error);
    }
};

export const refreshTokenIfNeeded = async (authState: AuthState): Promise<string | undefined | null> => {
    const expiresAt = authState.expiresAt

    if (expiresAt && new Date() > new Date(expiresAt)) {
        const newToken = await refreshAccessToken(authState);
        return newToken
    }

    return authState.accessToken
};