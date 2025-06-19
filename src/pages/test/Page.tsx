import useAccountInfo from "@/hooks/useAccountInfo.ts";
import AccountAvatar from "@/components/AccountAvatar/AccountAvatar.tsx";
import ThemeSwitch from "@/components/ThemeSwitch/ThemeSwitch.tsx";
import * as React from "react";
import {useMutation} from "@tanstack/react-query";
import {logout} from "@/lib/actions.ts";
import Button from "@mui/material/Button";

function ExperimentPage() {
    const { account } = useAccountInfo();

    const mutation = useMutation({
        mutationKey: ["logout"],
        mutationFn: logout,
    });

    const element = React.useMemo(() => {
        if (account) {
            return (
                <>
                    <div><AccountAvatar {...account} /></div>
                    <div>{account.nickname}</div>
                    <Button onClick={() => mutation.mutate()}>logout</Button>
                </>
            )
        } else {
            <div>have not log in</div>
        }
    }, [account, mutation])


    return (
        <div className={"w-screen h-screen flex justify-center items-center gap-3"}>
            <div>
                <ThemeSwitch />
            </div>
            {element}
        </div>
    )
}

export default ExperimentPage;