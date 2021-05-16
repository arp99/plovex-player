import { useVideos } from "../../Context"
import { Link } from "react-router-dom"
import "./Thumbnail.css"
export const Thumbnail = ( { videoId }) =>{
    const { state , dispatch } = useVideos()
    console.log(state)
    const { videos } = state 
    const videoData = videos.find(video => video.id === videoId)
    const { id , title , thumbnail } = videoData
    return(
        
        <div className="card" onClick={()=> dispatch({type: "ADD_TO_HISTORY" , payload: videoData })}>
            <div className="card-img__container">
            <Link to ={`/v/${id}`} >
                <img 
                    src={ thumbnail } 
                    alt="sample" 
                    className="card-img" 
                />
            </Link>
            </div>
            <div className="card-details">
                <h2 className="card-heading">
                <Link to ={`/v/${id}`} >
                    { title }
                </Link>
                </h2>
            </div>
        </div>
    )
}