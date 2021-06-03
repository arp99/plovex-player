import Loader from "react-loader-spinner";
import { useTheme } from "../../Context";
import loadingStyle from "./Loading.module.css"

export const Loading = () =>{
    const { theme } = useTheme()
    return(
        <div className={`${loadingStyle.loading__container}`}>
            <Loader
                type="TailSpin"
                color={theme === "dark" ? "#7a9fba" : "#b5f1f1" }
                height={100}
                width={100}
              /> 
        </div>
    )
}