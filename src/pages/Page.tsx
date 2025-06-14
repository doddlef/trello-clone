import HomeHeader from "@/components/HomeHeader/HomeHeader.tsx";
import Typography from "@mui/material/Typography";
import { Link as RouterLink } from "react-router";
import Link from "@mui/material/Link";
import ProjectIcon from "@/components/ProjectIcon/ProjectIcon.tsx";
import Button from "@mui/material/Button";

function Page() {
    return (
        <div className={"w-screen overflow-hidden relative"}>
            <div className={"h-screen w-screen"}>
                <HomeHeader />
                <div aria-label={"cover"} className={"w-full h-full flex flex-col gap-8 items-center pt-20"}>
                    <ProjectIcon sx={{fontSize: "12rem"}}/>
                    <Typography variant={"h3"}>TaskBan</Typography>
                    <Typography variant={"h6"}>
                        This is the a simple clone&nbsp;
                        <Link component={RouterLink} to={"https://trello.com/"}>
                           Trello
                        </Link>
                        , and&nbsp;
                        <Link component={RouterLink} to={"https://tasksboard.com"}>
                            TasksBoard
                        </Link>
                        &nbsp;built with React + Spring Boot
                    </Typography>
                    <Button
                        component={RouterLink}
                        size={"large"}
                        to={"/login"}
                        variant={"outlined"}
                        color={"primary"}
                    >
                        Sign in
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Page;