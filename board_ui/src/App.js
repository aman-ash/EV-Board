import "./App.css";
import Home from "./components/Home";
import bg1 from "./components/bg1.mp4";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <div>
        <video className="video-component" src={bg1} autoPlay loop muted />
      </div>
      <Home />
    </>
  );
}

export default App;
