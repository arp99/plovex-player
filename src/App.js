import { Navbar } from "./Components"
import { Routes , Route } from "react-router-dom"
import './App.css';
import { History, VideoDetails, Videolisting, Watchlater, Playlist, LikedVideos, Singleplaylist } from "./Pages";
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
          const [
            videos,
            watchlater,
            likes,
            playlists,
            history
          ] = await Promise.all([
            axios.get('https://plovex-player-backend-production.up.railway.app/videos'),
            axios.get('https://plovex-player-backend-production.up.railway.app/watchlater'),
            axios.get('https://plovex-player-backend-production.up.railway.app/liked-videos'),
            axios.get('https://plovex-player-backend-production.up.railway.app/playlists'),
            axios.get('https://plovex-player-backend-production.up.railway.app/history')
          ]);
      
          dispatch({
            type : "LOAD_DATA" ,
            payload : {
              videos :  videos.data.videoData,
              watchlater : watchlater.data.watchlaterVideos,
              likes : likes.data.likedVideos,
              playlists: playlists.data.playlistData,
              history : history.data.history
            }
          })
        }catch(err){
          console.error(err)
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
        <Route path="/playlist/:playlistId" element={<Singleplaylist />} />
        <Route path="/liked-videos" element={<LikedVideos />} />
      </Routes>
    </div>
  );
}

export default App;
