import { createContext, useContext, useEffect, useReducer } from "react";
import { themeReducer } from "../Reducer/themeReducer"
const ThemeContext = createContext()

export const ThemeProvider = ( { children }) =>{
    const [ theme , setTheme ] = useReducer( themeReducer, "light")
    useEffect(()=>{
        const Theme = localStorage.getItem("Theme");
        if(Theme){
            setTheme({type:"TOGGLE_THEME" , payload: {theme: Theme}})
        }
    },[])
    
    useEffect(()=>{
        localStorage.setItem("Theme" , theme)
    })
    
    return(
        <ThemeContext.Provider value={{ theme , setTheme }} >
            { children }
        </ThemeContext.Provider>
    )
}
export const useTheme = () => useContext(ThemeContext);