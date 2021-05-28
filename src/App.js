import { Navbar } from "./Components"
import { Routes , Route } from "react-router-dom"
import './App.css';
import { History, VideoDetails, Videolisting, Watchlater, Playlist, LikedVideos } from "./Pages";
import { useTheme } from "./Context";

function App() {
  const { theme } = useTheme()
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
