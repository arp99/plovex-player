import { useRef, useState } from "react"
import { useTheme, useVideos } from "../../Context"
import PlaylistStyle from "./PlaylistModal.module.css"
import axios from "axios"

export const PlaylistModal = ({ showModal , videoData }) =>{
    const [ state , setState] = useState(false)
    const { state : videosState , dispatch } = useVideos()
    const { playlist } = videosState
    const playlistInput = useRef(null)
    const { theme } = useTheme()
    const playlistCreateHandler = async()=>{
            const playlistName = playlistInput.current.value
            if(playlistName !== ""){
                try{
                    const response = await axios.post('https://plovex-player-backend.herokuapp.com/playlists',{
                        playlistName, 
                        videos : [videoData._id] 
                    })
                    const { createdPlaylist } = response.data ;
                    dispatch({
                        type:"CREATE_PLAYLIST",
                        payload:{ playlistName : createdPlaylist.playlistName , playlistId : createdPlaylist._id, videoData }
                    })
                }catch(err){
                    console.error(err.message)
                }
                setState(false)
            }
    }
    const isVideoInPlaylist = playlistId =>{
        const playlistToSearch = playlist.find(playlist => playlist._id === playlistId)
        const isVideoPresent =  playlistToSearch.videos.find(video => video.videoId === videoData.videoId )
        return isVideoPresent ? true : false
    }

    const toggleVideoInPlaylist = async ( playlistId ) =>{
        try{
            await axios.post(`https://plovex-player-backend.herokuapp.com/playlists/${ playlistId }`,{
                videoId : videoData._id
            })
            dispatch({type : "TOGGLE_VIDEO_IN_PLAYLIST" , payload: { playlistId , videoData }})
        }catch(err){
            console.error(err.message)
        }
    }

    return(
        <div 
            className={
                theme === "dark"
                ?
                `${PlaylistStyle.playlistmodal__container} ${PlaylistStyle.dark_playlistmodal}`
                :
                `${PlaylistStyle.playlistmodal__container}`
            }
        >
            <div 
                className={
                    theme === "dark"
                    ?
                    `${PlaylistStyle.modal__header} ${PlaylistStyle.dark_modal__header}`
                    :
                    `${PlaylistStyle.modal__header}`
                }
            >
                <small id={`${PlaylistStyle.heading}`}>Save to...</small>
                <small 
                    id={`${PlaylistStyle.close}`}
                    onClick={()=>showModal(false)}
                >
                    X
                </small>
            </div>
            <div className={`${PlaylistStyle.playlists__container}`}>
            {
                playlist.map(({_id : playlistId , playlistName}) =>{
                    return(
                        <div 
                            key={ playlistId }
                            className={
                                theme === "dark"
                                ?
                                `${PlaylistStyle.input_group} ${PlaylistStyle.dark_input_group}`
                                :
                                `${PlaylistStyle.input_group}`
                            }
                        >
                            <input 
                                type="checkbox" 
                                id={ playlistId } 
                                checked={isVideoInPlaylist(playlistId)}
                                onChange={()=> toggleVideoInPlaylist(playlistId) }
                            />
                            <label htmlFor={playlistId}> { playlistName } </label>
                        </div>  
                    )
                })
            }               
            </div>
            {
                state?(
                    <div 
                        className={
                            theme === "dark"
                            ?
                            `${PlaylistStyle.modal__footer} ${PlaylistStyle.dark_modal__footer} ${PlaylistStyle['create-playlist']}`
                            :
                            `${PlaylistStyle.modal__footer} ${PlaylistStyle['create-playlist']}`
                        }
                    >
                        <input 
                            type="text" 
                            placeholder= "Name" 
                            ref={playlistInput}
                            className={
                                theme === "dark"
                                ?
                                `${PlaylistStyle.playlist_input} ${PlaylistStyle.dark_input}`
                                :
                                `${PlaylistStyle.playlist_input}`
                            }
                        />
                        <button 
                            className={
                                theme === "dark"
                                ?    
                                `${PlaylistStyle.btn} ${PlaylistStyle.dark_btn}`
                                :
                                `${PlaylistStyle.btn}`
                            }
                            onClick={playlistCreateHandler}
                        >
                            Create
                        </button>
                    </div>
                ):(
                    <div className={
                            theme === "dark"
                            ?
                            `${PlaylistStyle.modal__footer} ${PlaylistStyle.dark_modal__footer}`
                            :
                            `${PlaylistStyle.modal__footer}`
                        }
                    >
                        <small id={`${PlaylistStyle.create}`} onClick={()=>setState(true)}>+</small>
                        <small id={`${PlaylistStyle.footer}`}>Create New</small>
                    </div>
                )
            }
        </div>
    )
}