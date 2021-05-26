import { useEffect, useState } from "react"
import { Thumbnail, SearchBar } from "../../Components"
import { useSearchData, useVideos } from "../../Context"
import "./Videolisting.css"
export const Videolisting = () =>{
    const { state } = useVideos()
    const { videos } = state
    const { searchStr } = useSearchData()
    const [ filteredVideos , setFilterVideos ] = useState(videos)

    useEffect(()=>{
        setFilterVideos(()=> 
                videos.filter(video => 
                    video.title.toLowerCase().includes(searchStr.toLowerCase())
                )
        )
    },[ searchStr , videos ])
    return(
        <>
            <SearchBar />
            <div className="videos__container">
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