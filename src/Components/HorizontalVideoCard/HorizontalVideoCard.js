import { Link } from "react-router-dom"
import { IconContext } from "react-icons"
import { RiDeleteBin6Line } from "react-icons/ri";
import { useVideos } from "../../Context";
import VideoCardStyle from "./HorizontalVideoCard.module.css"

export const HorizontalVideoCard = ({ videoId, title, thumbnail, type }) =>{
    const { dispatch } = useVideos()
    const iconStyle = {
        color:"turquoise",
        size:"1.5rem"
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
                <IconContext.Provider value={iconStyle} >
                    <RiDeleteBin6Line 
                        onClick={()=>dispatch({type, payload:{ videoId }})}
                        className="btn-action"
                    />                                    
                </IconContext.Provider>
            </div>
        </div>
    )

}