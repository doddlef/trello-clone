import {BrowserRouter} from "react-router";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import Layout from "./pages/Layout.tsx";
import DarkModeProvider from "@/components/ThemeModeProvider/ThemeModeProvider.tsx";
import useDarkMode from "@/hooks/useDarkMode.ts";

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
    typography: {
        fontFamily: 'Funnel Display',
    },
    cssVariables: {
        colorSchemeSelector: "class"
    }
})

const lightTheme = createTheme({
    palette: {
        mode: 'light',
    },
    typography: {
        fontFamily: 'Funnel Display',
    },
    cssVariables: {
        colorSchemeSelector: "class",
    }
})

function App() {
    const { theme } = useDarkMode();
    return (
        <ThemeProvider theme={theme === "dark" ? darkTheme : lightTheme}>
            <Layout />
        </ThemeProvider>
    )
}

function Wrapper() {
    return (
        <BrowserRouter>
            <DarkModeProvider>
                <App />
            </DarkModeProvider>
        </BrowserRouter>
    )
}

export default Wrapper
