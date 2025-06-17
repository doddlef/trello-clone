import {BrowserRouter} from "react-router";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import Layout from "./pages/Layout.tsx";
import DarkModeProvider from "@/components/ThemeModeProvider/ThemeModeProvider.tsx";
import useDarkMode from "@/hooks/useDarkMode.ts";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import AccountProvider from "@/components/AccountProvider/AccountProvider.tsx";

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
            <AccountProvider>
                <Layout />
            </AccountProvider>
        </ThemeProvider>
    )
}

function Wrapper() {
    const queryClient = new QueryClient();
    return (
        <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools />
            <BrowserRouter>
                <DarkModeProvider>
                    <App />
                </DarkModeProvider>
            </BrowserRouter>
        </QueryClientProvider>
    )
}

export default Wrapper
