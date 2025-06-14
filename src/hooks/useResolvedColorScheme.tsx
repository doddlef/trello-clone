import {useColorScheme} from "@mui/material/styles";
import {useMediaQuery} from "@mui/material";

function useResolvedColorScheme() {
    const { mode } = useColorScheme();
    const preferDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
    if (mode === "dark") return "dark";
    if (mode === "light") return "light";
    return preferDarkMode ? "dark" : "light";
}

export default useResolvedColorScheme;