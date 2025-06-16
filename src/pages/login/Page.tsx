import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import GitHubIcon from '@mui/icons-material/GitHub';
import GoogleIcon from '@mui/icons-material/Google';
import LoginForm from "@/components/LoginForm/LoginForm.tsx";
import Typography from "@mui/material/Typography";
import { Link } from "react-router";


function Page() {
    return (
        <Paper sx={{minWidth: 420}} elevation={4} className={"pt-8 pb-8 pl-12 pr-12 flex flex-col items-center gap-3"}>
            <Typography variant={"h6"}>
                Login in
            </Typography>
            <Button color={"info"} variant={"contained"} className={"w-full"} startIcon={<GitHubIcon />}>
                Continue with GitHub
            </Button>
            <Button color={"info"} variant={"contained"} className={"w-full"} startIcon={<GoogleIcon />}>
                Continue with Google
            </Button>
            <Divider variant={"middle"} flexItem>
                <Typography variant={"caption"}>OR</Typography>
            </Divider>
            <LoginForm />
            <div className={"w-full flex flex-row justify-between"}>
                <Link to={"/"}>
                    <Typography variant={"body2"} color={"secondary"} className={"underline"}>
                        forgot password?
                    </Typography>
                </Link>
                <Link to={"/sign-up"}>
                    <Typography variant={"body2"} color={"secondary"} className={"underline"}>
                        sign up
                    </Typography>
                </Link>
            </div>
        </Paper>
    )
}

export default Page