import {useEffect, useState} from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {useMutation} from "@tanstack/react-query";
import {useNavigate, useSearchParams} from "react-router";
import type {ApiResponse} from "@/lib/ApiResponse.ts";
import {getUrl} from "@/lib/actions.ts";

const COOLDOWN_INTERVAL = 60 * 1000; // 1 minute in milliseconds

function EmailNotActivePage() {
    const [searchParams] = useSearchParams();
    const email = searchParams.get("email");
    const navigate = useNavigate();

    const lastResend = localStorage.getItem("lastResend");

    const [cooldown, setCooldown] = useState(() => {
        if (lastResend) {
            const timeElapsed = Date.now() - parseInt(lastResend, 10);
            if (timeElapsed < COOLDOWN_INTERVAL) {
                return Math.ceil((COOLDOWN_INTERVAL - timeElapsed) / 1000);
            }
        }
        return 0;
    });

    useEffect(() => {
        if (cooldown > 0) {
            const timer = setInterval(() => {
                setCooldown((prev) => prev - 1);
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [cooldown]);

    useEffect(() => {
        if (!email) {
            navigate("/login");
        }
    }, [email, navigate]);

    const mutation = useMutation({
        mutationFn: async () => {
            const response = await fetch(getUrl(`/api/auth/resend-token?email=${encodeURIComponent(email || "")}`), {
                method: "GET",
            });
            return await response.json() as ApiResponse;
        },
        onSuccess: () => {
            localStorage.setItem("lastResend", Date.now().toString());
            setCooldown(COOLDOWN_INTERVAL / 1000);
        },
        onError: (error) => {
            console.error(error);
        },
    });

    if (!email) {
        return null;
    }

    return (
        <Paper sx={{minWidth: 420}} elevation={4} className={"pt-8 pb-8 pl-12 pr-12 flex flex-col items-center gap-4"}>
            <Typography>
                Your email has not been verified yet.
            </Typography>
            <Button disabled={cooldown > 0} onClick={() => mutation.mutate()}>
                Re-send verification {cooldown > 0 ? `(${cooldown}s)` : ""}
            </Button>
            <Typography>
                please check your inbox for verification
            </Typography>
        </Paper>
    )
}

export default EmailNotActivePage;