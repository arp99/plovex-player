import { useVideos } from "../../Context"
import { HorizontalVideoCard } from "../../Components";

export const History  = () =>{
    const { state } = useVideos()
    const historyData = state.history.map(id => state.videos.find(video => video.id === id))
    return(
        <div>
            <h1>History</h1>
            {
                historyData.length === 0 ? <small>Nothing in Watch History.</small>:null
            }
            <div className="history-videos">
                {
                    historyData.map(({id:videoId , title , thumbnail})=>{
                        return(
                            <HorizontalVideoCard 
                                videoId={videoId}
                                title={title}
                                thumbnail={thumbnail}
                                type= "REMOVE_FROM_HISTORY"
                            />
                        )
                    })
                }
            </div>
        </div>
    )
}