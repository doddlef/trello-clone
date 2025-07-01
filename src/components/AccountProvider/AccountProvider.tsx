import {useQuery} from "@tanstack/react-query";
import {accountInfo, type AccountInfoResponse} from "@/lib/actions.ts";
import {AccountContext} from "@/hooks/useAccountInfo.ts";
import {useEffect, useState} from "react";
import type {Account} from "@/lib/user.ts";
import {ResponseCode} from "@/lib/ApiResponse.ts";

function AccountProvider({ children }: { children?: React.ReactNode }) {
    const [account, setAccount] = useState<Account | undefined>(undefined);

    const { data, isLoading, refetch } = useQuery({
        queryKey: ["account"],
        queryFn: accountInfo,
        retry: false,
    });

    useEffect(() => {
        if (data?.code === ResponseCode.SUCCESS) {
            const response = data as AccountInfoResponse
            setAccount(response.data?.account)
        } else {
            console.log(data?.message || "Failed to fetch account info");
            setAccount(undefined)
        }
    }, [data]);

    const refresh = () => {
        refetch();
    };

    return (
        <AccountContext.Provider value={{ account, setAccount, refresh, isLoading }}>
            {children}
        </AccountContext.Provider>
    );
}

export default AccountProvider;