import useResolvedColorScheme from "@/hooks/useResolvedColorScheme.tsx";
import IconButton from "@mui/material/IconButton";
import { useColorScheme } from "@mui/material/styles";
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';

function ThemeSwitch() {
    const scheme = useResolvedColorScheme();
    const { setMode } = useColorScheme();

    return (
        <IconButton onClick={() => setMode(scheme == "dark" ? "light" : "dark")} aria-label={"toggle theme"}>
            { scheme == "dark"
                ? <WbSunnyOutlinedIcon  />
                : <DarkModeOutlinedIcon />
            }
        </IconButton>
    )
}

export default ThemeSwitch;