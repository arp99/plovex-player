import { Link } from "react-router-dom"
import { useVideos } from "../../Context"
import "./Playlist.css"
export const Playlist = () =>{
    const { state } = useVideos()
    const playlists = state.playlist
    const getVideosInPlaylist = playlistId  =>{
        const playlistToSearch = playlists.find(playlist => playlist.playlistId === playlistId)
        const videosData = playlistToSearch.videos.map(videoID =>{
            return state.videos.find(video => video.id === videoID)
        })
        return videosData
    }
    return (
        <div className="allPlaylists__container">
        {
            playlists.length > 0 ?(
                    playlists.map(playlist =>(
                        <div className="playlist-items__container" key={playlist.playlistId}>
                            <div className="playlist_name">
                                <h1>{playlist.name}</h1>
                            </div>
                            <div className="playlist-videos__container">
                                {
                                    getVideosInPlaylist(playlist.playlistId).map(({ id , thumbnail }) =>{
                                        return (
                                            <div className="playlist-thumnail__container">
                                                <Link to ={`/v/${id}`} >
                                                    <img 
                                                        src={ thumbnail } 
                                                        alt="sample" 
                                                        className="card-img" 
                                                    />
                                                </Link>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    )
                )
            ):(
                <h1>No Playlists available</h1>
            )
        }
        </div>
    )
}