import useAccountInfo from "@/hooks/useAccountInfo.ts";
import AccountAvatar from "@/components/AccountAvatar/AccountAvatar.tsx";
import ThemeSwitch from "@/components/ThemeSwitch/ThemeSwitch.tsx";

function ExperimentPage() {
    const { account } = useAccountInfo();
    return (
        <div className={"w-screen h-screen flex justify-center items-center gap-3"}>
            <div>
                <ThemeSwitch />
            </div>
            <div>
                { account && <AccountAvatar {...account} /> }
            </div>
        </div>
    )
}

export default ExperimentPage;