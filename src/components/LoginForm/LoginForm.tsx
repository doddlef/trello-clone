import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PasswordIcon from '@mui/icons-material/Password';
import {Controller, useForm} from "react-hook-form";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import {useMutation} from "@tanstack/react-query";
import {emailPasswordAuth, type EmailPasswordAuthParams, type EmailPasswordAuthResponse} from "@/lib/actions.ts";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import * as React from "react";
import {type ApiResponse, ResponseCode} from "@/lib/ApiResponse.ts";
import { motion } from 'framer-motion';
import {useNavigate} from "react-router";
import useAccountInfo from "@/hooks/useAccountInfo.ts";

const defaultValues: EmailPasswordAuthParams = {
    email: "",
    password: "",
}

type EmailNotVerifiedResponse = ApiResponse & {
    data: {
        email: string;
    }
}

function LoginForm() {
    const { handleSubmit, control } = useForm({ defaultValues });
    const [ error, setError ] = React.useState<string | null>(null);
    const navigate = useNavigate();
    const { setAccount } = useAccountInfo();

    const mutation = useMutation({
        mutationFn: (data: EmailPasswordAuthParams) => emailPasswordAuth(data),
        onSuccess: (data) => {
            if (data.code === ResponseCode.SUCCESS) {
                const verified = data as EmailPasswordAuthResponse;
                console.log("Login successful:", verified);
                setAccount(verified.data.account);
                navigate("/dashboard");
            } else if (data.code === ResponseCode.EMAIL_NOT_VERIFIED) {
                const notVerified = data as EmailNotVerifiedResponse
                navigate("/login/resend-email?email=" + encodeURIComponent(notVerified.data.email || ""));
            } else if (data.code === ResponseCode.BAD_CREDENTIALS) {
                setError("Email or password is incorrect.");
            } else {
                setError(data.message || "Login failed. Please try again.");
            }
        },
        onError: (error) => {
            console.error("Login failed:", error)
            setError("Login failed. Please try again later.")
        },
    })

    const onSubmit = (data: EmailPasswordAuthParams) => mutation.mutate(data)

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={"w-full flex flex-col items-center gap-3"}>
            { error && (
                <motion.div
                    className={"w-full overflow-hidden"}
                    initial={{
                        height: 0,
                    }}
                    animate={{
                        height: "fit-content",
                    }}
                >
                    <Alert severity={"error"} className={"w-full"}>
                        {error}
                    </Alert>
                </motion.div>
            )}
            <Controller
                name={'email'}
                control={control}
                rules={{ required: true }}
                render={({
                             field: { onChange, value },
                             fieldState: { error },
                         }) => (
                    <TextField
                        helperText={error ? error.message : null}
                        error={!!error}
                        onChange={onChange}
                        value={value}
                        fullWidth
                        label={"Email"}
                        type={"email"}
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position={"start"}>
                                        <EmailOutlinedIcon />
                                    </InputAdornment>
                                )
                            }
                        }}
                        placeholder={"email"}
                    />
                )}
            />
            <Controller
                name={'password'}
                control={control}
                rules={{ required: true }}
                render={({
                             field: { onChange, value },
                             fieldState: { error },
                         }) => (
                    <TextField
                        helperText={error ? error.message : null}
                        error={!!error}
                        onChange={onChange}
                        value={value}
                        fullWidth
                        label={"Password"}
                        type={"password"}
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position={"start"}>
                                        <PasswordIcon />
                                    </InputAdornment>
                                )
                            }
                        }}
                        placeholder={"password"}
                    />
                )}
            />
            <Button fullWidth type={"submit"}>Log in</Button>
        </form>
    )
}

export default LoginForm;