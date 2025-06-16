import Paper from "@mui/material/Paper";
import { motion } from "framer-motion";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Typography from "@mui/material/Typography";
import {useSearchParams} from "react-router";

function SignUpSuccessPage() {
    const [searchParams] = useSearchParams();
    const accountUid = searchParams.get("accountUid");

    // TODO: redirect to 404 is accountUid is not provided or invalid
    return (
        <Paper sx={{minWidth: 560, minHeight: 320}} elevation={4} className={"flex pl-12 pr-12 flex-row items-center justify-center gap-4"}>
            <motion.div
                initial={{
                    opacity: 0,
                    scale: 0.2,
                    rotate: 360,
                    x: -100,
                }}
                animate={{
                    opacity: 1,
                    scale: 1,
                    rotate: 0,
                    x: 0,
                    transition: {
                        duration: 0.6,
                    }
                }}
            >
                <CheckCircleIcon color={"success"} sx={{fontSize: 96}}/>
            </motion.div>
            <motion.div
                initial={{
                    opacity: 0,
                    y: 20,
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                    transition: {
                        duration: 0.6,
                        delay: 0.2,
                    }
                }}
                className={"flex flex-col items-start justify-center gap-1"}
            >
                <Typography variant={"h4"}>
                    Well done! Almost there!
                </Typography>
                <Typography>
                    An email has been sent to you, please follow the instructions to active your account.
                </Typography>
                {
                    accountUid && (
                        <Typography variant={"caption"} color={"textSecondary"}>
                            account UID: <strong>{accountUid}</strong>
                        </Typography>
                    )
                }
            </motion.div>
        </Paper>
    )
}

export default SignUpSuccessPage;