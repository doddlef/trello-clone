import Page from "./Page.tsx";
import AuthHeader from "@/components/AuthHeader/AuthHeader.tsx";
import {Route, Routes} from "react-router";
import {lazy} from "react";

const ResendEmail = lazy(() => import("@/pages/login/resend-email/Page.tsx"));

function Layout() {
    return (
        <div className={"w-screen h-screen overflow-hidden relative"}>
            <AuthHeader />
            <div className={"w-full h-full flex flex-col items-center justify-center"}>
                <Routes>
                    <Route index element={<Page />} />
                    <Route path={"/resend-email/*"} element={<ResendEmail />} />
                </Routes>
            </div>
        </div>
    )
}

export default Layout