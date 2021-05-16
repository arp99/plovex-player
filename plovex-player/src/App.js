import { Navbar } from "./Components"
import { Routes , Route } from "react-router-dom"
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/"  element={<Videolisting />}/>
      </Routes>
    </div>
  );
}

export default App;
