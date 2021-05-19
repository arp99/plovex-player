import { useState } from "react"
import { useParams } from "react-router-dom"
import { PlaylistModal } from "../../Components"
import { useVideos } from "../../Context"
import { MdFavoriteBorder , MdFavorite , MdPlaylistAdd , MdWatchLater } from "react-icons/md"
import { IconContext } from "react-icons";

import "./VideoDetails.css"
export const VideoDetails = () =>{
    const [ showPlaylistModal , setShowPlaylistModal ] = useState(false)
    const { videoId } = useParams()
    const { state , dispatch } = useVideos()
    const videoData  = state.videos.find(video => video.id === videoId)
    console.log(state.watchLater)

    const isLiked = () => state.liked.find(id => id === videoId)
    const { id , title } = videoData
    const iconStyle = {
        color:"turquoise",
        size:"2rem"
    }
    return(
       <div className="video__container">
           <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${id}`}
                title="YouTube video player"
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
            ></iframe>
            <h2>{title}</h2>
            <IconContext.Provider value={iconStyle} >
                <div className="actions-btn__container">
                    {
                        isLiked() ? 
                        (
                            <MdFavorite 
                                onClick={()=> dispatch({type: "TOGGLE_LIKE" , payload: { videoId }})}
                                className="btn-action"
                            /> 
                        )
                        : 
                        (
                            <MdFavoriteBorder 
                                onClick={()=> dispatch({type:"TOGGLE_LIKE" , payload: { videoId }})}
                                className="btn-action"
                            />
                        )
                    }
                    
                    <MdWatchLater 
                        onClick={()=>dispatch({type:"ADD_TO_WATCHLATER" , payload:{ videoId }})}
                        className="btn-action"
                    />
                    <MdPlaylistAdd 
                        onClick={()=>setShowPlaylistModal(true)}
                        className="btn-action"
                    />
                </div>
            </IconContext.Provider>
            {
                showPlaylistModal ?(
                    <PlaylistModal 
                            showModal={setShowPlaylistModal}
                            videoId={videoId}
                    />):null
            }
       </div>
    )
}