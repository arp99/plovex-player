import { Navbar } from "./Components"
import { Routes , Route } from "react-router-dom"
import './App.css';
import { History, VideoDetails, Videolisting, Watchlater, Playlist, LikedVideos } from "./Pages";
import { useTheme, useVideos } from "./Context";
import axios from "axios"
import { useEffect } from "react";

function App() {
  const { theme } = useTheme()
  const { dispatch } = useVideos()
  useEffect(()=>{
    (
      async function(){
        try{
          const videos = await axios.get('https://plovex-player-backend.herokuapp.com/videos')
          const watchlater = await axios.get('https://plovex-player-backend.herokuapp.com/watchlater')
          const likes = await axios.get('https://plovex-player-backend.herokuapp.com/liked-videos')
          const playlists = await axios.get('https://plovex-player-backend.herokuapp.com/playlists')
          const history = await axios.get('https://plovex-player-backend.herokuapp.com/history')
          console.log("video-data: ", videos)
          dispatch({
            type: "LOAD_VIDEOS",
            payload: {videos: videos.data.videoData }
          })
          dispatch({ 
            type : "LOAD_WATCHLATER" , 
            payload : { watchlater : watchlater.data.watchlaterVideos }
          })
          dispatch({ 
            type: "LOAD_LIKES" , 
            payload: { likes : likes.data.likedVideos }
          })
          dispatch({
            type : "LOAD_PLAYLISTS" ,  
            payload : { playlists: playlists.data.playlistData }
          })
          dispatch({ 
            type : "LOAD_HISTORY" , 
            payload : { history : history.data.history }
          })
        }catch(err){
          console.log(err)
        }
      }
    )()
  },[dispatch])

  return (
    <div className={theme === "dark"?`App App_dark`:`App`}>
      <Navbar />
      <Routes>
        <Route path="/"  element={<Videolisting />}/>
        <Route path="/v/:videoId"  element={<VideoDetails />}/>
        <Route path="/history"  element={<History />}/>
        <Route path="/watchlater" element={<Watchlater />} />
        <Route path="/playlist" element={<Playlist />} />
        <Route path="/liked-videos" element={<LikedVideos />} />
      </Routes>
    </div>
  );
}

export default App;
