import { createContext , useContext , useReducer } from "react"
import { reducer } from "../Reducer/reducer"

const SearchContext = createContext()

export const SearchDataProvider = ({ children }) =>{
    const [ searchStr , setSearchStr ] = useReducer(reducer , "")
    return(
        <SearchContext.Provider value={{ searchStr , setSearchStr }} >
            { children }
        </SearchContext.Provider>
    )
}

export const useSearchData = () => useContext(SearchContext)
