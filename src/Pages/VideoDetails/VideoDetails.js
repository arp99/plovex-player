import { useState } from "react"
import { useParams } from "react-router-dom"
import { Loading , PlaylistModal , Toast } from "../../Components"
import { useVideos } from "../../Context"
import { MdFavoriteBorder , MdFavorite , MdPlaylistAdd } from "react-icons/md"
import { IoTimeOutline , IoTimeSharp } from "react-icons/io5";
import { IconContext } from "react-icons";
import { IconStyle } from "../../Utilities"

import axios from "axios"

import "./VideoDetails.css"
export const VideoDetails = () =>{
    const [ showPlaylistModal , setShowPlaylistModal ] = useState(false)
    const [ toggleToast , setToggleToast] = useState(false)
    const { videoId } = useParams()
    const { state , dispatch } = useVideos()
    console.log("state: ", state)
    const videoData  = state.videos.find(video => video.videoId === videoId)
    console.log(state.watchLater)

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
            const response = await axios.post('https://plovex-player-backend.herokuapp.com/liked-videos',{
                _id: videoData._id
            })
            actionBtnClickHandler("TOGGLE_LIKE" , "Added To Liked Videos")
            console.log(response)
        }catch(err){
            console.error(err.message)
        }
    }
    const removeFromLikes = async () =>{
        try{
            const response = await axios.delete('https://plovex-player-backend.herokuapp.com/liked-videos',{
                data: { _id : videoData._id }
            })
            actionBtnClickHandler("TOGGLE_LIKE" , "Removed From Liked Videos")
            console.error(response)
        }catch(err){
            console.error(err.message)
        }
    }

    const addToWatchlater = async () =>{
        try{
            const response = await axios.post('https://plovex-player-backend.herokuapp.com/watchlater',{
                _id : videoData._id
            })
            actionBtnClickHandler("ADD_TO_WATCHLATER" , "Added To Watchlater")
            console.log("Add to watchlater: ",response)
        }catch(err){
            console.error(err.message)
        }
    }

    const removeFromWatchlater = async () =>{
        try{
            console.log("request object in remove watchlater: " , {_id : videoData._id})
            const response = await axios.delete('https://plovex-player-backend.herokuapp.com/watchlater',{
                data: { _id : videoData._id }
            })
            actionBtnClickHandler("REMOVE_FROM_WATCHLATER" , "Removed From Watchlater")
            console.log("Remove from watchLater: ",response)
        }catch(err){
            console.error(err.message)
        }
    }
    console.log("videoData: ", videoData)
    return(
        <>
        {
            toggleToast?<Toast toastMsg={toastMsg}  setToggleToast={setToggleToast}/>:null
        }
        {
            !videoData ? <Loading />
            :
            <div className="video__container">
           <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${videoData.videoId}`}
                title="YouTube video player"
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
            ></iframe>
            <h2>{videoData.title}</h2>
            <IconContext.Provider value={IconStyle()} >
                <div className="actions-btn__container">
                    {
                        isLiked() ? 
                        (
                            <MdFavorite 
                                onClick={ removeFromLikes }
                                className="btn-action"
                            /> 
                        )
                        : 
                        (
                            <MdFavoriteBorder 
                                onClick={ addToLikes }
                                className="btn-action"
                            />
                        )
                    }
                    {
                        isInWatchlater() ?
                        (
                            <IoTimeSharp 
                                onClick={ removeFromWatchlater }
                                className="btn-action"
                            />        
                        )
                        :
                        (
                            <IoTimeOutline 
                                onClick={ addToWatchlater }
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
                            videoData={videoData}
                    />):null
            }
            </div>
        }
       </>
    )
}