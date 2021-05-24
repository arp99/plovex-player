import { useVideos } from "../../Context"
import { HorizontalVideoCard } from "../../Components";

export const LikedVideos = () =>{
    const { state } = useVideos()

    const likedVideos = state.liked.map(id => state.videos.find(video => id === video.id))
    console.log(likedVideos)

    return(
        <div>
            <h1>Liked Videos</h1>
            {
                likedVideos.length === 0 ? <small>No Liked Videos</small>:null
            }
            <div className="liked-videos">
                {
                    likedVideos.map(({id:videoId , title , thumbnail})=>{
                        return(
                            <HorizontalVideoCard
                                    videoId={videoId}
                                    title={title}
                                    thumbnail={thumbnail}
                                    type = "TOGGLE_LIKE"
                            />
                        )
                    })
                }
            </div>
        </div>
    )
}