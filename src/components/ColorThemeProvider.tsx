import { useEffect, useState } from "react"
import {ColorThemeProviderContext, type Theme, type ThemeMode} from "../hooks/userColorTheme"
import * as React from "react";

type ColorThemeProviderProps = {
    children: React.ReactNode
    defaultTheme?: ThemeMode
    storageKey?: string
}

function ColorThemeProvider({
                                  children,
                                  defaultTheme = "system",
                                  storageKey = "vite-ui-theme",
                                  ...props
                              }: ColorThemeProviderProps) {
    const [themeMode, setThemeMode] = useState<ThemeMode>(
        () => (localStorage.getItem(storageKey) as ThemeMode) || defaultTheme
    )

    const [theme, setTheme] = useState<Theme>(
        window.document.documentElement.classList.contains("light") ? "light" : "dark" as Theme
    )

    useEffect(() => {
        const root = window.document.documentElement

        root.classList.remove("light", "dark")

        if (themeMode === "system") {
            const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
                .matches
                ? "dark"
                : "light"

            setTheme(systemTheme as Theme)
            root.classList.add(systemTheme)
            return
        }

        root.classList.add(themeMode)
    }, [themeMode])

    const value = {
        theme,
        themeMode,
        setThemeMode: (theme: ThemeMode) => {
            localStorage.setItem(storageKey, theme)
            setThemeMode(theme)
        },
    }

    return (
        <ColorThemeProviderContext.Provider {...props} value={value}>
            {children}
        </ColorThemeProviderContext.Provider>
    )
}

export default ColorThemeProvider