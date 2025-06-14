import {BrowserRouter} from "react-router";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import Layout from "./pages/Layout.tsx";

function App() {
    return (
        <Layout />
    )
}

const theme = createTheme({
    colorSchemes: {
        light: {
            palette: {
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
            }
        },
        dark: {
            palette: {
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
            }
        }
    },
    typography: {
        fontFamily: 'Sour Gummy',
    },
    cssVariables: {
        colorSchemeSelector: "class"
    }
})

function Wrapper() {
    return (
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <App />
            </ThemeProvider>
        </BrowserRouter>
    )
}

export default Wrapper
