import Page from "./Page.tsx";
import AuthHeader from "@/components/AuthHeader/AuthHeader.tsx";

function Layout() {
    return (
        <div className={"w-screen h-screen overflow-hidden relative"}>
            <AuthHeader />
            <div className={"w-full h-full flex flex-col items-center justify-center"}>
                <Page />
            </div>
        </div>
    )
}

export default Layout