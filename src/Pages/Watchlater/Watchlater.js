import { useVideos } from "../../Context"
import { Link } from "react-router-dom"
import { IconContext } from "react-icons";
import { RiDeleteBin6Line } from "react-icons/ri";
import "./Watchlater.css"
export const Watchlater = () =>{
    const { state , dispatch } = useVideos()
    const videoData = state.watchLater.map(id => state.videos.find(video => video.id === id))
    console.log(videoData)

    const iconStyle = {
        color:"turquoise",
        size:"1.5rem"
    }

    return(
        <div>
            <h1>Watchlater</h1>
            {
                videoData.length === 0 ?<small>No videos in Watchlater</small>:null
            }
            <div className="watchlater-videos">
                {
                    videoData.map(({id:videoId , title , thumbnail , url })=>{
                        return(
                            <div className="watchlater-video__container">
                                <div className="watchlater-thumbnail__container" key={videoId}> 
                                    <Link to ={`/v/${videoId}`} >
                                        <img 
                                            src={ thumbnail } 
                                            alt="sample" 
                                            className="card-img" 
                                        />
                                    </Link>
                                </div>
                                <div className="watchlater-description__container">
                                    <p>{title}</p>
                                    <IconContext.Provider value={iconStyle} >
                                        <RiDeleteBin6Line 
                                            onClick={()=>dispatch({type: "REMOVE_FROM_WATCHLATER" , payload:{ videoId }})}
                                            className="btn-action"
                                        />                                    
                                    </IconContext.Provider>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}