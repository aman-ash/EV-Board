import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Test from "./components/Board1";
import SecondPage from "./components/Board";
import HomePage from "./components/HomePage";
import { useState } from "react";
function App() {
  const [id, setId] = useState("")
  const setItem = (Id) =>{
    setId(Id)
  }
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage setItem={setItem} />} />
        <Route path="/board/:id" element={<Test/>} />
      </Routes>
    </Router>
  );
}

export default App;
