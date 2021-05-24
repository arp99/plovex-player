import { useVideos } from "../../Context"
import { Link } from "react-router-dom"
import { IconContext } from "react-icons"
import { RiDeleteBin6Line } from "react-icons/ri";
import "./LikedVideo.css"

export const LikedVideos = () =>{
    const { state , dispatch } = useVideos()

    const likedVideos = state.liked.map(id => state.videos.find(video => id === video.id))
    console.log(likedVideos)

    const iconStyle = {
        color:"turquoise",
        size:"1.5rem"
    }

    return(
        <div>
            <h1>Liked Videos</h1>
            {
                likedVideos.length === 0 ? <small>No Liked Videos</small>:null
            }
            <div className="liked-videos">
                {
                    likedVideos.map(({id:videoId , title , thumbnail})=>{
                        return(
                            <div className="liked-video__container">
                                <div className="liked-thumbnail__container" key={videoId}> 
                                    <Link to ={`/v/${videoId}`} >
                                        <img 
                                            src={ thumbnail } 
                                            alt="sample" 
                                            className="card-img" 
                                        />
                                    </Link>
                                </div>
                                <div className="liked-description__container">
                                    <p>{title}</p>
                                    <IconContext.Provider value={iconStyle} >
                                        <RiDeleteBin6Line 
                                            onClick={()=>dispatch({type: "TOGGLE_LIKE" , payload:{ videoId }})}
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