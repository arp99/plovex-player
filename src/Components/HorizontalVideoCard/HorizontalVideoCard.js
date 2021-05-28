import { Link } from "react-router-dom"
import { IconContext } from "react-icons"
import { RiDeleteBin6Line } from "react-icons/ri";
import { useTheme, useVideos } from "../../Context";
import VideoCardStyle from "./HorizontalVideoCard.module.css"

export const HorizontalVideoCard = ({ videoId, title, thumbnail, type }) =>{
    const { dispatch } = useVideos()
    const { theme } = useTheme()
    const iconStyle = {
        color:"turquoise",
        size:"2rem"
    }
    const darkIconStyle = {
        color:"#7a9fba",
        size:"2rem"
    }
    const getIconStyle = () =>{
        return theme === "dark"
            ?
            darkIconStyle
            :
            iconStyle
    }
    return(
        <div className={VideoCardStyle.video__container}>
            <div className={VideoCardStyle.thumbnail__container}>
                <Link to ={`/v/${videoId}`} >
                    <img 
                        src={ thumbnail } 
                        alt="sample" 
                        className="card-img" 
                    />
                </Link>               
            </div>
            <div className={VideoCardStyle['video-description__container']}>
                <p>{ title }</p>
                <IconContext.Provider value={getIconStyle()} >
                    <RiDeleteBin6Line 
                        onClick={()=>dispatch({type, payload:{ videoId }})}
                        className="btn-action"
                    />                                    
                </IconContext.Provider>
            </div>
        </div>
    )

}