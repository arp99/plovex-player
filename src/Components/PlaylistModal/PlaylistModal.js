import { useRef, useState } from "react"
import { useTheme, useVideos } from "../../Context"
import PlaylistStyle from "./PlaylistModal.module.css"
export const PlaylistModal = ({ showModal , videoId }) =>{
    const [ state , setState] = useState(false)
    const { state : videosState , dispatch } = useVideos()
    const { playlist } = videosState
    const playlistInput = useRef(null)
    const { theme } = useTheme()
    const playlistCreateHandler = ()=>{
        const playlistName = playlistInput.current.value.trim()
        console.log(playlistName)
        if (playlistName !== ""){
            dispatch({
                type:"CREATE_PLAYLIST",
                payload:{playlistName , videoId }
            })
            setState(false)
        }
    }
    const isVideoInPlaylist = playlistId =>{
        const playlistToSearch = playlist.find(playlist => playlist.playlistId === playlistId)
        // if(playlistToSearch)
        return playlistToSearch.videos.find(id => id === videoId)
        // return false
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
                playlist.map(({playlistId , name}) =>{
                    return(
                        <div 
                            key={playlistId}
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
                                id={playlistId} 
                                checked={isVideoInPlaylist(playlistId)}
                                onChange={()=>dispatch({type : "TOGGLE_VIDEO_IN_PLAYLIST" , payload: {playlistId , videoId}})}
                            />
                            <label htmlFor={playlistId}> {name} </label>
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