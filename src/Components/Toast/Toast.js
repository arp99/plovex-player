import { useEffect, useState } from "react"
import "./Toast.css"
export const Toast = ({ toastMsg , setToggleToast }) =>{
    const [ showToast , setShowToast ] = useState(false)
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
            className={`toast__container ${showToast?"show":""}`}>
            <small className="toast-message">{ toastMsg }</small>
        </div>
    )
}