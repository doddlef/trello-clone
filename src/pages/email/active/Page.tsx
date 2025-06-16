import {CircularProgress} from "@mui/material";
import Typography from "@mui/material/Typography";
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';

interface Props {
    state: "pending" | "error" | "success";
    message?: string;
}

function EmailActivePage({ state, message }: Props) {
    if (state === "pending") {
        return (
            <>
                <CircularProgress />
                <Typography>
                    activating your account...
                </Typography>
            </>
        );
    }

    if (state === "error") {
        return (
            <>
                <ErrorOutlineOutlinedIcon color={"error"} fontSize={"large"} />
                <Typography>
                    {message || "An error occurred while activating your account."}
                </Typography>
            </>
        );
    }

    return (
        <>
            <CheckCircleOutlineOutlinedIcon color={"success"} fontSize={"large"} />
            <Typography>
                {message || "Your account has been successfully activated!"}
            </Typography>
        </>
    );
}

export default EmailActivePage