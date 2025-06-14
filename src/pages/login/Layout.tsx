import { Link } from "react-router";
import ProjectIcon from "@/components/ProjectIcon/ProjectIcon.tsx";
import Typography from "@mui/material/Typography";
import ThemeSwitch from "@/components/ThemeSwitch/ThemeSwitch.tsx";
import useResolvedColorScheme from "@/hooks/useResolvedColorScheme.tsx";
import Button from "@mui/material/Button";
import {useColorScheme} from "@mui/material/styles";

function Layout() {
    const scheme = useResolvedColorScheme();
    const { setMode } = useColorScheme();
    return (
        <div className={"w-screen h-screen overflow-hidden relative"}>
            <div className={"w-full flex gap-4 justify-between items-center pl-8 pr-8 pt-4 pb-4"}>
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
            <div className={"w-full h-full flex justify-center items-center"}>
                <Typography variant={"h3"}>
                    {scheme === "dark" ? "Dark Mode" : "Light Mode"} is enabled.
                </Typography>
                <Button onClick={() => setMode("dark")}>
                    dark
                </Button>
                <Button onClick={() => setMode("light")}>
                    light
                </Button>
                <Button onClick={() => setMode("system")}>
                    system
                </Button>
            </div>
        </div>
    )
}

export default Layout