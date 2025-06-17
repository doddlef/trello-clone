import Box from "@mui/material/Box";
import {Route, Routes} from "react-router";
import {lazy} from "react";

const Home = lazy(() => import("./Page.tsx"));
const Login = lazy(() => import("./login/Layout.tsx"));
const SignUp = lazy(() => import("./sign-up/Layout.tsx"));
const EmailActive = lazy(() => import("./email/active/Layout.tsx"));
const NotFound = lazy(() => import("./not-found/Page.tsx"));
const Test = lazy(() => import("./test/Page.tsx"));

function Layout() {
    return (
        <Box
            aria-label={"App Layout"}
            sx={{backgroundColor: "background.default"}}
            className={"min-h-screen"}
        >
            <Routes>
                <Route index element={<Home />} />
                <Route path={"/login/*"} element={<Login />} />
                <Route path={"/sign-up/*"} element={<SignUp />} />
                <Route path={"/email/active/*"} element={<EmailActive />} />
                <Route path={"/test/*"} element={<Test />} />
                <Route path={"*"} element={<NotFound />} />
                {/* Add more routes as needed */}
            </Routes>
        </Box>
    )
}

export default Layout;