import Box from "@mui/material/Box";
import {Route, Routes} from "react-router";
import Page from "@/pages/Page.tsx";
import {lazy} from "react";

const Login = lazy(() => import("./login/Layout.tsx"));
const SignUp = lazy(() => import("./sign-up/Layout.tsx"));

function Layout() {
    return (
        <Box
            aria-label={"App Layout"}
            sx={{backgroundColor: "background.default"}}
            className={"min-h-screen"}
        >
            <Routes>
                <Route index element={<Page />} />
                <Route path={"/login/*"} element={<Login />} />
                <Route path={"/sign-up/*"} element={<SignUp />} />
            </Routes>
        </Box>
    )
}

export default Layout;