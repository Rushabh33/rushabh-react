import { FormInputProps } from "./Login";
import { SERVER_ROUTES } from "../../constants";
import { AuthState } from "../../context/AuthContext";

export const getAuthTokens = async (data: FormInputProps) => {
    try {
        const req = await fetch(`${SERVER_ROUTES.BASE_URL + SERVER_ROUTES.AUTHENTICATE}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
            body: JSON.stringify({ email: data.email, password: data.password }),
            // body: JSON.stringify({ email: 'bob@example.com', password: 'password' }),
        });

        if (!req.ok) {
            throw new Error('Failed to log in');
        }

        const response = await req.json();
        return response
    } catch (err) {
        throw err
    }
}

export const saveCredentialsToSession = (tokens: {
    accessToken: string,
    refreshToken: string,
    expiresAt: string
    [key: string]: string;
}) => {
    for (const property in tokens) {
        const value = tokens[property];
        sessionStorage.setItem(property, value);
    }
}

export const removeCredentialsFromSession = (tokens: {
    accessToken: string | null,
    refreshToken: string | null,
    expiresAt: string | null
}) => {
    for (const property in tokens) {
        sessionStorage.removeItem(property);
    }
}