import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Test from "./components/Board1";
import SecondPage from "./components/Board";

import HomePage from "./components/HomePage";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/board" element={<Test />} />
      </Routes>
    </Router>
  );
}

export default App;
