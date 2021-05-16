import { createContext, useContext, useReducer } from "react";
import { reducer } from "../Reducer/reducer"
import { videos } from "../Video-DB/VideoDb"
const initialState = {
    videos : videos,
    watchLater:[],
    liked: [],
    history:[],
    playlist:[]
}

const VideosContext = createContext()

export const Videosprovider = ({ children }) =>{
    const [ state , dispatch ] = useReducer( reducer ,initialState )
    return(
        <VideosContext.Provider value={{ state , dispatch }} >
            { children }
        </VideosContext.Provider>
    )
}

export const useVideos = () => useContext(VideosContext);