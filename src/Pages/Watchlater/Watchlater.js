import { useVideos } from "../../Context"
import { HorizontalVideoCard } from "../../Components";

export const Watchlater = () =>{
    const { state } = useVideos()
    const videoData = state.watchLater.map(id => state.videos.find(video => video.id === id))
    console.log(videoData)

    return(
        <div>
            <h1>Watchlater</h1>
            {
                videoData.length === 0 ?<small>No videos in Watchlater</small>:null
            }
            <div className="watchlater-videos">
                {
                    videoData.map(({id:videoId , title , thumbnail })=>{
                        return(
                            <HorizontalVideoCard 
                                videoId={videoId}
                                title={title}
                                thumbnail={thumbnail}
                                type="REMOVE_FROM_WATCHLATER"
                            />
                        )
                    })
                }
            </div>
        </div>
    )
}