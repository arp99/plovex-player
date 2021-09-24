import { Link } from "react-router-dom"
import { useVideos } from "../../Context"
import { Loading } from "../../Components"
import PlaylistStyles from "./Playlist.module.css"

export const Playlist = () =>{
    const { state } = useVideos()
    const playlists = state.playlist
    return (
        <div className={`${PlaylistStyles.allPlaylists__container}`}>
        {
            state.videos.length === 0 
            ? //check if videos have loaded or not
            <Loading />
            :
            playlists.length > 0 ?(
                playlists.map(playlist =>
                    <div 
                        className={`${PlaylistStyles["playlist-items__container"]}`} 
                        key={playlist._id}
                    >
                        <div className={`${PlaylistStyles.playlist_name}`}>
                            <h1 className="heading">{playlist.playlistName}</h1>
                        </div>
                        {
                            playlist.videos.length === 0 
                            ?
                            <small>Playlist is empty</small>
                            :
                            <div className={`${PlaylistStyles["playlist-videos__container"]}`}>
                            {
                                playlist.videos.map( video =>{
                                    return (
                                        <div 
                                            className={`${PlaylistStyles["playlist-thumnail__container"]}`} 
                                            key={video._id}
                                        >
                                            <Link to ={`/v/${video.videoId}`} >
                                                <img 
                                                    src={ video.thumbnail } 
                                                    alt="sample" 
                                                    className="card-img" 
                                                />
                                            </Link>
                                        </div>
                                    )
                                })
                            }
                            </div>
                        }
                    </div>
                )
            )
            :
            (
                <h1>No Playlists available</h1>
            )
        }
        </div>
    )
}