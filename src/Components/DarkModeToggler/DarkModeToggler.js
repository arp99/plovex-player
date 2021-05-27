import { useTheme } from "../../Context";
import togglerStyle from "./DarkModeToggler.module.css";
export const DarkModeToggler = () => {
    const { theme , setTheme } = useTheme()
    return (
        <div
        className={`${togglerStyle.toggler__container}`}
        onClick={() => setTheme({type:"TOGGLE_THEME"})}
        >
        <span role="img" aria-label="dark-mode">
            🌙
        </span>
        <span role="img" aria-label="light-mode">
            ☀️
        </span>
        <div
            className={
            theme === "light"
                ? `${togglerStyle["toggler-btn"]} ${togglerStyle.light}`
                : `${togglerStyle["toggler-btn"]} ${togglerStyle.dark}`
            }
        />
        </div>
    );
};
