import type {Account} from "@/lib/user.ts";
import * as React from "react";

type AccountContextType = {
    account?: Account;
    setAccount: (account?: Account) => void;
    refresh: () => void;
    isLoading: boolean;
}

export const AccountContext = React.createContext<AccountContextType | undefined>(undefined);

const useAccountInfo = () => {
    const context = React.useContext(AccountContext);
    if (!context) throw new Error('useAccount must be used within AccountProvider');
    return context;
};

export default useAccountInfo;