import { useRef, useState } from "react"
import { useVideos } from "../../Context"
import "./PlaylistModal.css"
export const PlaylistModal = ({ showModal , videoId }) =>{
    const [ state , setState] = useState(false)
    const { state : videosState , dispatch } = useVideos()
    const { playlist } = videosState
    const playlistInput = useRef(null)
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
        <div className="playlistmodal__container">
            <div className="modal__header">
                <small id="heading">Save to...</small>
                <small 
                    id="close"
                    onClick={()=>showModal(false)}
                >
                    X
                </small>
            </div>
            <div className="playlists__container">
            {
                playlist.map(({playlistId , name}) =>{
                    return(
                        <div className="input_group" key={playlistId} >
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
                    <div className="modal__footer create-playlist">
                        <input 
                            type="text" 
                            placeholder= "Name" 
                            ref={playlistInput}
                        />
                        <button 
                            className="btn"
                            onClick={playlistCreateHandler}
                        >
                            Create
                        </button>
                    </div>
                ):(
                    <div className="modal__footer">
                        <small id="create" onClick={()=>setState(true)}>+</small>
                        <small id="footer">Create New</small>
                    </div>
                )
            }
        </div>
    )
}