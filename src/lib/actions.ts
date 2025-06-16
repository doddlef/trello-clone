import type {ApiResponse} from "@/lib/ApiResponse.ts";
import type {Account} from "@/lib/user.ts";

export function getUrl(url: string): string {
    return `${import.meta.env.VITE_APP_BASE_URL}${url}`;
}

export interface EmailPasswordAuthParams {
    email: string;
    password: string;
}

export type EmailPasswordAuthResponse = ApiResponse & {
    data?: {
        account: Account
    }
}

export async function emailPasswordAuth({ email, password }: EmailPasswordAuthParams): Promise<EmailPasswordAuthResponse> {
    const response = await fetch(getUrl("/api/auth"), {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email,
            password
        }),
        credentials: "include",
    });
    return response.json();
}

export interface EmailPasswordRegisterParams {
    email: string;
    password: string;
    nickname: string;
}

export type EmailPasswordRegisterResponse = ApiResponse & {
    data?: {
        accountUid: string
    }
}

export async function emailPasswordRegister(
    { email, password, nickname } : EmailPasswordRegisterParams
): Promise<EmailPasswordRegisterResponse> {
    const response = await fetch(getUrl("/api/auth/register"), {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email,
            password,
            nickname
        }),
        credentials: "include",
    });
    return response.json();
}