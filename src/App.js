import { Navbar } from "./Components"
import { Routes , Route } from "react-router-dom"
import './App.css';
import { History, VideoDetails, Videolisting } from "./Pages";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/"  element={<Videolisting />}/>
        <Route path="/v/:videoId"  element={<VideoDetails />}/>
        <Route path="/history"  element={<History />}/>
      </Routes>
    </div>
  );
}

export default App;
