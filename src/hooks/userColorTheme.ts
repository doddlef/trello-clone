import {createContext, useContext} from "react";

export type Theme = "dark" | "light";
export type ThemeMode = Theme | "system"

type ColorThemeProviderState = {
    theme: Theme;
    themeMode: ThemeMode
    setThemeMode: (theme: ThemeMode) => void
}

const initialState: ColorThemeProviderState = {
    theme: "light",
    themeMode: "system",
    setThemeMode: () => null,
}

export const ColorThemeProviderContext = createContext<ColorThemeProviderState>(initialState)

const useColorTheme = () => {
    const context = useContext(ColorThemeProviderContext)

    if (context === undefined)
        throw new Error("useTheme must be used within a ThemeProvider")

    return context
}

export default useColorTheme