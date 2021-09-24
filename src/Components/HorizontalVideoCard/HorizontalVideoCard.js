import { Link } from "react-router-dom"
import { IconContext } from "react-icons"
import { RiDeleteBin6Line } from "react-icons/ri";
import { useVideos } from "../../Context";
import { IconStyle } from "../../Utilities"
import VideoCardStyle from "./HorizontalVideoCard.module.css"

import axios from "axios"

export const HorizontalVideoCard = ({ videoData , type , url }) =>{
    const { dispatch } = useVideos()
    const deleteHistoryHandler = async () =>{
        try{
            const response = await axios.delete(url ,{
                data: {_id : videoData._id }
            })
            if(response.status === 200){
                dispatch({type, payload:{ videoId : videoData.videoId }})
            }
        }catch(err){
            console.error("Problem in deleting from history: ", err.message)
        }
    }
    const removeFromLikes = async () =>{
        try{
            await axios.delete(url,{
                data: { _id : videoData._id }
            })
            dispatch({ type ,payload: { videoData }})
        }catch(err){
            console.error(err.message)
        }
    }
    const removeFromWatchlater = async () =>{
        try{
            await axios.delete(url,{
                data: { _id : videoData._id }
            })
            dispatch({ type: "REMOVE_FROM_WATCHLATER" , payload : { videoData }})
        }catch(err){
            console.error(err.message)
        }
    }
    const removeVideoHandler = () =>{
        switch(type){
            case "REMOVE_FROM_HISTORY"    : deleteHistoryHandler()
                                            break
            case "TOGGLE_LIKE"            : removeFromLikes()
                                            break
            case "REMOVE_FROM_WATCHLATER" : removeFromWatchlater()
                                            break
            default: break
        }
    }
    const truncateStr = str => str.length > 40 ? `${str.substring(0, 40)}...` : str;

    return(
        <div className={VideoCardStyle.video__container}>
            <div className={VideoCardStyle.thumbnail__container}>
                <Link to ={`/v/${videoData.videoId}`} >
                    <img 
                        src={ videoData.thumbnail } 
                        alt="sample" 
                        className="card-img" 
                    />
                </Link>               
            </div>
            <div className={VideoCardStyle['video-description__container']}>
                <p>{ truncateStr(videoData.title) }</p>
                <IconContext.Provider value={ IconStyle() } >
                    <RiDeleteBin6Line 
                        onClick={removeVideoHandler}
                        className="btn-action"
                    />                                    
                </IconContext.Provider>
            </div>
        </div>
    )

}