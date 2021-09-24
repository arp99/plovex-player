import { useTheme } from "../Context"

export const IconStyle = ()=>{
    const { theme } = useTheme()

    const iconStyle = {
        color: "#8B5CF6",
        size:"2rem"
    }
    const darkIconStyle = {
        color:"#7a9fba",
        size:"2rem"
    }
    return theme === "dark" ? darkIconStyle : iconStyle
}