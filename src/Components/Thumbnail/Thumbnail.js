import { useTheme, useVideos } from "../../Context"
import { Link } from "react-router-dom"
import ThumbnailStyle from "./Thumbnail.module.css"

export const Thumbnail = ( { videoId }) =>{
    const { state , dispatch } = useVideos()
    const { theme } = useTheme()
    console.log(state)
    const { videos } = state 
    const videoData = videos.find(video => video.id === videoId)
    const { id , title , thumbnail } = videoData
    return(
        
        <div 
            className={`${ThumbnailStyle.card}`} 
            onClick={()=> dispatch({type: "ADD_TO_HISTORY" , payload: { videoId } })}
        >
            <div className={`${ThumbnailStyle['card-img__container']}`}>
            <Link to ={`/v/${id}`} >
                <img 
                    src={ thumbnail } 
                    alt="sample" 
                    // className="card-img" 
                />
            </Link>
            </div>
            <div className={`${ThumbnailStyle['card-details']}`}>
                <h2 className={`${ThumbnailStyle['card-heading']}`}>
                <Link 
                    to ={`/v/${id}`} 
                    className={theme === "dark" ? `${ThumbnailStyle.dark_theme_link}`:''}
                >
                    { title }
                </Link>
                </h2>
            </div>
        </div>
    )
}