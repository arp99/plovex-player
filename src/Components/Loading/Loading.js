import { PropagateLoader } from "react-spinners";
import { useTheme } from "../../Context";
import loadingStyle from "./Loading.module.css"

export const Loading = () =>{
    const { theme } = useTheme()
    return(
        <div className={`${loadingStyle.loading__container}`}>
            <PropagateLoader 
                loading={true} 
                height={150} 
                width={150} 
                color={ theme === "dark" ? "#7a9fba" : "#7C3AED" }
            /> 
        </div>
    )
}