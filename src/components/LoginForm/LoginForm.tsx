import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PasswordIcon from '@mui/icons-material/Password';
import {Controller, useForm} from "react-hook-form";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import {useMutation} from "@tanstack/react-query";
import {emailPasswordAuth, type EmailPasswordAuthParams} from "@/lib/actions.ts";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import * as React from "react";
import {ResponseCode} from "@/lib/ApiResponse.ts";
import { motion } from 'framer-motion';

const defaultValues: EmailPasswordAuthParams = {
    email: "",
    password: "",
}

function LoginForm() {
    const { handleSubmit, control } = useForm({ defaultValues });
    const [ error, setError ] = React.useState<string | null>(null);

    const mutation = useMutation({
        mutationFn: (data: EmailPasswordAuthParams) => emailPasswordAuth(data),
        onSuccess: (data) => {
            if (data.code === ResponseCode.SUCCESS) {
                // TODO: Handle successful login, e.g., redirect to dashboard or show success message
                console.log("Login successful:", data);
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