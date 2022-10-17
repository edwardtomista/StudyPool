import "./App.css";
import Home from "./Pages/Home";
import Header from "./Components/Navbar/Header";
import Login from "./Pages/Login";
import SignUp from "./Pages/Signup";
import StudyGroup from "./Pages/StudyGroup";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/StudyGroup" element={<StudyGroup />} />
      </Routes>
    </div>
  );
}

export default App;
