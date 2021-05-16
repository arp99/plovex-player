import { useVideos } from "../../Context"
import "./History.css"
export const History  = () =>{
    const { state } = useVideos()
    console.log(state.history)
    return(
        <h1>Hello from history page</h1>
    )
}