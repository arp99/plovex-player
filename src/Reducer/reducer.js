import { v4 as uuid } from "uuid"

export const reducer  = (prevState , { type , payload}) =>{
    console.log(payload)
    switch(type){
        case "ADD_TO_WATCHLATER" :
            const isPresentInWatchLAter =  prevState.watchLater.find(id => id === payload.videoId) 
            if(!isPresentInWatchLAter){
                return {...prevState , watchLater: [...(prevState.watchLater) , payload.videoId]}
            }
            return prevState;
        case "TOGGLE_LIKE": 
            const isLiked = prevState.liked.find(id => id === payload.videoId)
            if(!isLiked){
                return {...prevState , liked: [...(prevState.liked) , payload.videoId]}
            }
            else{
                return {...prevState , liked: prevState.liked.filter(id => id !== payload.videoId)}
            }
        case "ADD_TO_HISTORY":
            const isPresentInHistory =  prevState.history.find(id => id === payload.videoId)
            if(!isPresentInHistory){
                return { ...prevState , history: [ ...(prevState.history) , payload.videoId ]}
            }
            return prevState
        case "TOGGLE_VIDEO_IN_PLAYLIST": 
                return{
                    ...prevState ,
                    playlist: prevState.playlist.map(playlist =>{
                        if (playlist.playlistId === payload.playlistId){
                            return { 
                                    ...playlist , 
                                    videos: playlist.videos.find(videoId => videoId === payload.videoId)
                                            ?
                                            playlist.videos.filter(videoId => videoId !== payload.videoId)
                                            : 
                                            [...(playlist.videos) , payload.videoId]
                            }
                        } else {
                            return playlist
                        }
                    }) 
                }
        case "CREATE_PLAYLIST": 
                return {
                        ...prevState ,
                        playlist : [...(prevState.playlist) , {playlistId: uuid() , name: payload.playlistName , videos: [payload.videoId]}]
                }   
        case "REMOVE_FROM_PLAYLIST":
                return {
                    ...prevState ,
                    playlist : prevState.playlist.map(playlist => {
                        if(playlist.playlistId === payload.playlistId){
                            return {
                                ...playlist ,
                                videos : playlist.videos.filter(videoId => videoId !== payload.videoId)
                            }
                        }else{
                            return playlist
                        }
                    })
                }
        default: break;
    }
}