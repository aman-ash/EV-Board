import "./App.css";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import  {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Board from "./components/Board";
import HomePage from "./components/HomePage";
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/board" element={<Board/>}/>
      </Routes>
    </Router>
  );
}

export default App;
