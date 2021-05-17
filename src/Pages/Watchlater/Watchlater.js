import { useVideos } from "../../Context"

export const Watchlater = () =>{
    const { state } = useVideos()
    const videoData = state.watchLater.map(id => state.videos.find(video => video.id === id))
    console.log(videoData)
    return(
        <div>
            {
                videoData.map(({id , title})=>{
                    return(
                        <p key={id}>{title}</p>
                    )
                })
            }
        </div>
    )
}