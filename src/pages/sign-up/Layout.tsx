import AuthHeader from "@/components/AuthHeader/AuthHeader.tsx";
import {Route, Routes} from "react-router";
import SignUpPage from "./Page.tsx";
import {lazy} from "react";

const SuccessPage = lazy(() => import("./success/Page.tsx"))

function Layout() {
    return (
        <div className={"w-screen h-screen overflow-hidden relative"}>
            <AuthHeader />
            <div className={"w-full h-full flex flex-col items-center justify-center"}>
                <Routes>
                    <Route index element={<SignUpPage />} />
                    <Route path={"/success/*"} element={<SuccessPage />} />
                </Routes>
            </div>
        </div>
    )
}

export default Layout