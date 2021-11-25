export const reducer  = (prevState , { type , payload}) =>{
    switch(type){
        case "LOAD_DATA" : 
            return { 
                    videos : [ ...payload.videos] , 
                    watchLater : [...payload.watchlater],
                    liked : [...payload.likes],
                    history : [...payload.history],
                    playlist : [ ...payload.playlists ]
            }
        case "ADD_TO_WATCHLATER" :
            const isPresentInWatchLAter =  prevState.watchLater.find(video => video.videoId === payload.videoData.videoId) 
            if(!isPresentInWatchLAter){
                return {...prevState , watchLater: [...(prevState.watchLater) , payload.videoData]}
            }
            return prevState;
        case "REMOVE_FROM_WATCHLATER" :
            return {...prevState , watchLater : prevState.watchLater.filter(video => video.videoId !== payload.videoData.videoId)}
        case "TOGGLE_LIKE": 
            const { videoData } = payload
            const isLiked = prevState.liked.find(video => video.videoId === videoData.videoId)
            if(!isLiked){
                return {...prevState , liked: [...(prevState.liked) , videoData]}
            }
            else{
                return {...prevState , liked: prevState.liked.filter(video => video.videoId !== videoData.videoId)}
            }
        case "ADD_TO_HISTORY":
            const { videoId } = payload.videoData
            const isPresentInHistory =  prevState.history.find(video => video.videoId === videoId)
            if(!isPresentInHistory){
                return { ...prevState , history: [ ...(prevState.history) , { ...(payload.videoData) } ]}
            }
            return prevState
        case "REMOVE_FROM_HISTORY":
            return { ...prevState , history: prevState.history.filter(video => video.videoId !== payload.videoId)}
        case "TOGGLE_VIDEO_IN_PLAYLIST": 
                return{
                    ...prevState ,
                    playlist: prevState.playlist.map(playlist =>{
                        if (playlist._id === payload.playlistId){  // search for video in the particular playlist
                            return { 
                                    ...playlist , 
                                    videos: playlist.videos.find(video => video.videoId === payload.videoData.videoId) //if video is present in playlist
                                            ?
                                            playlist.videos.filter(video => video.videoId !== payload.videoData.videoId) //remove from playlist
                                            : 
                                            [...(playlist.videos) , payload.videoData]  //add to playlists
                            }
                        } else {
                            return playlist
                        }
                    }) 
                }
        case "CREATE_PLAYLIST": 
            
            return {
                        ...prevState ,
                        playlist : [
                                    ...(prevState.playlist) , 
                                    {    
                                        _id : payload.playlistId , 
                                        playlistName: payload.playlistName , 
                                        videos: [payload.videoData]
                                    }
                                ]
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
        case "UPDATE_SEARCH_TEXT": return payload.searchStr ;
        default: break;
    }
}