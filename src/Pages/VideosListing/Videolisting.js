import { Thumbnail } from "../../Components"
import { useVideos } from "../../Context"
import "./Videolisting.css"
export const Videolisting = () =>{
    const { state } = useVideos()
    const { videos } = state
    console.log(videos)
    return(
        <div className="videos__container">
            {
                videos.map(({ id }) =>{
                    return(
                        <Thumbnail key={id} videoId={id} />
                    )
                })
            }
        </div>
    )
}