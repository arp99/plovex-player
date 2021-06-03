import { useVideos } from "../../Context"
import { HorizontalVideoCard , Loading} from "../../Components";

export const LikedVideos = () =>{
    const { state } = useVideos()

    const likedVideos = state.liked
    console.log("Liked videos:" ,likedVideos)

    return(
        <div>
            <h1>Liked Videos</h1>
            {
                state.videos.length === 0
                ?
                <Loading />
                :
                likedVideos.length === 0 ? <small>No Liked Videos</small>
                :
                <div className="liked-videos">
                    {
                        likedVideos.map( video =>{
                            return(
                                <HorizontalVideoCard
                                    key = { video._id }    
                                    videoData = { video }
                                    type = "TOGGLE_LIKE"
                                    url = 'https://plovex-player-backend.herokuapp.com/liked-videos'
                                />
                            )
                        })
                    }
                </div>
            }
        </div>
    )
}