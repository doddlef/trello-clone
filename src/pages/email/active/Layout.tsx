import {useSearchParams} from "react-router";
import {useQuery} from "@tanstack/react-query";
import {emailActive} from "@/lib/actions.ts";
import EmailActivePage from "./Page.tsx";
import AuthHeader from "@/components/AuthHeader/AuthHeader.tsx";
import Paper from "@mui/material/Paper";
import {motion} from "framer-motion";
import {ResponseCode} from "@/lib/ApiResponse.ts";

function Layout() {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");

    // TODO: redirect to 404 if token is not provided or invalid
    const { isPending, isError, data, error } = useQuery({
        queryKey: ["email-active", token],
        queryFn: () => emailActive({
            token: token as string,
        }),
        enabled: !!token,
    });

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