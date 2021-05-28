import { useEffect, useState } from "react"
import { Thumbnail, SearchBar } from "../../Components"
import { useSearchData, useTheme, useVideos } from "../../Context"
import VideolistingStyle from "./Videolisting.module.css"
export const Videolisting = () =>{
    const { state } = useVideos()
    const { videos } = state
    const { searchStr } = useSearchData()
    const [ filteredVideos , setFilterVideos ] = useState(videos)
    const { theme } = useTheme()
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
    return(
        <>
            <SearchBar />
            <div className={`${VideolistingStyle.videos__container} ${getDarkThemedVideoContainer()}`}>
                {
                    filteredVideos.map(({ id }) =>{
                        return(
                            <Thumbnail key={id} videoId={id} />
                        )
                    })
                }
            </div>
        </>
    )
}