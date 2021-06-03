import { useVideos } from "../../Context"
import { HorizontalVideoCard , Loading } from "../../Components";

export const Watchlater = () =>{
    const { state } = useVideos()
    const videoData = state.watchLater
    console.log(videoData)

    return(
        <div>
            <h1>Watchlater</h1>
            {
                state.videos.length === 0
                ?
                <Loading />
                :
                videoData.length === 0 ?<small>No videos in Watchlater</small>
                :
                <div className="watchlater-videos">
                    {
                        videoData.map( video =>{
                            return(
                                <HorizontalVideoCard 
                                    key = {video._id}
                                    videoData={video}
                                    type="REMOVE_FROM_WATCHLATER"
                                    url= 'https://plovex-player-backend.herokuapp.com/watchlater'
                                />
                            )
                        })
                    }
                </div>
            }
        </div>
    )
}