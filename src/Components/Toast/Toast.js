import { useEffect, useState } from "react"
import { useTheme } from "../../Context"
import ToastStyle from "./Toast.module.css"

export const Toast = ({ toastMsg , setToggleToast }) =>{
    const [ showToast , setShowToast ] = useState(false)
    const { theme } = useTheme()
    console.log(toastMsg)
    useEffect(()=>{
        setShowToast(true)
        setTimeout(()=>{
            setShowToast(false)
            setToggleToast(false)
        },3000)
    },[setToggleToast])
    return(
        <div 
            className={
                `
                    ${ToastStyle.toast__container}
                    ${theme === "dark"?`${ToastStyle.dark_toast__container}`:``} 
                    ${showToast?`${ToastStyle.show}`:``}
                `
            }>
            <small className="toast-message">{ toastMsg }</small>
        </div>
    )
}