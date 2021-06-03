import { useVideos } from "../../Context"
import { HorizontalVideoCard , Loading } from "../../Components";

export const History  = () =>{
    const { state } = useVideos()
    const historyData = state.history
    console.log("history data: " , historyData)
    return(
        <div>
            <h1>History</h1>
            {
                state.videos.length === 0 
                ?
                <Loading />
                :
                historyData.length === 0 ? <small>Nothing in Watch History.</small>
                :
                <div className="history-videos">
                    {
                        historyData.map( video =>{
                            return(
                                <HorizontalVideoCard 
                                    videoData = { video }
                                    key = { video._id }
                                    type= "REMOVE_FROM_HISTORY"
                                    url="https://plovex-player-backend.herokuapp.com/history"
                                />
                            )
                        })
                    }
                </div>
            }
        </div>
    )
}