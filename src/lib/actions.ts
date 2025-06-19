import {type ApiResponse, ResponseCode} from "@/lib/ApiResponse.ts";
import type {Account} from "@/lib/user.ts";

export function getUrl(url: string): string {
    return `${import.meta.env.VITE_APP_BASE_URL}${url}`;
}

export interface EmailPasswordAuthParams {
    email: string;
    password: string;
}

export type EmailPasswordAuthResponse = ApiResponse & {
    data: {
        account: Account
    }
}

export async function emailPasswordAuth({ email, password }: EmailPasswordAuthParams): Promise<ApiResponse> {
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
    data: {
        accountUid: string
    }
}

export async function emailPasswordRegister(
    { email, password, nickname } : EmailPasswordRegisterParams
): Promise<ApiResponse> {
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

export type EmailActiveParams = {
    token: string;
}

export type EmailActiveResponse = EmailPasswordAuthResponse

export async function emailActive(
    { token } : EmailActiveParams
) : Promise<EmailActiveResponse> {
    const response = await fetch(getUrl("/api/auth/active"), {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            token
        }),
        credentials: "include",
    });
    return response.json();
}

export async function logout(): Promise<ApiResponse> {
    const response = await fetch(getUrl("/api/auth/logout"), {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
    });
    return response.json();
}

export async function tokenRefresh(): Promise<ApiResponse> {
    const response = await fetch(getUrl("/api/auth/resend-token"), {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
    });
    return response.json();
}

export async function refreshableResponse(
    url: string,
    init?: RequestInit,
): Promise<ApiResponse> {
    const fetchWithCreds = (u: string, i?: RequestInit) =>
        fetch(getUrl(u), { ...i, credentials: "include" });

    let response = await fetchWithCreds(url, init);

    if (response.ok) return response.json();

    let obj: ApiResponse;
    try {
        obj = await response.json();
    } catch {
        return {
            code: ResponseCode.ERROR,
            message: "Unknown error occurred",
        } as ApiResponse;
    }

    if (response.status === 401 && obj.code === ResponseCode.TOKEN_EXPIRED) {
        const refreshResponse = await tokenRefresh();
        if (refreshResponse.code === ResponseCode.SUCCESS) {
            response = await fetchWithCreds(url, init);
            if (response.ok) return response.json();
            try {
                return await response.json();
            } catch {
                return {
                    code: ResponseCode.ERROR,
                    message: "Unknown error occurred after token refresh",
                } as ApiResponse;
            }
        } else {
            return refreshResponse;
        }
    }

    return obj;
}

export type AccountInfoResponse = ApiResponse & {
    data?: {
        account: Account
    }
}

export async function accountInfo(): Promise<AccountInfoResponse> {
    const response = await refreshableResponse("/api/account/me", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    });
    return response as AccountInfoResponse;
}