import { Link } from "react-router";
import ProjectIcon from "@/components/ProjectIcon/ProjectIcon.tsx";
import Typography from "@mui/material/Typography";
import ThemeSwitch from "@/components/ThemeSwitch/ThemeSwitch.tsx";

function AuthHeader() {
    return (
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
    )
}

export default AuthHeader;