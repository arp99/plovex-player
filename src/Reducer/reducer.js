import { v4 as uuid } from "uuid"

export const reducer  = (prevState , { type , payload}) =>{
    const { id } = payload;
    console.log(payload)
    switch(type){
        case "ADD_TO_WATCH_LATER" :
            const isPresentInWatchLAter =  prevState.watchLater.find(video => video.id === id) 
            if(!isPresentInWatchLAter){
                return {...prevState , watchLater: [...(prevState.watchLater) , payload]}
            }
            return prevState;
        case "TOGGLE_LIKE": 
            const isLiked = prevState.liked.find(video => video.id === id)
            if(!isLiked){
                return {...prevState , liked: [...(prevState.liked) , payload]}
            }
            else{
                return {...prevState , liked: prevState.liked.filter(video => video.id !== id)}
            }
        case "ADD_TO_HISTORY":
            const isPresentInHistory =  prevState.history.find(video => video.id === id)
            if(!isPresentInHistory){
                return { ...prevState , history: [ ...(prevState.history) , payload ]}
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