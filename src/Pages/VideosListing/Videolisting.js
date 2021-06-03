import { useEffect, useState } from "react"
import { Loading , Thumbnail, SearchBar } from "../../Components"
import { useSearchData, useTheme, useVideos } from "../../Context"
import VideolistingStyle from "./Videolisting.module.css"
export const Videolisting = () =>{
    const { state } = useVideos()
    const { videos } = state
    const { searchStr } = useSearchData()
    const [ filteredVideos , setFilterVideos ] = useState(videos)
    const { theme } = useTheme()
    console.log(videos)
    useEffect(()=>{
        setFilterVideos(()=> 
                videos.filter(video => 
                    video.title.toLowerCase().includes(searchStr.toLowerCase())
                )
        )
    },[ searchStr , videos ])

    const getDarkThemedVideoContainer = () =>{
        return theme === "dark"
                ?
                `${VideolistingStyle.dark_videos__container}`
                :
                ``
    }
    console.log("Filtered videos: ", filteredVideos)
    return(
        <>
            {
                videos.length === 0
                ? 
                <Loading />
                :
                <>
                    <SearchBar />
                    {
                        filteredVideos.length === 0
                        ?
                        <small 
                            style={{
                                    position:"fixed" , 
                                    top:"30%" , 
                                    left:"50%" , 
                                    transform : "translate(-50%,-30%)"
                                }}
                        >
                            No videos found
                        </small>
                        :
                        <div className={`${VideolistingStyle.videos__container} ${getDarkThemedVideoContainer()}`}>
                            {
                                filteredVideos.map(video =>{
                                    return(
                                        <Thumbnail key={video._id} videoData={video} />
                                    )
                                })
                            }
                        </div>
                    }
                </>
            }
        </>
    )
}