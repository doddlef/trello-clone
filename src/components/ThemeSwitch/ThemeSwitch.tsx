import { motion } from "framer-motion";
import useResolvedColorScheme from "@/hooks/useResolvedColorScheme.tsx";
import IconButton from "@mui/material/IconButton";
import {useColorScheme} from "@mui/material/styles";
import SvgIcon from "@mui/material/SvgIcon";

function ThemeSwitch() {
    const scheme = useResolvedColorScheme();
    const { setMode } = useColorScheme();

    return (
        <IconButton onClick={() => setMode(scheme == "dark" ? "light" : "dark")} aria-label={"toggle theme"}>
            <SvgIcon>
                <ThemeIcon />
            </SvgIcon>
        </IconButton>
    )
}

const sunPath = "M11 15C13.2091 15 15 13.2091 15 11C15 8.79086 13.2091 7 11 7C8.79086 7 7 8.79086 7 11C7 13.2091 8.79086 15 11 15Z"
const moonPath = "M12 21C16.9706 21 21 16.9706 21 12C12.5829 15.7004 8.54541 11.6855 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"

const raysVariants = {
    hidden: {
        strokeOpacity: 0,
        transition: {
            staggerChildren: 0.05,
            staggerDirection: -1,
        },
    },
    visible: {
        strokeOpacity: 1,
        transition: {
            staggerChildren: 0.05,
        },
    }
};

function ThemeIcon() {
    const isDark = useResolvedColorScheme() === 'dark';
    return (
        <motion.svg
            width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
            className={"stroke-text-primary"}
        >
            <motion.path
                initial={{
                    fillOpacity: 0,
                    strokeOpacity: 0,
                }}
                animate={{
                    fillOpacity: 0.35,
                    strokeOpacity: 1,
                    rotate: isDark ? 360 : 0,
                    d: isDark ? moonPath : sunPath,
                }}
                d={sunPath}
            />
            <motion.g
                variants={raysVariants}
                initial="visible"
                animate={isDark ? "hidden": "visible"}
            >
                {isDark ? "is dark" : "is light"}
                <motion.path variants={raysVariants} d="M11 1V3"/>
                <motion.path variants={raysVariants} d="M11 19V21"/>
                <motion.path variants={raysVariants} d="M3.93 3.93L5.34 5.34"/>
                <motion.path variants={raysVariants} d="M16.66 16.66L18.07 18.07"/>
                <motion.path variants={raysVariants} d="M1 11H3"/>
                <motion.path variants={raysVariants} d="M19 11H21"/>
                <motion.path variants={raysVariants} d="M5.34 16.66L3.93 18.07"/>
                <motion.path variants={raysVariants} d="M18.07 3.93L16.66 5.34"/>
            </motion.g>
        </motion.svg>
    )
}

export { ThemeIcon }
export default ThemeSwitch;