import AuthHeader from "@/components/AuthHeader/AuthHeader.tsx";
import Paper from "@mui/material/Paper";
import NotListedLocationOutlinedIcon from '@mui/icons-material/NotListedLocationOutlined';
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";

function NotFound() {
    return (
        <div className={"w-screen h-screen overflow-hidden relative flex justify-center items-center"}>
            <AuthHeader />
            <Paper elevation={4} className={"flex flex-row gap-8 items-center pl-8 pr-8 pt-16 pb-16"}>
                <div className={"flex flex-col items-end justify-center gap-2"}>
                    <Typography variant={"h4"}>
                        404 - Not found
                    </Typography>
                    <Typography>
                        It seems the page you are looking for does not exist.
                    </Typography>
                </div>
                <motion.div
                    initial={{
                        opacity: 0,
                        y: 20,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                >
                    <NotListedLocationOutlinedIcon color={"error"} style={{ fontSize: 72 }}/>
                </motion.div>
            </Paper>
        </div>
    );
}

export default NotFound