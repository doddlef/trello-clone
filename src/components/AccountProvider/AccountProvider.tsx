import {useQuery} from "@tanstack/react-query";
import {accountInfo} from "@/lib/actions.ts";
import {AccountContext} from "@/hooks/useAccountInfo.ts";

function AccountProvider({ children }: { children?: React.ReactNode}) {
    const { data, isLoading, error } = useQuery({
        queryKey: ["account"],
        queryFn: accountInfo,
    });

    return (
        <AccountContext.Provider value={{ account: data?.data?.account, isLoading, error }}>
            {children}
        </AccountContext.Provider>
    )
}

export default AccountProvider;