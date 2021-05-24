import { useVideos } from "../../Context"
import { Link } from "react-router-dom"
import { IconContext } from "react-icons"
import { RiDeleteBin6Line } from "react-icons/ri";
import "./History.css"

export const History  = () =>{
    const { state , dispatch } = useVideos()
    const historyData = state.history.map(id => state.videos.find(video => video.id === id))
    console.log(state.history)
    const iconStyle = {
        color:"turquoise",
        size:"1.5rem"
    }
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
                            <div className="history-video__container">
                                <div className="history-thumbnail__container" key={videoId}> 
                                    <Link to ={`/v/${videoId}`} >
                                        <img 
                                            src={ thumbnail } 
                                            alt="sample" 
                                            className="card-img" 
                                        />
                                    </Link>
                                </div>
                                <div className="history-description__container">
                                    <p>{title}</p>
                                    <IconContext.Provider value={iconStyle} >
                                        <RiDeleteBin6Line 
                                            onClick={()=>dispatch({type: "REMOVE_FROM_HISTORY" , payload:{ videoId }})}
                                            className="btn-action"
                                        />                                    
                                    </IconContext.Provider>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}