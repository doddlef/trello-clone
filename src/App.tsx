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
        dark: true,
    },
    typography: {
        fontFamily: 'Funnel Display',
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
