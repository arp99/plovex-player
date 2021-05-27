import { useEffect, useState } from "react"
import { useSearchData } from "../../Context"
import searchBarStyle from "./SearchBar.module.css"
export const SearchBar = () =>{
    const { searchStr , setSearchStr } = useSearchData()
    const [ prevScrollPos , setPrevScrollPos ] = useState(0)
    const [ visible , setVisible ] = useState(true)

    useEffect(()=>{
        const handleScroll = () =>{
            //find current scroll position
            const currScrollPos = window.pageYOffset;
            //set the visible state based on the location of scroll
            setVisible(prevScrollPos > currScrollPos)
            //set the current scroll position
            setPrevScrollPos(currScrollPos)
        }
        window.addEventListener('scroll', handleScroll)
        return ()=>{
            window.removeEventListener('scroll', handleScroll)
        }
    },[visible , prevScrollPos ])
    return(
        <div className={visible?`${searchBarStyle.searchBox__container}`: `${searchBarStyle.searchBox__container} ${searchBarStyle.hidden}`}>
            <input 
                value={searchStr}
                placeholder={"Search Videos?"}
                onChange={
                    (e)=>setSearchStr(
                        {
                            type:"UPDATE_SEARCH_TEXT" , 
                            payload: {searchStr: e.target.value}
                        }
                    )
                }
                className={searchBarStyle.searchBox}
            />
        </div>
    )
}