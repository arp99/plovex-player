import { useState } from "react"
import { useParams } from "react-router-dom"
import { PlaylistModal , Toast } from "../../Components"
import { useTheme, useVideos } from "../../Context"
import { MdFavoriteBorder , MdFavorite , MdPlaylistAdd } from "react-icons/md"
import { IoTimeOutline , IoTimeSharp } from "react-icons/io5";
import { IconContext } from "react-icons";

import "./VideoDetails.css"
export const VideoDetails = () =>{
    const [ showPlaylistModal , setShowPlaylistModal ] = useState(false)
    const [ toggleToast , setToggleToast] = useState(false)
    const { videoId } = useParams()
    const { state , dispatch } = useVideos()
    const videoData  = state.videos.find(video => video.id === videoId)
    console.log(state.watchLater)

    const isLiked = () => state.liked.find(id => id === videoId)
    const isInWatchlater = () => state.watchLater.find(id => id === videoId)

    const { id , title } = videoData
    const [toastMsg , setToastMsg] = useState("")
    const actionBtnClickHandler = ( type , msg) =>{
        setToggleToast(true)
        setToastMsg( msg )
        dispatch({type , payload:{ videoId }})
    }

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
        <>
        {
            toggleToast?<Toast toastMsg={toastMsg}  setToggleToast={setToggleToast}/>:null
        }
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
            <IconContext.Provider value={getIconStyle()} >
                <div className="actions-btn__container">
                    {
                        isLiked() ? 
                        (
                            <MdFavorite 
                                onClick={()=> actionBtnClickHandler("TOGGLE_LIKE" , "Removed From Liked Videos")}
                                className="btn-action"
                            /> 
                        )
                        : 
                        (
                            <MdFavoriteBorder 
                                onClick={()=> actionBtnClickHandler("TOGGLE_LIKE" , "Added To Liked Videos")}
                                className="btn-action"
                            />
                        )
                    }
                    {
                        isInWatchlater() ?
                        (
                            <IoTimeSharp 
                                onClick={()=> actionBtnClickHandler("REMOVE_FROM_WATCHLATER" , "Removed From Watchlater")}
                                className="btn-action"
                            />        
                        )
                        :
                        (
                            <IoTimeOutline 
                                onClick={()=> actionBtnClickHandler("ADD_TO_WATCHLATER" , "Added To Watchlater")}
                            className="btn-action"
                            />
                        )
                    }
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
       </>
    )
}