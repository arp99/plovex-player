import { Link } from "react-router-dom"
import { useVideos } from "../../Context"
import { Loading } from "../../Components"
import "./Playlist.css"
export const Playlist = () =>{
    const { state } = useVideos()
    const playlists = state.playlist
    console.log("state in playlist: ", state)
    return (
        <div className="allPlaylists__container">
        {
            state.videos.length === 0 
            ? //check if videos have loaded or not
            <Loading />
            :
            playlists.length > 0 ?(
                playlists.map(playlist =>
                    <div className="playlist-items__container" key={playlist._id}>
                        <div className="playlist_name">
                            <h1>{playlist.playlistName}</h1>
                        </div>
                        {
                            playlist.videos.length === 0 
                            ?
                            <small>Playlist is empty</small>
                            :
                            <div className="playlist-videos__container">
                                {
                                    playlist.videos.map( video =>{
                                        return (
                                            <div className="playlist-thumnail__container" key={video._id}>
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