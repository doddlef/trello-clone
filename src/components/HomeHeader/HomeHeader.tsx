import Paper from "@mui/material/Paper";
import ProjectIcon from "@/components/ProjectIcon/ProjectIcon.tsx";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { Link as RouterLink } from "react-router";
import Button from "@mui/material/Button";
import ThemeSwitch from "@/components/ThemeSwitch/ThemeSwitch.tsx";

function HomeHeader() {
    return (
        <Paper
            component={"header"}
            elevation={1}
            sx={{borderRadius: 0}}
            className={"pl-8 pr-8 pt-4 pb-4 flex items-center flex-row gap-10 opacity-80 sticky top-0 left-0"}
        >
            <div className={"flex gap-4 items-center"}>
                <ProjectIcon fontSize={"large"}/>
                <Typography variant={"h5"}>TaskBan</Typography>
            </div>
            <div className={"grow"}/>
            <Typography variant={"h6"}>
                <Link component={RouterLink} to={"/about"}>
                    About
                </Link>
            </Typography>
            <Button
                component={RouterLink}
                to={"/login"}
                variant={"contained"}
                color={"primary"}
                className={"rounded-4xl"}
            >
                Sign in
            </Button>
            <ThemeSwitch />
        </Paper>
    )
}

export default HomeHeader;