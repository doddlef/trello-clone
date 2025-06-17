import {useNavigate, useSearchParams} from "react-router";
import {useQuery} from "@tanstack/react-query";
import {emailActive} from "@/lib/actions.ts";
import EmailActivePage from "./Page.tsx";
import AuthHeader from "@/components/AuthHeader/AuthHeader.tsx";
import Paper from "@mui/material/Paper";
import {motion} from "framer-motion";
import {ResponseCode} from "@/lib/ApiResponse.ts";
import * as React from "react";

function Layout() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const token = searchParams.get("token");

    React.useEffect(() => {
        if (!token)
            navigate("/not-found", {replace: true});
        }, [token, navigate]);

    const { isPending, isError, data, error } = useQuery({
        queryKey: ["email-active", token],
        queryFn: () => emailActive({
            token: token as string,
        }),
        enabled: !!token,
    });

    if (!token) return null;

    return (
        <div className={"w-screen h-screen overflow-hidden relative"}>
            <AuthHeader />
            <div className={"w-full h-full flex flex-col items-center justify-center"}>
                <Paper
                    elevation={4}
                    component={motion.div}
                    animate={{
                        width: "fit-content",
                        height: "fit-content",
                    }}
                    className={"p-12 flex flex-col items-center justify-center gap-4"}
                >
                    <EmailActivePage
                        state={isPending ? "pending" : (!isError && data?.code == ResponseCode.SUCCESS ? "success" : "error")}
                        message={isPending ? "pending..." : isError ? error.message : data?.message}
                    />
                </Paper>
            </div>
        </div>
    )
}

export default Layout;