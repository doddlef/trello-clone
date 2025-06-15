import { Link } from "react-router";
import ProjectIcon from "@/components/ProjectIcon/ProjectIcon.tsx";
import Typography from "@mui/material/Typography";
import ThemeSwitch from "@/components/ThemeSwitch/ThemeSwitch.tsx";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import GitHubIcon from '@mui/icons-material/GitHub';
import GoogleIcon from '@mui/icons-material/Google';
import {useForm} from "react-hook-form";
import {TextField} from "@mui/material";

type signInRequest = {
    email: string,
    password: string,
}

const defaultValues: signInRequest = {
    email: "",
    password: "",
}

function Layout() {
    const { handleSubmit, register, formState: { errors } } = useForm({ defaultValues });
    const onSubmit = (data: signInRequest) => console.log(data);

    return (
        <div className={"w-screen h-screen overflow-hidden relative"}>
            <div className={"absolute top-0 left-0 w-full flex gap-4 justify-between items-center pl-8 pr-8 pt-4 pb-4"}>
                <Link
                    aria-label={"home link"}
                    className={"flex gap-4 items-center"}
                    to={"/"}
                >
                    <ProjectIcon fontSize={"large"} />
                    <Typography variant={"h5"}>TaskBan</Typography>
                </Link>
                <ThemeSwitch />
            </div>
            <div className={"w-full h-full flex flex-col items-center justify-center"}>
                <Paper sx={{width: 360}} elevation={2} className={"p-8 flex flex-col items-center gap-3"}>
                    <Typography variant={"h6"}>
                        Login in
                    </Typography>
                    <Button color={"info"} variant={"contained"} className={"w-full"} startIcon={<GitHubIcon />}>
                        Continue with GitHub
                    </Button>
                    <Button color={"info"} variant={"contained"} className={"w-full"} startIcon={<GoogleIcon />}>
                        Continue with Google
                    </Button>
                    <Divider />
                    <form onSubmit={handleSubmit(onSubmit)} className={"w-full flex flex-col items-center gap-3"}>
                        <TextField
                            className={"w-full"}
                            type={"email"}
                            placeholder={"email"}
                            {...register('email', {required: true})}
                        />
                        {errors.email && ("Email is required")}
                        <TextField
                            className={"w-full"}
                            type={"password"}
                            placeholder={"password"}
                            {...register('password', {required: true})}
                        />
                        {errors.password && ("Password is required")}
                        <Button className={"w-full"} type={"submit"}>Log in</Button>
                    </form>
                </Paper>
            </div>
        </div>
    )
}

export default Layout