import { useState } from "react"
import { useParams } from "react-router-dom"
import { Loading , PlaylistModal , Toast } from "../../Components"
import { useVideos } from "../../Context"
import { MdFavoriteBorder , MdFavorite , MdPlaylistAdd } from "react-icons/md"
import { IoTimeOutline , IoTimeSharp } from "react-icons/io5";
import { IconContext } from "react-icons";
import { IconStyle } from "../../Utilities"
import VideodetailsStyles from "./VideoDetails.module.css"
import axios from "axios"

export const VideoDetails = () =>{
    const [ showPlaylistModal , setShowPlaylistModal ] = useState(false)
    const [ toggleToast , setToggleToast] = useState(false)
    const { videoId } = useParams()
    const { state , dispatch } = useVideos()
    const videoData  = state.videos.find(video => video.videoId === videoId)

    const isLiked = () => state.liked.find(video => video.videoId === videoId)
    const isInWatchlater = () => state.watchLater.find(video => video.videoId === videoId)

    // const { videoId , title } = videoData || {}
    const [toastMsg , setToastMsg] = useState("")
    const actionBtnClickHandler = ( type , msg) =>{
        setToggleToast(true)
        setToastMsg( msg )
        dispatch({type , payload:{ videoData }})
    }

    const addToLikes = async () =>{
        try{
            await axios.post('https://plovex-player-backend.herokuapp.com/liked-videos',{
                _id: videoData._id
            })
            actionBtnClickHandler("TOGGLE_LIKE" , "Added To Liked Videos")
        }catch(err){
            console.error(err.message)
        }
    }
    const removeFromLikes = async () =>{
        try{
            await axios.delete('https://plovex-player-backend.herokuapp.com/liked-videos',{
                data: { _id : videoData._id }
            })
            actionBtnClickHandler("TOGGLE_LIKE" , "Removed From Liked Videos")
        }catch(err){
            console.error(err.message)
        }
    }

    const addToWatchlater = async () =>{
        try{
            await axios.post('https://plovex-player-backend.herokuapp.com/watchlater',{
                _id : videoData._id
            })
            actionBtnClickHandler("ADD_TO_WATCHLATER" , "Added To Watchlater")
        }catch(err){
            console.error(err.message)
        }
    }

    const removeFromWatchlater = async () =>{
        try{
            await axios.delete('https://plovex-player-backend.herokuapp.com/watchlater',{
                data: { _id : videoData._id }
            })
            actionBtnClickHandler("REMOVE_FROM_WATCHLATER" , "Removed From Watchlater")
        }catch(err){
            console.error(err.message)
        }
    }
    return(
        <>
        {
            toggleToast?<Toast toastMsg={toastMsg}  setToggleToast={setToggleToast}/>:null
        }
        {
            !videoData ? <Loading />
            :
            <div className={`${VideodetailsStyles.video__container}`}>
                <iframe
                    src={`https://www.youtube.com/embed/${videoData.videoId}`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                    className={`${VideodetailsStyles.video_iframe}`}
                ></iframe>
                <h2 className={`${VideodetailsStyles.video__title}`}>{videoData.title}</h2>
                <IconContext.Provider value={IconStyle()} >
                    <div className={`${VideodetailsStyles["actions-btn__container"]}`}>
                        {
                            isLiked() ? 
                            (
                                <MdFavorite 
                                    onClick={ removeFromLikes }
                                    className={`${VideodetailsStyles["btn-action"]}`}
                                /> 
                            )
                            : 
                            (
                                <MdFavoriteBorder 
                                    onClick={ addToLikes }
                                    className={`${VideodetailsStyles["btn-action"]}`}
                                />
                            )
                        }
                        {
                            isInWatchlater() ?
                            (
                                <IoTimeSharp 
                                    onClick={ removeFromWatchlater }
                                    className={`${VideodetailsStyles["btn-action"]}`}
                                />        
                            )
                            :
                            (
                                <IoTimeOutline 
                                    onClick={ addToWatchlater }
                                    className={`${VideodetailsStyles["btn-action"]}`}
                                />
                            )
                        }
                        <MdPlaylistAdd 
                            onClick={()=>setShowPlaylistModal(true)}
                            className={`${VideodetailsStyles["btn-action"]}`}
                        />
                    </div>
                </IconContext.Provider>
                {
                    showPlaylistModal ?(
                        <PlaylistModal 
                                showModal={setShowPlaylistModal}
                                videoData={videoData}
                        />):null
                }
            </div>
        }
       </>
    )
}