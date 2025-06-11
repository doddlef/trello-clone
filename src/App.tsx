import {BrowserRouter} from "react-router";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import ColorThemeProvider from "./components/ColorThemeProvider.tsx";
import useColorTheme from "./hooks/userColorTheme.ts";
import {useMemo} from "react";

function App() {
    const { theme: mode } = useColorTheme();

    const theme = useMemo(() => createTheme({
        palette: {
            mode,
            ...(mode === 'light' ? {
                primary: {
                    main: '#673ab7',
                },
                secondary: {
                    main: '#03a9f4',
                },
                background: {
                    default: '#f0f0f0',
                    paper: '#f1f1f1',
                },
                error: {
                    main: '#d32f2f',
                },
            } : {
                primary: {
                    main: '#ba68c8',
                },
                secondary: {
                    main: '#4fc3f7',
                },
                error: {
                    main: '#d32f2f',
                },
                background: {
                    paper: '#101010',
                    default: '#111111',
                },
                text: {
                    primary: '#f1f1f1',
                },
            }),
        },
        typography: {
            fontFamily: 'Funnel Sans',
        },
    }), [mode]);

    return (
        <ThemeProvider theme={theme}>

        </ThemeProvider>
    )
}

function Wrapper() {
    return (
        <BrowserRouter>
            <ColorThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
                <App />
            </ColorThemeProvider>
        </BrowserRouter>
    )
}

export default Wrapper
