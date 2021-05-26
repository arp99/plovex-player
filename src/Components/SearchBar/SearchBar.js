import { useSearchData } from "../../Context"
import searchBarStyle from "./SearchBar.module.css"
export const SearchBar = () =>{
    const { searchStr , setSearchStr } = useSearchData()
    return(
        <div className={searchBarStyle.searchBox__container}>
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