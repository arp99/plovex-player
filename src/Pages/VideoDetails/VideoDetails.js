import { useState } from "react"
import { Link, useParams } from "react-router-dom"
import { PlaylistModal } from "../../Components"
import { useVideos } from "../../Context"
import "./VideoDetails.css"
export const VideoDetails = () =>{
    const [ showPlaylistModal , setShowPlaylistModal ] = useState(false)
    const { videoId } = useParams()
    const { state } = useVideos()
    const videoData  = state.videos.find(video => video.id === videoId)
    const { id , title } = videoData
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
            <h3><Link to="/history" >History</Link></h3>
            <button onClick={()=>setShowPlaylistModal(true)}>Add to Playlist</button>
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