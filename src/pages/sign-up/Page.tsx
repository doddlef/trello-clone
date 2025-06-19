import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import {
    emailPasswordRegister,
    type EmailPasswordRegisterParams,
    type EmailPasswordRegisterResponse
} from "@/lib/actions.ts";
import {Controller, useForm} from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PasswordIcon from '@mui/icons-material/Password';
import FaceIcon from '@mui/icons-material/Face';
import {useMutation} from "@tanstack/react-query";
import {ResponseCode} from "@/lib/ApiResponse.ts";
import * as React from "react";
import { motion } from "framer-motion";
import Alert from "@mui/material/Alert";
import {useNavigate} from "react-router";

const defaultValues: EmailPasswordRegisterParams = {
    email: "",
    password: "",
    nickname: "",
}

function SignUpPage() {
    const { handleSubmit, control } = useForm({ defaultValues })
    const navigate = useNavigate();
    const [error, setError] = React.useState<string | null>(null);

    const { mutate, isPending } = useMutation({
        mutationFn: (data: EmailPasswordRegisterParams) => emailPasswordRegister(data),
        onSuccess: (data) => {
            if (data.code === ResponseCode.SUCCESS) {
                const result = data as EmailPasswordRegisterResponse
                navigate("/sign-up/success?accountUid=" + result.data.accountUid, { replace: true });
            } else {
                setError(data.message || "Registration failed. Please try again later.");
                console.log(data.message)
            }
        },
        onError: (error) => {
            setError("Registration failed. Please try again later.");
            console.error("Registration failed:", error);
        }
    });

    const onSubmit = (data: EmailPasswordRegisterParams) => {
        mutate(data)
    }

    return (
        <Paper sx={{minWidth: 480}} elevation={4} className={"p-8 flex flex-col items-center gap-3"}>
            <Typography variant={"h6"}>
                Sign up
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)} className={"w-full flex flex-col items-center gap-6"}>
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
                    name={"email"}
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
                            label={"email"}
                            type={"email"}
                            fullWidth
                            placeholder={"email"}
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment position={"start"}>
                                            <EmailOutlinedIcon />
                                        </InputAdornment>
                                    )
                                }
                            }}
                        />
                    )}
                />
                <Controller
                    name={"password"}
                    control={control}
                    rules={{
                        required: true,
                        pattern: {
                            value: /^(?=.*[A-Za-z])(?=.*\d).{8,}$/,
                            message: "Password must be at least 8 characters, include a letter and a number."
                        }}}
                    render={({
                                 field: { onChange, value },
                                 fieldState: { error },
                             }) => (
                        <TextField
                            helperText={error ? error.message : null}
                            error={!!error}
                            onChange={onChange}
                            value={value}
                            label={"password"}
                            type={"password"}
                            fullWidth
                            placeholder={"password"}
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment position={"start"}>
                                            <PasswordIcon />
                                        </InputAdornment>
                                    )
                                }
                            }}
                        />
                    )}
                />
                <Controller
                    name={"nickname"}
                    control={control}
                    rules={{ required: true}}
                    render={({
                                 field: { onChange, value },
                                 fieldState: { error },
                             }) => (
                        <TextField
                            helperText={error ? error.message : null}
                            error={!!error}
                            onChange={onChange}
                            value={value}
                            label={"nickname"}
                            type={"text"}
                            fullWidth
                            placeholder={"nickname"}
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment position={"start"}>
                                            <FaceIcon />
                                        </InputAdornment>
                                    )
                                }
                            }}
                        />
                    )}
                />
                <Button type={"submit"} fullWidth loading={isPending}>
                    Sign Up
                </Button>
            </form>
        </Paper>
    )
}

export default SignUpPage;