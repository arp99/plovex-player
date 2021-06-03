import { useTheme, useVideos } from "../../Context"
import { Link } from "react-router-dom"
import ThumbnailStyle from "./Thumbnail.module.css"
import axios from "axios"

export const Thumbnail = ( { videoData } ) =>{
    const { dispatch } = useVideos()
    const { theme } = useTheme()
    // console.log(state)
    // const { videos } = state 
    // const videoData = videos.find(video => video.id === videoId)
    const { videoId , title , thumbnail } = videoData

    const addToHistoryHandler = async () =>{
        try{
            const response = await axios.post('https://plovex-player-backend.herokuapp.com/history',{
                _id: videoData._id
            })
            console.log("add to history response:" ,response)
            dispatch({type: "ADD_TO_HISTORY" , payload: { videoData } })
        }catch(err){
            console.error(err.message)
        }
    }
    return(
        
        <div 
            className={`${ThumbnailStyle.card}`} 
            onClick={addToHistoryHandler}
        >
            <div className={`${ThumbnailStyle['card-img__container']}`}>
            <Link to ={`/v/${videoId}`} >
                <img 
                    src={ thumbnail } 
                    alt="sample" 
                />
            </Link>
            </div>
            <div className={`${ThumbnailStyle['card-details']}`}>
                <h2 className={`${ThumbnailStyle['card-heading']}`}>
                <Link 
                    to ={`/v/${videoId}`} 
                    className={theme === "dark" ? `${ThumbnailStyle.dark_theme_link}`:''}
                >
                    { title }
                </Link>
                </h2>
            </div>
        </div>
    )
}